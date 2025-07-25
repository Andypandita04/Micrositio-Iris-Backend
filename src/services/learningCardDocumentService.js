import supabase from '../config/supabaseClient.js';
import LearningCardDocumentRepository from '../repositories/learningCardDocumentRepository.js';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

class LearningCardDocumentService {
  static bucketName = 'learning-card-docs';
  static maxFileSize = 50 * 1024 * 1024; // 50MB
  static allowedMimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp'
  ];

  static async uploadDocument(learningCardId, file) {
    try {
      // Validar tamaño del archivo
      if (file.size > this.maxFileSize) {
        throw new Error(`File size exceeds maximum limit of 50MB. Current size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
      }

      // Validar tipo de archivo
      if (!this.allowedMimeTypes.includes(file.mimetype)) {
        throw new Error(`File type not allowed. Allowed types: ${this.allowedMimeTypes.join(', ')}`);
      }

      // Generar nombre único para el archivo
      const fileExtension = path.extname(file.originalname);
      const uniqueFileName = `${uuidv4()}${fileExtension}`;
      const filePath = `learning-card-${learningCardId}/${uniqueFileName}`;

      // Subir archivo a Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(this.bucketName)
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: false
        });

      if (uploadError) {
        console.error('Error uploading to Supabase Storage:', uploadError);
        throw new Error(`Failed to upload file: ${uploadError.message}`);
      }

      // Obtener URL pública del archivo
      const { data: urlData } = supabase.storage
        .from(this.bucketName)
        .getPublicUrl(filePath);

      if (!urlData?.publicUrl) {
        throw new Error('Failed to get public URL for uploaded file');
      }

      // Guardar información del documento en la base de datos
      const documentData = {
        learning_card_id: learningCardId,
        document_name: file.originalname,
        document_url: urlData.publicUrl,
        document_type: file.mimetype
      };

      const savedDocument = await LearningCardDocumentRepository.createDocument(documentData);

      return {
        document: savedDocument,
        uploadPath: filePath,
        publicUrl: urlData.publicUrl
      };
    } catch (error) {
      console.error('Error in uploadDocument service:', error);
      throw error;
    }
  }

  static async getDocumentsByLearningCardId(learningCardId) {
    try {
      return await LearningCardDocumentRepository.getDocumentsByLearningCardId(learningCardId);
    } catch (error) {
      console.error('Error in getDocumentsByLearningCardId service:', error);
      throw error;
    }
  }

  static async deleteDocument(documentId) {
    try {
      // Obtener información del documento antes de eliminarlo
      const document = await LearningCardDocumentRepository.getDocumentById(documentId);

      if (!document) {
        throw new Error('Document not found');
      }

      // Extraer path del archivo desde la URL
      const url = new URL(document.document_url);
      const pathParts = url.pathname.split('/');
      const filePath = pathParts.slice(-2).join('/'); // learning-card-X/filename

      // Eliminar archivo de Supabase Storage
      const { error: deleteError } = await supabase.storage
        .from(this.bucketName)
        .remove([filePath]);

      if (deleteError) {
        console.error('Error deleting from Supabase Storage:', deleteError);
        // Continuar con la eliminación de la base de datos aunque falle el storage
      }

      // Eliminar registro de la base de datos
      const deletedDocument = await LearningCardDocumentRepository.deleteDocument(documentId);

      if (!deletedDocument) {
        throw new Error('Document not found in database');
      }

      return {
        document: deletedDocument,
        storageDeleted: !deleteError
      };
    } catch (error) {
      console.error('Error in deleteDocument service:', error);
      throw error;
    }
  }

  static async getDocumentById(documentId) {
    try {
      return await LearningCardDocumentRepository.getDocumentById(documentId);
    } catch (error) {
      console.error('Error in getDocumentById service:', error);
      throw error;
    }
  }

  static validateFileSize(fileSize) {
    return fileSize <= this.maxFileSize;
  }

  static validateFileType(mimeType) {
    return this.allowedMimeTypes.includes(mimeType);
  }

  static getFileTypeCategory(mimeType) {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType === 'application/pdf') return 'pdf';
    if (mimeType.includes('word') || mimeType.includes('document')) return 'document';
    if (mimeType.includes('excel') || mimeType.includes('sheet')) return 'spreadsheet';
    if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return 'presentation';
    if (mimeType === 'text/plain') return 'text';
    return 'other';
  }
}

export default LearningCardDocumentService;

import supabase from '../config/supabaseClient.js';
import testingCardDocumentRepository from '../repositories/testingCardDocumentRepository.js';
import { v4 as uuidv4 } from 'uuid';

class TestingCardDocumentService {
  
  async uploadDocument(file, testingCardId) {
    try {
      // Validar tamaño del archivo (50MB máximo)
      const maxSize = 50 * 1024 * 1024; // 50MB en bytes
      if (file.size > maxSize) {
        throw new Error('El archivo excede el tamaño máximo permitido de 50MB');
      }

      // Generar nombre único para el archivo
      const fileExtension = file.originalname.split('.').pop();
      const uniqueFileName = `${testingCardId}_${uuidv4()}.${fileExtension}`;
      const filePath = `testing-cards/${uniqueFileName}`;

      // Subir archivo a Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('testing-card-docs')
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          duplex: 'half'
        });

      if (uploadError) {
        throw new Error(`Error al subir archivo: ${uploadError.message}`);
      }

      // Obtener URL pública del archivo
      const { data: urlData } = supabase.storage
        .from('testing-card-docs')
        .getPublicUrl(filePath);

      // Determinar tipo de documento basado en mimetype
      const documentType = this.getDocumentType(file.mimetype);      // Crear registro en la base de datos
      const documentData = {
        testing_card_id: parseInt(testingCardId),
        document_name: file.originalname,
        document_url: urlData.publicUrl,
        document_type: documentType
      };

      // console.log('📊 Datos que se van a insertar:', documentData);
      // console.log('🔍 testing_card_id tipo:', typeof documentData.testing_card_id);
      
      const document = await testingCardDocumentRepository.create(documentData);
      return document;

    } catch (error) {
      throw error;
    }
  }

  async getDocumentsByTestingCard(testingCardId) {
    try {
      return await testingCardDocumentRepository.findByTestingCardId(testingCardId);
    } catch (error) {
      throw error;
    }
  }

  async deleteDocument(documentId) {
    try {
      // Obtener información del documento
      const document = await testingCardDocumentRepository.findById(documentId);
      if (!document) {
        throw new Error('Documento no encontrado');
      }

      // Extraer el path del archivo de la URL
      const url = new URL(document.document_url);
      const filePath = url.pathname.split('/').slice(-2).join('/'); // Obtiene "testing-cards/filename"

      // Eliminar archivo de Supabase Storage
      const { error: deleteError } = await supabase.storage
        .from('testing-card-docs')
        .remove([filePath]);

      if (deleteError) {
        console.warn(`Warning: No se pudo eliminar el archivo del storage: ${deleteError.message}`);
      }

      // Eliminar registro de la base de datos
      await testingCardDocumentRepository.delete(documentId);
      return true;

    } catch (error) {
      throw error;
    }
  }

  getDocumentType(mimetype) {
    if (mimetype.startsWith('image/')) return 'image';
    if (mimetype === 'application/pdf') return 'pdf';
    if (mimetype.startsWith('video/')) return 'video';
    if (mimetype.startsWith('audio/')) return 'audio';
    if (mimetype.includes('document') || mimetype.includes('word')) return 'document';
    if (mimetype.includes('sheet') || mimetype.includes('excel')) return 'spreadsheet';
    if (mimetype.includes('presentation') || mimetype.includes('powerpoint')) return 'presentation';
    return 'other';
  }
}

export default new TestingCardDocumentService();

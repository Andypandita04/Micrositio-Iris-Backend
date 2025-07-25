import LearningCardDocumentService from '../services/learningCardDocumentService.js';

class LearningCardDocumentController {
  static async uploadDocument(req, res) {
    try {
      const { learningCardId } = req.params;

      // Validar que se haya proporcionado un archivo
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file provided',
          error: 'FILE_REQUIRED'
        });
      }

      // Validar learningCardId
      if (!learningCardId || isNaN(parseInt(learningCardId))) {
        return res.status(400).json({
          success: false,
          message: 'Invalid learning card ID',
          error: 'INVALID_LEARNING_CARD_ID'
        });
      }

      const result = await LearningCardDocumentService.uploadDocument(parseInt(learningCardId), req.file);

      return res.status(201).json({
        success: true,
        message: 'Document uploaded successfully',
        data: {
          document: result.document,
          uploadPath: result.uploadPath,
          publicUrl: result.publicUrl
        }
      });
    } catch (error) {
      console.error('Error in uploadDocument controller:', error);

      // Manejar errores específicos
      if (error.message.includes('File size exceeds')) {
        return res.status(413).json({
          success: false,
          message: error.message,
          error: 'FILE_TOO_LARGE'
        });
      }

      if (error.message.includes('File type not allowed')) {
        return res.status(400).json({
          success: false,
          message: error.message,
          error: 'INVALID_FILE_TYPE'
        });
      }

      if (error.message.includes('Failed to upload file')) {
        return res.status(500).json({
          success: false,
          message: 'Storage upload failed',
          error: 'STORAGE_ERROR',
          details: error.message
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: 'INTERNAL_ERROR',
        details: error.message
      });
    }
  }

  static async getDocuments(req, res) {
    try {
      const { learningCardId } = req.params;

      // Validar learningCardId
      if (!learningCardId || isNaN(parseInt(learningCardId))) {
        return res.status(400).json({
          success: false,
          message: 'Invalid learning card ID',
          error: 'INVALID_LEARNING_CARD_ID'
        });
      }

      const documents = await LearningCardDocumentService.getDocumentsByLearningCardId(parseInt(learningCardId));

      return res.status(200).json({
        success: true,
        message: 'Documents retrieved successfully',
        data: {
          documents,
          count: documents.length
        }
      });
    } catch (error) {
      console.error('Error in getDocuments controller:', error);

      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: 'INTERNAL_ERROR',
        details: error.message
      });
    }
  }

  static async deleteDocument(req, res) {
    try {
      const { documentId } = req.params;

      // Validar documentId
      if (!documentId || isNaN(parseInt(documentId))) {
        return res.status(400).json({
          success: false,
          message: 'Invalid document ID',
          error: 'INVALID_DOCUMENT_ID'
        });
      }

      const result = await LearningCardDocumentService.deleteDocument(parseInt(documentId));

      return res.status(200).json({
        success: true,
        message: 'Document deleted successfully',
        data: {
          document: result.document,
          storageDeleted: result.storageDeleted
        }
      });
    } catch (error) {
      console.error('Error in deleteDocument controller:', error);

      if (error.message === 'Document not found') {
        return res.status(404).json({
          success: false,
          message: 'Document not found',
          error: 'DOCUMENT_NOT_FOUND'
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: 'INTERNAL_ERROR',
        details: error.message
      });
    }
  }

  static async getDocumentById(req, res) {
    try {
      const { documentId } = req.params;

      // Validar documentId
      if (!documentId || isNaN(parseInt(documentId))) {
        return res.status(400).json({
          success: false,
          message: 'Invalid document ID',
          error: 'INVALID_DOCUMENT_ID'
        });
      }

      const document = await LearningCardDocumentService.getDocumentById(parseInt(documentId));

      if (!document) {
        return res.status(404).json({
          success: false,
          message: 'Document not found',
          error: 'DOCUMENT_NOT_FOUND'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Document retrieved successfully',
        data: {
          document
        }
      });
    } catch (error) {
      console.error('Error in getDocumentById controller:', error);

      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: 'INTERNAL_ERROR',
        details: error.message
      });
    }
  }
}

export default LearningCardDocumentController;

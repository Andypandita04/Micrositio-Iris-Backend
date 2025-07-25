import testingCardDocumentService from '../services/testingCardDocumentService.js';

class TestingCardDocumentController {
  
  async uploadDocument(req, res) {
    try {
      const { testingCardId } = req.params;
      const file = req.file;

      if (!file) {
        return res.status(400).json({
          success: false,
          message: 'No se ha proporcionado ningún archivo'
        });
      }

      if (!testingCardId) {
        return res.status(400).json({
          success: false,
          message: 'ID de testing card requerido'
        });
      }

      const document = await testingCardDocumentService.uploadDocument(file, testingCardId);

      res.status(201).json({
        success: true,
        message: 'Documento subido exitosamente',
        data: document
      });

    } catch (error) {
      console.error('Error al subir documento:', error);
      
      // Manejar error específico de tamaño de archivo
      if (error.message.includes('50MB')) {
        return res.status(413).json({
          success: false,
          message: error.message
        });
      }

      res.status(500).json({
        success: false,
        message: error.message || 'Error interno del servidor'
      });
    }
  }

  async getDocuments(req, res) {
    try {
      const { testingCardId } = req.params;

      if (!testingCardId) {
        return res.status(400).json({
          success: false,
          message: 'ID de testing card requerido'
        });
      }

      const documents = await testingCardDocumentService.getDocumentsByTestingCard(testingCardId);

      res.status(200).json({
        success: true,
        data: documents
      });

    } catch (error) {
      console.error('Error al obtener documentos:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Error interno del servidor'
      });
    }
  }

  async deleteDocument(req, res) {
    try {
      const { documentId } = req.params;

      if (!documentId) {
        return res.status(400).json({
          success: false,
          message: 'ID de documento requerido'
        });
      }

      await testingCardDocumentService.deleteDocument(documentId);

      res.status(200).json({
        success: true,
        message: 'Documento eliminado exitosamente'
      });

    } catch (error) {
      console.error('Error al eliminar documento:', error);
      
      if (error.message.includes('no encontrado')) {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }

      res.status(500).json({
        success: false,
        message: error.message || 'Error interno del servidor'
      });
    }
  }
}

export default new TestingCardDocumentController();

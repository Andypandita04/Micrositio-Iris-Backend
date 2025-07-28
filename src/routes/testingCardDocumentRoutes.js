import express from 'express';
import testingCardDocumentController from '../controllers/testingCardDocumentController.js';
import { upload, handleMulterError } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Subir documento para una testing card
router.post('/testing-card/:testingCardId/documents', 
  upload.single('document'), 
  handleMulterError,
  testingCardDocumentController.uploadDocument
);

// Obtener todos los documentos de una testing card
router.get('/testing-card/:testingCardId/documents', 
  testingCardDocumentController.getDocuments
);

// Eliminar un documento específico
router.delete('/documents/:documentId', 
  testingCardDocumentController.deleteDocument
);

export default router;

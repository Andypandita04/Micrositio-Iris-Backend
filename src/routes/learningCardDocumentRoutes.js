import express from 'express';
import LearningCardDocumentController from '../controllers/learningCardDocumentController.js';
import { upload } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// POST /api/learning-card/:learningCardId/documents - Subir documento
router.post('/:learningCardId/documents', upload.single('document'), LearningCardDocumentController.uploadDocument);

// GET /api/learning-card/:learningCardId/documents - Obtener documentos de una learning card
router.get('/:learningCardId/documents', LearningCardDocumentController.getDocuments);

// GET /api/learning-card/documents/:documentId - Obtener documento específico por ID
router.get('/documents/:documentId', LearningCardDocumentController.getDocumentById);

// DELETE /api/learning-card/documents/:documentId - Eliminar documento
router.delete('/documents/:documentId', LearningCardDocumentController.deleteDocument);

export default router;

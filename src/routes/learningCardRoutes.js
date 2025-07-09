import express from 'express';
import LearningCardController from '../controllers/learningCardController.js';

const router = express.Router();
const learningCardController = new LearningCardController();

// Obtener por testing card
router.get('/t', learningCardController.obtenerPorTestingCard.bind(learningCardController));

// Obtener por learning card ID
router.get('/l', learningCardController.obtenerPorId.bind(learningCardController));

// Obtener todos
router.get('/', learningCardController.obtenerTodos.bind(learningCardController));

// Crear
router.post('/', learningCardController.crear.bind(learningCardController));

// Actualizar
router.patch('/', learningCardController.actualizar.bind(learningCardController));

// Eliminar
router.delete('/', learningCardController.eliminar.bind(learningCardController));

export default router;
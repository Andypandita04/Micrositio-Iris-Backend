// src/routes/testingCardRoutes.js
import express from 'express';
import TestingCardController from '../controllers/testingCardController.js';

const router = express.Router();
const testingCardController = new TestingCardController();

// Obtener por ID
router.get('/t', testingCardController.obtenerPorId.bind(testingCardController));

// Obtener por secuencia
router.get('/s', testingCardController.obtenerPorSecuencia.bind(testingCardController));

// Obtener todos
router.get('/', testingCardController.listarTodos.bind(testingCardController));

// Obtener por padre
router.get('/padre', testingCardController.obtenerPorPadre.bind(testingCardController));

// Crear
router.post('/', testingCardController.crear.bind(testingCardController));

// Actualizar
router.patch('/', testingCardController.actualizar.bind(testingCardController));

// Eliminar
router.delete('/', testingCardController.eliminar.bind(testingCardController));

export default router;
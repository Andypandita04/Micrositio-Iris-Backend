// src/routes/testingCardRoutes.js
import express from 'express';
import TestingCardController from '../controllers/testingCardController.js';

const router = express.Router();
const controller = new TestingCardController();

/**
 * Obtiene una testing card por ID (ID en body)
 */
router.get('/tc', controller.obtenerPorId.bind(controller));

/**
 * Obtiene testing cards por secuencia (ID en body)
 */
router.get('/secuencia', controller.obtenerPorSecuencia.bind(controller));

/**
 * Obtiene todas las testing cards
 */
router.get('/', controller.obtenerTodas.bind(controller));

/**
 * Crea una nueva testing card
 */
router.post('/', controller.crear.bind(controller));

/**
 * Actualiza una testing card (ID en body)
 */
router.patch('/', controller.actualizar.bind(controller));

/**
 * Elimina una testing card (ID en body)
 */
router.delete('/', controller.eliminar.bind(controller));

export default router;
// src/routes/secuenciaRoutes.js
import express from 'express';
import SecuenciaController from '../controllers/secuenciaController.js';

const router = express.Router();
const controller = new SecuenciaController();

/**
 * Obtiene secuencias por proyecto (ID en body)
 */
router.get('/secuencia', controller.obtenerPorProyecto.bind(controller));

/**
 * Obtiene todas las secuencias
 */
router.get('/', controller.obtenerTodas.bind(controller));

/**
 * Crea una nueva secuencia
 */
router.post('/', controller.crear.bind(controller));

/**
 * Actualiza una secuencia (ID en body)
 */
router.patch('/', controller.actualizar.bind(controller));

/**
 * Elimina una secuencia (ID en body)
 */
router.delete('/', controller.eliminar.bind(controller));

export default router;
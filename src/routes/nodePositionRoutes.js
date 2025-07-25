/**
 * Módulo de rutas para node_positions (posiciones de nodos en el flow).
 * @module routes/nodePositionRoutes
 */

import express from 'express';
import NodePositionController from '../controllers/nodePositionController.js';
import validar, { upsertNodePositionSchema } from '../middlewares/validation/nodePositionSchema.js';

const router = express.Router();
const nodePositionController = new NodePositionController();

/**
 * Obtiene todas las posiciones de una secuencia.
 * @name get/flow-positions/:id_secuencia
 * @function
 */
router.get('/:id_secuencia', nodePositionController.obtenerPorSecuencia.bind(nodePositionController));

/**
 * Crea o actualiza la posición de un nodo.
 * @name post/flow-positions
 * @function
 */
router.post('/', validar(upsertNodePositionSchema), nodePositionController.upsert.bind(nodePositionController));

/**
 * Elimina todas las posiciones de una secuencia.
 * @name delete/flow-positions/:id_secuencia
 * @function
 */
router.delete('/:id_secuencia', nodePositionController.eliminarPorSecuencia.bind(nodePositionController));

export default router;
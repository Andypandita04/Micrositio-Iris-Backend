// src/routes/empleadoRoutes.js
/**
 * Módulo de rutas para empleados.
 * @module routes/empleadoRoutes
 */

import express from 'express';
import EmpleadoController from '../controllers/empleadoController.js';

const router = express.Router();
const empleadoController = new EmpleadoController();

/**
 * Ruta GET para obtener un empleado por ID.
 * @name get/empleados/
 * @function
 */
router.post('/', empleadoController.obtenerPorId.bind(empleadoController));

/**
 * Ruta POST para crear un nuevo empleado.
 * @name post/empleados
 * @function
 */
router.post('/', empleadoController.crear.bind(empleadoController));

/**
 * Ruta PATCH para actualizar un empleado existente.
 * @name patch/empleados/
 * @function
 */
router.patch('/', empleadoController.actualizar.bind(empleadoController));

/**
 * Ruta DELETE para desactivar un empleado (eliminación lógica).
 * @name delete/empleados/
 * @function
 */
router.delete('/', empleadoController.desactivar.bind(empleadoController));

/**
 * Ruta GET para obtener todos los empleados.
 * @name get/empleados/todos
 * @function
 */
router.get('/todos', empleadoController.listarTodos.bind(empleadoController));

export default router;
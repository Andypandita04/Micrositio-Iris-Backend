// src/routes/empleadoProyectoRoutes.js
/**
 * Módulo de rutas para empleado_proyecto.
 * @module routes/empleadoProyectoRoutes
 */

import express from 'express';
import EmpleadoProyectoController from '../controllers/empleadoProyectoController.js';

const router = express.Router();
const empleadoProyectoController = new EmpleadoProyectoController();

/**
 * Obtiene empleados asignados a un proyecto.
 * @name get/proyectos/:id_proyecto/empleados
 * @function
 */
router.get('/proyectos/:id_proyecto/empleados', 
  empleadoProyectoController.obtenerPorProyecto.bind(empleadoProyectoController));

/**
 * Crea una nueva relación empleado-proyecto.
 * @name post/empleado-proyecto
 * @function
 */
router.post('/empleado-proyecto', 
  empleadoProyectoController.crear.bind(empleadoProyectoController));

/**
 * Elimina una relación empleado-proyecto.
 * @name delete/empleado-proyecto/:id
 * @function
 */
router.delete('/empleado-proyecto/:id', 
  empleadoProyectoController.eliminar.bind(empleadoProyectoController));

export default router;
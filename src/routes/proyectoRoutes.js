// src/routes/proyectoRoutes.js
/**
 * Módulo de rutas para proyectos.
 * @module routes/proyectoRoutes
 */

import express from 'express';
import ProyectoController from '../controllers/proyectoController.js';

// Crear el router de Express
const router = express.Router();

// Instanciar el controlador de proyectos
const proyectoController = new ProyectoController();

/**
 * Ruta POST para crear un nuevo proyecto.
 * @name post/proyectos
 * @function
 */
router.post('/', proyectoController.crearProyecto.bind(proyectoController));

/**
 * Ruta GET para listar todos los proyectos.
 * @name get/proyectos
 * @function
 */
router.get('/', proyectoController.listarProyectos.bind(proyectoController));

/**
 * Ruta GET para obtener un proyecto específico por ID.
 * @name get/proyectos/:id
 * @function
 */
router.get('/:id', proyectoController.obtenerProyecto.bind(proyectoController));

/**
 * Ruta PATCH para actualizar un proyecto existente.
 * @name patch/proyectos/:id
 * @function
 */
router.patch('/:id', proyectoController.actualizarProyecto.bind(proyectoController));

/**
 * Ruta DELETE para eliminar un proyecto existente.
 * @name delete/proyectos/:id
 * @function
 */
router.delete('/:id', proyectoController.eliminarProyecto.bind(proyectoController));

export default router;
// src/routes/proyectoRoutes.js
import express from 'express';
import ProyectoController from '../controllers/proyectoController.js';

const router = express.Router();
const proyectoController = new ProyectoController();

// Obtener todos los proyectos
router.get('/', proyectoController.listarProyectos.bind(proyectoController));

// Obtener proyecto específico
router.get('/p', proyectoController.obtenerProyecto.bind(proyectoController));

// Crear proyecto
router.post('/', proyectoController.crearProyecto.bind(proyectoController));

// Actualizar proyecto
router.patch('/', proyectoController.actualizarProyecto.bind(proyectoController));

// Eliminar proyecto
router.delete('/', proyectoController.eliminarProyecto.bind(proyectoController));

export default router;
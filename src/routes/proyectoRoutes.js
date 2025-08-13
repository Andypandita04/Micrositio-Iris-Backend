// src/routes/proyectoRoutes.js
import express from 'express';
import ProyectoController from '../controllers/proyectoController.js';
import { authMiddleware, soloEditores } from '../middlewares/authMiddleware.js';

const router = express.Router();
const proyectoController = new ProyectoController();

// Obtener todos los proyectos
router.get('/', authMiddleware, soloEditores, proyectoController.listarProyectos.bind(proyectoController));

// Obtener proyecto específico
router.get('/p', authMiddleware, soloEditores, proyectoController.obtenerProyecto.bind(proyectoController));

router.post('/p', authMiddleware, soloEditores, proyectoController.obtenerProyecto.bind(proyectoController));
// Crear proyecto
router.post('/', authMiddleware, soloEditores, proyectoController.crearProyecto.bind(proyectoController));

// Actualizar proyecto
router.patch('/', authMiddleware, soloEditores, proyectoController.actualizarProyecto.bind(proyectoController));

// Eliminar proyecto
router.delete('/', authMiddleware, soloEditores, proyectoController.eliminarProyecto.bind(proyectoController));

export default router;
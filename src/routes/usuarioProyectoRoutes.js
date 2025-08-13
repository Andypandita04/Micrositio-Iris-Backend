// src/routes/usuarioProyectoRoutes.js
/**
 * Módulo de rutas para usuario_proyecto (relación usuario-proyectos para visitantes).
 * @module routes/usuarioProyectoRoutes
 */

import express from 'express';
import UsuarioProyectoController from '../controllers/usuarioProyectoController.js';
import { authMiddleware, soloEditores } from '../middlewares/authMiddleware.js';

const router = express.Router();
const usuarioProyectoController = new UsuarioProyectoController();

/**
 * @swagger
 * components:
 *   schemas:
 *     UsuarioProyecto:
 *       type: object
 *       properties:
 *         id_usuario:
 *           type: string
 *           format: uuid
 *           description: UUID único del usuario
 *         id_proyecto:
 *           type: integer
 *           minimum: 1
 *           description: ID del proyecto
 *       example:
 *         id_usuario: "123e4567-e89b-12d3-a456-426614174000"
 *         id_proyecto: 1
 * 
 *     UsuarioProyectoCreate:
 *       type: object
 *       required:
 *         - id_usuario
 *         - id_proyecto
 *       properties:
 *         id_usuario:
 *           type: string
 *           format: uuid
 *           description: UUID del usuario
 *         id_proyecto:
 *           type: integer
 *           minimum: 1
 *           description: ID del proyecto
 *       example:
 *         id_usuario: "123e4567-e89b-12d3-a456-426614174000"
 *         id_proyecto: 1
 * 
 *     UsuarioProyectoMultiple:
 *       type: object
 *       required:
 *         - id_usuario
 *         - proyectos
 *       properties:
 *         id_usuario:
 *           type: string
 *           format: uuid
 *           description: UUID del usuario
 *         proyectos:
 *           type: array
 *           items:
 *             type: integer
 *             minimum: 1
 *           minItems: 1
 *           description: Array de IDs de proyectos
 *       example:
 *         id_usuario: "123e4567-e89b-12d3-a456-426614174000"
 *         proyectos: [1, 2, 3]
 * 
 *     ProyectoUsuario:
 *       type: object
 *       properties:
 *         id_proyecto:
 *           type: integer
 *           description: ID del proyecto
 *         nombre_proyecto:
 *           type: string
 *           description: Nombre del proyecto
 *         descripcion:
 *           type: string
 *           description: Descripción del proyecto
 *         fecha_creacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del proyecto
 *         fecha_estimacion_finalizacion:
 *           type: string
 *           format: date-time
 *           description: Fecha estimada de finalización
 *         estado:
 *           type: string
 *           description: Estado del proyecto
 *         categoria:
 *           type: object
 *           properties:
 *             id_categoria:
 *               type: integer
 *             nombre_categoria:
 *               type: string
 * 
 *     UsuarioProyectoResponse:
 *       type: object
 *       properties:
 *         usuario:
 *           type: object
 *           properties:
 *             id_usuario:
 *               type: string
 *               format: uuid
 *             alias:
 *               type: string
 *             tipo:
 *               type: string
 *               enum: [EDITOR, VISITANTE]
 *         proyectos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProyectoUsuario'
 *         total_proyectos:
 *           type: integer
 * 
 *     EstadisticasUsuarioProyecto:
 *       type: object
 *       properties:
 *         total_relaciones:
 *           type: integer
 *           description: Total de relaciones usuario-proyecto
 *         usuarios_unicos:
 *           type: integer
 *           description: Número de usuarios únicos con proyectos asignados
 *         proyectos_unicos:
 *           type: integer
 *           description: Número de proyectos únicos con usuarios asignados
 *         por_tipo_usuario:
 *           type: object
 *           properties:
 *             EDITOR:
 *               type: integer
 *             VISITANTE:
 *               type: integer
 *         promedio_proyectos_por_usuario:
 *           type: string
 *           description: Promedio de proyectos por usuario
 *         promedio_usuarios_por_proyecto:
 *           type: string
 *           description: Promedio de usuarios por proyecto
 * 
 *   responses:
 *     BadRequest:
 *       description: Solicitud inválida
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: false
 *               message:
 *                 type: string
 *                 example: "Datos de solicitud inválidos"
 * 
 *     Unauthorized:
 *       description: No autenticado
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: false
 *               message:
 *                 type: string
 *                 example: "Token de autenticación requerido"
 * 
 *     Forbidden:
 *       description: Sin permisos
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: false
 *               message:
 *                 type: string
 *                 example: "Permisos insuficientes"
 * 
 *     NotFound:
 *       description: Recurso no encontrado
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: false
 *               message:
 *                 type: string
 *                 example: "Recurso no encontrado"
 * 
 *     Conflict:
 *       description: Conflicto - recurso ya existe
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: false
 *               message:
 *                 type: string
 *                 example: "La relación usuario-proyecto ya existe"
 * 
 *     InternalServerError:
 *       description: Error interno del servidor
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: false
 *               message:
 *                 type: string
 *                 example: "Error interno del servidor"
 */

/**
 * @swagger
 * /usuario_proyecto/estadisticas:
 *   get:
 *     summary: Obtiene estadísticas de relaciones usuario-proyecto
 *     tags: [UsuarioProyecto]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estadísticas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/EstadisticasUsuarioProyecto'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// Solo EDITOREs pueden ver estadísticas (información sensible)
router.get('/estadisticas', authMiddleware, soloEditores, usuarioProyectoController.obtenerEstadisticas.bind(usuarioProyectoController));

/**
 * @swagger
 * /usuario_proyecto/usuario/{id_usuario}:
 *   get:
 *     summary: Obtiene proyectos asignados a un usuario específico
 *     tags: [UsuarioProyecto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID del usuario
 *     responses:
 *       200:
 *         description: Proyectos del usuario obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/UsuarioProyectoResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *   delete:
 *     summary: Elimina todas las relaciones de un usuario
 *     tags: [UsuarioProyecto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID del usuario
 *     responses:
 *       200:
 *         description: Relaciones del usuario eliminadas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Se eliminaron 3 relación(es) del usuario"
 *                 data:
 *                   type: object
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/usuario/:id_usuario', authMiddleware, soloEditores, usuarioProyectoController.obtenerPorIdUsuario.bind(usuarioProyectoController));
router.delete('/usuario/:id_usuario', authMiddleware, soloEditores, usuarioProyectoController.eliminarPorUsuario.bind(usuarioProyectoController));

/**
 * @swagger
 * /usuario_proyecto/proyecto/{id_proyecto}:
 *   get:
 *     summary: Obtiene usuarios asignados a un proyecto específico
 *     tags: [UsuarioProyecto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_proyecto
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del proyecto
 *     responses:
 *       200:
 *         description: Usuarios del proyecto obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     proyecto:
 *                       type: object
 *                       properties:
 *                         id_proyecto:
 *                           type: integer
 *                         nombre_proyecto:
 *                           type: string
 *                         descripcion:
 *                           type: string
 *                     usuarios:
 *                       type: array
 *                       items:
 *                         type: object
 *                     total_usuarios:
 *                       type: integer
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/proyecto/:id_proyecto', authMiddleware, soloEditores, usuarioProyectoController.obtenerPorIdProyecto.bind(usuarioProyectoController));

/**
 * @swagger
 * /usuario_proyecto/asignar-multiples:
 *   post:
 *     summary: Asigna múltiples proyectos a un usuario
 *     tags: [UsuarioProyecto]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioProyectoMultiple'
 *     responses:
 *       201:
 *         description: Proyectos asignados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Se asignaron 2 proyecto(s) al usuario"
 *                 data:
 *                   type: object
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/asignar-multiples', authMiddleware, soloEditores, usuarioProyectoController.asignarMultiplesProyectos.bind(usuarioProyectoController));

/**
 * @swagger
 * /usuario_proyecto:
 *   get:
 *     summary: Obtiene todas las relaciones usuario-proyecto
 *     tags: [UsuarioProyecto]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas las relaciones usuario-proyecto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_usuario:
 *                         type: string
 *                         format: uuid
 *                       id_proyecto:
 *                         type: integer
 *                       usuario:
 *                         type: object
 *                         properties:
 *                           alias:
 *                             type: string
 *                           tipo:
 *                             type: string
 *                       proyecto:
 *                         type: object
 *                         properties:
 *                           nombre_proyecto:
 *                             type: string
 *                           descripcion:
 *                             type: string
 *                 total:
 *                   type: integer
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *   post:
 *     summary: Crea una nueva relación usuario-proyecto
 *     tags: [UsuarioProyecto]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioProyectoCreate'
 *     responses:
 *       201:
 *         description: Relación usuario-proyecto creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Relación usuario-proyecto creada exitosamente"
 *                 data:
 *                   type: object
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', authMiddleware, soloEditores, usuarioProyectoController.obtenerTodos.bind(usuarioProyectoController));
router.post('/', authMiddleware, soloEditores, usuarioProyectoController.crear.bind(usuarioProyectoController));

/**
 * @swagger
 * /usuario_proyecto/{id_usuario}/{id_proyecto}:
 *   delete:
 *     summary: Elimina una relación usuario-proyecto específica
 *     tags: [UsuarioProyecto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID del usuario
 *       - in: path
 *         name: id_proyecto
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del proyecto
 *     responses:
 *       200:
 *         description: Relación usuario-proyecto eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Relación usuario-proyecto eliminada exitosamente"
 *                 data:
 *                   $ref: '#/components/schemas/UsuarioProyecto'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete('/:id_usuario/:id_proyecto', authMiddleware, soloEditores, usuarioProyectoController.eliminar.bind(usuarioProyectoController));

export default router;

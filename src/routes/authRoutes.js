// src/routes/authRoutes.js
/**
 * Módulo de rutas para autenticación.
 * @module routes/authRoutes
 */

import express from 'express';
import AuthController from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();
const authController = new AuthController();

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - alias
 *         - password
 *       properties:
 *         alias:
 *           type: string
 *           description: Alias del usuario
 *           example: admin
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *           example: admin123
 * 
 *     LoginResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Login exitoso
 *         data:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               description: Token JWT para autenticación
 *             usuario:
 *               type: object
 *               properties:
 *                 id_usuario:
 *                   type: string
 *                   format: uuid
 *                 alias:
 *                   type: string
 *                 tipo:
 *                   type: string
 *                   enum: [EDITOR, VISITANTE]
 *                 id_empleado:
 *                   type: integer
 *                   nullable: true
 *                 activo:
 *                   type: boolean
 *                 proyectos:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   nullable: true
 * 
 *     RegistroRequest:
 *       type: object
 *       required:
 *         - alias
 *         - password
 *         - tipo
 *       properties:
 *         alias:
 *           type: string
 *           minLength: 3
 *           maxLength: 50
 *           pattern: '^[a-zA-Z0-9_-]+$'
 *         password:
 *           type: string
 *           minLength: 8
 *           maxLength: 100
 *         tipo:
 *           type: string
 *           enum: [EDITOR, VISITANTE]
 *         id_empleado:
 *           type: integer
 *           minimum: 1
 *           description: Requerido para usuarios tipo EDITOR
 * 
 *   responses:
 *     LoginSuccess:
 *       description: Login exitoso
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginResponse'
 *     
 *     Unauthorized:
 *       description: Credenciales inválidas
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
 *                 example: Credenciales inválidas
 * 
 *     BadRequest:
 *       description: Datos inválidos
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
 *                 example: Alias y password son requeridos
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autenticar usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/LoginSuccess'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         description: Error interno del servidor
 */
router.post('/login', authController.login.bind(authController));

/**
 * @swagger
 * /auth/registro:
 *   post:
 *     summary: Registrar nuevo usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistroRequest'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
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
 *                   example: Usuario registrado exitosamente
 *                 data:
 *                   $ref: '#/components/schemas/LoginResponse/properties/data'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         description: Error interno del servidor
 */
router.post('/registro', authController.registro.bind(authController));

/**
 * @swagger
 * /auth/verificar:
 *   get:
 *     summary: Verificar validez del token JWT
 *     tags: [Autenticación]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token válido
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
 *                   example: Token válido
 *                 data:
 *                   type: object
 *                   properties:
 *                     usuario:
 *                       $ref: '#/components/schemas/LoginResponse/properties/data/properties/usuario'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/verificar', authMiddleware, authController.verificarToken.bind(authController));

export default router;

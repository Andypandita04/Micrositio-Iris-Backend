// src/routes/urlTestingCardRoutes.js
import express from 'express';
import UrlTestingCardController from '../controllers/urlTestingCardController.js';

const router = express.Router();
const controller = new UrlTestingCardController();

/**
 * @swagger
 * tags:
 *   name: UrlTestingCard
 *   description: Endpoints para manejar URLs de testing cards
 */

/**
 * @swagger
 * /url_testing_card/t:
 *   get:
 *     summary: Obtiene URLs por testing card
 *     tags: [UrlTestingCard]
 *     parameters:
 *       - in: query
 *         name: id_testing_card
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la testing card
 *     responses:
 *       200:
 *         description: Lista de URLs
 *       404:
 *         description: Testing card no encontrada o sin URLs
 */
router.get('/t', controller.obtenerPorTestingCard.bind(controller));

/**
 * @swagger
 * /url_testing_card/u:
 *   get:
 *     summary: Obtiene una URL por su ID
 *     tags: [UrlTestingCard]
 *     parameters:
 *       - in: query
 *         name: id_url_tc
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la URL
 *     responses:
 *       200:
 *         description: URL encontrada
 *       404:
 *         description: URL no encontrada
 */
router.get('/u', controller.obtenerPorId.bind(controller));

/**
 * @swagger
 * /url_testing_card:
 *   get:
 *     summary: Obtiene todas las URLs
 *     tags: [UrlTestingCard]
 *     responses:
 *       200:
 *         description: Lista de todas las URLs
 */
router.get('/', controller.obtenerTodas.bind(controller));

/**
 * @swagger
 * /url_testing_card:
 *   post:
 *     summary: Crea una nueva URL
 *     tags: [UrlTestingCard]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_testing_card
 *               - url
 *             properties:
 *               id_testing_card:
 *                 type: integer
 *                 description: ID de la testing card
 *               url:
 *                 type: string
 *                 format: uri
 *                 description: URL a asociar
 *     responses:
 *       201:
 *         description: URL creada
 *       404:
 *         description: Testing card no encontrada
 */
router.post('/', controller.crear.bind(controller));

/**
 * @swagger
 * /url_testing_card:
 *   patch:
 *     summary: Actualiza una URL
 *     tags: [UrlTestingCard]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_url_tc
 *             properties:
 *               id_url_tc:
 *                 type: integer
 *                 description: ID de la URL
 *               url:
 *                 type: string
 *                 format: uri
 *                 description: Nueva URL
 *     responses:
 *       200:
 *         description: URL actualizada
 *       404:
 *         description: URL no encontrada
 */
router.patch('/', controller.actualizar.bind(controller));

/**
 * @swagger
 * /url_testing_card:
 *   delete:
 *     summary: Elimina una URL
 *     tags: [UrlTestingCard]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_url_tc
 *             properties:
 *               id_url_tc:
 *                 type: integer
 *                 description: ID de la URL
 *     responses:
 *       204:
 *         description: URL eliminada
 *       404:
 *         description: URL no encontrada
 */
router.delete('/', controller.eliminar.bind(controller));

export default router;

// src/routes/categoriaRoutes.js
/**
 * Módulo de rutas para categorías.
 * @module routes/categoriaRoutes
 */

import express from 'express';
import CategoriaController from '../controllers/categoriaController.js';

const router = express.Router();
const categoriaController = new CategoriaController();

/**
 * Ruta GET para obtener una categoría específica.
 * @name get/categoria
 * @function
 */
router.get('/c', categoriaController.obtenerPorId.bind(categoriaController));

/**
 * Ruta GET para obtener todas las categorías.
 * @name get/categorias
 * @function
 */
router.get('/', categoriaController.obtenerTodas.bind(categoriaController));

/**
 * Ruta POST para crear una nueva categoría.
 * @name post/categoria
 * @function
 */
router.post('/', categoriaController.crear.bind(categoriaController));

/**
 * Ruta PATCH para actualizar una categoría existente.
 * @name patch/categoria
 * @function
 */
router.patch('/', categoriaController.actualizar.bind(categoriaController));

/**
 * Ruta DELETE para eliminar una categoría.
 * @name delete/categoria
 * @function
 */
router.delete('/', categoriaController.eliminar.bind(categoriaController));

export default router;
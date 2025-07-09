// src/controllers/categoriaController.js
/**
 * Controlador para manejar las operaciones CRUD de categorías.
 * @class
 */
import CategoriaService from '../services/categoriaService.js';
import { categoriaCreateSchema, categoriaUpdateSchema } from '../middlewares/validation/categoriaSchema.js';
import ApiError from '../utils/ApiError.js';

class CategoriaController {
  constructor() {
    this.categoriaService = new CategoriaService();
  }

  /**
   * Maneja la obtención de una categoría por ID (GET /categoria).
   * @param {Object} req - Request de Express.
   * @param {Object} res - Response de Express.
   * @param {Function} next - Función para pasar al siguiente middleware.
   */
  async obtenerPorId(req, res, next) {
    try {
      if (!req.body.id_categoria) {
        throw new ApiError('Se requiere el campo "id_categoria" en el body', 400);
      }

      const categoria = await this.categoriaService.obtenerPorId(req.body.id_categoria);
      res.json(categoria);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Maneja la obtención de todas las categorías (GET /categorias).
   * @param {Object} req - Request de Express.
   * @param {Object} res - Response de Express.
   * @param {Function} next - Función para pasar al siguiente middleware.
   */
  async obtenerTodas(req, res, next) {
    try {
      const categorias = await this.categoriaService.obtenerTodas();
      res.json(categorias);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Maneja la creación de una categoría (POST /categoria).
   * @param {Object} req - Request de Express.
   * @param {Object} res - Response de Express.
   * @param {Function} next - Función para pasar al siguiente middleware.
   */
  async crear(req, res, next) {
    try {
      const validatedData = categoriaCreateSchema.parse(req.body);
      const categoria = await this.categoriaService.crear(validatedData);
      res.status(201).json(categoria);
    } catch (error) {
      next(new ApiError(error.message, 400));
    }
  }

  /**
   * Maneja la actualización de una categoría (PATCH /categoria).
   * @param {Object} req - Request de Express.
   * @param {Object} res - Response de Express.
   * @param {Function} next - Función para pasar al siguiente middleware.
   */
  async actualizar(req, res, next) {
    try {
      if (!req.body.id_categoria) {
        throw new ApiError('Se requiere el campo "id_categoria" en el body', 400);
      }

      const { id_categoria, ...updateData } = req.body;
      const validatedData = categoriaUpdateSchema.parse(updateData);
      const categoria = await this.categoriaService.actualizar(id_categoria, validatedData);
      res.json(categoria);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Maneja la eliminación de una categoría (DELETE /categoria).
   * @param {Object} req - Request de Express.
   * @param {Object} res - Response de Express.
   * @param {Function} next - Función para pasar al siguiente middleware.
   */
  async eliminar(req, res, next) {
    try {
      if (!req.body.id_categoria) {
        throw new ApiError('Se requiere el campo "id_categoria" en el body', 400);
      }

      await this.categoriaService.eliminar(req.body.id_categoria);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default CategoriaController;
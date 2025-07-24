// src/controllers/urlLearningCardController.js
import UrlLearningCardService from '../services/urlLearningCardService.js';
import { urlLearningCardCreateSchema, urlLearningCardUpdateSchema } from '../middlewares/validation/urlLearningCardSchema.js';
import ApiError from '../utils/ApiError.js';

class UrlLearningCardController {
  constructor() {
    this.urlService = new UrlLearningCardService();
  }

  /**
   * Obtiene URLs por learning card
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @param {Function} next - Next middleware
   */
  async obtenerPorLearningCard(req, res, next) {
    try {
      const { id_learning_card } = req.query;

      if (!id_learning_card) {
        throw new ApiError('Se requiere el campo id_learning_card en el query', 400);
      }

      const urls = await this.urlService.obtenerPorLearningCard(id_learning_card);
      res.json(urls);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtiene una URL por su ID
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @param {Function} next - Next middleware
   */
  async obtenerPorId(req, res, next) {
    try {
      const { id_url_lc } = req.query;

      if (!id_url_lc) {
        throw new ApiError('Se requiere el campo id_url_lc en el query', 400);
      }

      const url = await this.urlService.obtenerPorId(id_url_lc);
      res.json(url);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtiene todas las URLs
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @param {Function} next - Next middleware
   */
  async obtenerTodas(req, res, next) {
    try {
      const urls = await this.urlService.obtenerTodas();
      res.json(urls);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Crea una nueva URL
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @param {Function} next - Next middleware
   */
  async crear(req, res, next) {
    try {
      const validatedData = urlLearningCardCreateSchema.parse(req.body);
      const url = await this.urlService.crear(validatedData);
      res.status(201).json(url);
    } catch (error) {
      next(new ApiError(error.message, 400));
    }
  }

  /**
   * Actualiza una URL
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @param {Function} next - Next middleware
   */
  async actualizar(req, res, next) {
    try {
      if (!req.body.id_url_lc) {
        throw new ApiError('Se requiere el campo id_url_lc en el body', 400);
      }

      const { id_url_lc, ...updateData } = req.body;
      const validatedData = urlLearningCardUpdateSchema.parse(updateData);
      const url = await this.urlService.actualizar(id_url_lc, validatedData);
      res.json(url);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Elimina una URL
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @param {Function} next - Next middleware
   */
  async eliminar(req, res, next) {
    try {
      if (!req.body.id_url_lc) {
        throw new ApiError('Se requiere el campo id_url_lc en el body', 400);
      }

      await this.urlService.eliminar(req.body.id_url_lc);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default UrlLearningCardController;

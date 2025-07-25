// src/controllers/urlTestingCardController.js
import UrlTestingCardService from '../services/urlTestingCardService.js';
import { urlTestingCardCreateSchema, urlTestingCardUpdateSchema } from '../middlewares/validation/urlTestingCardSchema.js';
import ApiError from '../utils/ApiError.js';

class UrlTestingCardController {
  constructor() {
    this.urlService = new UrlTestingCardService();
  }

  /**
   * Obtiene URLs por testing card
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @param {Function} next - Next middleware
   */
  async obtenerPorTestingCard(req, res, next) {
    try {
      const { id_testing_card } = req.query;

      if (!id_testing_card) {
        throw new ApiError('Se requiere el campo id_testing_card en el query', 400);
      }

      const urls = await this.urlService.obtenerPorTestingCard(id_testing_card);
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
      const { id_url_tc } = req.query;

      if (!id_url_tc) {
        throw new ApiError('Se requiere el campo id_url_tc en el query', 400);
      }

      const url = await this.urlService.obtenerPorId(id_url_tc);
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
      const validatedData = urlTestingCardCreateSchema.parse(req.body);
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
      if (!req.body.id_url_tc) {
        throw new ApiError('Se requiere el campo id_url_tc en el body', 400);
      }

      const { id_url_tc, ...updateData } = req.body;
      const validatedData = urlTestingCardUpdateSchema.parse(updateData);
      const url = await this.urlService.actualizar(id_url_tc, validatedData);
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
      if (!req.body.id_url_tc) {
        throw new ApiError('Se requiere el campo id_url_tc en el body', 400);
      }

      await this.urlService.eliminar(req.body.id_url_tc);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default UrlTestingCardController;

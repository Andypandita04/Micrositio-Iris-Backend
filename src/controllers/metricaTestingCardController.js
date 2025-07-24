// src/controllers/metricaTestingCardController.js
import MetricaTestingCardService from '../services/metricaTestingCardService.js';
import { metricaCreateSchema, metricaUpdateSchema } from '../middlewares/validation/metricaTestingCardSchema.js';
import ApiError from '../utils/ApiError.js';

class MetricaTestingCardController {
  constructor() {
    this.metricaService = new MetricaTestingCardService();
  }

  /**
   * Obtiene métricas por testing card
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

      const metricas = await this.metricaService.obtenerPorTestingCard(id_testing_card);
      res.json(metricas);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtiene una métrica por su ID
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @param {Function} next - Next middleware
   */
  async obtenerPorId(req, res, next) {
    try {
      const { id_metrica_testing_card } = req.query;

      if (!id_metrica_testing_card) {
        throw new ApiError('Se requiere el campo id_metrica_testing_card en el query', 400);
      }

      const metrica = await this.metricaService.obtenerPorId(id_metrica_testing_card);
      res.json(metrica);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtiene todas las métricas
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @param {Function} next - Next middleware
   */
  async obtenerTodas(req, res, next) {
    try {
      const metricas = await this.metricaService.obtenerTodas();
      res.json(metricas);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Crea una nueva métrica
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @param {Function} next - Next middleware
   */
  async crear(req, res, next) {
    try {
      const validatedData = metricaCreateSchema.parse(req.body);
      const metrica = await this.metricaService.crear(validatedData);
      res.status(201).json(metrica);
    } catch (error) {
      next(new ApiError(error.message, 400));
    }
  }

  /**
   * Actualiza una métrica
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @param {Function} next - Next middleware
   */
  async actualizar(req, res, next) {
    try {
      if (!req.body.id_metrica_testing_card) {
        throw new ApiError('Se requiere el campo id_metrica_testing_card en el body', 400);
      }

      const { id_metrica_testing_card, ...updateData } = req.body;
      const validatedData = metricaUpdateSchema.parse(updateData);
      const metrica = await this.metricaService.actualizar(id_metrica_testing_card, validatedData);
      res.json(metrica);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Elimina una métrica
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @param {Function} next - Next middleware
   */
  async eliminar(req, res, next) {
    try {
      if (!req.body.id_metrica_testing_card) {
        throw new ApiError('Se requiere el campo id_metrica_testing_card en el body', 400);
      }

      await this.metricaService.eliminar(req.body.id_metrica_testing_card);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default MetricaTestingCardController;
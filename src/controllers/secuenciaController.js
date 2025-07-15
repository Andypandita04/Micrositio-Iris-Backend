// src/controllers/secuenciaController.js
import SecuenciaService from '../services/secuenciaService.js';
import SecuenciaRepository from '../repositories/secuenciaRepository.js';
import ProyectoRepository from '../repositories/proyectoRepository.js';
import TestingCardRepository from '../repositories/testingCardRepository.js';
import ExperimentoTipoRepository from '../repositories/experimentoTipoRepository.js';
import Secuencia from '../models/Secuencia.js';
import { secuenciaCreateSchema, secuenciaUpdateSchema } from '../middlewares/validation/secuenciaSchema.js';
import ApiError from '../utils/ApiError.js';

class SecuenciaController {
  constructor() {
    const secuenciaRepository = new SecuenciaRepository();
    const proyectoRepository = new ProyectoRepository();
    const testingCardRepository = new TestingCardRepository();
    const experimentoTipoRepository = new ExperimentoTipoRepository(); // <-- Agrega esto

    this.secuenciaService = new SecuenciaService(
      secuenciaRepository,
      proyectoRepository,
      testingCardRepository,
      experimentoTipoRepository // <-- Y pásalo aquí
    );
  }

  /**
   * Obtiene secuencias por proyecto
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @param {Function} next - Next middleware
   */
  async obtenerPorProyecto(req, res, next) {
    try {
      // Leer desde query params en lugar de body
      const id_proyecto = Number(req.query.id_proyecto);

      if (!id_proyecto) {
        throw new ApiError('Se requiere el parámetro "id_proyecto"', 400);
      }

      const secuencias = await this.secuenciaService.obtenerPorProyecto(id_proyecto);
      res.json(secuencias);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtiene una secuencia por su ID
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @param {Function} next - Next middleware
   */
  async obtenerPorId(req, res, next) {
    try {
      if (!req.body.id_secuencia) {
        throw new ApiError('Se requiere el campo "id_secuencia" en el body', 400);
      }

      const secuencia = await this.secuenciaService.obtenerPorId(req.body.id_secuencia);
      res.json(secuencia);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtiene todas las secuencias
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @param {Function} next - Next middleware
   */
  async obtenerTodas(req, res, next) {
    try {
      const secuencias = await this.secuenciaService.obtenerTodas();
      res.json(secuencias);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Crea una nueva secuencia y automáticamente crea una testing card asociada
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @param {Function} next - Next middleware
   */
  async crear(req, res, next) {
    try {
      const validatedData = secuenciaCreateSchema.parse(req.body);
      
      // 🔥 NUEVO: Crear secuencia Y testing card en una sola operación
      const resultado = await this.secuenciaService.crearConTestingCard(validatedData);
      
      res.status(201).json(resultado);
    } catch (error) {
      next(new ApiError(error.message, 400));
    }
  }

  /**
   * Actualiza una secuencia existente
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @param {Function} next - Next middleware
   */
  async actualizar(req, res, next) {
    try {
      if (!req.body.id_secuencia) {
        throw new ApiError('Se requiere el campo "id_secuencia" en el body', 400);
      }

      const { id_secuencia, ...updateData } = req.query;
      const validatedData = secuenciaUpdateSchema.parse(updateData);
      const secuencia = await this.secuenciaService.actualizar(id_secuencia, validatedData);
      res.json(secuencia);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Elimina una secuencia
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @param {Function} next - Next middleware
   */
  async eliminar(req, res, next) {
    try {
      if (!req.body.id_secuencia) {
        throw new ApiError('Se requiere el campo "id_secuencia" en el body', 400);
      }

      await this.secuenciaService.eliminar(req.body.id_secuencia);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default SecuenciaController;
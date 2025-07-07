// src/controllers/secuenciaController.js
import SecuenciaService from '../services/secuenciaService.js';
import { secuenciaCreateSchema, secuenciaUpdateSchema } from '../middlewares/validation/secuenciaSchema.js';
import ApiError from '../utils/ApiError.js';

class SecuenciaController {
  constructor() {
    this.secuenciaService = new SecuenciaService();
  }

  /**
   * Obtiene secuencias por proyecto
   */
  async obtenerPorProyecto(req, res, next) {
    try {
      if (!req.body.id_proyecto) {
        throw new ApiError('Se requiere el campo id_proyecto', 400);
      }

      const secuencias = await this.secuenciaService.obtenerPorProyecto(req.body.id_proyecto);
      res.json(secuencias);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtiene todas las secuencias
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
   * Crea una nueva secuencia
   */
  async crear(req, res, next) {
    try {
      const validatedData = secuenciaCreateSchema.parse(req.body);
      const secuencia = await this.secuenciaService.crear(validatedData);
      res.status(201).json(secuencia);
    } catch (error) {
      next(new ApiError(error.message, 400));
    }
  }

  /**
   * Actualiza una secuencia
   */
  async actualizar(req, res, next) {
    try {
      if (!req.body.id_secuencia) {
        throw new ApiError('Se requiere el campo id_secuencia', 400);
      }

      const { id_secuencia, ...updateData } = req.body;
      const validatedData = secuenciaUpdateSchema.parse(updateData);
      
      const secuencia = await this.secuenciaService.actualizar(id_secuencia, validatedData);
      res.json(secuencia);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Elimina una secuencia
   */
  async eliminar(req, res, next) {
    try {
      if (!req.body.id_secuencia) {
        throw new ApiError('Se requiere el campo id_secuencia', 400);
      }

      await this.secuenciaService.eliminar(req.body.id_secuencia);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default SecuenciaController;
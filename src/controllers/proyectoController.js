// src/controllers/proyectoController.js
import ProyectoService from '../services/proyectoService.js';
import { proyectoCreateSchema, proyectoUpdateSchema } from '../middlewares/validation/proyectoSchema.js';
import ApiError from '../utils/ApiError.js';

class ProyectoController {
  constructor() {
    this.proyectoService = new ProyectoService();
  }

  /**
   * Obtiene un proyecto por su ID
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @param {Function} next - Next middleware
   */
  async obtenerProyecto(req, res, next) {
    try {
      if (!req.body.id_proyecto) {
        throw new ApiError('Se requiere el campo "id_proyecto" en el body', 400);
      }

      const proyecto = await this.proyectoService.obtenerProyecto(req.body.id_proyecto);
      res.json(proyecto);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Crea un nuevo proyecto
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @param {Function} next - Next middleware
   */
  async crearProyecto(req, res, next) {
    try {
      const validatedData = proyectoCreateSchema.parse(req.body);
      const proyecto = await this.proyectoService.crearProyecto(validatedData);
      res.status(201).json(proyecto);
    } catch (error) {
      next(error);
    }
    
  }

  /**
   * Actualiza un proyecto existente
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @param {Function} next - Next middleware
   */
  async actualizarProyecto(req, res, next) {
    try {
      if (!req.body.id_proyecto) {
        throw new ApiError('Se requiere el campo "id_proyecto" en el body', 400);
      }

      const { id_proyecto, ...updateData } = req.body;
      const validatedData = proyectoUpdateSchema.parse(updateData);
      const proyecto = await this.proyectoService.actualizarProyecto(id_proyecto, validatedData);
      res.json(proyecto);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Elimina un proyecto
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @param {Function} next - Next middleware
   */
  async eliminarProyecto(req, res, next) {
    try {
      if (!req.body.id_proyecto) {
        throw new ApiError('Se requiere el campo "id_proyecto" en el body', 400);
      }

      await this.proyectoService.eliminarProyecto(req.body.id_proyecto);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }

  /**
   * Lista todos los proyectos
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @param {Function} next - Next middleware
   */
  async listarProyectos(req, res, next) {
    try {
      const proyectos = await this.proyectoService.listarProyectos();
      res.json(proyectos);
    } catch (error) {
      next(error);
    }
  }
}

export default ProyectoController;
// src/controllers/empleadoProyectoController.js
/**
 * Controlador para manejar operaciones de empleado_proyecto.
 * @class
 */
import EmpleadoProyectoService from '../services/empleadoProyectoService.js';
import EmpleadoProyectoRepository from '../repositories/empleadoProyectoRepository.js';
import ProyectoRepository from '../repositories/proyectoRepository.js';
import EmpleadoRepository from '../repositories/empleadoRepository.js';
import ApiError from '../utils/ApiError.js';
import { empleadoProyectoCreateSchema } from '../middlewares/validation/empleadoProyectoSchema.js';

class EmpleadoProyectoController {
  constructor() {
    const empleadoProyectoRepo = new EmpleadoProyectoRepository();
    const proyectoRepo = new ProyectoRepository();
    const empleadoRepo = new EmpleadoRepository();
    
    this.empleadoProyectoService = new EmpleadoProyectoService(
      empleadoProyectoRepo,
      proyectoRepo,
      empleadoRepo
    );
  }

  /**
   * Obtiene empleados asignados a un proyecto.
   * @async
   * @param {Object} req - Request de Express.
   * @param {Object} res - Response de Express.
   * @param {Function} next - Next middleware.
   */
  async obtenerPorProyecto(req, res, next) {
    try {
      const empleadosProyecto = await this.empleadoProyectoService.obtenerPorProyecto(
        req.params.id_proyecto
      );
      
      if (!empleadosProyecto || empleadosProyecto.length === 0) {
        return res.status(200).json([]);
      }
      
      res.json(empleadosProyecto.map(ep => ep.toAPI()));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Crea una nueva relación empleado-proyecto.
   * @async
   * @param {Object} req - Request de Express.
   * @param {Object} res - Response de Express.
   * @param {Function} next - Next middleware.
   */
  async crear(req, res, next) {
    try {
      const validatedData = empleadoProyectoCreateSchema.parse(req.body);
      const nuevaRelacion = await this.empleadoProyectoService.crear(validatedData);
      
      res.status(201).json(nuevaRelacion.toAPI());
    } catch (error) {
      next(error);
    }
  }

  /**
   * Elimina una relación empleado-proyecto.
   * @async
   * @param {Object} req - Request de Express.
   * @param {Object} res - Response de Express.
   * @param {Function} next - Next middleware.
   */
  async eliminar(req, res, next) {
    try {
      await this.empleadoProyectoService.eliminar(req.params.id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default EmpleadoProyectoController;
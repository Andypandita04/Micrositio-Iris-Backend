// src/controllers/usuarioProyectoController.js
/**
 * Controlador para manejar las operaciones CRUD de usuario_proyecto.
 * @class
 */
import UsuarioProyectoService from '../services/usuarioProyectoService.js';
import { usuarioProyectoCreateSchema, usuarioProyectoMultipleSchema, usuarioIdParamSchema } from '../middlewares/validation/usuarioProyectoSchema.js';
import ApiError from '../utils/ApiError.js';

class UsuarioProyectoController {
  constructor() {
    this.usuarioProyectoService = new UsuarioProyectoService();
  }

  /**
   * Obtiene todas las relaciones usuario-proyecto.
   * GET /usuario_proyecto
   * @param {Object} req - Request de Express.
   * @param {Object} res - Response de Express.
   * @param {Function} next - Función para pasar al siguiente middleware.
   */
  async obtenerTodos(req, res, next) {
    try {
      const relaciones = await this.usuarioProyectoService.obtenerTodos();
      
      res.json({
        success: true,
        data: relaciones,
        total: relaciones.length
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtiene proyectos asignados a un usuario específico.
   * GET /usuario_proyecto/usuario/:id_usuario
   * @param {Object} req - Request de Express.
   * @param {Object} res - Response de Express.
   * @param {Function} next - Función para pasar al siguiente middleware.
   */
  async obtenerPorIdUsuario(req, res, next) {
    try {
      const { id_usuario } = req.params;
      
      // Validar UUID
      usuarioIdParamSchema.parse({ id_usuario });
      
      const resultado = await this.usuarioProyectoService.obtenerPorIdUsuario(id_usuario);
      
      res.json({
        success: true,
        data: resultado
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtiene usuarios asignados a un proyecto específico.
   * GET /usuario_proyecto/proyecto/:id_proyecto
   * @param {Object} req - Request de Express.
   * @param {Object} res - Response de Express.
   * @param {Function} next - Función para pasar al siguiente middleware.
   */
  async obtenerPorIdProyecto(req, res, next) {
    try {
      const id_proyecto = parseInt(req.params.id_proyecto);
      
      if (!id_proyecto || id_proyecto <= 0) {
        throw new ApiError('ID de proyecto inválido', 400);
      }

      const resultado = await this.usuarioProyectoService.obtenerPorIdProyecto(id_proyecto);
      
      res.json({
        success: true,
        data: resultado
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Crea una nueva relación usuario-proyecto.
   * POST /usuario_proyecto
   * @param {Object} req - Request de Express.
   * @param {Object} res - Response de Express.
   * @param {Function} next - Función para pasar al siguiente middleware.
   */
  async crear(req, res, next) {
    try {
      const validatedData = usuarioProyectoCreateSchema.parse(req.body);
      const resultado = await this.usuarioProyectoService.crear(validatedData);
      
      res.status(201).json({
        success: true,
        message: 'Relación usuario-proyecto creada exitosamente',
        data: resultado
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Asigna múltiples proyectos a un usuario.
   * POST /usuario_proyecto/asignar-multiples
   * @param {Object} req - Request de Express.
   * @param {Object} res - Response de Express.
   * @param {Function} next - Función para pasar al siguiente middleware.
   */
  async asignarMultiplesProyectos(req, res, next) {
    try {
      const validatedData = usuarioProyectoMultipleSchema.parse(req.body);
      const { id_usuario, proyectos } = validatedData;
      
      const resultado = await this.usuarioProyectoService.asignarMultiplesProyectos(id_usuario, proyectos);
      
      res.status(201).json({
        success: true,
        message: `Se asignaron ${resultado.proyectos_asignados} proyecto(s) al usuario`,
        data: resultado
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Elimina una relación usuario-proyecto específica.
   * DELETE /usuario_proyecto/:id_usuario/:id_proyecto
   * @param {Object} req - Request de Express.
   * @param {Object} res - Response de Express.
   * @param {Function} next - Función para pasar al siguiente middleware.
   */
  async eliminar(req, res, next) {
    try {
      const { id_usuario } = req.params;
      const id_proyecto = parseInt(req.params.id_proyecto);
      
      // Validar UUID
      usuarioIdParamSchema.parse({ id_usuario });
      
      if (!id_proyecto || id_proyecto <= 0) {
        throw new ApiError('ID de proyecto inválido', 400);
      }

      const resultado = await this.usuarioProyectoService.eliminar(id_usuario, id_proyecto);
      
      res.json({
        success: true,
        message: 'Relación usuario-proyecto eliminada exitosamente',
        data: resultado
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Elimina todas las relaciones de un usuario.
   * DELETE /usuario_proyecto/usuario/:id_usuario
   * @param {Object} req - Request de Express.
   * @param {Object} res - Response de Express.
   * @param {Function} next - Función para pasar al siguiente middleware.
   */
  async eliminarPorUsuario(req, res, next) {
    try {
      const { id_usuario } = req.params;
      
      // Validar UUID
      usuarioIdParamSchema.parse({ id_usuario });
      
      const resultado = await this.usuarioProyectoService.eliminarPorUsuario(id_usuario);
      
      res.json({
        success: true,
        message: `Se eliminaron ${resultado.proyectos_desasignados} relación(es) del usuario`,
        data: resultado
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtiene estadísticas de relaciones usuario-proyecto.
   * GET /usuario_proyecto/estadisticas
   * @param {Object} req - Request de Express.
   * @param {Object} res - Response de Express.
   * @param {Function} next - Función para pasar al siguiente middleware.
   */
  async obtenerEstadisticas(req, res, next) {
    try {
      const estadisticas = await this.usuarioProyectoService.obtenerEstadisticas();
      
      res.json({
        success: true,
        data: estadisticas
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UsuarioProyectoController;

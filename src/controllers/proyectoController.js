/**
 * Controlador para manejar las operaciones CRUD de proyectos.
 * @class
 */
import ProyectoService from '../services/proyectoService.js';
import ProyectoRepository from '../repositories/proyectoRepository.js';
import { proyectoCreateSchema, proyectoUpdateSchema } from '../middlewares/validation/proyectoSchema.js';
import ApiError from '../utils/ApiError.js';
class ProyectoController {
  /**
   * Crea una instancia del controlador.
   * Inicializa el servicio de proyectos.
   */
  constructor() {
    /**
     * Instancia del servicio de proyectos.
     * @type {ProyectoService}
     
    this.proyectoService = new ProyectoService();*/

      const proyectoRepository = new ProyectoRepository();
      this.proyectoService = new ProyectoService(proyectoRepository);
  }
  
  /**
   * Maneja la creación de un proyecto (POST /proyectos).
   * @param {Object} req - Request de Express.
   * @param {Object} res - Response de Express.
   * @param {Function} next - Función para pasar al siguiente middleware.
   */
  async crearProyecto(req, res, next) {
    try {
      // Validar los datos de entrada con Zod
      const validatedData = proyectoCreateSchema.parse(req.body);
      
      // Crear el proyecto usando el servicio
      const proyecto = await this.proyectoService.crearProyecto(validatedData);
      
      // Responder con el proyecto creado
      res.status(201).json(proyecto);
    } catch (error) {
      // Pasar el error al middleware de manejo de errores
      next(new ApiError(error.message, 400));
    }
  }

  /**
   * Maneja la obtención de un proyecto (GET /proyectos/).
   * @param {Object} req - Request de Express.
   * @param {Object} res - Response de Express.
   */
  async obtenerProyecto(req, res, next) {
    try {
      if (!req.body || !req.body.id_proyecto) {
        throw new ApiError('Se requiere el campo "id_proyecto" en el body', 400);
      }

      // Convertir el ID a número entero
      const idProyecto = parseInt(req.body.id_proyecto);

      if (isNaN(idProyecto)) {
            throw new ApiError('El ID debe ser un número válido', 400);
      }

      // Obtener el proyecto usando el servicio
      const proyecto = await this.proyectoService.obtenerProyecto(idProyecto);
      
      // Si no se encuentra el proyecto, lanzar error 404

      
      // Responder con el proyecto encontrado
      res.json(proyecto);
    } catch (error) {
      next(error);
    }
  }


  /**
   * Maneja la actualización de un proyecto existente.
   * @async
   * @param {Object} req - Objeto de solicitud Express.
   * @param {Object} res - Objeto de respuesta Express.
   * @param {Function} next - Función para pasar al siguiente middleware.
   */
  async actualizarProyecto(req, res, next) {
    try {
      
      if (!req.body.id_proyecto) {
              throw new ApiError('Se requiere el campo "id_proyecto" en el body', 400);
      }
      const { id_proyecto, ...updateData } = req.body;
      // Validar los datos de entrada con Zod
      const validatedData = proyectoUpdateSchema.parse(updateData);
      // Actualizar el proyecto usando el servicio
      const proyecto = await this.proyectoService.actualizarProyecto(
        id_proyecto,
        validatedData
      );
      
      // Responder con el proyecto actualizado
      res.json(proyecto);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Maneja la eliminación de un proyecto existente.
   * @async
   * @param {Object} req - Objeto de solicitud Express.
   * @param {Object} res - Objeto de respuesta Express.
   * @param {Function} next - Función para pasar al siguiente middleware.
   */
  async eliminarProyecto(req, res, next) {
    try {
      if (!req.body |!req.body.id_proyecto) {
              throw new ApiError('Se requiere el campo "id_proyecto" en el body', 400);
      }

      const idProyecto = parseInt(req.params.id_proyecto);

      if (isNaN(idProyecto)) {
        throw new ApiError('El ID debe ser un número válido', 400);
      }

      // Eliminar el proyecto usando el servicio
      await this.proyectoService.eliminarProyecto(idProyecto);
      
      // Responder sin contenido (204)
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }

  /**
   * Maneja el listado de proyectos, con filtrado opcional por estado.
   * @async
   * @param {Object} req - Objeto de solicitud Express.
   * @param {Object} res - Objeto de respuesta Express.
   * @param {Function} next - Función para pasar al siguiente middleware.
   */
  async listarProyectos(req, res, next) {
    try {
      // Obtener el parámetro de estado si existe
      const { estado } = req.query;
      
      // Listar proyectos usando el servicio
      const proyectos = await this.proyectoService.listarProyectos(estado);
      
      // Responder con la lista de proyectos
      res.json(proyectos);
    } catch (error) {
      next(error);
    }
  }
}

export default ProyectoController;
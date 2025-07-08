// src/services/empleadoProyectoService.js
/**
 * Servicio para manejar la lógica de negocio de empleado_proyecto.
 * @class
 */
import EmpleadoProyectoRepository from '../repositories/empleadoProyectoRepository.js';
import ProyectoRepository from '../repositories/proyectoRepository.js';
import EmpleadoRepository from '../repositories/empleadoRepository.js';
import ApiError from '../utils/ApiError.js';
import EmpleadoProyecto from '../models/EmpleadoProyecto.js';

class EmpleadoProyectoService {
  /**
   * @param {EmpleadoProyectoRepository} empleadoProyectoRepository
   * @param {ProyectoRepository} proyectoRepository
   * @param {EmpleadoRepository} empleadoRepository
   */
  constructor(
    empleadoProyectoRepository,
    proyectoRepository,
    empleadoRepository
  ) {
    this.empleadoProyectoRepo = empleadoProyectoRepository;
    this.proyectoRepo = proyectoRepository;
    this.empleadoRepo = empleadoRepository;
  }

  /**
   * Obtiene todos los empleados asignados a un proyecto.
   * @async
   * @param {number} id_proyecto - ID del proyecto.
   * @returns {Promise<Array>} Lista de relaciones empleado-proyecto.
   * @throws {ApiError} Si el proyecto no existe o hay un error.
   */
  async obtenerPorProyecto(id_proyecto) {
    // Verificar que el proyecto exista
    const proyecto = await this.proyectoRepo.obtenerProyectoPorId(id_proyecto);
    if (!proyecto) {
      throw new ApiError('Proyecto no encontrado', 404);
    }

    return this.empleadoProyectoRepo.obtenerPorProyecto(id_proyecto);
  }

  /**
   * Crea una nueva relación empleado-proyecto.
   * @async
   * @param {Object} empleadoProyectoData - Datos de la relación.
   * @returns {Promise<Object>} Relación creada.
   * @throws {ApiError} Si empleado o proyecto no existen, o hay error.
   */
  async crear(empleadoProyectoData) {
    // Validar datos de entrada
    const datosValidados = EmpleadoProyecto.validateCreate(empleadoProyectoData);

    // Verificar que el empleado exista
    const empleado = await this.empleadoRepo.obtenerPorId(datosValidados.id_empleado);
    if (!empleado) {
      throw new ApiError('Empleado no encontrado', 404);
    }

    // Verificar que el proyecto exista
    const proyecto = await this.proyectoRepo.obtenerProyectoPorId(datosValidados.id_proyecto);
    if (!proyecto) {
      throw new ApiError('Proyecto no encontrado', 404);
    }

    return this.empleadoProyectoRepo.crear(datosValidados);
  }

  /**
   * Elimina una relación empleado-proyecto.
   * @async
   * @param {number} id - ID de la relación a eliminar.
   * @returns {Promise<Object>} Relación eliminada.
   * @throws {ApiError} Si la relación no existe o hay error.
   */
  async eliminar(id) {
    return this.empleadoProyectoRepo.eliminar(id);
  }
}

export default EmpleadoProyectoService;
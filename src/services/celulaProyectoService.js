// src/services/celulaProyectoService.js
/**
 * Servicio para manejar la lógica de negocio de célula_proyecto.
 * @class
 */
import CelulaProyectoRepository from '../repositories/celulaProyectoRepository.js';
import ApiError from '../utils/ApiError.js';

class CelulaProyectoService {
  constructor() {
    this.celulaProyectoRepo = new CelulaProyectoRepository();
  }

  /**
   * Obtiene relaciones por ID de empleado.
   * @async
   * @param {number} idEmpleado - ID del empleado.
   * @returns {Promise<Array>} Lista de relaciones.
   * @throws {ApiError} Si el empleado no existe o hay error.
   */
  async obtenerPorEmpleado(idEmpleado) {
    if (!idEmpleado) {
      throw new ApiError('Se requiere el ID del empleado', 400);
    }

    const relaciones = await this.celulaProyectoRepo.obtenerPorEmpleado(idEmpleado);
    return relaciones.map(rel => rel.toAPI());
  }

  /**
   * Obtiene relaciones por ID de proyecto.
   * @async
   * @param {number} idProyecto - ID del proyecto.
   * @returns {Promise<Array>} Lista de relaciones.
   * @throws {ApiError} Si el proyecto no existe o hay error.
   */
  async obtenerPorProyecto(idProyecto) {
    if (!idProyecto) {
      throw new ApiError('Se requiere el ID del proyecto', 400);
    }

    const relaciones = await this.celulaProyectoRepo.obtenerPorProyecto(idProyecto);
    return relaciones.map(rel => rel.toAPI());
  }

  /**
   * Obtiene todas las relaciones célula-proyecto.
   * @async
   * @returns {Promise<Array>} Lista de relaciones.
   * @throws {ApiError} Si hay error al consultar.
   */
  async obtenerTodos() {
    const relaciones = await this.celulaProyectoRepo.obtenerTodos();
    return relaciones.map(rel => rel.toAPI());
  }

  /**
   * Crea una nueva relación célula-proyecto.
   * @async
   * @param {Object} celulaProyectoData - Datos de la relación.
   * @returns {Promise<Object>} Relación creada.
   * @throws {ApiError} Si hay error al crear.
   */
  async crear(celulaProyectoData) {
    const relacionesExistentes = await this.celulaProyectoRepo.obtenerTodos();
    const existe = relacionesExistentes.some(
      rel => rel.id_empleado === celulaProyectoData.id_empleado && 
             rel.id_proyecto === celulaProyectoData.id_proyecto
    );

    if (existe) {
      throw new ApiError('Esta relación ya existe', 400);
    }

    const nuevaRelacion = await this.celulaProyectoRepo.crear(celulaProyectoData);
    return nuevaRelacion.toAPI();
  }

  /**
   * Elimina una relación célula-proyecto.
   * @async
   * @param {number} id - ID de la relación a eliminar.
   * @returns {Promise<Object>} Relación eliminada.
   * @throws {ApiError} Si la relación no existe o hay error.
   */
  async eliminar(id) {
    if (!id) {
      throw new ApiError('Se requiere el ID de la relación', 400);
    }

    const relacionEliminada = await this.celulaProyectoRepo.eliminar(id);
    return relacionEliminada.toAPI();
  }

  /**
   * Actualiza el estado activo de una relación célula-proyecto.
   * @async
   * @param {number} id - ID de la relación a actualizar.
   * @param {boolean} activo - Nuevo estado activo.
   * @returns {Promise<Object>} Relación actualizada.
   * @throws {ApiError} Si la relación no existe o hay error.
   */
  async actualizarActivo(id, activo) {
    if (!id) {
      throw new ApiError('Se requiere el ID de la relación', 400);
    }

    const relacionActualizada = await this.celulaProyectoRepo.actualizarActivo(id, activo);
    return relacionActualizada.toAPI();
  }
}

export default CelulaProyectoService;
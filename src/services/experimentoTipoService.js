// src/services/experimentoTipoService.js
/**
 * Servicio para manejar la lógica de negocio de experimento_tipo.
 * @class
 */
import ExperimentoTipoRepository from '../repositories/experimentoTipoRepository.js';
import ApiError from '../utils/ApiError.js';

class ExperimentoTipoService {
  constructor() {
    this.experimentoTipoRepo = new ExperimentoTipoRepository();
  }

  /**
   * Obtiene un tipo de experimento por su ID.
   * @async
   * @param {number} id - ID del tipo de experimento.
   * @returns {Promise<Object>} Tipo de experimento encontrado.
   * @throws {ApiError} Si el tipo de experimento no existe.
   */
  async obtenerPorId(id) {
    const experimentoTipo = await this.experimentoTipoRepo.obtenerPorId(id);
    
    if (!experimentoTipo) {
      throw new ApiError('Tipo de experimento no encontrado', 404);
    }
    
    return experimentoTipo.toAPI();
  }

  /**
   * Obtiene todos los tipos de experimento.
   * @async
   * @returns {Promise<Array>} Lista de tipos de experimento.
   */
  async obtenerTodos() {
    const tipos = await this.experimentoTipoRepo.obtenerTodos();
    return tipos.map(tipo => tipo.toAPI());
  }

  /**
   * Crea un nuevo tipo de experimento.
   * @async
   * @param {Object} experimentoTipoData - Datos del tipo de experimento.
   * @returns {Promise<Object>} Tipo de experimento creado.
   */
  async crear(experimentoTipoData) {
    const tipo = await this.experimentoTipoRepo.crear(experimentoTipoData);
    return tipo.toAPI();
  }

  /**
   * Actualiza un tipo de experimento existente.
   * @async
   * @param {number} id - ID del tipo de experimento a actualizar.
   * @param {Object} experimentoTipoData - Datos a actualizar.
   * @returns {Promise<Object>} Tipo de experimento actualizado.
   * @throws {ApiError} Si el tipo de experimento no existe.
   */
  async actualizar(id, experimentoTipoData) {
    const tipo = await this.experimentoTipoRepo.actualizar(id, experimentoTipoData);
    return tipo.toAPI();
  }

  /**
   * Elimina un tipo de experimento.
   * @async
   * @param {number} id - ID del tipo de experimento a eliminar.
   * @returns {Promise<Object>} Tipo de experimento eliminado.
   * @throws {ApiError} Si el tipo de experimento no existe.
   */
  async eliminar(id) {
    const tipo = await this.experimentoTipoRepo.eliminar(id);
    return tipo.toAPI();
  }
}

export default ExperimentoTipoService;
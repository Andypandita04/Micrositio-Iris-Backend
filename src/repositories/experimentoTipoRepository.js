// src/repositories/experimentoTipoRepository.js
/**
 * Repositorio para interactuar con la tabla experimento_tipo en Supabase.
 * @class
 */
import supabase from '../config/supabaseClient.js';
import ApiError from '../utils/ApiError.js';
import ExperimentoTipo from '../models/ExperimentoTipo.js';

class ExperimentoTipoRepository {
  /**
   * Obtiene un tipo de experimento por su ID.
   * @async
   * @param {number} id - ID del tipo de experimento.
   * @returns {Promise<Object|null>} Tipo de experimento encontrado o null si no existe.
   * @throws {ApiError} Si ocurre un error al consultar.
   */
  async obtenerPorId(id) {
    const { data, error } = await supabase
      .from('experimento_tipo')
      .select('*')
      .eq('id_experimento_tipo', id)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new ApiError(`Error al obtener tipo de experimento: ${error.message}`, 500);
    }

    return data ? new ExperimentoTipo(data) : null;
  }

  /**
   * Obtiene todos los tipos de experimento.
   * @async
   * @returns {Promise<Array>} Lista de tipos de experimento.
   * @throws {ApiError} Si ocurre un error al consultar.
   */
  async obtenerTodos() {
    const { data, error } = await supabase
      .from('experimento_tipo')
      .select('*');

    if (error) {
      throw new ApiError(`Error al obtener tipos de experimento: ${error.message}`, 500);
    }

    return data.map(item => new ExperimentoTipo(item));
  }

  /**
   * Crea un nuevo tipo de experimento.
   * @async
   * @param {Object} experimentoTipoData - Datos del tipo de experimento.
   * @returns {Promise<Object>} Tipo de experimento creado.
   * @throws {ApiError} Si ocurre un error al crear.
   */
  async crear(experimentoTipoData) {
    const { data, error } = await supabase
      .from('experimento_tipo')
      .insert(experimentoTipoData)
      .select();

    if (error) {
      throw new ApiError(`Error al crear tipo de experimento: ${error.message}`, 500);
    }

    return new ExperimentoTipo(data[0]);
  }

  /**
   * Actualiza un tipo de experimento existente.
   * @async
   * @param {number} id - ID del tipo de experimento a actualizar.
   * @param {Object} experimentoTipoData - Datos a actualizar.
   * @returns {Promise<Object>} Tipo de experimento actualizado.
   * @throws {ApiError} Si ocurre un error al actualizar.
   */
  async actualizar(id, experimentoTipoData) {
    const { data, error } = await supabase
      .from('experimento_tipo')
      .update(experimentoTipoData)
      .eq('id_experimento_tipo', id)
      .select();

    if (error) {
      throw new ApiError(`Error al actualizar tipo de experimento: ${error.message}`, 500);
    }

    return new ExperimentoTipo(data[0]);
  }

  /**
   * Elimina un tipo de experimento.
   * @async
   * @param {number} id - ID del tipo de experimento a eliminar.
   * @returns {Promise<Object>} Tipo de experimento eliminado.
   * @throws {ApiError} Si ocurre un error al eliminar.
   */
  async eliminar(id) {
    const { data, error } = await supabase
      .from('experimento_tipo')
      .delete()
      .eq('id_experimento_tipo', id)
      .select();

    if (error) {
      throw new ApiError(`Error al eliminar tipo de experimento: ${error.message}`, 500);
    }

    if (!data || data.length === 0) {
      throw new ApiError('Tipo de experimento no encontrado', 404);
    }

    return new ExperimentoTipo(data[0]);
  }

  /**
 * Obtiene el primer tipo de experimento disponible.
 * @async
 * @returns {Promise<ExperimentoTipo|null>} El primer tipo de experimento o null si no hay ninguno.
 * @throws {ApiError} Si ocurre un error al consultar.
 */
async obtenerPrimero() {
  const { data, error } = await supabase
    .from('experimento_tipo')
    .select('*')
    .limit(1);

  if (error) {
    throw new ApiError(`Error al obtener tipo de experimento: ${error.message}`, 500);
  }

  return data && data.length > 0 ? new ExperimentoTipo(data[0]) : null;
}

}

export default ExperimentoTipoRepository;
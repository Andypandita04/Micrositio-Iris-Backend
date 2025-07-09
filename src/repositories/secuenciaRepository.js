// src/repositories/secuenciaRepository.js
import supabase from '../config/supabaseClient.js';
import ApiError from '../utils/ApiError.js';
import Secuencia from '../models/Secuencia.js';

class SecuenciaRepository {
  /**
   * Obtiene una secuencia por ID de proyecto
   * @param {number} id_proyecto - ID del proyecto
   * @returns {Promise<Array>} Lista de secuencias
   * @throws {ApiError} Si ocurre un error
   */
  async obtenerPorProyecto(id_proyecto) {
    const { data, error } = await supabase
      .from('secuencia')
      .select('*')
      .eq('id_proyecto', id_proyecto);

    if (error) {
      throw new ApiError(`Error al obtener secuencias: ${error.message}`, 500);
    }

    return data.map(sec => new Secuencia(sec));
  }

  /**
   * Obtiene una secuencia por su ID
   * @param {number} id_secuencia - ID de la secuencia
   * @returns {Promise<Secuencia|null>} Secuencia encontrada o null
   * @throws {ApiError} Si ocurre un error
   */
  async obtenerPorId(id_secuencia) {
    const { data, error } = await supabase
      .from('secuencia')
      .select('*')
      .eq('id_secuencia', id_secuencia)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new ApiError(`Error al obtener secuencia: ${error.message}`, 500);
    }

    return data ? new Secuencia(data) : null;
  }

  /**
   * Obtiene todas las secuencias
   * @returns {Promise<Array>} Lista de secuencias
   * @throws {ApiError} Si ocurre un error
   */
  async obtenerTodas() {
    const { data, error } = await supabase
      .from('secuencia')
      .select('*');

    if (error) {
      throw new ApiError(`Error al obtener secuencias: ${error.message}`, 500);
    }

    return data.map(sec => new Secuencia(sec));
  }

  /**
   * Crea una nueva secuencia
   * @param {Object} secuenciaData - Datos de la secuencia
   * @returns {Promise<Secuencia>} Secuencia creada
   * @throws {ApiError} Si ocurre un error
   */
  async crear(secuenciaData) {
    const { data, error } = await supabase
      .from('secuencia')
      .insert(secuenciaData)
      .select();

    if (error) {
      throw new ApiError(`Error al crear secuencia: ${error.message}`, 500);
    }

    return new Secuencia(data[0]);
  }

  /**
   * Actualiza una secuencia existente
   * @param {number} id_secuencia - ID de la secuencia
   * @param {Object} secuenciaData - Datos a actualizar
   * @returns {Promise<Secuencia>} Secuencia actualizada
   * @throws {ApiError} Si ocurre un error
   */
  async actualizar(id_secuencia, secuenciaData) {
    const { data, error } = await supabase
      .from('secuencia')
      .update(secuenciaData)
      .eq('id_secuencia', id_secuencia)
      .select();

    if (error) {
      throw new ApiError(`Error al actualizar secuencia: ${error.message}`, 500);
    }

    return new Secuencia(data[0]);
  }

  /**
   * Elimina una secuencia
   * @param {number} id_secuencia - ID de la secuencia
   * @returns {Promise<Secuencia>} Secuencia eliminada
   * @throws {ApiError} Si ocurre un error
   */
  async eliminar(id_secuencia) {
    const { data, error } = await supabase
      .from('secuencia')
      .delete()
      .eq('id_secuencia', id_secuencia)
      .select();

    if (error) {
      throw new ApiError(`Error al eliminar secuencia: ${error.message}`, 500);
    }

    if (!data || data.length === 0) {
      throw new ApiError('Secuencia no encontrada', 404);
    }

    return new Secuencia(data[0]);
  }
}

export default SecuenciaRepository;
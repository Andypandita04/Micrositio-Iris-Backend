// src/repositories/secuenciaRepository.js
import supabase from '../config/supabaseClient.js';
import ApiError from '../utils/ApiError.js';
import Secuencia from '../models/Secuencia.js';

class SecuenciaRepository {
  /**
   * Obtiene una secuencia por ID
   * @param {number} id_secuencia 
   * @returns {Promise<Secuencia|null>}
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
   * Obtiene secuencias por proyecto
   * @param {number} id_proyecto 
   * @returns {Promise<Array<Secuencia>>}
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
   * Obtiene todas las secuencias
   * @returns {Promise<Array<Secuencia>>}
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
   * @param {Object} secuenciaData 
   * @returns {Promise<Secuencia>}
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
   * Actualiza una secuencia
   * @param {number} id_secuencia 
   * @param {Object} updateData 
   * @returns {Promise<Secuencia>}
   */
  async actualizar(id_secuencia, updateData) {
    const { data, error } = await supabase
      .from('secuencia')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('id_secuencia', id_secuencia)
      .select();

    if (error) {
      throw new ApiError(`Error al actualizar secuencia: ${error.message}`, 500);
    }

    return new Secuencia(data[0]);
  }

  /**
   * Elimina una secuencia
   * @param {number} id_secuencia 
   * @returns {Promise<Secuencia>}
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
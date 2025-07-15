// src/repositories/celulaProyectoRepository.js
/**
 * Repositorio para interactuar con la tabla celula_proyecto en Supabase.
 * @class
 */
import supabase from '../config/supabaseClient.js';
import ApiError from '../utils/ApiError.js';
import CelulaProyecto from '../models/CelulaProyecto.js';

class CelulaProyectoRepository {
  /**
   * Obtiene relaciones por ID de empleado.
   * @async
   * @param {number} idEmpleado - ID del empleado.
   * @returns {Promise<Array>} Lista de relaciones.
   * @throws {ApiError} Si ocurre un error al consultar.
   */
  async obtenerPorEmpleado(idEmpleado) {
    const { data, error } = await supabase
      .from('celula_proyecto')
      .select('*')
      .eq('id_empleado', idEmpleado);

    if (error) {
      throw new ApiError(`Error al obtener relaciones por empleado: ${error.message}`, 500);
    }

    return data.map(item => new CelulaProyecto(item));
  }

  /**
   * Obtiene relaciones por ID de proyecto.
   * @async
   * @param {number} idProyecto - ID del proyecto.
   * @returns {Promise<Array>} Lista de relaciones.
   * @throws {ApiError} Si ocurre un error al consultar.
   */
  async obtenerPorProyecto(idProyecto) {
    const { data, error } = await supabase
      .from('celula_proyecto')
      .select('*')
      .eq('id_proyecto', idProyecto);

    if (error) {
      throw new ApiError(`Error al obtener relaciones por proyecto: ${error.message}`, 500);
    }

    return data.map(item => new CelulaProyecto(item));
  }

  /**
   * Obtiene todas las relaciones célula-proyecto.
   * @async
   * @returns {Promise<Array>} Lista de relaciones.
   * @throws {ApiError} Si ocurre un error al consultar.
   */
  async obtenerTodos() {
    const { data, error } = await supabase
      .from('celula_proyecto')
      .select('*');

    if (error) {
      throw new ApiError(`Error al obtener todas las relaciones: ${error.message}`, 500);
    }

    return data.map(item => new CelulaProyecto(item));
  }

  /**
   * Crea una nueva relación célula-proyecto.
   * @async
   * @param {Object} celulaProyectoData - Datos de la relación.
   * @returns {Promise<Object>} Relación creada.
   * @throws {ApiError} Si ocurre un error al crear.
   */
  async crear(celulaProyectoData) {
    const { data, error } = await supabase
      .from('celula_proyecto')
      .insert(celulaProyectoData)
      .select();

    if (error) {
      throw new ApiError(`Error al crear relación célula-proyecto: ${error.message}`, 500);
    }

    return new CelulaProyecto(data[0]);
  }

  /**
   * Crea múltiples relaciones célula-proyecto.
   * @async
   * @param {Array<Object>} relacionesData - Array de objetos { id_empleado, id_proyecto, activo }
   * @returns {Promise<Array>} Relaciones creadas.
   * @throws {ApiError} Si ocurre un error al crear.
   */
  async crearMultiple(relacionesData) {
    const { data, error } = await supabase
      .from('celula_proyecto')
      .insert(relacionesData)
      .select();
    if (error) {
      throw new ApiError(`Error al crear relaciones: ${error.message}`, 500);
    }
    return data.map(item => new CelulaProyecto(item));
  }

  /**
   * Elimina una relación célula-proyecto.
   * @async
   * @param {number} id - ID de la relación a eliminar.
   * @returns {Promise<Object>} Relación eliminada.
   * @throws {ApiError} Si ocurre un error al eliminar.
   */
  async eliminar(id) {
    const { data, error } = await supabase
      .from('celula_proyecto')
      .delete()
      .eq('id', id)
      .select();

    if (error) {
      throw new ApiError(`Error al eliminar relación célula-proyecto: ${error.message}`, 500);
    }

    if (!data || data.length === 0) {
      throw new ApiError('Relación no encontrada', 404);
    }

    return new CelulaProyecto(data[0]);
  }

  /**
   * Actualiza el estado activo de una relación célula-proyecto.
   * @async
   * @param {number} id - ID de la relación a actualizar.
   * @param {boolean} activo - Nuevo estado activo.
   * @returns {Promise<Object>} Relación actualizada.
   * @throws {ApiError} Si ocurre un error al actualizar.
   */
  async actualizarActivo(id, activo) {
    const { data, error } = await supabase
      .from('celula_proyecto')
      .update({ activo })
      .eq('id', id)
      .select();

    if (error) {
      throw new ApiError(`Error al actualizar relación célula-proyecto: ${error.message}`, 500);
    }

    if (!data || data.length === 0) {
      throw new ApiError('Relación no encontrada', 404);
    }

    return new CelulaProyecto(data[0]);
  }
}

export default CelulaProyectoRepository;
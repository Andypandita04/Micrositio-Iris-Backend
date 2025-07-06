// src/repositories/empleadoProyectoRepository.js
/**
 * Repositorio para interactuar con la tabla empleado_proyecto en Supabase.
 * @class
 */
import supabase from '../config/supabaseClient.js';
import ApiError from '../utils/ApiError.js';
import EmpleadoProyecto from '../models/EmpleadoProyecto.js';

class EmpleadoProyectoRepository {
  /**
   * Obtiene todos los registros de empleado_proyecto para un proyecto específico.
   * @async
   * @param {number} id_proyecto - ID del proyecto.
   * @returns {Promise<Array>} Lista de relaciones empleado-proyecto.
   * @throws {ApiError} Si ocurre un error al consultar.
   */
  async obtenerPorProyecto(id_proyecto) {
    const { data, error } = await supabase
      .from('empleado_proyecto')
      .select('*')
      .eq('id_proyecto', id_proyecto);

    if (error) {
      throw new ApiError(`Error al obtener empleados del proyecto: ${error.message}`, 500);
    }

    return data.map(item => EmpleadoProyecto.fromDatabase(item));
  }

  /**
   * Crea un nuevo registro empleado_proyecto.
   * @async
   * @param {Object} empleadoProyectoData - Datos de la relación.
   * @returns {Promise<Object>} Relación creada.
   * @throws {ApiError} Si ocurre un error al crear.
   */
  async crear(empleadoProyectoData) {
    const { data, error } = await supabase
      .from('empleado_proyecto')
      .insert(empleadoProyectoData)
      .select();

    if (error) {
      throw new ApiError(`Error al asignar empleado a proyecto: ${error.message}`, 500);
    }

    return EmpleadoProyecto.fromDatabase(data[0]);
  }

  /**
   * Elimina un registro empleado_proyecto por su ID.
   * @async
   * @param {number} id - ID del registro a eliminar.
   * @returns {Promise<Object>} Relación eliminada.
   * @throws {ApiError} Si ocurre un error al eliminar.
   */
  async eliminar(id) {
    const { data, error } = await supabase
      .from('empleado_proyecto')
      .delete()
      .eq('id_empleado_proyecto', id)
      .select();

    if (error) {
      throw new ApiError(`Error al eliminar asignación: ${error.message}`, 500);
    }

    if (!data || data.length === 0) {
      throw new ApiError('Asignación no encontrada', 404);
    }

    return EmpleadoProyecto.fromDatabase(data[0]);
  }
}

export default EmpleadoProyectoRepository;
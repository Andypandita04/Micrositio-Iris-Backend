/**
 * Repositorio para interactuar con la tabla empleado en Supabase.
 * @class
 */
import supabase from '../config/supabaseClient.js';
import ApiError from '../utils/ApiError.js';
import Empleado from '../models/Empleado.js';

class EmpleadoRepository {
  /**
   * Obtiene un empleado por su ID.
   * @async
   * @param {number} id - ID del empleado.
   * @returns {Promise<Object|null>} Empleado encontrado o null si no existe.
   * @throws {ApiError} Si ocurre un error al consultar.
   */
  async obtenerPorId(id) {
    const { data, error } = await supabase
      .from('empleado')
      .select('*')
      .eq('id_empleado', id)
      .single();

    // PGRST116 es el código de error cuando no se encuentra ningún registro
    if (error && error.code !== 'PGRST116') {
      throw new ApiError(`Error al obtener empleado: ${error.message}`, 500);
    }

    return data ? Empleado.fromDatabase(data) : null;
  }

  /**
   * Crea un nuevo empleado.
   * @async
   * @param {Object} empleadoData - Datos del empleado.
   * @returns {Promise<Object>} Empleado creado.
   * @throws {ApiError} Si ocurre un error al crear.
   */
  async crear(empleadoData) {
    const { data, error } = await supabase
      .from('empleado')
      .insert(empleadoData)
      .select();

    if (error) {
      throw new ApiError(`Error al crear empleado: ${error.message}`, 500);
    }

    return Empleado.fromDatabase(data[0]);
  }

  /**
   * Obtiene todos los empleados.
   * @async
   * @returns {Promise<Array<Object>>} Lista de empleados.
   * @throws {ApiError} Si ocurre un error al consultar.
   */
  async listarTodos() {
    const { data, error } = await supabase
      .from('empleado')
      .select('*');

    if (error) {
      throw new ApiError(`Error al listar empleados: ${error.message}`, 500);
    }

    return data; // O mapea si tienes un modelo
  }

  /**
   * Actualiza un empleado existente.
   * @async
   * @param {number} id - ID del empleado a actualizar.
   * @param {Object} empleadoData - Datos a actualizar.
   * @returns {Promise<Object>} Empleado actualizado.
   * @throws {ApiError} Si ocurre un error al actualizar.
   */
  async actualizar(id, empleadoData) {
    const { data, error } = await supabase
      .from('empleado')
      .update(empleadoData)
      .eq('id_empleado', id)
      .select();

    if (error) {
      throw new ApiError(`Error al actualizar empleado: ${error.message}`, 500);
    }

    return Empleado.fromDatabase(data[0]);
  }

  /**
   * Desactiva un empleado (eliminación lógica).
   * @async
   * @param {number} id - ID del empleado a desactivar.
   * @returns {Promise<Object>} Empleado desactivado.
   * @throws {ApiError} Si ocurre un error al desactivar.
   */
  async desactivar(id) {
    const { data, error } = await supabase
      .from('empleado')
      .update({ activo: false, updated_at: new Date().toISOString() })
      .eq('id_empleado', id)
      .select();

    if (error) {
      throw new ApiError(`Error al desactivar empleado: ${error.message}`, 500);
    }

    return Empleado.fromDatabase(data[0]);
  }
}

export default EmpleadoRepository;
// src/repositories/proyectoRepository.js
/**
 * Repositorio para interactuar con la tabla de proyectos en Supabase.
 * @class
 */
import supabase from '../config/supabaseClient.js';
import ApiError from '../utils/ApiError.js';
import Proyecto from '../models/Proyecto.js';

class ProyectoRepository {
  /**
   * Crea un nuevo proyecto en la base de datos.
   * @async
   * @param {Object} proyectoData - Datos del proyecto a crear.
   * @returns {Promise<Object>} El proyecto creado.
   * @throws {ApiError} Si ocurre un error al crear el proyecto.
   */
  async crearProyecto(proyectoData) {
    const { data, error } = await supabase
      .from('proyecto')
      .insert(proyectoData)
      .select();

    if (error) {
      throw new ApiError(`Error al crear proyecto: ${error.message}`, 500);
    }

    return new Proyecto(data[0]);
  }

  /**
   * Obtiene un proyecto por su ID.
   * @async
   * @param {number} id - ID del proyecto a obtener.
   * @returns {Promise<Object|null>} El proyecto encontrado o null si no existe.
   * @throws {ApiError} Si ocurre un error al obtener el proyecto.
   */
  async obtenerProyectoPorId(id) {
    const { data, error } = await supabase
      .from('proyecto')
      .select('*')
      .eq('id_proyecto', id)
      .single();

    // PGRST116 es el código de error cuando no se encuentra ningún registro
    if (error && error.code !== 'PGRST116') {
      throw new ApiError(`Error al obtener proyecto: ${error.message}`, 500);
    }

    return data ? Proyecto.fromDatabase(data) : null;
  }

  /**
   * Actualiza un proyecto existente.
   * @async
   * @param {number} id - ID del proyecto a actualizar.
   * @param {Object} proyectoData - Datos a actualizar.
   * @returns {Promise<Object>} El proyecto actualizado.
   * @throws {ApiError} Si ocurre un error al actualizar el proyecto.
   */
  async actualizarProyecto(id, proyectoData) {
    const { data, error } = await supabase
      .from('proyecto')
      .update(proyectoData)
      .eq('id_proyecto', id)
      .select();

    if (error) {
      throw new ApiError(`Error al actualizar proyecto: ${error.message}`, 500);
    }

    return Proyecto.fromDatabase(data[0]);
  }

  /**
   * Elimina un proyecto existente.
   * @async
   * @param {number} id - ID del proyecto a eliminar.
   * @returns {Promise<Object>} El proyecto eliminado.
   * @throws {ApiError} Si ocurre un error al eliminar el proyecto.
   */
  async eliminarProyecto(id) {
    const { data, error } = await supabase
      .from('proyecto')
      .delete()
      .eq('id_proyecto', id)
      .select();

    if (error) {
      throw new ApiError(`Error al eliminar proyecto: ${error.message}`, 500);
    }

    return Proyecto.fromDatabase(data[0]);
  }

  /**
   * Lista todos los proyectos, opcionalmente filtrados por estado.
   * @async
   * @param {string} [estado] - Estado para filtrar los proyectos.
   * @returns {Promise<Array>} Lista de proyectos.
   * @throws {ApiError} Si ocurre un error al listar los proyectos.
   */
  async listarProyectos(estado) {
    // Iniciar la consulta básica
    let query = supabase.from('proyecto').select('*');

    // Aplicar filtro por estado si se proporciona
    if (estado) {
      query = query.eq('estado', estado);
    }

    const { data, error } = await query;

    if (error) {
      throw new ApiError(`Error al listar proyectos: ${error.message}`, 500);
    }

    return data.map(proyecto => Proyecto.fromDatabase(proyecto));
  }
}

export default ProyectoRepository;
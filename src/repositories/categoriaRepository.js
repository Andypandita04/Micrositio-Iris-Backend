// src/repositories/categoriaRepository.js
/**
 * Repositorio para interactuar con la tabla categoria en Supabase.
 * @class
 */
import supabase from '../config/supabaseClient.js';
import ApiError from '../utils/ApiError.js';
import Categoria from '../models/Categoria.js';

class CategoriaRepository {
  /**
   * Obtiene una categoría por su ID.
   * @async
   * @param {number} id - ID de la categoría.
   * @returns {Promise<Object|null>} Categoría encontrada o null si no existe.
   * @throws {ApiError} Si ocurre un error al consultar.
   */
  async obtenerPorId(id) {
    const { data, error } = await supabase
      .from('categoria')
      .select('*')
      .eq('id_categoria', id)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new ApiError(`Error al obtener categoría: ${error.message}`, 500);
    }

    return data ? new Categoria(data) : null;
  }

  /**
   * Obtiene todas las categorías.
   * @async
   * @returns {Promise<Array>} Lista de categorías.
   * @throws {ApiError} Si ocurre un error al consultar.
   */
  async obtenerTodas() {
    const { data, error } = await supabase
      .from('categoria')
      .select('*');

    if (error) {
      throw new ApiError(`Error al obtener categorías: ${error.message}`, 500);
    }

    return data.map(categoria => new Categoria(categoria));
  }

  /**
   * Crea una nueva categoría.
   * @async
   * @param {Object} categoriaData - Datos de la categoría.
   * @returns {Promise<Object>} Categoría creada.
   * @throws {ApiError} Si ocurre un error al crear.
   */
  async crear(categoriaData) {
    const { data, error } = await supabase
      .from('categoria')
      .insert(categoriaData)
      .select();

    if (error) {
      throw new ApiError(`Error al crear categoría: ${error.message}`, 500);
    }

    return new Categoria(data[0]);
  }

  /**
   * Actualiza una categoría existente.
   * @async
   * @param {number} id - ID de la categoría a actualizar.
   * @param {Object} categoriaData - Datos a actualizar.
   * @returns {Promise<Object>} Categoría actualizada.
   * @throws {ApiError} Si ocurre un error al actualizar.
   */
  async actualizar(id, categoriaData) {
    const { data, error } = await supabase
      .from('categoria')
      .update(categoriaData)
      .eq('id_categoria', id)
      .select();

    if (error) {
      throw new ApiError(`Error al actualizar categoría: ${error.message}`, 500);
    }

    return new Categoria(data[0]);
  }

  /**
   * Elimina una categoría.
   * @async
   * @param {number} id - ID de la categoría a eliminar.
   * @returns {Promise<Object>} Categoría eliminada.
   * @throws {ApiError} Si ocurre un error al eliminar.
   */
  async eliminar(id) {
    const { data, error } = await supabase
      .from('categoria')
      .delete()
      .eq('id_categoria', id)
      .select();

    if (error) {
      throw new ApiError(`Error al eliminar categoría: ${error.message}`, 500);
    }

    if (!data || data.length === 0) {
      throw new ApiError('Categoría no encontrada', 404);
    }

    return new Categoria(data[0]);
  }
}

export default CategoriaRepository;
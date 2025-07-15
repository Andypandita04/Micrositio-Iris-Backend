// src/services/categoriaService.js
/**
 * Servicio para manejar la lógica de negocio de categorías.
 * @class
 */
import CategoriaRepository from '../repositories/categoriaRepository.js';
import ApiError from '../utils/ApiError.js';

class CategoriaService {
  constructor() {
    this.categoriaRepo = new CategoriaRepository();
  }

  /**
   * Obtiene una categoría por su ID.
   * @async
   * @param {number} id - ID de la categoría.
   * @returns {Promise<Object>} Categoría encontrada.
   * @throws {ApiError} Si la categoría no existe.
   */
  async obtenerPorId(id) {
    const categoria = await this.categoriaRepo.obtenerPorId(id);
    
    if (!categoria) {
      throw new ApiError('Categoría no encontrada', 404);
    }
    
    return categoria.toAPI();
  }

  /**
   * Obtiene todas las categorías.
   * @async
   * @returns {Promise<Array>} Lista de categorías.
   */
  async obtenerTodas() {
    const categorias = await this.categoriaRepo.obtenerTodas();
    return categorias.map(categoria => categoria.toAPI());
  }

  /**
   * Crea una nueva categoría.
   * @async
   * @param {Object} categoriaData - Datos de la categoría.
   * @returns {Promise<Object>} Categoría creada.
   */
  async crear(categoriaData) {
    const categoria = await this.categoriaRepo.crear(categoriaData);
    return categoria.toAPI();
  }

  /**
   * Actualiza una categoría existente.
   * @async
   * @param {number} id - ID de la categoría a actualizar.
   * @param {Object} categoriaData - Datos a actualizar.
   * @returns {Promise<Object>} Categoría actualizada.
   * @throws {ApiError} Si la categoría no existe.
   */
  async actualizar(id, categoriaData) {
    const categoria = await this.categoriaRepo.actualizar(id, categoriaData);
    
    if (!categoria) {
      throw new ApiError('Categoría no encontrada', 404);
    }
    
    return categoria.toAPI();
  }

  /**
   * Elimina una categoría.
   * @async
   * @param {number} id - ID de la categoría a eliminar.
   * @returns {Promise<Object>} Categoría eliminada.
   * @throws {ApiError} Si la categoría no existe.
   */
  async eliminar(id) {
    const categoria = await this.categoriaRepo.eliminar(id);
    return categoria.toAPI();
  }
}

export default CategoriaService;
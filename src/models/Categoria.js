// src/models/Categoria.js
/**
 * Modelo de Categoría que representa la estructura y comportamiento de una categoría.
 * @class
 */
import { categoriaCreateSchema, categoriaUpdateSchema } from '../middlewares/validation/categoriaSchema.js';
import ApiError from '../utils/ApiError.js';

class Categoria {
  /**
   * Crea una instancia del modelo Categoria.
   * @param {Object} data - Datos de la categoría.
   */
  constructor(data) {
    this.id_categoria = data.id_categoria;
    this.nombre = data.nombre;
    this.created_at = new Date(data.created_at || Date.now());
    this.updated_at = new Date(data.updated_at || Date.now());
  }

  /**
   * Valida los datos de la categoría al crear.
   * @static
   * @param {Object} data - Datos a validar.
   * @returns {Object} Datos validados.
   * @throws {ApiError} Si la validación falla.
   */
  static validateCreate(data) {
    try {
      return categoriaCreateSchema.parse(data);
    } catch (error) {
      throw new ApiError(`Validación fallida: ${error.errors.map(e => e.message).join(', ')}`, 400);
    }
  }

  /**
   * Valida los datos de la categoría al actualizar.
   * @static
   * @param {Object} data - Datos a validar.
   * @returns {Object} Datos validados.
   * @throws {ApiError} Si la validación falla.
   */
  static validateUpdate(data) {
    try {
      return categoriaUpdateSchema.parse(data);
    } catch (error) {
      throw new ApiError(`Validación fallida: ${error.errors.map(e => e.message).join(', ')}`, 400);
    }
  }

  /**
   * Convierte el modelo a un objeto para la respuesta API.
   * @returns {Object} Objeto preparado para la respuesta.
   */
  toAPI() {
    return {
      id: this.id_categoria,
      nombre: this.nombre,
      creado: this.created_at.toISOString(),
      actualizado: this.updated_at.toISOString()
    };
  }
}

export default Categoria;
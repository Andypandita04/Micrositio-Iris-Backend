// src/models/Secuencia.js
/**
 * Modelo de Secuencia que representa la estructura y comportamiento de una secuencia de testing.
 * @class
 */
import { secuenciaCreateSchema, secuenciaUpdateSchema } from '../middlewares/validation/secuenciaSchema.js';
import ApiError from '../utils/ApiError.js';

class Secuencia {
  /**
   * Crea una instancia del modelo Secuencia.
   * @param {Object} data - Datos de la secuencia.
   */
  constructor(data) {
    this.id_secuencia = data.id_secuencia;
    this.id_proyecto = data.id_proyecto;
    this.id_testing_card_padre = data.id_testing_card_padre;
    this.nombre = data.nombre;
    this.descripcion = data.descripcion || null;
    this.created_at = new Date(data.created_at || Date.now());
    this.updated_at = new Date(data.updated_at || Date.now());
  }

  /**
   * Valida los datos de la secuencia al crear.
   * @static
   * @param {Object} data - Datos a validar.
   * @returns {Object} Datos validados.
   * @throws {ApiError} Si la validación falla.
   */
  static validateCreate(data) {
    try {
      return secuenciaCreateSchema.parse(data);
    } catch (error) {
      throw new ApiError(`Validación fallida: ${error.errors.map(e => e.message).join(', ')}`, 400);
    }
  }

  /**
   * Valida los datos de la secuencia al actualizar.
   * @static
   * @param {Object} data - Datos a validar.
   * @returns {Object} Datos validados.
   * @throws {ApiError} Si la validación falla.
   */
  static validateUpdate(data) {
    try {
      return secuenciaUpdateSchema.parse(data);
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
      id: this.id_secuencia,
      id_proyecto: this.id_proyecto,
      id_testing_card_padre: this.id_testing_card_padre,
      nombre: this.nombre,
      descripcion: this.descripcion,
      creado: this.created_at.toISOString(),
      actualizado: this.updated_at.toISOString()
    };
  }
}

export default Secuencia;
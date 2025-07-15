// src/models/ExperimentoTipo.js
/**
 * Modelo para experimento_tipo que representa la estructura y comportamiento de un tipo de experimento.
 * @class
 */
import { experimentoTipoCreateSchema, experimentoTipoUpdateSchema } from '../middlewares/validation/experimentoTipoSchema.js';
import ApiError from '../utils/ApiError.js';

class ExperimentoTipo {
  /**
   * Crea una instancia del modelo ExperimentoTipo.
   * @param {Object} data - Datos del tipo de experimento.
   */
  constructor(data) {
    this.id_experimento_tipo = data.id_experimento_tipo;
    this.tipo = data.tipo;
    this.nombre = data.nombre;
    this.icono = data.icono || null;
    this.created_at = new Date(data.created_at || Date.now());
    this.updated_at = new Date(data.updated_at || Date.now());
  }

  /**
   * Valida los datos al crear un tipo de experimento.
   * @static
   * @param {Object} data - Datos a validar.
   * @returns {Object} Datos validados.
   * @throws {ApiError} Si la validación falla.
   */
  static validateCreate(data) {
    try {
      return experimentoTipoCreateSchema.parse(data);
    } catch (error) {
      throw new ApiError(`Validación fallida: ${error.errors.map(e => e.message).join(', ')}`, 400);
    }
  }

  /**
   * Valida los datos al actualizar un tipo de experimento.
   * @static
   * @param {Object} data - Datos a validar.
   * @returns {Object} Datos validados.
   * @throws {ApiError} Si la validación falla.
   */
  static validateUpdate(data) {
    try {
      return experimentoTipoUpdateSchema.parse(data);
    } catch (error) {
      throw new ApiError(`Validación fallida: ${error.errors.map(e => e.message).join(', ')}`, 400);
    }
  }

  /**
   * Convierte el modelo a un objeto para la API.
   * @returns {Object} Objeto preparado para la respuesta.
   */
  toAPI() {
    return {
      id: this.id_experimento_tipo,
      tipo: this.tipo,
      nombre: this.nombre,
      icono: this.icono,
      creado: this.created_at.toISOString(),
      actualizado: this.updated_at.toISOString()
    };
  }
}

export default ExperimentoTipo;
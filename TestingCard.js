// src/models/TestingCard.js
/**
 * Modelo que representa una testing card en el sistema
 * @class
 */
import { testingCardCreateSchema, testingCardUpdateSchema } from '../../testingCardSchema.js';
import ApiError from '../utils/ApiError.js';

class TestingCard {
  /**
   * @param {Object} data - Datos de la testing card
   */
  constructor(data) {
    this.id_testing_card = data.id_testing_card;
    this.id_secuencia = data.id_secuencia;
    this.padre_id = data.padre_id || null;
    this.titulo = data.titulo;
    this.hipotesis = data.hipotesis;
    this.id_experimento_tipo = data.id_experimento_tipo;
    this.descripcion = data.descripcion;
    this.dia_inicio = new Date(data.dia_inicio);
    this.dia_fin = new Date(data.dia_fin);
    this.anexo_url = data.anexo_url || null;
    this.id_empleado = data.id_empleado;
    this.status = data.status || 'En desarrollo';
    this.created_at = new Date(data.created_at || Date.now());
    this.updated_at = new Date(data.updated_at || Date.now());
  }

  /**
   * Valida los datos para creación de testing card
   * @static
   * @param {Object} data - Datos a validar
   * @returns {Object} Datos validados
   * @throws {ApiError} Si la validación falla
   */
  static validateCreate(data) {
    try {
      return testingCardCreateSchema.parse(data);
    } catch (error) {
      throw new ApiError(`Validación fallida: ${error.errors.map(e => e.message).join(', ')}`, 400);
    }
  }

  /**
   * Valida los datos para actualización de testing card
   * @static
   * @param {Object} data - Datos a validar
   * @returns {Object} Datos validados
   * @throws {ApiError} Si la validación falla
   */
  static validateUpdate(data) {
    try {
      return testingCardUpdateSchema.parse(data);
    } catch (error) {
      throw new ApiError(`Validación fallida: ${error.errors.map(e => e.message).join(', ')}`, 400);
    }
  }

  /**
   * Convierte el modelo a formato para API
   * @returns {Object} Objeto para respuesta
   */
  toAPI() {
    return {
      id: this.id_testing_card,
      id_secuencia: this.id_secuencia,
      padre_id: this.padre_id,
      titulo: this.titulo,
      hipotesis: this.hipotesis,
      id_experimento_tipo: this.id_experimento_tipo,
      descripcion: this.descripcion,
      dia_inicio: this.dia_inicio.toISOString().split('T')[0],
      dia_fin: this.dia_fin.toISOString().split('T')[0],
      anexo_url: this.anexo_url,
      id_empleado: this.id_empleado,
      status: this.status,
      creado: this.created_at.toISOString(),
      actualizado: this.updated_at.toISOString()
    };
  }
}

export default TestingCard;
/**
 * Modelo para la tabla learning_card
 * @class
 */
import { learningCardCreateSchema, learningCardUpdateSchema } from '../middlewares/validation/learningCardSchema.js';
import ApiError from '../utils/ApiError.js';

class LearningCard {
  constructor(data = {}) { // Valor por defecto para data
    // Asignamos valores por defecto para todas las propiedades
    this.id_learning_card = data.id || null;
    this.id_secuencia = data.id_secuencia || null;
    this.id_testing_card = data.id_testing_card || null;
    this.resultado = data.resultado || null;
    this.hallazgo = data.hallazgo || null;
    this.created_at = data.created_at ? new Date(data.created_at) : new Date();
    this.updated_at = data.updated_at ? new Date(data.updated_at) : new Date();
  }

  /**
   * Valida los datos para creación
   * @static
   * @param {Object} data - Datos a validar
   * @returns {Object} Datos validados
   * @throws {ApiError} Si la validación falla
   */
  static validateCreate(data) {
    try {
      return learningCardCreateSchema.parse(data);
    } catch (error) {
      throw new ApiError(`Validación fallida: ${error.errors.map(e => e.message).join(', ')}`, 400);
    }
  }

  /**
   * Valida los datos para actualización
   * @static
   * @param {Object} data - Datos a validar
   * @returns {Object} Datos validados
   * @throws {ApiError} Si la validación falla
   */
  static validateUpdate(data) {
    try {
      return learningCardUpdateSchema.parse(data);
    } catch (error) {
      throw new ApiError(`Validación fallida: ${error.errors.map(e => e.message).join(', ')}`, 400);
    }
  }

  toAPI() {
    return {
      id_learning_card: this.id_learning_card,
      id_testing_card: this.id_testing_card,
      resultado: this.resultado,
      hallazgo: this.hallazgo,
      creado: this.created_at.toISOString(),
      actualizado: this.updated_at.toISOString()
    };
  }
}

export default LearningCard;
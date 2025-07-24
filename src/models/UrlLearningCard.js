// src/models/UrlLearningCard.js
import { urlLearningCardCreateSchema, urlLearningCardUpdateSchema } from '../middlewares/validation/urlLearningCardSchema.js';
import ApiError from '../utils/ApiError.js';

class UrlLearningCard {
  constructor(data) {
    this.id_url_lc = data.id_url_lc;
    this.id_learning_card = data.id_learning_card;
    this.url = data.url;
    this.created_at = new Date(data.created_at || Date.now());
    this.updated_at = new Date(data.updated_at || Date.now());
  }

  /**
   * Valida los datos al crear una URL
   * @static
   * @param {Object} data - Datos a validar
   * @returns {Object} Datos validados
   * @throws {ApiError} Si la validación falla
   */
  static validateCreate(data) {
    try {
      return urlLearningCardCreateSchema.parse(data);
    } catch (error) {
      throw new ApiError(`Validación fallida: ${error.errors.map(e => e.message).join(', ')}`, 400);
    }
  }

  /**
   * Valida los datos al actualizar una URL
   * @static
   * @param {Object} data - Datos a validar
   * @returns {Object} Datos validados
   * @throws {ApiError} Si la validación falla
   */
  static validateUpdate(data) {
    try {
      return urlLearningCardUpdateSchema.parse(data);
    } catch (error) {
      throw new ApiError(`Validación fallida: ${error.errors.map(e => e.message).join(', ')}`, 400);
    }
  }

  /**
   * Crea instancia a partir de datos de la base de datos
   * @static
   * @param {Object} dbData - Datos de la BD
   * @returns {UrlLearningCard} Instancia del modelo
   */
  static fromDatabase(dbData) {
    return new UrlLearningCard({
      id_url_lc: dbData.id_url_lc,
      id_learning_card: dbData.id_learning_card,
      url: dbData.url,
      created_at: dbData.created_at,
      updated_at: dbData.updated_at
    });
  }

  /**
   * Convierte el modelo a formato para la API
   * @returns {Object} Objeto para respuesta API
   */
  toAPI() {
    return {
      id_url_lc: this.id_url_lc,
      id_learning_card: this.id_learning_card,
      url: this.url,
      creado: this.created_at.toISOString(),
      actualizado: this.updated_at.toISOString()
    };
  }
}

export default UrlLearningCard;

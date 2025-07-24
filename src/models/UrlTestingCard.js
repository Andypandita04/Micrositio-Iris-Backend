// src/models/UrlTestingCard.js
import { urlTestingCardCreateSchema, urlTestingCardUpdateSchema } from '../middlewares/validation/urlTestingCardSchema.js';
import ApiError from '../utils/ApiError.js';

class UrlTestingCard {
  constructor(data) {
    this.id_url_tc = data.id_url_tc;
    this.id_testing_card = data.id_testing_card;
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
      return urlTestingCardCreateSchema.parse(data);
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
      return urlTestingCardUpdateSchema.parse(data);
    } catch (error) {
      throw new ApiError(`Validación fallida: ${error.errors.map(e => e.message).join(', ')}`, 400);
    }
  }

  /**
   * Crea instancia a partir de datos de la base de datos
   * @static
   * @param {Object} dbData - Datos de la BD
   * @returns {UrlTestingCard} Instancia del modelo
   */
  static fromDatabase(dbData) {
    return new UrlTestingCard({
      id_url_tc: dbData.id_url_tc,
      id_testing_card: dbData.id_testing_card,
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
      id_url_tc: this.id_url_tc,
      id_testing_card: this.id_testing_card,
      url: this.url,
      creado: this.created_at.toISOString(),
      actualizado: this.updated_at.toISOString()
    };
  }
}

export default UrlTestingCard;

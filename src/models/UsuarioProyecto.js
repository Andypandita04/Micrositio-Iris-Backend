// src/models/UsuarioProyecto.js
/**
 * Modelo para la relación usuario-proyecto.
 * @class
 */
import { usuarioProyectoCreateSchema, usuarioProyectoQuerySchema } from '../middlewares/validation/usuarioProyectoSchema.js';
import ApiError from '../utils/ApiError.js';

class UsuarioProyecto {
  /**
   * Crea una instancia del modelo UsuarioProyecto.
   * @param {Object} data - Datos de la relación usuario-proyecto.
   */
  constructor(data) {
    this.id_usuario = data.id_usuario;
    this.id_proyecto = data.id_proyecto;
  }

  /**
   * Valida los datos al crear una relación usuario-proyecto.
   * @static
   * @param {Object} data - Datos a validar.
   * @returns {Object} Datos validados.
   * @throws {ApiError} Si la validación falla.
   */
  static validateCreate(data) {
    try {
      return usuarioProyectoCreateSchema.parse(data);
    } catch (error) {
      throw new ApiError(`Validación fallida: ${error.errors.map(e => e.message).join(', ')}`, 400);
    }
  }

  /**
   * Valida los parámetros de consulta.
   * @static
   * @param {Object} data - Datos a validar.
   * @returns {Object} Datos validados.
   * @throws {ApiError} Si la validación falla.
   */
  static validateQuery(data) {
    try {
      return usuarioProyectoQuerySchema.parse(data);
    } catch (error) {
      throw new ApiError(`Validación fallida: ${error.errors.map(e => e.message).join(', ')}`, 400);
    }
  }

  /**
   * Convierte la instancia a formato de respuesta API.
   * @returns {Object} Datos formateados para API.
   */
  toAPI() {
    return {
      id_usuario: this.id_usuario,
      id_proyecto: this.id_proyecto
    };
  }

  /**
   * Crea una instancia desde datos de base de datos.
   * @static
   * @param {Object} dbData - Datos de la base de datos.
   * @returns {UsuarioProyecto} Nueva instancia.
   */
  static fromDatabase(dbData) {
    return new UsuarioProyecto({
      id_usuario: dbData.id_usuario,
      id_proyecto: dbData.id_proyecto
    });
  }

  /**
   * Convierte la instancia a formato de base de datos.
   * @returns {Object} Datos formateados para inserción en BD.
   */
  toDatabase() {
    return {
      id_usuario: this.id_usuario,
      id_proyecto: this.id_proyecto
    };
  }
}

export default UsuarioProyecto;

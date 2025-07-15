// src/models/CelulaProyecto.js
/**
 * Modelo para la relación célula-proyecto.
 * @class
 */
import { celulaProyectoCreateSchema, celulaProyectoUpdateSchema } from '../middlewares/validation/celulaProyectoSchema.js';
import ApiError from '../utils/ApiError.js';

class CelulaProyecto {
  /**
   * Crea una instancia del modelo CelulaProyecto.
   * @param {Object} data - Datos de la relación célula-proyecto.
   */
  constructor(data) {
    this.id = data.id;
    this.id_empleado = data.id_empleado;
    this.id_proyecto = data.id_proyecto;
    this.activo = data.activo !== undefined ? data.activo : true;
  }

  /**
   * Valida los datos al crear una relación célula-proyecto.
   * @static
   * @param {Object} data - Datos a validar.
   * @returns {Object} Datos validados.
   * @throws {ApiError} Si la validación falla.
   */
  static validateCreate(data) {
    try {
      return celulaProyectoCreateSchema.parse(data);
    } catch (error) {
      throw new ApiError(`Validación fallida: ${error.errors.map(e => e.message).join(', ')}`, 400);
    }
  }

  /**
   * Valida los datos al actualizar una relación célula-proyecto.
   * @static
   * @param {Object} data - Datos a validar.
   * @returns {Object} Datos validados.
   * @throws {ApiError} Si la validación falla.
   */
  static validateUpdate(data) {
    try {
      return celulaProyectoUpdateSchema.parse(data);
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
      id: this.id,
      id_empleado: this.id_empleado,
      id_proyecto: this.id_proyecto,
      activo: this.activo
    };
  }
}

export default CelulaProyecto;
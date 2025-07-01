// src/models/Proyecto.js
/**
 * Modelo de Proyecto que representa la estructura y comportamiento de un proyecto.
 * @class
 */
import { proyectoCreateSchema, proyectoUpdateSchema } from '../middlewares/validation/proyectoSchema.js';
import ApiError from '../utils/ApiError.js';

class Proyecto {
  /**
   * Crea una instancia del modelo Proyecto.
   * @param {Object} data - Datos del proyecto.
   */
  constructor(data) {
    this.id_proyecto = data.id_proyecto;
    this.titulo = data.titulo;
    this.descripcion = data.descripcion;
    this.estado = data.estado || 'activo';
    this.fecha_inicio = this.parseDate(data.fecha_inicio);
    this.fecha_fin_estimada = this.parseDate(data.fecha_fin_estimada);
    this.created_at = this.parseDate(data.created_at) || new Date();
    this.updated_at = this.parseDate(data.updated_at) || new Date();
    
  }
  parseDate(value) {
    if (!value) return null;
    const date = new Date(value);
    return isNaN(date) ? null : date;
  }

  /**
   * Valida los datos del proyecto al crear.
   * @static
   * @param {Object} data - Datos a validar.
   * @returns {Object} Datos validados.
   * @throws {ApiError} Si la validación falla.
   */
  static validateCreate(data) {
    try {
      return proyectoCreateSchema.parse(data);
    } catch (error) {
      throw new ApiError(`Validación fallida: ${error.errors.map(e => e.message).join(', ')}`, 400);
    }
  }

  /**
   * Valida los datos del proyecto al actualizar.
   * @static
   * @param {Object} data - Datos a validar.
   * @returns {Object} Datos validados.
   * @throws {ApiError} Si la validación falla.
   */
  static validateUpdate(data) {
    try {
      return proyectoUpdateSchema.parse(data);
    } catch (error) {
      throw new ApiError(`Validación fallida: ${error.errors.map(e => e.message).join(', ')}`, 400);
    }
  }

  /**
   * Crea una instancia de Proyecto a partir de datos de la base de datos.
   * @static
   * @param {Object} dbData - Datos de la base de datos.
   * @returns {Proyecto} Instancia del modelo.
   */
  static fromDatabase(dbData) {
    return new Proyecto({
      id_proyecto: dbData.id_proyecto,
      titulo: dbData.titulo,
      descripcion: dbData.descripcion,
      estado: dbData.estado,
      fecha_inicio: dbData.fecha_inicio ? new Date(dbData.fecha_inicio) : null,
      fecha_fin_estimada: dbData.fecha_fin_estimada ? new Date(dbData.fecha_fin_estimada) : null,
      created_at: new Date(dbData.created_at),
      updated_at: new Date(dbData.updated_at)
    });
  }

  /**
   * Convierte el modelo a un objeto plano para la base de datos.
   * @returns {Object} Objeto preparado para la base de datos.
   */
  toDatabase() {
    return {
      titulo: this.titulo,
      descripcion: this.descripcion,
      estado: this.estado,
      fecha_inicio: this.fecha_inicio,
      fecha_fin_estimada: this.fecha_fin_estimada
    };
  }

  /**
   * Convierte el modelo a un objeto plano para la respuesta API.
   * @returns {Object} Objeto preparado para la respuesta.
   */
  toAPI() {
    return {
      id: this.id_proyecto,
      titulo: this.titulo,
      descripcion: this.descripcion,
      estado: this.estado,
      fecha_inicio: this.fecha_inicio?.toISOString().split('T')[0],
      fecha_fin_estimada: this.fecha_fin_estimada?.toISOString().split('T')[0],
      creado: this.created_at.toISOString(),
      actualizado: this.updated_at.toISOString()
    };
  }
}

export default Proyecto;
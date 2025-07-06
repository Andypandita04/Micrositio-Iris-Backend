// src/models/EmpleadoProyecto.js
/**
 * Modelo para la relación empleado-proyecto.
 * @class
 */
import { empleadoProyectoCreateSchema } from '../middlewares/validation/empleadoProyectoSchema.js';
import ApiError from '../utils/ApiError.js';

class EmpleadoProyecto {
  /**
   * Crea una instancia del modelo EmpleadoProyecto.
   * @param {Object} data - Datos de la relación empleado-proyecto.
   */
  constructor(data) {
    this.id_empleado_proyecto = data.id_empleado_proyecto;
    this.id_empleado = data.id_empleado;
    this.id_proyecto = data.id_proyecto;
    this.fecha_asignacion = data.fecha_asignacion ? new Date(data.fecha_asignacion) : new Date();
    this.rol = data.rol || null;
  }

  /**
   * Valida los datos al crear una relación empleado-proyecto.
   * @static
   * @param {Object} data - Datos a validar.
   * @returns {Object} Datos validados.
   * @throws {ApiError} Si la validación falla.
   */
  static validateCreate(data) {
    try {
      return empleadoProyectoCreateSchema.parse(data);
    } catch (error) {
      throw new ApiError(`Validación fallida: ${error.errors.map(e => e.message).join(', ')}`, 400);
    }
  }

  /**
   * Crea una instancia a partir de datos de la base de datos.
   * @static
   * @param {Object} dbData - Datos de la base de datos.
   * @returns {EmpleadoProyecto} Instancia del modelo.
   */
  static fromDatabase(dbData) {
    return new EmpleadoProyecto({
      id_empleado_proyecto: dbData.id_empleado_proyecto,
      id_empleado: dbData.id_empleado,
      id_proyecto: dbData.id_proyecto,
      fecha_asignacion: dbData.fecha_asignacion,
      rol: dbData.rol
    });
  }

  /**
   * Convierte el modelo a un objeto para la API.
   * @returns {Object} Objeto preparado para la respuesta.
   */
  toAPI() {
    return {
      id: this.id_empleado_proyecto,
      id_empleado: this.id_empleado,
      id_proyecto: this.id_proyecto,
      fecha_asignacion: this.fecha_asignacion.toISOString().split('T')[0],
      rol: this.rol
    };
  }
}

export default EmpleadoProyecto;
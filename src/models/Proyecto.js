// src/models/Proyecto.js
import { proyectoCreateSchema, proyectoUpdateSchema } from '../middlewares/validation/proyectoSchema.js';
import ApiError from '../utils/ApiError.js';

class Proyecto {
  constructor(data) {
    this.id_proyecto = data.id_proyecto;
    this.titulo = data.titulo;
    this.descripcion = data.descripcion || null;
    this.estado = data.estado && ['ACTIVO', 'INACTIVO', 'COMPLETADO'].includes(data.estado) 
      ? data.estado 
      : 'ACTIVO'; // Valor por defecto
    this.fecha_inicio = data.fecha_inicio ? new Date(data.fecha_inicio) : null;
    this.fecha_fin_estimada = data.fecha_fin_estimada ? new Date(data.fecha_fin_estimada) : null;
    this.id_categoria = data.id_categoria || 1; // Valor por defecto
    this.id_lider = data.id_lider || null;
    this.created_at = new Date(data.created_at || Date.now());
    this.updated_at = new Date(data.updated_at || Date.now());
  }

  /**
   * Crea una instancia de Proyecto a partir de datos de la base de datos
   * @static
   * @param {Object} dbData - Datos de la base de datos
   * @returns {Proyecto} - Instancia del modelo Proyecto
   */
  static fromDatabase(dbData) {
    return new Proyecto({
      id_proyecto: dbData.id_proyecto,
      titulo: dbData.titulo,
      descripcion: dbData.descripcion,
      estado: dbData.estado,
      fecha_inicio: dbData.fecha_inicio,
      fecha_fin_estimada: dbData.fecha_fin_estimada,
      id_categoria: dbData.id_categoria,
      id_lider: dbData.id_lider,
      created_at: dbData.created_at,
      updated_at: dbData.updated_at
    });
  }

  static validateCreate(data) {
    try {
      return proyectoCreateSchema.parse(data);
    } catch (error) {
      throw new ApiError(`Validación fallida: ${error.errors.map(e => e.message).join(', ')}`, 400);
    }
  }

  static validateUpdate(data) {
    try {
      return proyectoUpdateSchema.parse(data);
    } catch (error) {
      throw new ApiError(`Validación fallida: ${error.errors.map(e => e.message).join(', ')}`, 400);
    }
  }

  toDatabase() {
    return {
      titulo: this.titulo,
      descripcion: this.descripcion,
      estado: this.estado,
      fecha_inicio: this.fecha_inicio,
      fecha_fin_estimada: this.fecha_fin_estimada,
      id_categoria: this.id_categoria,
      id_lider: this.id_lider
    };
  }

  toAPI() {
    return {
      id: this.id_proyecto,
      titulo: this.titulo,
      descripcion: this.descripcion,
      estado: this.estado,
      fecha_inicio: this.fecha_inicio?.toISOString().split('T')[0],
      fecha_fin_estimada: this.fecha_fin_estimada?.toISOString().split('T')[0],
      id_categoria: this.id_categoria,
      id_lider: this.id_lider,
      creado: this.created_at.toISOString(),
      actualizado: this.updated_at.toISOString()
    };
  }
}

export default Proyecto;
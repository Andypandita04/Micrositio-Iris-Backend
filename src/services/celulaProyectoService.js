// src/services/celulaProyectoService.js
import CelulaProyectoRepository from '../repositories/celulaProyectoRepository.js';
import ProyectoRepository from '../repositories/proyectoRepository.js';
import EmpleadoRepository from '../repositories/empleadoRepository.js';
import ApiError from '../utils/ApiError.js';

class CelulaProyectoService {
  constructor() {
    this.celulaProyectoRepo = new CelulaProyectoRepository();
    this.proyectoRepo = new ProyectoRepository();
    this.empleadoRepo = new EmpleadoRepository();
  }

  /**
   * Valida la existencia de empleado y proyecto
   * @private
   */
  async _validarExistencias(idEmpleado, idProyecto) {
    const [empleado, proyecto] = await Promise.all([
      this.empleadoRepo.obtenerPorId(idEmpleado),
      this.proyectoRepo.obtenerPorProyecto(idProyecto)
    ]);

    if (!empleado) {
      throw new ApiError('El empleado no existe', 404);
    }
    if (!proyecto) {
      throw new ApiError('El proyecto no existe', 404);
    }
  }


  async obtenerPorEmpleado(idEmpleado) {
    if (!idEmpleado) {
      throw new ApiError('Se requiere el ID del empleado', 400);
    }

    // Validar que el empleado existe
    const empleado = await this.empleadoRepo.obtenerPorId(idEmpleado);
    if (!empleado) {
      throw new ApiError('El empleado no existe', 404);
    }

    const relaciones = await this.celulaProyectoRepo.obtenerPorEmpleado(idEmpleado);
    
    if (relaciones.length === 0) {
      throw new ApiError('No hay registros para este empleado', 404);
    }

    return relaciones.map(rel => rel.toAPI());
  }

  async obtenerPorProyecto(idProyecto) {
    if (!idProyecto) {
      throw new ApiError('Se requiere el ID del proyecto', 400);
    }

    // Validar que el proyecto existe
    const proyecto = await this.proyectoRepo.obtenerPorId(idProyecto);
    if (!proyecto) {
      throw new ApiError('El proyecto no existe', 404);
    }

    const relaciones = await this.celulaProyectoRepo.obtenerPorProyecto(idProyecto);
    
    if (relaciones.length === 0) {
      throw new ApiError('No hay registros para este proyecto', 404);
    }

    return relaciones.map(rel => rel.toAPI());
  }

  async obtenerTodos() {
    const relaciones = await this.celulaProyectoRepo.obtenerTodos();
    
    if (relaciones.length === 0) {
      throw new ApiError('No hay registros', 404);
    }

    return relaciones.map(rel => rel.toAPI());
  }

  async crear(celulaProyectoData) {
    // Validar que empleado y proyecto existen
    await this._validarExistencias(celulaProyectoData.id_empleado, celulaProyectoData.id_proyecto);

    const relacionesExistentes = await this.celulaProyectoRepo.obtenerTodos();
    const existe = relacionesExistentes.some(
      rel => rel.id_empleado === celulaProyectoData.id_empleado && 
             rel.id_proyecto === celulaProyectoData.id_proyecto
    );

    if (existe) {
      throw new ApiError('Esta relación ya existe', 400);
    }

    const nuevaRelacion = await this.celulaProyectoRepo.crear(celulaProyectoData);
    return nuevaRelacion.toAPI();
  }

  async crearMultiple(idEmpleados, idProyecto, activo = true) {
    if (!Array.isArray(idEmpleados) || idEmpleados.length === 0) {
      throw new ApiError('Debe proporcionar al menos un id_empleado', 400);
    }
    // Validar que todos los empleados existen
    const empleados = await Promise.all(idEmpleados.map(id => this.empleadoRepo.obtenerPorId(id)));
    if (empleados.some(e => !e)) {
      throw new ApiError('Uno o más empleados no existen', 404);
    }
    // Validar que el proyecto existe
    const proyecto = await this.proyectoRepo.obtenerPorId(idProyecto);
    if (!proyecto) {
      throw new ApiError('El proyecto no existe', 404);
    }
    // Crear todas las relaciones
    const relaciones = await this.celulaProyectoRepo.crearMultiple(
      idEmpleados.map(id_empleado => ({ id_empleado, id_proyecto: idProyecto, activo }))
    );
    return relaciones.map(rel => rel.toAPI ? rel.toAPI() : rel);
  }
  async eliminar(id) {
    if (!id) {
      throw new ApiError('Se requiere el ID de la relación', 400);
    }

    const relacion = await this.celulaProyectoRepo.obtenerPorId(id);
    if (!relacion) {
      throw new ApiError('La relación no existe', 404);
    }

    await this.celulaProyectoRepo.eliminar(id);
  }

  async actualizarActivo(id, activo) {
    if (!id) {
      throw new ApiError('Se requiere el ID de la relación', 400);
    }

    if (typeof activo !== 'boolean') {
      throw new ApiError('El campo activo debe ser un valor booleano', 400);
    }

    // Validar que la relación existe
    const relacionExistente = await this.celulaProyectoRepo.obtenerPorId(id);
    if (!relacionExistente) {
      throw new ApiError('La relación no existe', 404);
    }

    const relacionActualizada = await this.celulaProyectoRepo.actualizarActivo(id, activo);
    return relacionActualizada.toAPI();
  }


}

export default CelulaProyectoService;
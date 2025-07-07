// src/services/secuenciaService.js
import SecuenciaRepository from '../repositories/secuenciaRepository.js';
import ProyectoRepository from '../repositories/proyectoRepository.js';
import ApiError from '../utils/ApiError.js';

class SecuenciaService {
  constructor() {
    this.secuenciaRepo = new SecuenciaRepository();
    this.proyectoRepo = new ProyectoRepository();
  }

  /**
   * Obtiene secuencias por proyecto
   * @param {number} id_proyecto 
   * @returns {Promise<Array>}
   */
  async obtenerPorProyecto(id_proyecto) {
    // Validar que el proyecto existe
    const proyecto = await this.proyectoRepo.obtenerProyectoPorId(id_proyecto);
    if (!proyecto) {
      throw new ApiError('Proyecto no encontrado', 404);
    }

    const secuencias = await this.secuenciaRepo.obtenerPorProyecto(id_proyecto);
    return secuencias.map(sec => sec.toAPI());
  }

  /**
   * Obtiene todas las secuencias
   * @returns {Promise<Array>}
   */
  async obtenerTodas() {
    const secuencias = await this.secuenciaRepo.obtenerTodas();
    return secuencias.map(sec => sec.toAPI());
  }

  /**
   * Crea una nueva secuencia
   * @param {Object} secuenciaData 
   * @returns {Promise<Object>}
   */
  async crear(secuenciaData) {
    // Validar que el proyecto existe
    const proyecto = await this.proyectoRepo.obtenerProyectoPorId(secuenciaData.id_proyecto);
    if (!proyecto) {
      throw new ApiError('Proyecto no encontrado', 404);
    }

    const secuencia = await this.secuenciaRepo.crear(secuenciaData);
    return secuencia.toAPI();
  }

  /**
   * Actualiza una secuencia
   * @param {number} id_secuencia 
   * @param {Object} updateData 
   * @returns {Promise<Object>}
   */
  async actualizar(id_secuencia, updateData) {
    const secuencia = await this.secuenciaRepo.actualizar(id_secuencia, updateData);
    return secuencia.toAPI();
  }

  /**
   * Elimina una secuencia
   * @param {number} id_secuencia 
   * @returns {Promise<void>}
   */
  async eliminar(id_secuencia) {
    await this.secuenciaRepo.eliminar(id_secuencia);
  }
}

export default SecuenciaService;
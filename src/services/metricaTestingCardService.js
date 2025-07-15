// src/services/metricaTestingCardService.js
import MetricaTestingCardRepository from '../repositories/metricaTestingCardRepository.js';
import ApiError from '../utils/ApiError.js';
import MetricaTestingCard from '../models/MetricaTestingCard.js';

class MetricaTestingCardService {
  constructor() {
    this.metricaRepo = new MetricaTestingCardRepository();
  }

  /**
   * Obtiene métricas por testing card
   * @param {number} idTestingCard - ID de la testing card
   * @returns {Promise<Array>} Lista de métricas
   * @throws {ApiError} Si no existe la testing card o no tiene métricas
   */
  async obtenerPorTestingCard(idTestingCard) {
    const existeTC = await this.metricaRepo.existeTestingCard(idTestingCard);
    if (!existeTC) {
      throw new ApiError('Testing card no encontrada', 404);
    }

    const metricas = await this.metricaRepo.obtenerPorTestingCard(idTestingCard);
    if (metricas.length === 0) {
      throw new ApiError('La testing card no tiene métricas asociadas', 404);
    }

    return metricas.map(m => m.toAPI());
  }

  /**
   * Obtiene una métrica por su ID
   * @param {number} idMetrica - ID de la métrica
   * @returns {Promise<Object>} Métrica encontrada
   * @throws {ApiError} Si la métrica no existe
   */
  async obtenerPorId(idMetrica) {
    const metrica = await this.metricaRepo.obtenerPorId(idMetrica);
    if (!metrica) {
      throw new ApiError('Métrica no encontrada', 404);
    }
    return metrica.toAPI();
  }

  /**
   * Obtiene todas las métricas
   * @returns {Promise<Array>} Lista de todas las métricas
   */
  async obtenerTodas() {
    const metricas = await this.metricaRepo.obtenerTodas();
    return metricas.map(m => m.toAPI());
  }

  /**
   * Crea una nueva métrica
   * @param {Object} metricaData - Datos de la métrica
   * @returns {Promise<Object>} Métrica creada
   * @throws {ApiError} Si no existe la testing card
   */
  async crear(metricaData) {
    const datosValidados = MetricaTestingCard.validateCreate(metricaData);
    
    const existeTC = await this.metricaRepo.existeTestingCard(datosValidados.id_testing_card);
    if (!existeTC) {
      throw new ApiError('Testing card no encontrada', 404);
    }

    const metrica = await this.metricaRepo.crear(datosValidados);
    return metrica.toAPI();
  }

  /**
   * Actualiza una métrica
   * @param {number} idMetrica - ID de la métrica
   * @param {Object} updateData - Datos a actualizar
   * @returns {Promise<Object>} Métrica actualizada
   * @throws {ApiError} Si la métrica no existe
   */
  async actualizar(idMetrica, updateData) {
    const datosValidados = MetricaTestingCard.validateUpdate(updateData);
    const metrica = await this.metricaRepo.actualizar(idMetrica, datosValidados);
    return metrica.toAPI();
  }

  /**
   * Elimina una métrica
   * @param {number} idMetrica - ID de la métrica
   * @returns {Promise<Object>} Métrica eliminada
   * @throws {ApiError} Si la métrica no existe
   */
  async eliminar(idMetrica) {
    const metrica = await this.metricaRepo.eliminar(idMetrica);
    return metrica.toAPI();
  }
}

export default MetricaTestingCardService;
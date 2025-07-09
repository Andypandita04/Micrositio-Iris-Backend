// src/repositories/metricaTestingCardRepository.js
import supabase from '../config/supabaseClient.js';
import ApiError from '../utils/ApiError.js';
import MetricaTestingCard from '../models/MetricaTestingCard.js';

class MetricaTestingCardRepository {
  /**
   * Obtiene métricas por testing card
   * @param {number} idTestingCard - ID de la testing card
   * @returns {Promise<Array>} Lista de métricas
   * @throws {ApiError} Si hay error al consultar
   */
  async obtenerPorTestingCard(idTestingCard) {
    const { data, error } = await supabase
      .from('metrica_testing_card')
      .select('*')
      .eq('id_testing_card', idTestingCard);

    if (error) {
      throw new ApiError(`Error al obtener métricas: ${error.message}`, 500);
    }

    return data.map(metrica => MetricaTestingCard.fromDatabase(metrica));
  }

  /**
   * Obtiene una métrica por su ID
   * @param {number} idMetrica - ID de la métrica
   * @returns {Promise<Object|null>} Métrica encontrada o null
   * @throws {ApiError} Si hay error al consultar
   */
  async obtenerPorId(idMetrica) {
    const { data, error } = await supabase
      .from('metrica_testing_card')
      .select('*')
      .eq('id_metrica', idMetrica)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new ApiError(`Error al obtener métrica: ${error.message}`, 500);
    }

    return data ? MetricaTestingCard.fromDatabase(data) : null;
  }

  /**
   * Obtiene todas las métricas
   * @returns {Promise<Array>} Lista de todas las métricas
   * @throws {ApiError} Si hay error al consultar
   */
  async obtenerTodas() {
    const { data, error } = await supabase
      .from('metrica_testing_card')
      .select('*');

    if (error) {
      throw new ApiError(`Error al obtener métricas: ${error.message}`, 500);
    }

    return data.map(metrica => MetricaTestingCard.fromDatabase(metrica));
  }

  /**
   * Crea una nueva métrica
   * @param {Object} metricaData - Datos de la métrica
   * @returns {Promise<Object>} Métrica creada
   * @throws {ApiError} Si hay error al crear
   */
  async crear(metricaData) {
    const { data, error } = await supabase
      .from('metrica_testing_card')
      .insert(metricaData)
      .select();

    if (error) {
      throw new ApiError(`Error al crear métrica: ${error.message}`, 500);
    }

    return MetricaTestingCard.fromDatabase(data[0]);
  }

  /**
   * Actualiza una métrica
   * @param {number} idMetrica - ID de la métrica
   * @param {Object} updateData - Datos a actualizar
   * @returns {Promise<Object>} Métrica actualizada
   * @throws {ApiError} Si hay error al actualizar
   */
  async actualizar(idMetrica, updateData) {
    const { data, error } = await supabase
      .from('metrica_testing_card')
      .update(updateData)
      .eq('id_metrica', idMetrica)
      .select();

    if (error) {
      throw new ApiError(`Error al actualizar métrica: ${error.message}`, 500);
    }

    return MetricaTestingCard.fromDatabase(data[0]);
  }

  /**
   * Elimina una métrica
   * @param {number} idMetrica - ID de la métrica
   * @returns {Promise<Object>} Métrica eliminada
   * @throws {ApiError} Si hay error al eliminar
   */
  async eliminar(idMetrica) {
    const { data, error } = await supabase
      .from('metrica_testing_card')
      .delete()
      .eq('id_metrica', idMetrica)
      .select();

    if (error) {
      throw new ApiError(`Error al eliminar métrica: ${error.message}`, 500);
    }

    if (!data || data.length === 0) {
      throw new ApiError('Métrica no encontrada', 404);
    }

    return MetricaTestingCard.fromDatabase(data[0]);
  }

  /**
   * Verifica si existe una testing card
   * @param {number} idTestingCard - ID de la testing card
   * @returns {Promise<boolean>} True si existe
   * @throws {ApiError} Si hay error al consultar
   */
  async existeTestingCard(idTestingCard) {
    const { data, error } = await supabase
      .from('testing_card')
      .select('id_testing_card')
      .eq('id_testing_card', idTestingCard)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new ApiError(`Error al verificar testing card: ${error.message}`, 500);
    }

    return !!data;
  }
}

export default MetricaTestingCardRepository;
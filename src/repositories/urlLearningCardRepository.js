// src/repositories/urlLearningCardRepository.js
import supabase from '../config/supabaseClient.js';
import ApiError from '../utils/ApiError.js';
import UrlLearningCard from '../models/UrlLearningCard.js';

class UrlLearningCardRepository {
  /**
   * Obtiene URLs por learning card
   * @param {number} idLearningCard - ID de la learning card
   * @returns {Promise<Array>} Lista de URLs
   * @throws {ApiError} Si hay error al consultar
   */
  async obtenerPorLearningCard(idLearningCard) {
    const { data, error } = await supabase
      .from('url_learning_card')
      .select('*')
      .eq('id_learning_card', idLearningCard);

    if (error) {
      throw new ApiError(`Error al obtener URLs: ${error.message}`, 500);
    }

    return data.map(url => UrlLearningCard.fromDatabase(url));
  }

  /**
   * Obtiene una URL por su ID
   * @param {number} idUrl - ID de la URL
   * @returns {Promise<UrlLearningCard|null>} URL encontrada o null
   * @throws {ApiError} Si hay error al consultar
   */
  async obtenerPorId(idUrl) {
    const { data, error } = await supabase
      .from('url_learning_card')
      .select('*')
      .eq('id_url_lc', idUrl)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new ApiError(`Error al obtener URL: ${error.message}`, 500);
    }

    return data ? UrlLearningCard.fromDatabase(data) : null;
  }

  /**
   * Obtiene todas las URLs
   * @returns {Promise<Array>} Lista de todas las URLs
   * @throws {ApiError} Si hay error al consultar
   */
  async obtenerTodas() {
    const { data, error } = await supabase
      .from('url_learning_card')
      .select('*');

    if (error) {
      throw new ApiError(`Error al obtener URLs: ${error.message}`, 500);
    }

    return data.map(url => UrlLearningCard.fromDatabase(url));
  }

  /**
   * Crea una nueva URL
   * @param {Object} urlData - Datos de la URL
   * @returns {Promise<UrlLearningCard>} URL creada
   * @throws {ApiError} Si hay error al crear
   */
  async crear(urlData) {
    const { data, error } = await supabase
      .from('url_learning_card')
      .insert(urlData)
      .select()
      .single();

    if (error) {
      throw new ApiError(`Error al crear URL: ${error.message}`, 500);
    }

    return UrlLearningCard.fromDatabase(data);
  }

  /**
   * Actualiza una URL
   * @param {number} idUrl - ID de la URL
   * @param {Object} urlData - Datos a actualizar
   * @returns {Promise<UrlLearningCard|null>} URL actualizada o null
   * @throws {ApiError} Si hay error al actualizar
   */
  async actualizar(idUrl, urlData) {
    const { data, error } = await supabase
      .from('url_learning_card')
      .update(urlData)
      .eq('id_url_lc', idUrl)
      .select()
      .single();

    if (error) {
      throw new ApiError(`Error al actualizar URL: ${error.message}`, 500);
    }

    return data ? UrlLearningCard.fromDatabase(data) : null;
  }

  /**
   * Elimina una URL
   * @param {number} idUrl - ID de la URL
   * @returns {Promise<UrlLearningCard|null>} URL eliminada o null
   * @throws {ApiError} Si hay error al eliminar
   */
  async eliminar(idUrl) {
    const { data, error } = await supabase
      .from('url_learning_card')
      .delete()
      .eq('id_url_lc', idUrl)
      .select()
      .single();

    if (error) {
      throw new ApiError(`Error al eliminar URL: ${error.message}`, 500);
    }

    return data ? UrlLearningCard.fromDatabase(data) : null;
  }

  /**
   * Verifica si existe una learning card
   * @param {number} idLearningCard - ID de la learning card
   * @returns {Promise<boolean>} True si existe
   * @throws {ApiError} Si hay error al consultar
   */
  async existeLearningCard(idLearningCard) {
    const { data, error } = await supabase
      .from('learning_card')
      .select('id')
      .eq('id', idLearningCard)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new ApiError(`Error al verificar learning card: ${error.message}`, 500);
    }

    return !!data;
  }
}

export default UrlLearningCardRepository;

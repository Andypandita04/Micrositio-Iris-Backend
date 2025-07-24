// src/repositories/urlTestingCardRepository.js
import supabase from '../config/supabaseClient.js';
import ApiError from '../utils/ApiError.js';
import UrlTestingCard from '../models/UrlTestingCard.js';

class UrlTestingCardRepository {
  /**
   * Obtiene URLs por testing card
   * @param {number} idTestingCard - ID de la testing card
   * @returns {Promise<Array>} Lista de URLs
   * @throws {ApiError} Si hay error al consultar
   */
  async obtenerPorTestingCard(idTestingCard) {
    const { data, error } = await supabase
      .from('url_testing_card')
      .select('*')
      .eq('id_testing_card', idTestingCard);

    if (error) {
      throw new ApiError(`Error al obtener URLs: ${error.message}`, 500);
    }

    return data.map(url => UrlTestingCard.fromDatabase(url));
  }

  /**
   * Obtiene una URL por su ID
   * @param {number} idUrl - ID de la URL
   * @returns {Promise<UrlTestingCard|null>} URL encontrada o null
   * @throws {ApiError} Si hay error al consultar
   */
  async obtenerPorId(idUrl) {
    const { data, error } = await supabase
      .from('url_testing_card')
      .select('*')
      .eq('id_url_tc', idUrl)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new ApiError(`Error al obtener URL: ${error.message}`, 500);
    }

    return data ? UrlTestingCard.fromDatabase(data) : null;
  }

  /**
   * Obtiene todas las URLs
   * @returns {Promise<Array>} Lista de todas las URLs
   * @throws {ApiError} Si hay error al consultar
   */
  async obtenerTodas() {
    const { data, error } = await supabase
      .from('url_testing_card')
      .select('*');

    if (error) {
      throw new ApiError(`Error al obtener URLs: ${error.message}`, 500);
    }

    return data.map(url => UrlTestingCard.fromDatabase(url));
  }

  /**
   * Crea una nueva URL
   * @param {Object} urlData - Datos de la URL
   * @returns {Promise<UrlTestingCard>} URL creada
   * @throws {ApiError} Si hay error al crear
   */
  async crear(urlData) {
    const { data, error } = await supabase
      .from('url_testing_card')
      .insert(urlData)
      .select()
      .single();

    if (error) {
      throw new ApiError(`Error al crear URL: ${error.message}`, 500);
    }

    return UrlTestingCard.fromDatabase(data);
  }

  /**
   * Actualiza una URL
   * @param {number} idUrl - ID de la URL
   * @param {Object} urlData - Datos a actualizar
   * @returns {Promise<UrlTestingCard|null>} URL actualizada o null
   * @throws {ApiError} Si hay error al actualizar
   */
  async actualizar(idUrl, urlData) {
    const { data, error } = await supabase
      .from('url_testing_card')
      .update(urlData)
      .eq('id_url_tc', idUrl)
      .select()
      .single();

    if (error) {
      throw new ApiError(`Error al actualizar URL: ${error.message}`, 500);
    }

    return data ? UrlTestingCard.fromDatabase(data) : null;
  }

  /**
   * Elimina una URL
   * @param {number} idUrl - ID de la URL
   * @returns {Promise<UrlTestingCard|null>} URL eliminada o null
   * @throws {ApiError} Si hay error al eliminar
   */
  async eliminar(idUrl) {
    const { data, error } = await supabase
      .from('url_testing_card')
      .delete()
      .eq('id_url_tc', idUrl)
      .select()
      .single();

    if (error) {
      throw new ApiError(`Error al eliminar URL: ${error.message}`, 500);
    }

    return data ? UrlTestingCard.fromDatabase(data) : null;
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

export default UrlTestingCardRepository;

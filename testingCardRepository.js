// src/repositories/testingCardRepository.js
import supabase from './src/config/supabaseClient.js';
import ApiError from './src/utils/ApiError.js';
import TestingCard from '../models/TestingCard.js';

class TestingCardRepository {
  /**
   * Obtiene una testing card por ID
   * @param {number} id_testing_card 
   * @returns {Promise<TestingCard|null>}
   */
  async obtenerPorId(id_testing_card) {
    const { data, error } = await supabase
      .from('testing_card')
      .select('*')
      .eq('id_testing_card', id_testing_card)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new ApiError(`Error al obtener testing card: ${error.message}`, 500);
    }

    return data ? new TestingCard(data) : null;
  }

  /**
   * Obtiene testing cards por secuencia
   * @param {number} id_secuencia 
   * @returns {Promise<Array<TestingCard>>}
   */
  async obtenerPorSecuencia(id_secuencia) {
    const { data, error } = await supabase
      .from('testing_card')
      .select('*')
      .eq('id_secuencia', id_secuencia);

    if (error) {
      throw new ApiError(`Error al obtener testing cards: ${error.message}`, 500);
    }

    return data.map(tc => new TestingCard(tc));
  }

  /**
   * Obtiene todas las testing cards
   * @returns {Promise<Array<TestingCard>>}
   */
  async obtenerTodas() {
    const { data, error } = await supabase
      .from('testing_card')
      .select('*');

    if (error) {
      throw new ApiError(`Error al obtener testing cards: ${error.message}`, 500);
    }

    return data.map(tc => new TestingCard(tc));
  }

  /**
   * Crea una nueva testing card
   * @param {Object} testingCardData 
   * @returns {Promise<TestingCard>}
   */
  async crear(testingCardData) {
    const { data, error } = await supabase
      .from('testing_card')
      .insert(testingCardData)
      .select();

    if (error) {
      throw new ApiError(`Error al crear testing card: ${error.message}`, 500);
    }

    return new TestingCard(data[0]);
  }

  /**
   * Actualiza una testing card
   * @param {number} id_testing_card 
   * @param {Object} updateData 
   * @returns {Promise<TestingCard>}
   */
  async actualizar(id_testing_card, updateData) {
    const { data, error } = await supabase
      .from('testing_card')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('id_testing_card', id_testing_card)
      .select();

    if (error) {
      throw new ApiError(`Error al actualizar testing card: ${error.message}`, 500);
    }

    return new TestingCard(data[0]);
  }

  /**
   * Elimina una testing card
   * @param {number} id_testing_card 
   * @returns {Promise<TestingCard>}
   */
  async eliminar(id_testing_card) {
    const { data, error } = await supabase
      .from('testing_card')
      .delete()
      .eq('id_testing_card', id_testing_card)
      .select();

    if (error) {
      throw new ApiError(`Error al eliminar testing card: ${error.message}`, 500);
    }

    if (!data || data.length === 0) {
      throw new ApiError('Testing card no encontrada', 404);
    }

    return new TestingCard(data[0]);
  }
}

export default TestingCardRepository;
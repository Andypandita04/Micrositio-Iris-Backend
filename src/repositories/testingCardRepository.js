// src/repositories/testingCardRepository.js
import supabase from '../config/supabaseClient.js';
import ApiError from '../utils/ApiError.js';
import TestingCard from '../models/TestingCard.js';

class TestingCardRepository {
  async obtenerPorId(id_testing_card) {
    const { data, error } = await supabase
      .from('testing_card')
      .select('*')
      .eq('id_testing_card', id_testing_card)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new ApiError(`Error al obtener testing card: ${error.message}`, 500);
    }

    return data ? TestingCard.fromDatabase(data) : null;
  }

  async obtenerPorSecuencia(id_secuencia) {
    const { data, error } = await supabase
      .from('testing_card')
      .select('*')
      .eq('id_secuencia', id_secuencia);

    if (error) {
      throw new ApiError(`Error al obtener testing cards por secuencia: ${error.message}`, 500);
    }

    return data.map(item => TestingCard.fromDatabase(item));
  }

  async obtenerPorPadre(padre_id) {
    const { data, error } = await supabase
      .from('testing_card')
      .select('*')
      .eq('padre_id', padre_id);

    if (error) {
      throw new ApiError(`Error al obtener testing cards por padre: ${error.message}`, 500);
    }

    return data.map(item => TestingCard.fromDatabase(item));
  }

  async listarTodos() {
    const { data, error } = await supabase
      .from('testing_card')
      .select('*');

    if (error) {
      throw new ApiError(`Error al listar testing cards: ${error.message}`, 500);
    }

    return data.map(item => TestingCard.fromDatabase(item));
  }

  async crear(testingCardData) {
    const { data, error } = await supabase
      .from('testing_card')
      .insert(testingCardData)
      .select();

    if (error) {
      throw new ApiError(`Error al crear testing card: ${error.message}`, 500);
    }

    return TestingCard.fromDatabase(data[0]);
  }

  async actualizar(id_testing_card, testingCardData) {
    // Implementación para actualizar la Testing Card en la base de datos
    // Ejemplo usando un ORM o consulta SQL:
    return await db.testingCards.update(testingCardData, {
      where: { id_testing_card }
    });
  }

  async eliminar(id_testing_card) {
    const { data, error } = await supabase
      .from('testing_card')
      .delete()
      .eq('id_testing_card', id_testing_card)
      .select();

    if (error) {
      throw new ApiError(`Error al eliminar testing card: ${error.message}`, 500);
    }

    return data ? TestingCard.fromDatabase(data[0]) : null;
  }
}

export default TestingCardRepository;
import LearningCardRepository from '../repositories/learningCardRepository.js';
import TestingCardRepository from '../repositories/testingCardRepository.js';
import ApiError from '../utils/ApiError.js';

class LearningCardService {
  constructor() {
    this.learningCardRepo = new LearningCardRepository();
    this.testingCardRepo = new TestingCardRepository();
  }

  /**
   * Obtiene learning card por testing card ID
   * @async
   * @param {number} idTestingCard - ID de testing card
   * @returns {Promise<Object>} Learning card encontrada
   * @throws {ApiError} Si no existe testing card o learning card
   */
    async obtenerPorTestingCard(idTestingCard) {
    // Validar que el ID es un número válido
    if (!Number.isInteger(idTestingCard)) {
        throw new ApiError('ID de testing card inválido', 400);
    }

    // Verificar que existe la testing card
    const testingCard = await this.testingCardRepo.obtenerPorId(idTestingCard);
    if (!testingCard) {
        throw new ApiError('Testing card no encontrada', 404);
    }

    // Obtener learning card
    const learningCard = await this.learningCardRepo.obtenerPorTestingCard(idTestingCard);
    if (!learningCard) {
        throw new ApiError('No existe learning card para esta testing card', 404);
    }

    // Verificar que la learning card tiene datos válidos
    if (!learningCard.id) {
        throw new ApiError('Datos de learning card inválidos', 500);
    }

    return learningCard.toAPI();
    }


  /**
   * Obtiene learning card por ID
   * @async
   * @param {number} id - ID de learning card
   * @returns {Promise<Object>} Learning card encontrada
   * @throws {ApiError} Si no existe
   */
  async obtenerPorId(id) {
    const learningCard = await this.learningCardRepo.obtenerPorId(id);
    if (!learningCard) {
      throw new ApiError('Learning card no encontrada', 404);
    }

    return learningCard.toAPI();
  }

  /**
   * Obtiene todas las learning cards
   * @async
   * @returns {Promise<Array>} Lista de learning cards
   */
  async obtenerTodos() {
    const learningCards = await this.learningCardRepo.obtenerTodos();
    return learningCards.map(lc => lc.toAPI());
  }

  /**
   * Crea una nueva learning card
   * @async
   * @param {Object} learningCardData - Datos de la learning card
   * @returns {Promise<Object>} Learning card creada
   * @throws {ApiError} Si no existe testing card
   */
  async crear(learningCardData) {
    // Verificar que existe la testing card
    const testingCard = await this.testingCardRepo.obtenerPorId(learningCardData.id_testing_card);
    if (!testingCard) {
      throw new ApiError('Testing card no encontrada', 404);
    }

    const learningCard = await this.learningCardRepo.crear(learningCardData);
    return learningCard.toAPI();
  }

  /**
   * Actualiza una learning card
   * @async
   * @param {number} id - ID de learning card
   * @param {Object} updateData - Datos a actualizar
   * @returns {Promise<Object>} Learning card actualizada
   * @throws {ApiError} Si no existe
   */
    async actualizar(id, updateData) {
        // Validación adicional del ID
        if (!Number.isInteger(id)) {
            throw new ApiError('ID de learning card inválido', 400);
        }

        const learningCard = await this.learningCardRepo.actualizar(id, updateData);
        return learningCard.toAPI();
    }

  /**
   * Elimina una learning card
   * @async
   * @param {number} id - ID de learning card
   * @returns {Promise<Object>} Learning card eliminada
   * @throws {ApiError} Si no existe
   */
  async eliminar(id) {
    const learningCard = await this.learningCardRepo.eliminar(id);
    return learningCard.toAPI();
  }
}

export default LearningCardService;
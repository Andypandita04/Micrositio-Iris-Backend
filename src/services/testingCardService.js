// src/services/testingCardService.js
import TestingCardRepository from '../repositories/testingCardRepository.js';
import ApiError from '../utils/ApiError.js';

class TestingCardService {
  constructor() {
    this.testingCardRepo = new TestingCardRepository();
  }

  async obtenerPorId(id_testing_card) {
    const testingCard = await this.testingCardRepo.obtenerPorId(id_testing_card);
    
    if (!testingCard) {
      throw new ApiError('Testing card no encontrada', 404);
    }
    
    return testingCard.toAPI();
  }

  async obtenerPorSecuencia(id_secuencia) {
    const testingCards = await this.testingCardRepo.obtenerPorSecuencia(id_secuencia);
    
    if (testingCards.length === 0) {
      throw new ApiError('No se encontraron testing cards para esta secuencia', 404);
    }
    
    return testingCards.map(tc => tc.toAPI());
  }

  async obtenerPorPadre(padre_id) {
    const testingCards = await this.testingCardRepo.obtenerPorPadre(padre_id);
    
    if (testingCards.length === 0) {
      throw new ApiError('No se encontraron testing cards hijas para este padre', 404);
    }
    
    return testingCards.map(tc => tc.toAPI());
  }

  async listarTodos() {
    const testingCards = await this.testingCardRepo.listarTodos();
    return testingCards.map(tc => tc.toAPI());
  }

  async crear(testingCardData) {
    const testingCard = await this.testingCardRepo.crear(testingCardData);
    return testingCard.toAPI();
  }

  async actualizar(id_testing_card, testingCardData) {
    const testingCard = await this.testingCardRepo.actualizar(id_testing_card, testingCardData);
    
    if (!testingCard) {
      throw new ApiError('Testing card no encontrada', 404);
    }
    
    return testingCard.toAPI();
  }

  async eliminar(id_testing_card) {
    const testingCard = await this.testingCardRepo.eliminar(id_testing_card);
    
    if (!testingCard) {
      throw new ApiError('Testing card no encontrada', 404);
    }
    
    return testingCard.toAPI();
  }
}

export default TestingCardService;
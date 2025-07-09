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
      throw new ApiError('No se encontraron testing cards hijas', 404);
    }
    
    return testingCards.map(tc => tc.toAPI());
  }

  async obtenerTodos() {
    const testingCards = await this.testingCardRepo.obtenerTodos();
    return testingCards.map(tc => tc.toAPI());
  }

  async crear(testingCardData) {
    // Asegurar que id_responsable tenga un valor
    const datosCompletos = {
      ...testingCardData,
      id_responsable: testingCardData.id_responsable || 1 // Cambia 1 por un ID válido por defecto
    };
    
    const testingCard = await this.testingCardRepo.crear(datosCompletos);
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
    const deleted = await this.testingCardRepo.eliminar(id_testing_card);
    
    if (!deleted) {
      throw new ApiError('Testing card no encontrada', 404);
    }
    
    return deleted.toAPI();
  }
}

export default TestingCardService;
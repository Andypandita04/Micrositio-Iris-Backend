// src/services/testingCardService.js
import SecuenciaRepository from '../repositories/secuenciaRepository.js';
import EmpleadoRepository from '../repositories/empleadoRepository.js';
import TestingCardRepository from '../../testingCardRepository.js';
import ExperimentoTipoRepository from '../repositories/experimentoTipoRepository.js';


import ApiError from '../utils/ApiError.js';

class TestingCardService {
  constructor() {
    this.testingCardRepo = new TestingCardRepository();
    this.secuenciaRepo = new SecuenciaRepository();
    this.empleadoRepo = new EmpleadoRepository();
    this.experimentoTipoRepo = new ExperimentoTipoRepository();
  }

  /**
   * Obtiene una testing card por ID
   * @param {number} id_testing_card 
   * @returns {Promise<Object>}
   */
  async obtenerPorId(id_testing_card) {
    const testingCard = await this.testingCardRepo.obtenerPorId(id_testing_card);
    
    if (!testingCard) {
      throw new ApiError('Testing card no encontrada', 404);
    }
    
    return testingCard.toAPI();
  }

  /**
   * Obtiene testing cards por secuencia
   * @param {number} id_secuencia 
   * @returns {Promise<Array>}
   */
  async obtenerPorSecuencia(id_secuencia) {
    // Validar que la secuencia existe
    const secuencia = await this.secuenciaRepo.obtenerPorId(id_secuencia);
    if (!secuencia) {
      throw new ApiError('Secuencia no encontrada', 404);
    }

    const testingCards = await this.testingCardRepo.obtenerPorSecuencia(id_secuencia);
    return testingCards.map(tc => tc.toAPI());
  }

  /**
   * Obtiene todas las testing cards
   * @returns {Promise<Array>}
   */
  async obtenerTodas() {
    const testingCards = await this.testingCardRepo.obtenerTodas();
    return testingCards.map(tc => tc.toAPI());
  }

  /**
   * Crea una nueva testing card
   * @param {Object} testingCardData 
   * @returns {Promise<Object>}
   */
  async crear(testingCardData) {
    // Validar referencias mínimas
    const secuencia = await this.secuenciaRepo.obtenerPorId(testingCardData.id_secuencia);
    if (!secuencia) {
        throw new ApiError('Secuencia no encontrada', 404);
    }

    // Valores por defecto
    const datosCompletos = {
        hipotesis: testingCardData.hipotesis || "Hipótesis no especificada",
        descripcion: testingCardData.descripcion || "Descripción no proporcionada",
        dia_inicio: testingCardData.dia_inicio || new Date(),
        dia_fin: testingCardData.dia_fin || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 días
        id_experimento_tipo: testingCardData.id_experimento_tipo || 1, // Valor por defecto
        id_empleado: testingCardData.id_empleado || 1, // Valor por defecto o tomar del usuario autenticado
        ...testingCardData
    };

    // Crear la testing card
    const testingCard = await this.testingCardRepo.crear(datosCompletos);

    // Si no viene padre_id, actualizar con su propio ID
    if (!testingCardData.padre_id) {
        const updatedCard = await this.testingCardRepo.actualizar(
        testingCard.id_testing_card, 
        { padre_id: testingCard.id_testing_card }
        );
        return updatedCard.toAPI();
    }

    return testingCard.toAPI();
    }

  /**
   * Actualiza una testing card
   * @param {number} id_testing_card 
   * @param {Object} updateData 
   * @returns {Promise<Object>}
   */
  async actualizar(id_testing_card, updateData) {
    // Eliminar campos no modificables
    delete updateData.id_secuencia;
    delete updateData.id_testing_card;

    // Validar referencias si se están actualizando
    if (updateData.id_empleado) {
      const empleado = await this.empleadoRepo.obtenerPorId(updateData.id_empleado);
      if (!empleado) {
        throw new ApiError('Empleado no encontrado', 404);
      }
    }

    if (updateData.id_experimento_tipo) {
      const experimentoTipo = await this.experimentoTipoRepo.obtenerPorId(updateData.id_experimento_tipo);
      if (!experimentoTipo) {
        throw new ApiError('Tipo de experimento no encontrado', 404);
      }
    }

    const testingCard = await this.testingCardRepo.actualizar(id_testing_card, updateData);
    return testingCard.toAPI();
  }

  /**
   * Elimina una testing card
   * @param {number} id_testing_card 
   * @returns {Promise<void>}
   */
  async eliminar(id_testing_card) {
    await this.testingCardRepo.eliminar(id_testing_card);
  }

  /**
   * Valida las referencias de una testing card
   * @private
   */
  async validarReferencias(testingCardData) {
    const secuencia = await this.secuenciaRepo.obtenerPorId(testingCardData.id_secuencia);
    if (!secuencia) {
      throw new ApiError('Secuencia no encontrada', 404);
    }

    const empleado = await this.empleadoRepo.obtenerPorId(testingCardData.id_empleado);
    if (!empleado) {
      throw new ApiError('Empleado no encontrado', 404);
    }

    const experimentoTipo = await this.experimentoTipoRepo.obtenerPorId(testingCardData.id_experimento_tipo);
    if (!experimentoTipo) {
      throw new ApiError('Tipo de experimento no encontrado', 404);
    }

    if (testingCardData.padre_id) {
      const padre = await this.testingCardRepo.obtenerPorId(testingCardData.padre_id);
      if (!padre) {
        throw new ApiError('Testing card padre no encontrada', 404);
      }
    }
  }
}

export default TestingCardService;
// src/controllers/testingCardController.js
import TestingCardService from './src/services/testingCardService.js';
import { testingCardCreateSchema, testingCardUpdateSchema } from './testingCardSchema.js';
import ApiError from './src/utils/ApiError.js';

class TestingCardController {
  constructor() {
    this.testingCardService = new TestingCardService();
  }

  /**
   * Obtiene una testing card por ID
   */
  async obtenerPorId(req, res, next) {
    try {
      if (!req.body.id_testing_card) {
        throw new ApiError('Se requiere el campo id_testing_card', 400);
      }

      const testingCard = await this.testingCardService.obtenerPorId(req.body.id_testing_card);
      res.json(testingCard);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtiene testing cards por secuencia
   */
  async obtenerPorSecuencia(req, res, next) {
    try {
      if (!req.body.id_secuencia) {
        throw new ApiError('Se requiere el campo id_secuencia', 400);
      }

      const testingCards = await this.testingCardService.obtenerPorSecuencia(req.body.id_secuencia);
      res.json(testingCards);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtiene todas las testing cards
   */
  async obtenerTodas(req, res, next) {
    try {
      const testingCards = await this.testingCardService.obtenerTodas();
      res.json(testingCards);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Crea una nueva testing card
   */
  async crear(req, res, next) {
    try {
      const validatedData = testingCardCreateSchema.parse(req.body);
      const testingCard = await this.testingCardService.crear(validatedData);
      res.status(201).json(testingCard);
    } catch (error) {
      next(new ApiError(error.message, 400));
    }
  }

  /**
   * Actualiza una testing card
   */
  async actualizar(req, res, next) {
    try {
      if (!req.body.id_testing_card) {
        throw new ApiError('Se requiere el campo id_testing_card', 400);
      }

      const { id_testing_card, ...updateData } = req.body;
      const validatedData = testingCardUpdateSchema.parse(updateData);
      
      const testingCard = await this.testingCardService.actualizar(id_testing_card, validatedData);
      res.json(testingCard);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Elimina una testing card
   */
  async eliminar(req, res, next) {
    try {
      if (!req.body.id_testing_card) {
        throw new ApiError('Se requiere el campo id_testing_card', 400);
      }

      await this.testingCardService.eliminar(req.body.id_testing_card);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default TestingCardController;
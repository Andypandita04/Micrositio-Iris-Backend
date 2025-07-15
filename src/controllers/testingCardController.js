// src/controllers/testingCardController.js
import TestingCardService from '../services/testingCardService.js';
import { testingCardCreateSchema, testingCardUpdateSchema } from '../middlewares/validation/testingCardSchema.js';
import ApiError from '../utils/ApiError.js';

class TestingCardController {
  constructor() {
    this.testingCardService = new TestingCardService();
  }

  async obtenerPorId(req, res, next) {
    try {
      if (!req.body.id_testing_card) {
        throw new ApiError('Se requiere el campo "id_testing_card" en el body', 400);
      }

      const testingCard = await this.testingCardService.obtenerPorId(req.body.id_testing_card);
      res.json(testingCard);
    } catch (error) {
      next(error);
    }
  }

  async obtenerPorSecuencia(req, res, next) {
    try {
      if (!req.body.id_secuencia) {
        throw new ApiError('Se requiere el campo "id_secuencia" en el body', 400);
      }

      const testingCards = await this.testingCardService.obtenerPorSecuencia(req.body.id_secuencia);
      res.json(testingCards);
    } catch (error) {
      next(error);
    }
  }

  async obtenerPorPadre(req, res, next) {
    try {
      if (!req.body.padre_id) {
        throw new ApiError('Se requiere el campo "padre_id" en el body', 400);
      }

      const testingCards = await this.testingCardService.obtenerPorPadre(req.body.padre_id);
      res.json(testingCards);
    } catch (error) {
      next(error);
    }
  }

  async listarTodos(req, res, next) {
    try {
      const testingCards = await this.testingCardService.listarTodos();
      res.json(testingCards);
    } catch (error) {
      next(error);
    }
  }

  async crear(req, res, next) {
    try {
      const validatedData = testingCardCreateSchema.parse(req.body);
      const testingCard = await this.testingCardService.crear(validatedData);
      res.status(201).json(testingCard);
    } catch (error) {
      next(new ApiError(error.message, 400));
    }
  }

  async actualizar(req, res, next) {
    try {
      if (!req.body.id_testing_card) {
        throw new ApiError('Se requiere el campo "id_testing_card" en el body', 400);
      }

      const { id_testing_card, ...updateData } = req.body;
      const validatedData = testingCardUpdateSchema.parse(updateData);
      const testingCard = await this.testingCardService.actualizar(id_testing_card, validatedData);
      res.json(testingCard);
    } catch (error) {
      next(error);
    }
  }

  async eliminar(req, res, next) {
    try {
      if (!req.body.id_testing_card) {
        throw new ApiError('Se requiere el campo "id_testing_card" en el body', 400);
      }

      await this.testingCardService.eliminar(req.body.id_testing_card);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default TestingCardController;
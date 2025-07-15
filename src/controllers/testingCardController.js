// src/controllers/testingCardController.js
import TestingCardService from '../services/testingCardService.js';
import { testingCardBaseSchema, testingCardUpdateSchema } from '../middlewares/validation/testingCardSchema.js';
import ApiError from '../utils/ApiError.js';

class TestingCardController {
  constructor() {
    this.testingCardService = new TestingCardService();
  }

  async obtenerPorId(req, res, next) {
    console.log('Query params:', req.query);
  console.log('id_testing_card:', req.query.id_testing_card);
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
      const validatedData = testingCardBaseSchema.parse(req.body);
      const testingCard = await this.testingCardService.crear(validatedData);
      res.status(201).json(testingCard);
    } catch (error) {
      next(new ApiError(error.message, 400));
    }
  }

 // En testingCardController.js
async actualizar(req, res) {
  console.log('Body recibido:', req.body);
  console.log('id_testing_card del body:', req.body.id_testing_card);
  try {
    // Leer id_testing_card del body
    const { id_testing_card, ...updateData } = req.body;
    
    if (!id_testing_card) {
      return res.status(400).json({ error: 'id_testing_card es requerido' });
    }
    
    const updatedCard = await this.testingCardRepository.actualizar(id_testing_card, updateData);
    
    if (!updatedCard) {
      return res.status(404).json({ error: 'Testing card no encontrada' });
    }
    
    res.json(updatedCard);
  } catch (error) {
    console.error('Error en actualizar:', error);
    res.status(500).json({ error: error.message });
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
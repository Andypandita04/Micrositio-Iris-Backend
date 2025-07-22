import NodePositionService from '../services/nodePositionService.js';
import NodePositionRepository from '../repositories/nodePositionRepository.js';
import SecuenciaRepository from '../repositories/secuenciaRepository.js';
import LearningCardRepository from '../repositories/learningCardRepository.js';
import TestingCardRepository from '../repositories/testingCardRepository.js';
import { upsertNodePositionSchema } from '../middlewares/validation/nodePositionSchema.js';
import ApiError from '../utils/ApiError.js';

class NodePositionController {
  constructor() {
    const nodePositionRepository = new NodePositionRepository();
    const secuenciaRepository = new SecuenciaRepository();
    const learningCardRepository = new LearningCardRepository();
    const testingCardRepository = new TestingCardRepository();

    this.nodePositionService = new NodePositionService(
      nodePositionRepository,
      secuenciaRepository,
      learningCardRepository,
      testingCardRepository
    );
  }

  /**
   * Obtiene todas las posiciones de una secuencia
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @param {Function} next - Next middleware
   */
  async obtenerPorSecuencia(req, res, next) {
    try {
      const { id_secuencia } = req.params;

      if (!id_secuencia) {
        throw new ApiError('Se requiere el parámetro "id_secuencia"', 400);
      }

      const posiciones = await this.nodePositionService.obtenerPorSecuencia(Number(id_secuencia));
      res.json(posiciones);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Crea o actualiza la posición de un nodo
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @param {Function} next - Next middleware
   */
  async upsert(req, res, next) {
    try {
      const validatedData = upsertNodePositionSchema.parse(req.body);
      const nodePosition = await this.nodePositionService.upsert(validatedData);
      res.status(201).json(nodePosition);
    } catch (error) {
      next(new ApiError(error.message, 400));
    }
  }

  /**
   * Elimina todas las posiciones de una secuencia
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @param {Function} next - Next middleware
   */
  async eliminarPorSecuencia(req, res, next) {
    try {
      const { id_secuencia } = req.params;

      if (!id_secuencia) {
        throw new ApiError('Se requiere el parámetro "id_secuencia"', 400);
      }

      await this.nodePositionService.eliminarPorSecuencia(Number(id_secuencia));
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default NodePositionController;
import TestingCardPlaybookService from '../services/testingCardPlaybookService.js';
import ApiError from '../utils/ApiError.js';

class TestingCardPlaybookController {
  constructor() {
    this.testingCardPlaybookService = new TestingCardPlaybookService();
  }

  // Listar todos los registros
  async listarTodos(req, res, next) {
    try {
      const playbooks = await this.testingCardPlaybookService.listarTodos();
      res.json(playbooks);
    } catch (error) {
      next(error);
    }
  }

  // Obtener por página (PK)
  async obtenerPorPagina(req, res, next) {
    try {
      const { pagina } = req.query;
      if (!pagina) {
        throw new ApiError('Se requiere el parámetro "pagina" en la query', 400);
      }
      const playbook = await this.testingCardPlaybookService.obtenerPorPagina(pagina);
      if (!playbook) {
        throw new ApiError('No se encontró el registro', 404);
      }
      res.json(playbook);
    } catch (error) {
      next(error);
    }
  }

  // Buscar por campo (opcional, ejemplo de filtro)
  async buscarPorCampo(req, res, next) {
    try {
      const { campo } = req.query;
      if (!campo) {
        throw new ApiError('Se requiere el parámetro "campo" en la query', 400);
      }
      const playbooks = await this.testingCardPlaybookService.buscarPorCampo(campo);
      res.json(playbooks);
    } catch (error) {
      next(error);
    }
  }
}

export default TestingCardPlaybookController;
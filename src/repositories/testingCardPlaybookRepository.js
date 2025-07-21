import TestingCardPlaybook from '../models/testing_card_plabook.js';

class TestingCardPlaybookRepository {
  async listarTodos() {
    return await TestingCardPlaybook.findAll();
  }

  async obtenerPorPagina(pagina) {
    return await TestingCardPlaybook.findOne({ where: { pagina } });
  }

  async buscarPorCampo(campo) {
    return await TestingCardPlaybook.findAll({ where: { campo } });
  }
}

export default TestingCardPlaybookRepository;
import { Router } from 'express';
import TestingCardPlaybookController from '../controllers/testingCardPlaybookController.js';

const router = Router();
const controller = new TestingCardPlaybookController();

router.get('/', (req, res, next) => controller.listarTodos(req, res, next));
router.get('/por-pagina', (req, res, next) => controller.obtenerPorPagina(req, res, next));
router.get('/por-campo', (req, res, next) => controller.buscarPorCampo(req, res, next));

export default router;
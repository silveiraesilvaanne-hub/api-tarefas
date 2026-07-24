import { Router } from 'express';
import { TarefaController } from '../controllers/tarefas.controller';

const router = Router();

router.post('/tasks', TarefaController.criar);
router.get('/tasks', TarefaController.listarTodas);
router.get('/tasks/:id', TarefaController.buscarPorId);
router.put('/tasks/:id', TarefaController.atualizar);
router.delete('/tasks/:id', TarefaController.deletar);

export default router;
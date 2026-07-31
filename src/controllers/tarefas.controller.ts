import { Request, Response } from 'express';
import { TarefaService } from '../services/tarefas.service';

async function criar(req: Request, res: Response): Promise<void> {
  const { title } = req.body;

  if (!title) {
    res.status(400).json({ error: 'O campo title é obrigatório.' });
    return;
  }

  const novaTarefa = await TarefaService.criar(title);
  res.status(201).json(novaTarefa);
}

async function listarTodas(req: Request, res: Response): Promise<void> {
  const { completed } = req.query;

  if (completed === undefined) {
    const tarefas = await TarefaService.listarTodas();
    res.status(200).json(tarefas);
    return;
  }

  const completedBoolean = completed === 'true';
  const tarefas = await TarefaService.listarTodas(completedBoolean);
  res.status(200).json(tarefas);
}

async function buscarPorId(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const tarefa = await TarefaService.buscarPorId(id);

  if (!tarefa) {
    res.status(404).json({ error: 'Tarefa não encontrada.' });
    return;
  }

  res.status(200).json(tarefa);
}

async function atualizar(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const { title, completed } = req.body;

  const tarefaAtualizada = await TarefaService.atualizar(id, { title, completed });

  if (!tarefaAtualizada) {
    res.status(404).json({ error: 'Tarefa não encontrada.' });
    return;
  }

  res.status(200).json(tarefaAtualizada);
}

async function deletar(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const sucesso = await TarefaService.deletar(id);

  if (!sucesso) {
    res.status(404).json({ error: 'Tarefa não encontrada.' });
    return;
  }

  res.status(204).send();
}

export const TarefaController = {
  criar,
  listarTodas,
  buscarPorId,
  atualizar,
  deletar,
};
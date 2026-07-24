import { Request, Response } from 'express';
import { TarefaService } from '../services/tarefas.service';

function criar(req: Request, res: Response): void {
  const { title } = req.body;

  if (!title) {
    res.status(400).json({ error: 'O campo title é obrigatório.' });
    return;
  }

  const novaTarefa = TarefaService.criar(title);
  res.status(201).json(novaTarefa);
}

function listarTodas(req: Request, res: Response): void {
  const { completed } = req.query;

  if (completed === undefined) {
    res.status(200).json(TarefaService.listarTodas());
    return;
  }

  const completedBoolean = completed === 'true';
  res.status(200).json(TarefaService.listarTodas(completedBoolean));
}

function buscarPorId(req: Request, res: Response): void {
  const id = req.params.id as string;
  const tarefa = TarefaService.buscarPorId(id);

  if (!tarefa) {
    res.status(404).json({ error: 'Tarefa não encontrada.' });
    return;
  }

  res.status(200).json(tarefa);
}

function atualizar(req: Request, res: Response): void {
  const id = req.params.id as string;
  const { title, completed } = req.body;

  const tarefaAtualizada = TarefaService.atualizar(id, { title, completed });

  if (!tarefaAtualizada) {
    res.status(404).json({ error: 'Tarefa não encontrada.' });
    return;
  }

  res.status(200).json(tarefaAtualizada);
}

function deletar(req: Request, res: Response): void {
  const id = req.params.id as string;
  const sucesso = TarefaService.deletar(id);

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
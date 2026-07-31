import prisma from '../config/prismaClient';

async function criar(title: string) {
  const novaTarefa = await prisma.task.create({
    data: { title },
  });

  return novaTarefa;
}

async function listarTodas(completed?: boolean) {
  if (completed === undefined) {
    return prisma.task.findMany();
  }

  return prisma.task.findMany({
    where: { completed },
  });
}

async function buscarPorId(id: number) {
  return prisma.task.findUnique({
    where: { id },
  });
}

async function atualizar(
  id: number,
  dados: { title?: string; completed?: boolean }
) {
  const tarefaExistente = await buscarPorId(id);

  if (!tarefaExistente) {
    return undefined;
  }

  const tarefaAtualizada = await prisma.task.update({
    where: { id },
    data: dados,
  });

  return tarefaAtualizada;
}

async function deletar(id: number): Promise<boolean> {
  const tarefaExistente = await buscarPorId(id);

  if (!tarefaExistente) {
    return false;
  }

  await prisma.task.delete({
    where: { id },
  });

  return true;
}

export const TarefaService = {
  criar,
  listarTodas,
  buscarPorId,
  atualizar,
  deletar,
};
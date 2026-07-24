interface Tarefa {
  id: string;
  title: string;
  completed: boolean;
}

const tarefas: Tarefa[] = [];

function criar(title: string): Tarefa {
  const novaTarefa: Tarefa = {
    id: Math.random().toString(36).substring(2, 10),
    title,
    completed: false,
  };

  tarefas.push(novaTarefa);
  return novaTarefa;
}

function listarTodas(completed?: boolean): Tarefa[] {
  if (completed === undefined) {
    return tarefas;
  }

  return tarefas.filter((tarefa) => tarefa.completed === completed);
}

function buscarPorId(id: string): Tarefa | undefined {
  return tarefas.find((tarefa) => tarefa.id === id);
}

function atualizar(
  id: string,
  dados: { title?: string; completed?: boolean }
): Tarefa | undefined {
  const tarefa = buscarPorId(id);

  if (!tarefa) {
    return undefined;
  }

  if (dados.title !== undefined) {
    tarefa.title = dados.title;
  }

  if (dados.completed !== undefined) {
    tarefa.completed = dados.completed;
  }

  return tarefa;
}

function deletar(id: string): boolean {
  const index = tarefas.findIndex((tarefa) => tarefa.id === id);

  if (index === -1) {
    return false;
  }

  tarefas.splice(index, 1);
  return true;
}

export const TarefaService = {
  criar,
  listarTodas,
  buscarPorId,
  atualizar,
  deletar,
};
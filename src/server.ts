import express from 'express';
import tarefasRoutes from './routes/tarefas.routes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(tarefasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
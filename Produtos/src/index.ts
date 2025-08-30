import app from "./lib/express";
import produtosRouter from './routes/produtos'

app.use("/produtos", produtosRouter)

app.listen(3000, () => {
  console.log(`🚀 Servidor rodando na porta 3000`);
});
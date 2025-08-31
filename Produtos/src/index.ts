import app from "./lib/express";
import produtosRouter from './routes/produtos'

app.use("/produtos", produtosRouter)

app.listen(3005, () => {
  console.log(`🚀 Microserviço de Cargos rodando na porta 3005`);
});
import app from "./lib/express";
import funcionariosRouter from "./routes/funcionarios";

app.use("/funcionarios", funcionariosRouter)

app.listen(3001, () => {
  console.log(`🚀 Microserviço de Funcionários rodando na porta 3001`);
});
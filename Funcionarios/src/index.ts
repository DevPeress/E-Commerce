import app from "./lib/express";
import { authMiddleware } from "./middlewares/auth";
import funcionariosRouter from "./routes/funcionarios";

app.use("/funcionarios", authMiddleware, funcionariosRouter)

app.listen(3001, () => {
  console.log(`🚀 Microserviço de Funcionários rodando na porta 3001`);
});
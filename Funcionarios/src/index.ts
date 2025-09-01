import app from "./lib/express";
import logger from "./lib/pino";
import { authMiddleware } from "./middlewares/auth";
import funcionariosRouter from "./routes/funcionarios";

app.use("/funcionarios", authMiddleware, funcionariosRouter)

app.listen(3001, () => {
  logger.info("🚀 Microserviço de Funcionários rodando na porta 3001")
});
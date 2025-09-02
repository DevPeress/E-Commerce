import { PORT } from "./lib/config";
import app from "./lib/express";
import logger from "./lib/pino";
import { authMiddleware } from "./middlewares/auth";
import funcionariosRouter from "./routes/funcionarios";

app.use("/funcionarios", authMiddleware, funcionariosRouter)

app.listen(PORT, () => {
  logger.info("🚀 Microserviço de Funcionários rodando na porta: " + PORT)
});
import { PORT } from "./lib/config";
import app from "./lib/express";
import logger from "./lib/pino";
import { authMiddleware } from "./middlewares/auth";
import clientesRouter from "./routes/clientes";

app.use("/clientes", authMiddleware(["Admin", "Funcionario"]), clientesRouter);

app.listen(PORT, () => {
  logger.info("🚀 Microserviço de Funcionários rodando na porta: " + PORT);
});

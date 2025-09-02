import { PORT } from "./lib/config";
import app from "./lib/express";
import logger from "./lib/pino";
import { authMiddleware } from "./middlewares/auth";
import produtosRouter from "./routes/produtos";

app.use("/produtos", authMiddleware, produtosRouter);

app.listen(PORT, () => {
  logger.info("🚀 Microserviço de Cargos rodando na porta: " + PORT);
});

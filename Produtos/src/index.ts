import app from "./lib/express";
import logger from "./lib/pino";
import { authMiddleware } from "./middlewares/auth";
import produtosRouter from './routes/produtos'

app.use("/produtos", authMiddleware, produtosRouter)

app.listen(3005, () => {
  logger.info("🚀 Microserviço de Cargos rodando na porta 3005")
});
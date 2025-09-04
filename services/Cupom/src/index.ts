import { PORT } from "./lib/config";
import app from "./lib/express";
import logger from "./lib/pino";
import { authMiddleware } from "./middleware/auth";
import cupomRoute from "./routes/cupom";

app.use("/cupom", authMiddleware, cupomRoute);

app.listen(PORT, () => {
  logger.info("🚀 Microserviço de Funcionários rodando na porta: " + PORT);
});

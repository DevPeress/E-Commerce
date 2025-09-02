import { PORT } from "./lib/config";
import app from "./lib/express";
import logger from "./lib/pino";
import routerCargos from "./lib/router";
import { authMiddleware } from "./middleware/auth";

app.use("/cargos", authMiddleware, routerCargos);

app.listen(PORT, () => {
  logger.info("🚀 Microserviço de Cargos rodando na porta: " + PORT);
});

import app from "./lib/express";
import routerCargos from "./lib/router";
import { authMiddleware } from "./middleware/auth";

app.use('/cargos', authMiddleware, routerCargos)

app.listen(3004, () => {
  logger
  console.log(`🚀 Microserviço de Cargos rodando na porta 3004`);
});
import app from "./lib/express";
import logger from "./lib/pino";
import loginRouter from "./routes/login";

app.use("/login", loginRouter)

app.listen(3003, () => {
  logger.info("🚀 Servidor rodando na porta 3003")
});
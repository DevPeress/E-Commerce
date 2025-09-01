import app from "./lib/express";
import logger from "./lib/pino";
import registerRouter from "./routes/register";

app.use("/register", registerRouter)

app.listen(3002, () => {
  logger.info("🚀 Servidor rodando na porta 3002")
});
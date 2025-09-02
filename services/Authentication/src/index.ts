import { PORT } from "./lib/config";
import app from "./lib/express";
import logger from "./lib/pino";
import authRouter from "./routes/auth";

app.use("/auth", authRouter);

app.listen(PORT, () => {
  logger.info("🚀 Servidor rodando na porta: " + PORT);
});

import { PORT } from "./lib/config";
import app from "./lib/express";
import logger from "./lib/pino";
import registerRouter from "./routes/register";

app.use("/register", registerRouter)

app.listen(PORT, () => {
  logger.info("🚀 Servidor rodando na porta: " + PORT)
});
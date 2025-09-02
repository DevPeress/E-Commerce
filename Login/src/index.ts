import { PORT } from "./lib/config";
import app from "./lib/express";
import logger from "./lib/pino";
import loginRouter from "./routes/login";

app.use("/login", loginRouter)

app.listen(PORT, () => {
  logger.info("🚀 Servidor rodando na porta: " + PORT )
});
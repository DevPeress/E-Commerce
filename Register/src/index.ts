import app from "./lib/express";
import { authMiddleware } from "./middlewares/auth";
import registerRouter from "./routes/register";

app.use("/register", authMiddleware, registerRouter)

app.listen(3002, () => {
  console.log(`🚀 Servidor rodando na porta 3002`);
});
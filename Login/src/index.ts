import app from "./lib/express";
import loginRouter from "./routes/login";

app.use("/login", loginRouter)

app.listen(3003, () => {
  console.log(`🚀 Servidor rodando na porta 3003`);
});
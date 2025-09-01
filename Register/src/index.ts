import app from "./lib/express";
import registerRouter from "./routes/register";

app.use("/register", registerRouter)

app.listen(3002, () => {
  console.log(`🚀 Servidor rodando na porta 3002`);
});
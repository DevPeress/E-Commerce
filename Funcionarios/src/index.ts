import app from "./lib/express";
import router from "./routes/funcionarios";

app.use("/funcionarios", router)

app.listen(3001, () => {
  console.log(`🚀 Microserviço de Funcionários rodando na porta 3001`);
});
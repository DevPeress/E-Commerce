import app from "./lib/express";
import router from "./routes/register";

app.use("/register", router)

app.listen(3002, () => {
  console.log(`🚀 Servidor rodando na porta 3002`);
});
import app from "./lib/express";
import router from "./routes/login";

app.use("/login", router)

app.listen(3003, () => {
  console.log(`🚀 Servidor rodando na porta 3003`);
});
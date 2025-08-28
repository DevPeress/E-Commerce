import app from "./lib/express";
import routerCargos from "./lib/router";

app.use('/cargos', routerCargos)

app.listen(3004, () => {
  console.log(`🚀 Microserviço de Cargos rodando na porta 3004`);
});
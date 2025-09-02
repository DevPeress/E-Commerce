import express from "express";
import rateLimit from "express-rate-limit";
const app = express();

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Muitas tentativas de pesquisa de funcionarios. Tente novamente em 15 minutos.'
});

app.use(limiter);

export default app;
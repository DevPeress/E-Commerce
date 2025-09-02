import express from "express";
import rateLimit from "express-rate-limit";
import cors from 'cors'
import { PORT } from "./config";

const app = express();

const options: cors.CorsOptions = {
  origin: 'http://localhost:' + PORT
}

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Muitas tentativas de pesquisa de cargos. Tente novamente em 15 minutos.'
});

app.use(limiter);

export default app;
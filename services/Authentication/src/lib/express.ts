import express from "express";
import rateLimit from "express-rate-limit";
import cors from 'cors';

const app = express();

const options: cors.CorsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET','POST']
}

app.use(cors(options));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 8, 
  message: 'Muitas tentativas de acesso ao auth. Tente novamente em 15 minutos.'
});

app.use(limiter);

export default app;
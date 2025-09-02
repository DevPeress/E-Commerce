import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import helmet from "helmet";

const app = express();

const options: cors.CorsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(options));
app.use(helmet());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Muitas tentativas de pesquisa de produtos. Tente novamente em 15 minutos.",
});

app.use(limiter);

export default app;

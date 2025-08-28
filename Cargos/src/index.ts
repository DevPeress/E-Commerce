import app from "./lib/express";
import type { Request, Response } from "express";

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World com TypeScript!");
});

app.listen(3000, () => {
  console.log(`🚀 Servidor rodando na porta 3000`);
});
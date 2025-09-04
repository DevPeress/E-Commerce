import type { Request, Response } from "express";
import router from "../lib/router";
import { CupomDB } from "../database/databaseCupom";

router.get("/", async (req: Request, res: Response) => {
  const dados = await CupomDB.getAll();
  if (!dados.sucess) return res.status(404).json({ error: dados.error });
  return res.json(dados.data);
});

router.get("/id/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  if (!id) return res.status(400).json({ error: "ID Não informado" });

  const dados = await CupomDB.getById(id);
  if (!dados.sucess) return res.status(404).json({ error: dados.error });
  return res.json(dados.data);
});

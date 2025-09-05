import type { Request, Response } from "express";
import router from "../lib/router";
import { clientesDB } from "../database/databaseClientes";

router.get("/", async (req: Request, res: Response) => {
  const dados = await clientesDB.getAll();
  if (!dados.sucess) return res.status(404).json({ error: dados.error });

  return res.json(dados.data);
});

export default router;

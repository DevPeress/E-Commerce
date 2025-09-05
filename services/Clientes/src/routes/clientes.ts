import type { Request, Response } from "express";
import router from "../lib/router";
import { clientesDB } from "../database/databaseClientes";

router.get("/", async (req: Request, res: Response) => {
  const dados = await clientesDB.getAll();
  if (!dados.sucess) return res.status(404).json({ error: dados.error });

  return res.json(dados.data);
});

router.get("/id/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Não foi informado o ID!" });

  const dados = await clientesDB.getById(id);
  if (!dados.sucess) return res.status(404).json({ error: dados.error });

  return res.json(dados.data);
});

router.get("/nome/:nome", async (req: Request, res: Response) => {
  const nome: string = req.params.nome;
  if (!nome) return res.status(400).json({ error: "Não foi informado o Nome!" });

  const dados = await clientesDB.getByNome(nome);
  if (!dados.sucess) return res.status(404).json({ error: dados.error });

  return res.json(dados.data);
});

router.get("/cpf/:cpf", async (req: Request, res: Response) => {
  const cpf: string = req.params.cpf;
  if (!cpf) return res.status(400).json({ error: "Não foi informado o CPF!" });

  const dados = await clientesDB.getByCpf(cpf);
  if (!dados.sucess) return res.status(404).json({ error: dados.error });

  return res.json(dados.data);
});

export default router;

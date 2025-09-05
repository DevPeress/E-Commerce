import type { Request, Response } from "express";
import router from "../lib/router";
import { clientesDB } from "../database/databaseClientes";
import { authMiddleware } from "../middlewares/auth";

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

router.get("/email/:email", async (req: Request, res: Response) => {
  const email: string = req.params.email;
  if (!email) return res.status(400).json({ error: "Não foi informado o E-mail!" });

  const dados = await clientesDB.getByEmail(email);
  if (!dados.sucess) return res.status(404).json({ error: dados.error });

  return res.json(dados.data);
});

router.delete("/", authMiddleware(["Admin"]), async (req: Request, res: Response) => {
  const { id } = req.body as { id: number };
  if (isNaN(id)) return res.status(400).json({ error: "Não foi informado o ID!" });

  const dados = await clientesDB.deleteCliente(id);
  if (!dados.sucess) return res.status(404).json({ error: dados.error });

  return res.status(200).json({ message: "Usuário deletado!" });
});

router.delete("/all", authMiddleware(["Admin"]), async (req: Request, res: Response) => {
  const dados = await clientesDB.deleteAll();
  if (!dados.sucess) return res.status(404).json({ error: dados.error });

  return res.status(200).json({ message: "Usuário deletado!" });
});

export default router;

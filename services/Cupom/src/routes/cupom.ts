import type { Request, Response } from "express";
import router from "../lib/router";
import { CupomDB } from "../database/databaseCupom";
import { validate } from "../middleware/validate";
import { CupomInput, cupomSchema } from "../schemas/cupomSchemas";

router.get("/", async (req: Request, res: Response) => {
  const dados = await CupomDB.getAll();
  if (!dados.sucess) return res.status(404).json({ error: dados.error });
  return res.json(dados.data);
});

router.get("/id/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID Não informado" });

  const dados = await CupomDB.getById(id);
  if (!dados.sucess) return res.status(404).json({ error: dados.error });
  return res.json(dados.data);
});

router.get("/nome/:nome", async (req: Request, res: Response) => {
  const nome: string = req.params.nome;
  if (!nome) return res.status(400).json({ error: "Nome Não informado" });

  const dados = await CupomDB.getByName(nome);
  if (!dados.sucess) return res.status(404).json({ error: dados.error });
  return res.json(dados.data);
});

router.post("/", validate(cupomSchema), async (req: Request, res: Response) => {
  const data = req.body as CupomInput;

  const dados = await CupomDB.getByName(data.nome);
  if (!dados.sucess) return res.status(404).json({ error: dados.error });
  return res.json(dados.data);
});

router.put("/", validate(cupomSchema), async (req: Request, res: Response) => {
  const data = req.body as CupomInput;

  const dados = await CupomDB.putCupom(data);
  if (!dados.sucess) res.status(404).json({ error: dados.error });

  return res.status(200).json({ mensage: "Cupom atualizado!" });
});

router.delete("/", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID não definido!" });

  const dados = await CupomDB.deleteCupom(id);
  if (!dados.sucess) return res.status(404).json({ error: dados.error });

  return res.status(200).json({ mensage: "Cupom deletado!" });
});

router.delete("/all", async (req: Request, res: Response) => {
  const dados = await CupomDB.deleteAll();
  if (!dados.sucess) return res.status(404).json({ error: dados.error });

  return res.status(200).json({ mensage: "Cupons deletado!" });
});

export default router;

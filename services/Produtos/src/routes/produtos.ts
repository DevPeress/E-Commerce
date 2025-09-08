import type { Request, Response } from "express";
import router from "../lib/router";
import type { Produtos } from "../types/produtos";
import { validate } from "../middlewares/validate";
import { InsertInput, insertSchema, UpdateInput, updateSchema } from "../schemas/produtosSchemas";
import { produtosDB } from "../database/databaseProdutos";
import { authMiddleware } from "../middlewares/auth";

router.get("/", async (req: Request, res: Response) => {
  const dados = await produtosDB.getAll();
  if (!dados.success) return res.status(404).json({ error: dados.error });

  return res.json(dados.data);
});

router.get("/id/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID não informado do produto!" });

  const dados = await produtosDB.getById(id);
  if (!dados.success) return res.status(404).json({ error: dados.error });

  return res.status(200).json(dados.data);
});

router.get("/nome/:nome", async (req: Request, res: Response) => {
  const nome: string = req.params.nome;
  if (!nome) return res.status(400).json({ error: "Nome não informado do produto!" });

  const dados = await produtosDB.getByName(nome);
  if (!dados.success) return res.status(404).json({ error: dados.error });

  return res.status(200).json(dados.data);
});

router.post("/", validate(insertSchema), async (req: Request, res: Response) => {
  const data = req.body as InsertInput;

  const dados = await produtosDB.postProduto(data);
  if (!dados.success) return res.status(404).json({ error: dados.error });

  return res.status(200).json(dados.data);
});

router.put("/", validate(updateSchema), async (req: Request, res: Response) => {
  const data = req.body as UpdateInput;

  const dados = await produtosDB.putProduto(data);
  if (!dados.success) return res.status(404).json({ error: dados.error });

  return res.status(200).json({ message: "Produto foi atualizado com successo!" });
});

router.put("/all", async (req: Request, res: Response) => {
  const { ajustes } = req.body as { ajustes: Produtos[] };
  if (!ajustes || !Array.isArray(ajustes))
    return res.status(400).json({ error: "Ajuste inviados de forma inválida!" });

  const dados = await produtosDB.putAll(ajustes);
  if (!dados.success) return res.status(404).json({ error: dados.error });

  return res.status(200).json({ message: "Produtos foram atualizados com successo!" });
});

router.delete("/", authMiddleware(["Admin"]), async (req: Request, res: Response) => {
  const { id } = req.body as { id: number };
  if (isNaN(id)) return res.status(400).json({ error: "ID não informado do produto!" });

  const dados = await produtosDB.deleteById(id);
  if (!dados.success) return res.status(404).json({ error: dados.error });

  return res.status(200).json({ message: "Produto foi deletado com successo!" });
});

router.delete("/all", authMiddleware(["Admin"]), async (req: Request, res: Response) => {
  const dados = await produtosDB.deleteAll();
  if (!dados.success) return res.status(404).json({ error: dados.error });

  return res.status(200).json({ message: "Produtos foram deletados com successo!" });
});

export default router;

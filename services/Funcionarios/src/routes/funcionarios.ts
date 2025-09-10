import type { Request, Response } from "express";
import router from "../lib/router";
import type { Usuarios } from "../types/funcionarios";
import { validate } from "../middlewares/validate";
import { FuncionarioInput, funcionarioSchema } from "../schemas/funcionarioSchemas";
import { funcionariosDB } from "../database/databaseFuncionarios";
import { authMiddleware } from "../middlewares/auth";

router.get("/", async (req: Request, res: Response) => {
  const dados = await funcionariosDB.getAll();
  if (!dados.success) return res.json(404).json({ error: dados.error });
  return res.json(dados.data);
});

router.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID não informado!" });

  const dados = await funcionariosDB.getById(id);
  if (!dados.success) return res.status(404).json({ error: dados.error });

  return res.json(dados.data);
});

router.post(
  "/",
  authMiddleware(["Admin"]),
  validate(funcionarioSchema),
  async (req: Request, res: Response) => {
    const data = req.body as FuncionarioInput;

    const dados = await funcionariosDB.postFuncionario(data);
    if (!dados.success) return res.status(404).json({ error: dados.error });

    return res.status(200).json({ message: "Usuário criado com sucesso!" });
  }
);

router.put("/", async (req: Request, res: Response) => {
  const { id, tipo, valor } = req.body as { id: number; tipo: string; valor: string };

  if (!tipo || !valor)
    return res.status(400).json({ error: "Não foi inserido o que atualizar do Funcionário!" });

  const validos: string[] = ["nome", "email", "cpf", "idade", "cep", "cargo_id"];
  if (!validos.includes(tipo))
    return res.status(400).json({ error: "Tipo informado não é válido!" });

  const dados = await funcionariosDB.getById(id);
  if (!dados.success) return res.status(404).json({ error: dados.error });

  const insert = await funcionariosDB.putFuncionario(tipo, id, valor);
  if (!insert.success) return res.status(404).json({ error: insert.error });

  return res.status(200).json(insert.data);
});

router.put("/all", authMiddleware(["Admin"]), async (req: Request, res: Response) => {
  const { ajustes } = req.body as { ajustes: Usuarios[] };
  if (!ajustes || !Array.isArray(ajustes))
    return res.status(400).json({ error: "Ajuste inviados de forma inválida!" });

  const ajustar = await funcionariosDB.putAll(ajustes);
  if (!ajustar.success) return res.status(404).json({ error: ajustar.error });
  return res.status(200).json("Cargos atualizados com sucesso!");
});

router.delete("/all", authMiddleware(["Admin"]), async (req: Request, res: Response) => {
  const dados = await funcionariosDB.deleteAll();
  if (!dados.success) return res.status(404).json({ error: dados.error });

  return res.status(200).json({ message: "Todos os funcionários foram deletados!" });
});

router.delete("/", authMiddleware(["Admin"]), async (req: Request, res: Response) => {
  const { id } = req.body as { id: number };
  if (isNaN(id)) return res.status(400).json({ error: "ID não informado!" });

  const dados = await funcionariosDB.deleteFuncionario(id);
  if (!dados.success) return res.status(404).json({ error: dados.error });

  return res.status(200).json({ message: "Funcionário deletado!" });
});

export default router;

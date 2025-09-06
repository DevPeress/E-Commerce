import type { Request, Response } from "express";
import router from "../lib/router";
import { clientesDB } from "../database/databaseClientes";
import { authMiddleware } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { clienteSchema, ClienteType } from "../schemas/clientesSchemas";

router.get("/", async (req: Request, res: Response) => {
  const dados = await clientesDB.getAll();
  if (!dados.success) return res.status(404).json({ error: dados.error });

  return res.json(dados.data);
});

router.get("/id/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Não foi informado o ID!" });

  const dados = await clientesDB.getById(id);
  if (!dados.success) return res.status(404).json({ error: dados.error });

  return res.json(dados.data);
});

router.get("/nome/:nome", async (req: Request, res: Response) => {
  const nome: string = req.params.nome;
  if (!nome) return res.status(400).json({ error: "Não foi informado o Nome!" });

  const dados = await clientesDB.getByNome(nome);
  if (!dados.success) return res.status(404).json({ error: dados.error });

  return res.json(dados.data);
});

router.get("/cpf/:cpf", async (req: Request, res: Response) => {
  const cpf: string = req.params.cpf;
  if (!cpf) return res.status(400).json({ error: "Não foi informado o CPF!" });

  const dados = await clientesDB.getByCpf(cpf);
  if (!dados.success) return res.status(404).json({ error: dados.error });

  return res.json(dados.data);
});

router.get("/email/:email", async (req: Request, res: Response) => {
  const email: string = req.params.email;
  if (!email) return res.status(400).json({ error: "Não foi informado o E-mail!" });

  const dados = await clientesDB.getByEmail(email);
  if (!dados.success) return res.status(404).json({ error: dados.error });

  return res.json(dados.data);
});

router.post("/", validate(clienteSchema), async (req: Request, res: Response) => {
  const data = req.body as ClienteType;

  const dados = await clientesDB.postCliente(data);
  if (!dados.success) return res.status(404).json({ error: dados.error });

  return res.status(201).json({ message: "Cliente cadastrado com successo!" });
});

router.put("/", async (req: Request, res: Response) => {
  const { cpf, tipo, valor } = req.body as { cpf: string; tipo: string; valor: string | number };
  if (!cpf || !valor)
    return res.status(400).json({ error: "Não foi enviado todas as informações para atualizar" });

  const validos: string[] = [
    "nome",
    "email",
    "cpf",
    "rua",
    "numeroCasa",
    "idade",
    "telefone",
    "cpf",
  ];
  if (!validos.includes(tipo))
    return res.status(400).json({ error: "Tipo informado não é válido!" });

  const dados = await clientesDB.putClienteSpecify(tipo, valor, cpf);
  if (!dados.success) return res.status(404).json({ error: dados.error });

  return res.status(200).json({ message: "Dados do cliente atualizados!" });
});

router.put("/all", validate(clienteSchema), async (req: Request, res: Response) => {
  const data = req.body as ClienteType;

  const dados = await clientesDB.putClienteAll(data);
  if (!dados.success) return res.status(404).json({ error: dados.error });

  return res.status(200).json({ message: "Dados do cliente atualizados!" });
});

router.delete("/", authMiddleware(["Admin"]), async (req: Request, res: Response) => {
  const { id } = req.body as { id: number };
  if (isNaN(id)) return res.status(400).json({ error: "Não foi informado o ID!" });

  const dados = await clientesDB.deleteCliente(id);
  if (!dados.success) return res.status(404).json({ error: dados.error });

  return res.status(200).json({ message: "Usuário deletado!" });
});

router.delete("/all", authMiddleware(["Admin"]), async (req: Request, res: Response) => {
  const dados = await clientesDB.deleteAll();
  if (!dados.success) return res.status(404).json({ error: dados.error });

  return res.status(200).json({ message: "Usuário deletado!" });
});

export default router;

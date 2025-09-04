import type { Request, Response } from "express";
import router from "../lib/router";
import { validate } from "../middlewares/validate";
import {
  LoginInput,
  loginSchema,
  RecInput,
  recSchema,
  RegisterInput,
  registerSchema,
} from "../schemas/authSchemas";
import { AuthDB } from "../database/databaseAuth";
import { generateToken } from "../lib/jwt";

router.get("/:email", async (req: Request, res: Response) => {
  const email: string = req.params.email;
  if (!email) return res.status(400).json({ error: "Email não informado" });

  const dados = await AuthDB.getByEmail(email);
  if (dados.sucess) return res.status(404).json({ error: "Email já possui cadastro na empresa!" });

  return res.status(200).json({ message: "Conta pode ser criada!" });
});

router.post("/register", validate(registerSchema), async (req: Request, res: Response) => {
  const data = req.body as RegisterInput;

  const dados = await AuthDB.postRegister(data);
  if (!dados.sucess) return res.status(404).json({ error: dados.error });

  const infos = await AuthDB.getByEmail(data.email);
  if (!infos.sucess) return res.status(404).json({ error: infos.error });

  if (!infos.data) return res.status(404).json({ error: "Erro ao criar conta!" });

  const token = generateToken({
    id: infos.data[0].id,
    email: data.email,
    cargo: "Cliente",
  });
  return res.json(token);
});

router.post("/login", validate(loginSchema), async (req: Request, res: Response) => {
  const data = req.body as LoginInput;

  const dados = await AuthDB.getLogin(data);
  if (!dados.sucess) return res.status(404).json({ error: dados.error });
  if (!dados.data) return res.status(404).json({ error: "Erro ao realizar o login" });

  const token = generateToken({
    id: dados.data[0].id,
    email: dados.data[0].email,
    cargo: dados.cargo,
  });

  return res.json({ token });
});

router.put("/", validate(recSchema), async (req: Request, res: Response) => {
  const data = req.body as RecInput;

  const dados = await AuthDB.getLogin(data);
  if (!dados.sucess) return res.status(404).json({ error: dados.error });

  res.status(200).json({ message: "Senha atualiza com sucesso!" });
});

export default router;

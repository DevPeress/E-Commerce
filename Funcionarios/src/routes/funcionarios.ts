import type { Request, Response } from "express";
import db from "../lib/mysql";
import router from "../lib/router";
import type { Usuarios } from "../types/funcionarios";
import { validate } from "../middlewares/validate";
import { FuncionarioInput, funcionarioSchema } from "../schemas/funcionarioSchemas";
import { funcionariosDB } from "../database/databaseFuncionarios";
import { error } from "console";

router.get("/", async (req: Request, res: Response) => {
  const dados = await funcionariosDB.getAll()
  if (!dados.sucess) return res.json(404).json({ error: dados.error })
  return res.json(dados.data)
})

router.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id)
  if (!id) return res.status(400).json({ error: "ID não informado!"})

  const dados = await funcionariosDB.getById(id)
  if (!dados.sucess) return res.status(404).json({ error: dados.error })
  
  return res.json(dados.data)
})

router.post("/", validate(funcionarioSchema), async (req: Request, res: Response) => {
  const data = req.body as FuncionarioInput

  try {
    const dados = await funcionariosDB.getByEmail(data.email)
    if (dados) return res.status(409).json({ error: "Email já possui cadastro na empresa!" })

    const dados2 = await funcionariosDB.getByCpf(data.cpf)
    if (dados2) return res.status(409).json({ error: "CPF já possui cadastro na empresa!" })

    await db.execute('INSERT INTO Funcionarios(nome,email,cpf,idade,cep,cargo) VALUES(?,?,?,?,?,?)', [data.nome, data.email, data.cpf, data.idade, data.cep, data.cargo_id])
    return res.status(201).json({ success: true, message: "Usuário criado com sucesso!" })
  } catch(err) {
    console.error("MicroServiço Funcionários POST: ", err)
    return res.status(500).json({ error: "Erro ao criar Funcionário novo!" })
  }
})

router.put("/", async (req: Request, res: Response) => {
  const { id, tipo, valor } = req.body as { id: number, tipo: string, valor: string }

  if (!tipo || !valor) return res.status(400).json({ error: "Não foi inserido o que atualizar do Funcionário!"})

  const validos: string[] = [ "nome", "email", "cpf", "idade", "cep", "cargo_id" ]
  if (!validos.includes(tipo)) return res.status(400).json({ error: "Tipo informado não é válido!"})
    
  const dados = await funcionariosDB.getById(id)
  if (!dados.sucess) return res.status(404).json({ error: dados.error })
  
  const insert = await funcionariosDB.putFuncionario(tipo, id, valor)
  if (!insert.sucess) return res.status(404).json({ error: insert.error })

  return res.status(200).json(insert.data)
})

router.put("/all", async (req: Request, res: Response) => {
  const { ajustes } = req.body as { ajustes: Usuarios[] }
  if (!ajustes || !Array.isArray(ajustes)) return res.status(400).json({ error: "Ajuste inviados de forma inválida!" })

  const ajustar = await funcionariosDB.putAll(ajustes)
  if (!ajustar.sucess) return res.status(404).json({ error: ajustar.error })
  return res.status(200).json("Cargos atualizados com sucesso!")
})

router.delete("/all", async (req: Request, res: Response) => {
  const dados = await funcionariosDB.deleteAll()
  if (!dados.sucess) return res.status(404).json({ error: dados.error })
    
  return res.status(200).json({ message: "Todos os funcionários foram deletados!"})
})

router.delete("/", async (req: Request, res: Response) => {
  const { id } = req.body as { id: number }
  if (!id) return res.status(400).json({ error: "ID não informado!"})

  const dados = await funcionariosDB.deleteFuncionario(id)
  if (!dados.sucess) return res.status(404).json({ error: dados.error })

  return res.status(200).json({ message: "Funcionário deletado!" })
})

export default router;
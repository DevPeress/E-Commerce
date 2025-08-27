import { Router } from "express";
import type { Request, Response } from "express";
import db from "../lib/mysql";
import { Usuarios, Validar } from "../types/funcionarios";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query<Usuarios[]>('SELECT * FROM Funcionarios')
    return res.json(rows)
  } catch (err) {
    console.error("MicroServiço Funcionários GET: ", err)
    return res.status(500).json({ error: "Erro ao buscar funcionários" });
  }
})

router.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id)
  if (!id) return res.status(400).json({ error: "ID não informado!"})

  try {
    const [rows] = await db.query<Usuarios[]>('SELECT nome, email, cpf, idade, cep FROM Funcionarios WHERE id = ? LIMIT 1', [id])

    if (rows.length === 0) {
      return res.status(404).json({ error: "Funcionário não existente!" });
    }

    return res.json(rows[0])
  } catch(err) {
    console.error("MicroServiço Funcionários GET/:ID: ", err)
    return res.status(500).json({ error: "Erro ao buscar funcionário de Registro: " + id })
  }
})

router.post("/", async (req: Request, res: Response) => {
  const { nome, email, cpf, idade, cep } = req.body

  const validos: Validar[] = [ 
    { nome: "Nome", valor: nome },
    { nome: "Email", valor: email },
    { nome: "CPF", valor: cpf },
    { nome: "Idade", valor: idade },
    { nome: "CEP", valor: cep }
  ]

  const invalidos = validos.find(info => !info.valor)
  if (invalidos) res.status(400).json({ error: `${invalidos.nome} não informado!` });

  try {
    const [rows] = await db.query<Usuarios[]>('SELECT email FROM Funcionarios WHERE email = ? LIMIT 1', [email])
    if (rows.length !== 0) return res.status(409).json({ error: "Email já está cadastrado na Empresa!" })

    const [rows2] = await db.query<Usuarios[]>('SELECT cpf FROM Funcionarios WHERE cpf = ? LIMIT 1', [cpf])
    if (rows2.length !== 0) return res.status(409).json({ error: "CPF já está cadastrado na Empresa!" })

    await db.execute('INSERT INTO Funcionarios(nome,email,cpf,idade,cep) VALUES(?,?,?,?,?)', [nome, email, cpf, idade, cep])
    return res.status(200).json({ mensagem: "Usuário criado com sucesso!" })
  } catch(err) {
    console.error("MicroServiço Funcionários POST: ", err)
    return res.status(500).json({ error: "Erro ao criar Funcionário novo!" })
  }
})

router.put("/", async (req: Request, res: Response) => {
  const { id, tipo, valor } = req.body

  if (!tipo || !valor) return res.status(400).json({ error: "Não foi inserido o que atualizar do Funcionário!"})

  const validos: string[] = [ "nome", "email", "cpf", "idade", "cep" ]
  if (!validos.includes(tipo)) return res.status(400).json({ error: "Tipo informado não é válido!"})
    
  try {
    const [rows] = await db.query<Usuarios[]>('SELECT id FROM Funcionarios WHERE id = ? LIMIT 1', [id])
    if (rows.length === 0) return res.status(404).json({ error: "Funcionário inexistente!" })

    const [edit] = await db.execute(`UPDATE Funcionarios SET ${tipo} = ? WHERE id = ?`, [valor, id])
    return res.status(200).json(edit)
  } catch(err) {
    console.error("MicroServiço Funcionários PUT: ", err)
    return res.status(500).json({ error: "Erro ao atualizar informações do Funcionário!" })
  }
})

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) return res.status(400).json({ error: "ID não informado!"})

  try {
    const [rows] = await db.query<Usuarios[]>('SELECT * FROM Funcionarios WHERE id = ? LIMIT 1', [id])

    if (rows.length === 0) {
      return res.status(404).json({ error: "Funcionário não existente!" });
    }

    await db.execute('DELETE FROM Funcionarios WHERE id = ?', [id])
    return res.status(200).json({ mensagem: "Funcionário deletado" })
  } catch(err) {
    console.error("MicroServiço Funcionários DELETE/:ID: ", err)
    return res.status(500).json({ error: "Erro ao deletar funcionário de Registro: " + id })
  }
})

export default router;
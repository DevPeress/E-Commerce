import { Router } from "express";
import type { Request, Response } from "express";
import db from "../lib/mysql";
import Criptografar from "../lib/bcrypt";
import { Register, Validar } from "../types/register";

const router = Router();

router.get("/:email", async (req: Request, res: Response) => {
    const email: string = req.params.email
    if (!email) return res.status(400).json({ error: "Email não informado" })

    try {
        const [rows] = await db.query<Register[]>('SELECT email FROM Clientes WHERE email = ? LIMIT 1', [email])

        if (rows.length !== 0) {
            return res.status(404).json({ error: "Email já possui cadastro!" })
        }

        return res.status(200).json({ mensagem: "Conta pode ser criada!" })
    } catch(err) {
        console.error("MicroServiço Register GET/:EMAIL ", err)
        return res.status(500).json({ error: "Erro ao buscar email no cadastro!" })
    }
})

router.post("/", async (req: Request, res: Response) => {
    const { nome, email, senha, cpf, idade, cep } = req.body

    const validos: Validar[] = [ 
        { nome: "Nome", valor: nome },
        { nome: "Email", valor: email },
        { nome: "Senha", valor: senha },
        { nome: "CPF", valor: cpf },
        { nome: "Idade", valor: idade },
        { nome: "CEP", valor: cep }
    ]

    const invalidos = validos.find(info => !info.valor)
    if (invalidos) return res.status(400).json({ error: `${invalidos.nome} não informado!` });

    try {
        const [rows] = await db.query<Register[]>('SELECT email FROM Clientes WHERE email = ? LIMIT 1', [email])

        if (rows.length !== 0) {
            return res.status(404).json({ error: "Email já possui cadastro!" })
        }

        const senhaProtegida: string = await Criptografar(senha)
        await db.execute('INSERT INTO Clientes(nome,email,senha,cpf,idade,cep) VALUES(?,?,?,?,?,?)', [ nome, email, senhaProtegida, cpf, idade, cep])
        return res.status(201).json({ mensagem: "Conta criada com Sucesso!" })
    } catch(err) {
        console.error("MicroServiço Register POST/:EMAIL ", err)
        return res.status(500).json({ error: "Erro ao buscar email no cadastro!" })
    }
})

export default router
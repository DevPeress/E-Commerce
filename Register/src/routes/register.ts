import type { Request, Response } from "express";
import db from "../lib/mysql";
import Criptografar from "../lib/bcrypt";
import router from "../lib/router";
import type { Register } from "../types/register";
import { validate } from "../middlewares/validate";
import { RegisterInput, registerSchema } from "../schemas/registeSchemas";

router.get("/:email", async (req: Request, res: Response) => {
    const email: string = req.params.email
    if (!email) return res.status(400).json({ error: "Email não informado" })

    try {
        const [rows] = await db.query<Register[]>('SELECT email FROM Clientes WHERE email = ? LIMIT 1', [email])

        if (rows.length !== 0) {
            return res.status(404).json({ error: "Email já possui cadastro!" })
        }

        return res.status(200).json({ success: true, message: "Conta pode ser criada!" })
    } catch(err) {
        console.error("MicroServiço Register GET/:EMAIL ", err)
        return res.status(500).json({ error: "Erro ao buscar email no cadastro!" })
    }
})

router.post("/", validate(registerSchema), async (req: Request, res: Response) => {
    const data = req.body as RegisterInput
    
    try {
        const [rows] = await db.query<Register[]>('SELECT email FROM Clientes WHERE email = ? LIMIT 1', [data.email])

        if (rows.length !== 0) {
            return res.status(404).json({ error: "Email já possui cadastro!" })
        }

        const senhaProtegida: string = await Criptografar(data.senha)
        await db.execute('INSERT INTO Clientes(nome,email,senha,cpf,idade,cep) VALUES(?,?,?,?,?,?)', [data.nome, data.email, senhaProtegida, data.cpf, data.idade, data.cep])
        return res.status(201).json({ success: true, message: "Conta criada com Sucesso!" })
    } catch(err) {
        console.error("MicroServiço Register POST/:EMAIL ", err)
        return res.status(500).json({ error: "Erro ao buscar email no cadastro!" })
    }
})

export default router
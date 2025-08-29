import type { Request, Response } from "express";
import db from "../lib/mysql";
import VerificarSenha from "../lib/bcrypt";
import { Login } from "../types/login";
import router from "../lib/router";

router.post("/", async (req: Request, res: Response) => {
    const { email, senha } = req.body as { email: string, senha: string }

    if (!email) return res.status(400).json({ error: "Email não informado" })
    if (!senha) return res.status(400).json({ error: "Senha não informado" })

    try {
        const [rows] = await db.query<Login[]>('SELECT email, senha FROM Clientes WHERE email = ? LIMIT 1', [email])

        if (rows.length === 0) {
            return res.status(404).json({ error: "Email ou senha estão incorretos!" })
        }

        const senhaCorreta: boolean = await VerificarSenha(senha,rows[0].senha)
        if (!senhaCorreta) return res.status(404).json({ error: "Email ou senha estão incorretos!" })

        return res.status(201).json({ success: true, message: "Login correto!" })
    } catch(err) {
        console.error("MicroServiço Login GET ", err)
        return res.status(500).json({ error: "Erro ao buscar login nos usuários!" })
    }
})

export default router
import type { Request, Response } from "express";
import db from "../lib/mysql";
import VerificarSenha from "../lib/bcrypt";
import router from "../lib/router";
import type { Login } from "../types/login";
import { validate } from "../middlewares/validate";
import { LoginInput, loginSchema } from "../schemas/loginSchemas";

router.post("/", validate(loginSchema), async (req: Request, res: Response) => {
    const data = req.body as LoginInput

    try {
        const [rows] = await db.query<Login[]>('SELECT email, senha FROM Clientes WHERE email = ? LIMIT 1', [data.email])

        if (rows.length === 0) {
            return res.status(404).json({ error: "Email ou senha estão incorretos!" })
        }

        const senhaCorreta: boolean = await VerificarSenha(data.senha,rows[0].senha)
        if (!senhaCorreta) return res.status(404).json({ error: "Email ou senha estão incorretos!" })

        return res.status(201).json({ success: true, message: "Login correto!" })
    } catch(err) {
        console.error("MicroServiço Login GET ", err)
        return res.status(500).json({ error: "Erro ao buscar login nos usuários!" })
    }
})

export default router
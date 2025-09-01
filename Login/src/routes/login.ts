import type { Request, Response } from "express";
import router from "../lib/router";
import { validate } from "../middlewares/validate";
import { LoginInput, loginSchema } from "../schemas/loginSchemas";
import { LoginDB } from "../database/databaseLogin";
import { generateToken } from "../lib/jwt";

router.post("/", validate(loginSchema), async (req: Request, res: Response) => {
    const data = req.body as LoginInput

    const dados = await LoginDB.getLogin(data)
    if (!dados.sucess) return res.status(404).json({ error: dados.error })
    if (!dados.data) return res.status(404).json({ error: "Erro ao realizar o login" })

    const token = generateToken({ id: dados.data[0].id, email: dados.data[0].email });

    return res.json({ token })
})

export default router
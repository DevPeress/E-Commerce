import type { Request, Response } from "express";
import router from "../lib/router";
import { validate } from "../middlewares/validate";
import { LoginInput, loginSchema } from "../schemas/loginSchemas";
import { LoginDB } from "../database/databaseLogin";

router.post("/", validate(loginSchema), async (req: Request, res: Response) => {
    const data = req.body as LoginInput

    const dados = await LoginDB.getLogin(data)
    if (!dados.sucess) return res.status(404).json({ error: dados.error })

    return res.status(200).json({ message: "Login efetuado!" })
})

export default router
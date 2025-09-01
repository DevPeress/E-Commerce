import type { Request, Response } from "express";
import router from "../lib/router";
import { validate } from "../middlewares/validate";
import { RegisterInput, registerSchema } from "../schemas/registeSchemas";
import { RegisterDB } from "../database/databaseRegister";

router.get("/:email", async (req: Request, res: Response) => {
    const email: string = req.params.email
    if (!email) return res.status(400).json({ error: "Email não informado" })

    const dados = await RegisterDB.getByEmail(email)
    if (dados.sucess) return res.status(404).json({ error: "Email já possui cadastro na empresa!" })

    return res.status(200).json({ message: "Conta pode ser criada! "})
})

router.post("/", validate(registerSchema), async (req: Request, res: Response) => {
    const data = req.body as RegisterInput
    
    const dados = await RegisterDB.postRegister(data)
    if (!dados.sucess) return res.status(404).json({ error: dados.error })

    return res.status(200).json({ message: "Conta criada com sucesso! "})
})

export default router
import type { Request, Response } from "express";
import db from "../lib/mysql";
import router from "../lib/router";
import type { Criar } from "../types/cargos";
import { cargosDB } from "../database/databaseCargos";

router.get("/", async (req: Request, res: Response) => {
    const dados = await cargosDB.getAll()

    if (!dados.sucess) {
        return res.status(500).json({ error: dados.error })
    } 

    res.json(dados.data)
})

router.get("/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if (!id) return res.status(400).json({ error: "ID não definido!" })

    const dados = await cargosDB.getById(id)
    if (!dados.sucess) {
        return res.status(500).json({ error: dados.error })
    }

    res.json(dados.data)
})

router.post("/", async (req: Request, res: Response) => {
    const { cargo, perms } = req.body as { cargo: string, perms: string[] }
    if (!cargo) return res.status(400).json({ error: "Cargo não definido!" })

    const dados = await cargosDB.getByCargo(cargo)
    if (!dados.sucess) return res.status(409).json({ error: dados.error });

    await db.execute('INSERT INTO Cargos(cargo,perms) VALUES(?,?)', [cargo, perms])
    return res.status(201).json({ success: true, message: "Cargo criado com sucesso!" })
})

router.put("/", async (req: Request, res: Response) => {
    const { id, perms } = req.body as { id: number, perms: string[] }
    if (!id) return res.status(400).json({ error: "ID não definido!" })

    const dados = await cargosDB.getById(id)
    if (!dados.sucess) return res.status(404).json({ error: dados.error });
    
    const [infos] = await db.execute('UPDATE Cargos SET perms = ? WHERE id = ?', [JSON.stringify(perms), id])
    return res.json(infos)
})

router.put("/all", async (req: Request, res: Response) => {
    const { ajustes } = req.body as { ajustes: Criar[] }
    if (!ajustes || !Array.isArray(ajustes)) return res.status(400).json({ error: "Ajuste inviados de forma inválida!" })

    const dados = await cargosDB.putCargos(ajustes)
    if (!dados.sucess) return res.status(400).json({ error: dados.error })

    res.status(200).json({ message: "Cargos atualizados!" })
})

router.delete("/", async (req: Request, res: Response) => {
    const { id } = req.body as { id: number }
    if (!id) return res.status(400).json({ error: "ID não definido!" })

    const dados = await cargosDB.getById(id)
    if (!dados.sucess) return res.status(404).json({ error: "Cargo não encontrado" });

    const del = await cargosDB.deleteById(id)
    if (!del.sucess) return res.status(404).json({ error: del.error })

    return res.status(200).json({ success: true, message: "Cargo deletado!" })
})

router.delete("/all", async (req: Request, res: Response) => {
    const dados = await cargosDB.deleteAll()
    if (!dados.sucess) return res.status(404).json({ error: dados.error })
    return res.status(200).json({ success: true, message: "Cargos deletados!" })
})

export default router
import type { Request, Response } from "express";
import db from "../lib/mysql";
import router from "../lib/router";
import { Cargos, Criar } from "../types/cargos";

router.get("/", async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query('SELECT * FROM Cargos')
        return res.json(rows)
    } catch(err) {
        console.error("MicroServiço Cargos GET: ", err)
        return res.status(500).json({ error: "Erro ao buscar lista de cargos!" })
    }
})

router.get("/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if (!id) return res.status(400).json({ error: "ID não definido!" })

    try {
        const [rows] = await db.query<Cargos[]>('SELECT * FROM Cargos WHERE id = ?', [id])
        return res.json(rows)
    } catch(err) {
        console.error("MicroServiço Cargos GET/:/ID: ", err)
        return res.status(500).json({ error: "Erro ao buscar o cargo!" })
    } 
})

router.post("/", async (req: Request, res: Response) => {
    const { cargo, perms } = req.body as { cargo: string, perms: string[] }

    if (!cargo) return res.status(400).json({ error: "Cargo não definido!" })

    try {
        const [rows] = await db.query<Cargos[]>('SELECT id FROM Cargos WHERE cargo = ?', [cargo])
        if (rows.length !== 0) return res.status(409).json({ error: "Cargo já está cadastrado na Empresa!" })
    
        await db.execute('INSERT INTO Cargos(cargo,perms) VALUES(?,?)', [cargo, perms])
        return res.status(200).json({ mensagem: "Cargo criado com sucesso!" })
     } catch(err) {
        console.error("MicroServiço Cargos POST: ", err)
        return res.status(500).json({ error: "Erro ao criar o cargo!" })
    } 
})

router.put("/", async (req: Request, res: Response) => {
    const { id, perms } = req.body as { id: number, perms: string[] }
    if (!id) return res.status(400).json({ error: "ID não definido!" })
    
    try {
        const [rows] = await db.query<Cargos[]>('SELECT id FROM Cargos WHERE id = ?', [id])
        if (rows.length === 0) return res.status(404).json({ error: "Cargo inexistente na Empresa!" })

        const [infos] = await db.execute('UPDATE Cargos SET perms = ? WHERE id = ?', [JSON.stringify(perms), id])
        return res.json(infos)
    } catch(err) {
        console.error("MicroServiço Cargos PUT: ", err)
        return res.status(500).json({ error: "Erro ao atualizar o cargo!" })
    }
})

router.put("/all", async (req: Request, res: Response) => {
    const { ajustes } = req.body as { ajustes: Criar[] }
    if (!ajustes || !Array.isArray(ajustes)) return res.status(400).json({ error: "Ajuste inviados de forma inválida!" })

    const connection = await db.getConnection()
    try {
        await connection.beginTransaction()

        await connection.query('DELETE FROM Cargos')

        await Promise.all(ajustes.map((infos) => connection.execute("INSERT INTO Cargos(cargo, perms) VALUES(?, ?)",[infos.cargo, JSON.stringify(infos.perms)])))

        await connection.commit()
        return res.json({ success: true, message: "Cargos atualizados com sucesso!" })
    } catch(err) {
        await connection.rollback()
        console.error("MicroServiço Cargos PUT/ALL: ", err)
        return res.status(500).json({ error: "Erro ao atualizar os cargos!" })
    } finally {
        connection.release()
    }
})

router.delete("/", async (req: Request, res: Response) => {
    const { id } = req.body as { id: number }
    if (!id) return res.status(400).json({ error: "ID não definido!" })

    try {
        const [rows] = await db.query<Cargos[]>('SELECT id FROM Cargos WHERE id = ?', [id])
        if (rows.length === 0) return res.status(404).json({ error: "Cargo inexistente na empresa!" })
            
        await db.execute('DELETE FROM Cargos WHERE id = ?', [id])
        return res.status(200).json({ mensagem: "Cargo deletado!" })
    } catch(err) {
        console.error("MicroServiço Cargos DELETE: ", err)
        return res.status(500).json({ error: "Erro ao deletar o cargo!" })
    }
})

router.delete("/all", async (req: Request, res: Response) => {
    await db.query('DELETE FROM Cargos')
    return res.status(200).json({ mensagem: "Cargos deletados!" })
})
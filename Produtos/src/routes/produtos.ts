import type { Request, Response } from "express";
import router from '../lib/router'
import db from '../lib/mysql';
import type { Produtos } from '../types/produtos';
import { validate } from "../middlewares/validate";
import { InsertInput, insertSchema } from "../schemas/insertSchemas";
import { UpdateInput, updateSchema } from "../schemas/updateSchemas";

router.get("/", async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query<Produtos[]>('SELECT * FROM Produtos')

        if (rows.length === 0) return res.status(500).json({ error: "Não foi possivel localizar a lista de produtos!" })
        
        return res.json(rows)
    } catch(err) {
        console.error("MicroServiço Produtos GET: ", err)
        return res.status(500).json({ error: "Não foi possivel localizar a lista de produtos!" })
    }
})

router.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id)
    if (!id) return res.status(400).json({ error: "ID não informado do produto!" })

    try {
        const [rows] = await db.query<Produtos[]>('SELECT * FROM Produtos WHERE id = ?', [id])

        if (rows.length === 0) return res.status(500).json({ error: "Não foi possivel localizar a lista de produtos!" })
        
        return res.json(rows)
    } catch(err) {
        console.error("MicroServiço Produtos GET/:id: ", err)
        return res.status(500).json({ error: "Não foi possivel localizar a lista de produtos!" })
    }
})

router.get("/:nome", async (req: Request, res: Response) => {
    const nome: string = req.params.nome
    if (!nome) return res.status(400).json({ error: "Nome não informado do produto!" })

    try {
        const [rows] = await db.query<Produtos[]>('SELECT * FROM Produtos WHERE nome = ?', [nome])

        if (rows.length === 0) return res.status(500).json({ error: "Não foi possivel localizar a lista de produtos!" })
        
        return res.json(rows)
    } catch(err) {
        console.error("MicroServiço Produtos GET/:nome: ", err)
        return res.status(500).json({ error: "Não foi possivel localizar a lista de produtos!" })
    }
})

router.post("/", validate(insertSchema), async (req: Request, res: Response) => {
    const data = req.body as InsertInput

    try {
        const [rows] = await db.execute('INSERT INTO Produtos(nome,quantidade,descricao) VALUES(?,?,?)', [data.nome, data.quantidade, data.descricao])
        return res.json(rows)
    } catch(err) {
        console.error("MicroServiço Produtos POST: ", err)
        return res.status(500).json({ error: "Não foi possível criar o produto!" })
    }
})

router.put("/", validate(updateSchema),async (req: Request, res: Response) => {
    const data = req.body as UpdateInput

    try {
        const [rows] = await db.query<Produtos[]>('SELECT id FROM Produtos WHERE id = ?', [data.id])
        if (rows.length === 0) return res.status(400).json({ error: "Produto inexistente!" })

        await db.execute(`UPDATE Produtos SET ${data.tipo} = ? WHERE id = ?`, [data.valor, data.id])
        return res.status(200).json({ message: "Produto atualizado com sucesso!" })
    } catch(err) {
        console.error("MicroServiço Produtos PUT: ", err)
        return res.status(500).json({ error: "erro ao atualizar o produto!" })
    }
})

router.put("/all", async (req: Request, res: Response) => {
  const { ajustes } = req.body as { ajustes: Produtos[] }
  if (!ajustes || !Array.isArray(ajustes)) return res.status(400).json({ error: "Ajuste inviados de forma inválida!" })

  const connection = await db.getConnection()
  try {
    await connection.beginTransaction()

    await Promise.all(ajustes.map((infos) => connection.execute("UPDATE Produtos SET nome = ?, quantidade = ?, descricao = ? WHERE id = ?", [infos.nome, infos.quantidade, infos.descricao, infos.id])))

    await connection.commit()
    return res.json({ success: true, message: "Produtos atualizados com sucesso!" })
  } catch(err) {
    await connection.rollback()
    console.error("MicroServiço Produtos PUT/ALL: ", err)
    return res.status(500).json({ error: "Erro ao atualizar os Produtos!" })
  } finally {
    connection.release()
  }
})

router.delete("/", async (req: Request, res: Response) => {
    const { id } = req.body as { id: number }
    if (!id) return res.status(400).json({ error: "ID não informado do produto!" })

    try {
        await db.execute('DELETE FROM Produtos WHERE id = ?', [id])
        return res.status(200).json({ message: "Sucesso ao deletar o produto!" })
    } catch(err) {
        console.error("MicroServiço DELETE: ", err)
        return res.status(500).json({ error: "Erro ao deletar o produto!" })
    }
})

router.delete("/all", async (req: Request, res: Response) => {
    try {
        await db.execute('DELETE FROM Produtos')
        return res.status(200).json({ message: "Sucesso ao deletar todos os produtos!" })
    } catch(err) {
        console.error("MicroServiço DELETE/ALL: ", err)
        return res.status(500).json({ error: "Erro ao deletar o produto!" })
    }
})

export default router
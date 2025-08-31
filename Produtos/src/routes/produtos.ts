import router from '../lib/router'
import db from '../lib/mysql';
import type { Request, Response } from "express";
import { Produtos, Validar } from '../types/produtos';

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

router.post("/", async (req: Request, res: Response) => {
    const { nome, quantidade, descricao } = req.body as { nome: string, quantidade: number, descricao: string }

    const validos: Validar[] = [
        { nome: "Nome", valor: nome },
        { nome: "Quantidade", valor: quantidade },
        { nome: "Descrição", valor: descricao },
        { nome: "Nome", valor: nome }
    ]

    const invalidos = validos.find(info => !info.valor)
    if (invalidos) return res.status(400).json({ error: invalidos.nome + " não informado!" })

    try {
        const [rows] = await db.execute('INSERT INTO Produtos(nome,quantidade,descricao) VALUES(?,?,?)', [nome, quantidade, descricao])
        return res.json(rows)
    } catch(err) {
        console.error("MicroServiço Produtos POST: ", err)
        return res.status(500).json({ error: "Não foi possível criar o produto!" })
    }
})

router.put("/", async (req: Request, res: Response) => {
    const { id, tipo, valor } = req.body as { id: number, tipo: string, valor: string | number }
    
    const validos: Validar[] = [
        { nome: "ID", valor: id },
        { nome: "Tipo", valor: tipo },
        { nome: "Valor", valor: valor }
    ]

    const invalidos = validos.find(info => !info.valor)
    if (invalidos) return res.status(400).json({ error: invalidos.nome + " não informado!" })
    
    try {
        const [rows] = await db.query<Produtos[]>('SELECT id FROM Produtos WHERE id = ?', [id])
        if (rows.length === 0) return res.status(400).json({ error: "Produto inexistente!" })

        await db.execute(`UPDATE Produtos SET ${tipo} = ? WHERE id = ?`, [valor, id])
        return res.status(200).json({ message: "Produto atualizado com sucesso!" })
    } catch(err) {
        console.error("MicroServiço Produtos PUT: ", err)
        return res.status(500).json({ error: "erro ao atualizar o produto!" })
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
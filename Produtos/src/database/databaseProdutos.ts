import db from "../lib/mysql";
import logger from "../lib/pino";
import { InsertInput } from "../schemas/insertSchemas";
import { UpdateInput } from "../schemas/updateSchemas";
import { Produtos } from "../types/produtos";

export const produtosDB = {
    async getAll(): Promise<{ sucess: boolean, data?: Produtos[], error?: string }> {
        try {
            const [rows] = await db.query<Produtos[]>('SELECT * FROM Produtos')
            if (rows.length === 0) return { sucess: false, error: "Não possui produtos na empresa!" }
            return { sucess: true, data: rows }
        } catch(err) {
            logger.error("Produtos GetAll: "+ err)
            console.error("Produtos GetAll: ", err)
            return { sucess: false, error: "Erro ao encontrar os produtos!" }
        }
    },

    async getById(id: number): Promise<{ sucess: boolean, data?: Produtos[], error?: string }> {
        try {
            const [rows] = await db.query<Produtos[]>('SELECT * FROM Produtos WHERE id = ?', [id])
            if (rows.length === 0) return { sucess: true, error: "Não foi localizado produto com esse ID!" }
            return { sucess: true, data: rows }
        } catch(err) {
            logger.error("Produtos GetById: "+ err)
            console.error("Produtos GetById: ", err)
            return { sucess: false, error: "Erro ao localizar produto pelo ID!" }
        }
    },

    async getByName(nome: string): Promise<{ sucess: boolean, data?: Produtos[], error?: string }> {
        try {
            const [rows] = await db.query<Produtos[]>('SELECT * FROM Produtos WHERE nome = ?', [nome])
            if (rows.length === 0) return { sucess: false, error: "Não foi localizado produto com esse nome!" }
            return { sucess: true, data: rows }
        } catch(err) {
            logger.error("Produtos GetByName: "+ err)
            console.error("Produtos GetByName: ", err)
            return { sucess: false, error: "Erro ao localizar produto pelo nome!!" }
        }
    },

    async postProduto(data: InsertInput): Promise<{ sucess: boolean, data?: Produtos[], error?: string }> {
        try {
            const [rows] = await db.execute<Produtos[]>('INSERT INTO Produtos(nome,quantidade,descricao) VALUES(?,?,?)', [data.nome, data.quantidade, data.descricao])
            return { sucess: true, data: rows }
        } catch(err) {
            logger.error("Produtos PostProduto: "+ err)
            console.error("Produtos PostProduto: ", err)
            return { sucess: false, error: "Erro ao criar o produto!" }
        }
    },

    async putProduto(data: UpdateInput): Promise<{ sucess: boolean, error?: string }> {
        try {
            const produto = await produtosDB.getById(data.id)
            if (!produto.sucess) return { sucess: false, error: produto.error }
            
            await db.execute(`UPDATE Produtos SET ${data.tipo} = ? WHERE id = ?`, [data.valor, data.id])
            return { sucess: true }
        } catch(err) {
            logger.error("Produtos PutProduto: "+ err)
            console.error("Produtos PutProduto: ", err)
            return { sucess: false, error: "Erro ao criar o produto!" }
        }
    },

    async putAll(ajustes: Produtos[]): Promise<{ sucess: boolean, error?: string }> {
        const connection = await db.getConnection()
        try {
            await connection.beginTransaction()

            await Promise.all(ajustes.map((infos) => connection.execute("UPDATE Produtos SET nome = ?, quantidade = ?, descricao = ? WHERE id = ?", [infos.nome, infos.quantidade, infos.descricao, infos.id])))

            await connection.commit()
            return { sucess: true }
        } catch(err) {
            await connection.rollback()
            logger.error("Produtos PutAll: "+ err)
            console.error("Produtos PutAll: ", err)
            return { sucess: false, error: "Erro ao atualizar todos os produtos!!" }
        }finally {
            connection.release()
        }
    },

    async deleteById(id: number): Promise<{ sucess: boolean, error?: string }> {
        try {
            await db.execute('DELETE FROM Produtos WHERE id = ?', [id])
            return { sucess: true }
        } catch(err){
            logger.error("Produtos DeleteById: "+ err)
            console.error("Produtos DeleteById: ", err)
            return { sucess: false, error: "Erro ao deletar o produto!!" }
        }
    },

    async deleteAll(): Promise<{ sucess: boolean, error?: string }> {
        try {
            await db.execute('DELETE FROM Produtos')
            return { sucess: true }
        } catch(err){
            logger.error("Produtos DeleteAll: "+ err)
            console.error("Produtos DeleteAll: ", err)
            return { sucess: false, error: "Erro ao deletar todos os produtos!!" }
        }
    }
}
import db from "../lib/mysql";
import logger from "../lib/pino";
import { Cargos, Criar } from "../types/cargos";

export const cargosDB = {
    async getAll(): Promise<{ sucess: boolean, data?: Cargos[], error?: string }>{
        try {
            const [rows] = await db.query<Cargos[]>('SELECT * FROM Cargos')
            return { sucess: true, data: rows }
        } catch(err) {
            logger.error("Cargos GetAll: " + err)
            console.error("Cargos GetAll: ", err)
            return { sucess: false, error: "Erro ao buscar o cargo!" }
        }
    },

    async getById(id: number): Promise<{ sucess: boolean, data?: Cargos[], error?: string }> {
        try {
            const [rows] = await db.query<Cargos[]>('SELECT * FROM Cargos WHERE ID = ?', [id])
            if (rows.length > 0) return { sucess: true, data: rows }
            return { sucess: false, error: "Cargo inexistente na empresa!" }
        } catch(err) {
            logger.error("Cargos GetById: " + err)
            console.error("Cargos GetById: ", err)
            return { sucess: false, error: "Erro ao buscar o cargo pelo ID!" }
        }
    },

    async getByCargo(cargo: string): Promise<{ sucess: boolean, data?: Cargos[], error?: string }> {
        try {
            const [rows] = await db.query<Cargos[]>('SELECT * From Cargos WHERE cargo = ?', [cargo])
            if (rows.length > 0) return { sucess: true, data: rows }
            return { sucess: false, error: "Cargo já está cadastrado na empresa!" }
        } catch(err) {
            logger.error("Cargos GetByCargo: " + err)
            console.error("Cargos GetByCargo: ", err)
            return { sucess: false, error: "Erro ao buscar o cargo pelo nome!" }
        }
    },

    async postCargo(infos: { cargo: string, perms: string[]}): Promise<{ sucess: boolean, error?: string }> {
        try {
            const dados = await cargosDB.getByCargo(infos.cargo)
            if (!dados.sucess) return { sucess: false, error: dados.error }

            await db.execute('INSERT INTO Cargos(cargo,perms) VALUES(?,?)', [infos.cargo, infos.perms])
            return { sucess: true }
        } catch(err) {
            logger.error("Cargos PostCargo: " + err)
            console.error("Cargos PostCargo: ", err)
            return { sucess: false, error: "Erro ao criar o cargo!!" }
        }
    },

    async putCargo(infos: { id: number, perms: string[]}): Promise<{ sucess: boolean, data?: Cargos[], error?: string }> {
        try {
            const dados = await cargosDB.getById(infos.id)
            if (!dados.sucess) return { sucess: false, error: dados.error };

            const [rows] = await db.execute<Cargos[]>('UPDATE Cargos SET perms = ? WHERE id = ?', [JSON.stringify(infos.perms), infos.id])
            return { sucess: true, data: rows }
        } catch(err) {
            logger.error("Cargos PutCargo: " + err)
            console.error("Cargos PutCargo: ", err)
            return { sucess: false, error: "Erro ao atualizar o cargo!!" }
        }
    },

    async putCargos(ajustes: Criar[]): Promise<{ sucess: boolean, error?: string }> {
        const connection = await db.getConnection()

        try {
            await connection.beginTransaction()

            await Promise.all(ajustes.map((infos) => connection.execute("UPDATE Cargos SET perms = ? WHERE id = ?",[infos.id, JSON.stringify(infos.perms)])))

            await connection.commit()
            return { sucess: true }
        } catch(err) {
            await connection.rollback()
            logger.error("Cargos PutCargos: " + err)
            console.error("Cargos PutCargos: ", err)
            return { sucess: false, error: "Erro ao atualizar os cargos" }
        } finally {
            connection.release()
        }
    },

    async deleteById(id: number): Promise<{ sucess: boolean, error?: string }> {
        try {
            await db.execute('DELETE FROM Cargos WHERE id = ?', [id])
            return { sucess: true }
        } catch(err) {
            logger.error("Cargos DeleteById: " + err)
            console.error("Cargos DeleteById: ", err)
            return { sucess: false, error: "Erro ao deletar o cargo pelo id!" }
        }
    },

    async deleteAll(): Promise<{ sucess: boolean, error?: string }> {
        try {
            await db.query('DELETE FROM Cargos')
            return { sucess: true }
        } catch(err) {
            logger.error("Cargos DeleteAll: " + err)
            console.error("Cargos DeleteAll: ", err)
            return { sucess: false, error: "Erro ao deletar os cargos!" }
        }
    }
}
import { success } from "zod";
import db from "../lib/mysql";
import { FuncionarioInput } from "../schemas/funcionarioSchemas";
import { Usuarios } from "../types/funcionarios";
import logger from "../lib/pino";

export const funcionariosDB = {
    async getAll(): Promise<{ sucess: boolean, data?: Usuarios[], error?: string }> {
        try {
            const [rows] = await db.query<Usuarios[]>('SELECT f.id, f.nome, f.email, f.cpf, f.idade, f.cep, c.cargo FROM Funcionarios F JOIN Cargos c ON f.cargo_id = c.id')
            return { sucess: true, data: rows }
        } catch(err) {
            logger.error("Funcionários GetAll: " + err)
            console.error("Funcionários GetAll: ", err)
            return { sucess: false, error: "Erro ao buscar os funcionários" }
        }
    },

    async getById(id: number): Promise<{ sucess: boolean, data?: Usuarios[], error?: string }> {
        try {
            const [rows] = await db.query<Usuarios[]>('SELECT f.nome, f.email, f.cpf, f.idade, f.cep, c.cargo FROM Funcionarios F JOIN Cargos c ON f.cargo_id = c.id WHERE f.id = ? LIMIT 1', [id])
            if (rows.length === 0) return { sucess: false, error: "Funcionário não existente!" }
            return { sucess: true, data: rows }
        } catch(err) {
            logger.error("Funcionários GetById: " + err)
            console.error("Funcionários GetById: ", err)
            return { sucess: false, error: "Erro ao buscar funcionário!" }
        }
    },

    async getByEmail(email: string): Promise<{ sucess: boolean, data?: Usuarios[], error?: string }> {
        try {
            const [rows] = await db.query<Usuarios[]>('SELECT * FROM Funcionarios WHERE email = ? LIMIT 1', [email])
            if (rows.length === 0) return { sucess: false, error: "Email não possui cadastro na empresa!" }
            return { sucess: true, data: rows }
        } catch(err) {
            logger.error("Funcionários GetByEmail: " + err)
            console.error("Funcionários GetByEmail: ", err)
            return { sucess: false, error: "Erro ao localizar funcionário!" }
        }
    },
    
    async getByCpf(cpf: string): Promise<{ sucess: boolean, data?: Usuarios[], error?: string }> {
        try {
            const [rows] = await db.query<Usuarios[]>('SELECT * FROM Funcionarios WHERE cpf = ? LIMIT 1', [cpf])
            if (rows.length === 0) return { sucess: false, error: "CPF não possui cadastro na empresa!" }
            return { sucess: true, data: rows }
        } catch(err) {
            logger.error("Funcionários GetByCpf: " + err)
            console.error("Funcionários GetByCpf: ", err)
            return { sucess: false, error: "Erro ao localizar funcionário!" }
        }
    },

    async postFuncionario(data: FuncionarioInput): Promise<{ sucess: boolean, error?: string }> {
        try {
            const dados = await funcionariosDB.getByEmail(data.email)
            if (dados) return { sucess: false, error: "Email já possui cadastro na empresa!" }

            const dados2 = await funcionariosDB.getByCpf(data.cpf)
            if (dados2) return { sucess: false, error: "CPF já possui cadastro na empresa!" }

            await db.execute('INSERT INTO Funcionarios(nome,email,cpf,idade,cep,cargo) VALUES(?,?,?,?,?,?)', [data.nome, data.email, data.cpf, data.idade, data.cep, data.cargo_id])
            return { sucess: true }
        } catch(err) {
            logger.error("Funcionários PostFuncionario: " + err)
            console.error("Funcionários PostFuncionario: ", err)
            return { sucess: false, error: "Erro ao criar o funcionário!" }
        }
    },

    async putFuncionario(tipo: string, id: number, valor: string): Promise<{ sucess: boolean, data?: Usuarios[], error?: string }> {
        try {
            const dados = await funcionariosDB.getById(id)
            if (!dados.sucess) return { sucess: false, error: dados.error }

            const [edit] = await db.execute<Usuarios[]>(`UPDATE Funcionarios SET ${tipo} = ? WHERE id = ?`, [valor, id])
            return { sucess: true, data: edit }
        } catch(err) {
            logger.error("Funcionários PutFuncionario: " + err)
            console.error("Funcionários PutFuncionario: ", err)
            return { sucess: false, error: "Erro ao atualizar as informações do Funcionário!" }
        }
    },

    async putAll(ajustes: Usuarios[]): Promise<{ sucess: boolean, error?: string }> { 
        const connection = await db.getConnection()
        try {
            await connection.beginTransaction()

            await Promise.all(ajustes.map((infos) => connection.execute("UPDATE Funcionarios SET nome = ?, email = ?, cpf = ?, idade = ?, cep = ?, cargo = ? WHERE id = ?",[infos.nome, infos.email, infos.cpf, infos.idade, infos.cep, infos.cargo, infos.id])))

            await connection.commit()
            return { sucess: true }
        } catch(err) {
            await connection.rollback()
            logger.error("Funcionários PutAll: " + err)
            console.error("Funcionários PutAll: ", err)
            return { sucess: false ,error: "Erro ao atualizar os Funcionarios!" }
        } finally {
            connection.release()
        }
    },

    async deleteFuncionario(id: number): Promise<{ sucess: boolean, error?: string }> {
        try {
            const dados = await funcionariosDB.getById(id)
            if (!dados.sucess) return { sucess: false, error: dados.error }

            await db.execute('DELETE FROM Funcionarios WHERE id = ?', [id])
            return { sucess: true }
        } catch(err) {
            logger.error("Funcionários DeleteFuncionario: " + err)
            console.error("Funcionários DeleteFuncionario: ", err)
            return { sucess: false, error: "Erro ao deletar o funcionário!" }
        }
    },

    async deleteAll(): Promise<{ sucess: boolean, error?: string }> {
        try {
            await db.execute('DELETE FROM Funcionarios')
            return { sucess: true }
        } catch(err) {
            logger.error("Funcionários DeleteAll: " + err)
            console.error("Funcionários DeleteAll: ", err)
            return { sucess: false, error: "Erro ao deletar todos os funcionários!" }
        }
    }
}
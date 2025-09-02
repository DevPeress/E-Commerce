import { email } from "zod";
import Criptografar from "../lib/bcrypt";
import db from "../lib/mysql";
import logger from "../lib/pino";
import { RegisterInput } from "../schemas/registeSchemas";
import { Register } from "../types/register";

export const RegisterDB = {
    async getByEmail(email: string): Promise<{ sucess: boolean, data?: Register[], error?: string}> {
        try {
            const [rows] = await db.query<Register[]>('SELECT email FROM Clientes WHERE email = ? LIMIT 1', [email])
            logger.info("Iniciou a procura do registro do email: " + email)

            if (rows.length === 0) return { sucess: false, error: "Não foi localizado o email!" }
            return { sucess: true, data: rows }
        } catch(err) {
            logger.error("Register GetByEmail: " + err)
            console.error("Register GetByEmail: ", err)
            return { sucess: false, error: "Erro ao localizar email!"}
        }
    },

    async postRegister(data: RegisterInput): Promise<{ sucess: boolean, error?: string}> {
        try {
            const dados = await RegisterDB.getByEmail(data.email)
            if (dados.sucess) return { sucess: false, error: "Email possui uma conta já!" }

            const senhaProtegida: string = await Criptografar(data.senha)
            await db.execute('INSERT INTO Clientes(nome,email,senha,cpf,idade,cep) VALUES(?,?,?,?,?,?)', [data.nome, data.email, senhaProtegida, data.cpf, data.idade, data.cep])

            logger.info("Cadastro do email: " + email + "na empresa!")
            return { sucess: true }
        } catch(err) {
            logger.error("Register PostRegister: " + err)
            console.error("Register PostRegister: ", err)
            return { sucess: false, error: "Erro ao criar conta!" }
        }
    }
}
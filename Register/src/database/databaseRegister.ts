import Criptografar from "../lib/bcrypt";
import db from "../lib/mysql";
import { RegisterInput } from "../schemas/registeSchemas";
import { Register } from "../types/register";

export const RegisterDB = {
    async getByEmail(email: string): Promise<{ sucess: boolean, error?: string}> {
        try {
            const [rows] = await db.query<Register[]>('SELECT email FROM Clientes WHERE email = ? LIMIT 1', [email])
            if (rows.length === 0) return { sucess: false, error: "Não foi localizado o email!" }
            return { sucess: true }
        } catch(err) {
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
            return { sucess: true }
        } catch(err) {
            return { sucess: false, error: "Erro ao criar conta!" }
        }
    }
}
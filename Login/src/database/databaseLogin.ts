import VerificarSenha from "../lib/bcrypt"
import db from "../lib/mysql"
import { LoginInput } from "../schemas/loginSchemas"
import { Login } from "../types/login"

export const LoginDB = {
    async getLogin(dados: LoginInput): Promise<{ sucess: boolean, error?: string }> {
        const [rows] = await db.query<Login[]>('SELECT email, senha FROM Clientes WHERE email = ? LIMIT 1', [dados.email])
        if (rows.length === 0) return { sucess: false, error: "Email ou senha estão incorretos!" }

        const senhaCorreta: boolean = await VerificarSenha(dados.senha,rows[0].senha)
        if (!senhaCorreta) return { sucess: false, error: "Email ou senha estão incorretos!" }
        
        return { sucess: true }
    }
}
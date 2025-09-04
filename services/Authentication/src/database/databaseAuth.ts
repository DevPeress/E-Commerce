import { email } from "zod";
import { VerificarSenha, Criptografar } from "../lib/bcrypt";
import db from "../lib/mysql";
import logger from "../lib/pino";
import { LoginInput, RecInput, RegisterInput } from "../schemas/authSchemas";
import { Login, Register } from "../types/auth";

export const AuthDB = {
  async getByEmail(email: string): Promise<{ sucess: boolean; data?: Register[]; error?: string }> {
    try {
      const [rows] = await db.query<Register[]>(
        "SELECT email FROM Clientes WHERE email = ? LIMIT 1",
        [email]
      );
      logger.info("Iniciou a procura do registro do email: " + email);

      if (rows.length === 0) return { sucess: false, error: "Não foi localizado o email!" };
      return { sucess: true, data: rows };
    } catch (err) {
      logger.error("Register GetByEmail: " + err);
      console.error("Register GetByEmail: ", err);
      return { sucess: false, error: "Erro ao localizar email!" };
    }
  },

  async postRegister(data: RegisterInput): Promise<{ sucess: boolean; error?: string }> {
    try {
      const dados = await AuthDB.getByEmail(data.email);
      if (dados.sucess) return { sucess: false, error: "Email possui uma conta já!" };

      const senhaProtegida: string = await Criptografar(data.senha);
      await db.execute("INSERT INTO Clientes(nome,email,senha,cpf,idade,cep) VALUES(?,?,?,?,?,?)", [
        data.nome,
        data.email,
        senhaProtegida,
        data.cpf,
        data.idade,
        data.cep,
      ]);

      logger.info("Cadastro do email: " + email + "na empresa!");
      return { sucess: true };
    } catch (err) {
      logger.error("Register PostRegister: " + err);
      console.error("Register PostRegister: ", err);
      return { sucess: false, error: "Erro ao criar conta!" };
    }
  },

  async getLogin(dados: LoginInput): Promise<{ sucess: boolean; data?: Login[]; error?: string }> {
    try {
      const [rows] = await db.query<Login[]>(
        "SELECT email, senha FROM Clientes WHERE email = ? LIMIT 1",
        [dados.email]
      );
      logger.info("Iniciou a procura do email: " + dados.email);
      if (rows.length === 0) return { sucess: false, error: "Email ou senha estão incorretos!" };

      const senhaCorreta: boolean = await VerificarSenha(dados.senha, rows[0].senha);
      if (!senhaCorreta) {
        logger.info("Digitou a senha errada!");
        return { sucess: false, error: "Email ou senha estão incorretos!" };
      }

      logger.info("Iniciou o login!");
      return { sucess: true, data: rows };
    } catch (err) {
      logger.error("Login GetLogin: " + err);
      console.error("Login GetLogin: ", err);
      return { sucess: false, error: "Erro ao realizar o login!" };
    }
  },

  async putLogin(dados: RecInput): Promise<{ sucess: boolean; error?: string }> {
    try {
      const data = await AuthDB.getByEmail(dados.email);
      if (!data.sucess || !data.data) return { sucess: false, error: data.error };

      const verify: boolean = await VerificarSenha(data.data[0].senha, dados.senha);
      if (!verify) return { sucess: false, error: "Senha atual está errada!" };

      const senhaCriptografada = Criptografar(dados.senhaNova);

      await db.execute("UPDATE INTO Clientes SET senha = ? WHERE email = ?", [
        senhaCriptografada,
        dados.email,
      ]);
      return { sucess: true };
    } catch (err) {
      logger.error("Recuperação: " + err);
      console.error("Recuperação: ", err);
      return { sucess: false, error: "Erro ao realizar a recuperação de senha!" };
    }
  },
};

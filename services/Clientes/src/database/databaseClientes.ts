import db from "../lib/mysql";
import logger from "../lib/pino";
import { ClienteType } from "../schemas/clientesSchemas";
import { Clientes } from "../types/clientes";

export const clientesDB = {
  async getAll(): Promise<{ sucess: boolean; data?: Clientes[]; error?: string }> {
    try {
      const [rows] = await db.query<Clientes[]>("SELECT * FROM Clientes");
      if (rows.length === 0) return { sucess: false, error: "Não existe clientes na loja!" };

      return { sucess: true, data: rows };
    } catch (err) {
      logger.error("Clientes GetAll: " + err);
      console.error("Clientes GetAll: ", err);
      return { sucess: false, error: "Erro ao buscar todos os clientes!" };
    }
  },

  async getById(id: number): Promise<{ sucess: boolean; data?: Clientes[]; error?: string }> {
    try {
      const [rows] = await db.query<Clientes[]>("SELECT * FROM Clientes WHERE id = ?", [id]);
      if (rows.length === 0) return { sucess: false, error: "Não existe cliente com essa id!" };

      return { sucess: true, data: rows };
    } catch (err) {
      logger.error("Clientes GetById: " + err);
      console.error("Clientes GetById: ", err);
      return { sucess: false, error: "Erro ao buscar o cliente pelo ID!" };
    }
  },

  async getByNome(nome: string): Promise<{ sucess: boolean; data?: Clientes[]; error?: string }> {
    try {
      const [rows] = await db.query<Clientes[]>("SELECT * FROM Clientes WHERE nome = ?", [nome]);
      if (rows.length === 0) return { sucess: false, error: "Não existe cliente com essa nome!!" };

      return { sucess: true, data: rows };
    } catch (err) {
      logger.error("Clientes GetByNome: " + err);
      console.error("Clientes GetByNome: ", err);
      return { sucess: false, error: "Erro ao buscar o cliente pelo nome!" };
    }
  },

  async getByCpf(cpf: string): Promise<{ sucess: boolean; data?: Clientes[]; error?: string }> {
    try {
      const [rows] = await db.query<Clientes[]>("SELECT * FROM Clientes WHERE cpf = ?", [cpf]);
      if (rows.length === 0) return { sucess: false, error: "Não existe cliente com esse cpf!!" };

      return { sucess: true, data: rows };
    } catch (err) {
      logger.error("Clientes GetByCpf: " + err);
      console.error("Clientes GetByCpf: ", err);
      return { sucess: false, error: "Erro ao buscar o cliente pelo cpf!" };
    }
  },

  async getByEmail(email: string): Promise<{ sucess: boolean; data?: Clientes[]; error?: string }> {
    try {
      const [rows] = await db.query<Clientes[]>("SELECT * FROM Clientes WHERE email = ?", [email]);
      if (rows.length === 0) return { sucess: false, error: "Não existe cliente com esse email!!" };

      return { sucess: true, data: rows };
    } catch (err) {
      logger.error("Clientes GetByEmail: " + err);
      console.error("Clientes GetByEmail: ", err);
      return { sucess: false, error: "Erro ao buscar o cliente pelo email!" };
    }
  },

  async postCliente(data: ClienteType): Promise<{ sucess: boolean; error?: string }> {
    try {
      const dados = await clientesDB.getByCpf(data.cpf);
      if (dados.sucess) return { sucess: false, error: "CPF já cadastrado no sistema!" };

      const dados2 = await clientesDB.getByEmail(data.email);
      if (dados2.sucess) return { sucess: false, error: "E-mail já cadastrado no sistema!" };

      await db.execute(
        "INSERT INTO Clientes(nome,email,cpf,cep,rua,numeroCasa,idade,telefone) VALUES(?,?,?,?,?,?,?,?)",
        [
          data.nome,
          data.email,
          data.cpf,
          data.cep,
          data.rua,
          data.numeroCasa,
          data.idade,
          data.telefone,
        ]
      );
      return { sucess: true };
    } catch (err) {
      logger.error("Clientes Post: " + err);
      console.error("Clientes Post: ", err);
      return { sucess: false, error: "Não foi possível criar o cliente!" };
    }
  },

  async deleteCliente(id: number): Promise<{ sucess: boolean; error?: string }> {
    try {
      await db.execute("DELETE FROM Clientes WHERE id = ?", [id]);
      return { sucess: true };
    } catch (err) {
      logger.error("Clientes Delete: " + err);
      console.error("Clientes Delete: ", err);
      return { sucess: false, error: "Não foi possível deletar o cliente!" };
    }
  },

  async deleteAll(): Promise<{ sucess: boolean; error?: string }> {
    try {
      await db.execute("DELETE FROM Clientes");
      return { sucess: true };
    } catch (err) {
      logger.error("Clientes DeleteAll: " + err);
      console.error("Clientes DeleteAll: ", err);
      return { sucess: false, error: "Não foi possível deletar todos os cliente!" };
    }
  },
};

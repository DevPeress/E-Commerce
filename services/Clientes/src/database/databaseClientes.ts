import db from "../lib/mysql";
import logger from "../lib/pino";
import { ClienteType } from "../schemas/clientesSchemas";
import { Clientes } from "../types/clientes";

export const clientesDB = {
  async getAll(): Promise<{ success: boolean; data?: Clientes[]; error?: string }> {
    try {
      const [rows] = await db.query<Clientes[]>("SELECT * FROM Clientes");
      if (rows.length === 0) return { success: false, error: "Não existe clientes na loja!" };

      return { success: true, data: rows };
    } catch (err) {
      logger.error("Clientes GetAll: " + err);
      console.error("Clientes GetAll: ", err);
      return { success: false, error: "Erro ao buscar todos os clientes!" };
    }
  },

  async getById(id: number): Promise<{ success: boolean; data?: Clientes[]; error?: string }> {
    try {
      const [rows] = await db.query<Clientes[]>("SELECT * FROM Clientes WHERE id = ?", [id]);
      if (rows.length === 0) return { success: false, error: "Não existe cliente com essa id!" };

      return { success: true, data: rows };
    } catch (err) {
      logger.error("Clientes GetById: " + err);
      console.error("Clientes GetById: ", err);
      return { success: false, error: "Erro ao buscar o cliente pelo ID!" };
    }
  },

  async getByNome(nome: string): Promise<{ success: boolean; data?: Clientes[]; error?: string }> {
    try {
      const [rows] = await db.query<Clientes[]>("SELECT * FROM Clientes WHERE nome = ?", [nome]);
      if (rows.length === 0) return { success: false, error: "Não existe cliente com esse nome!!" };

      return { success: true, data: rows };
    } catch (err) {
      logger.error("Clientes GetByNome: " + err);
      console.error("Clientes GetByNome: ", err);
      return { success: false, error: "Erro ao buscar o cliente pelo nome!" };
    }
  },

  async getByCpf(cpf: string): Promise<{ success: boolean; data?: Clientes[]; error?: string }> {
    try {
      const [rows] = await db.query<Clientes[]>("SELECT * FROM Clientes WHERE cpf = ?", [cpf]);
      if (rows.length === 0) return { success: false, error: "Não existe cliente com esse cpf!!" };

      return { success: true, data: rows };
    } catch (err) {
      logger.error("Clientes GetByCpf: " + err);
      console.error("Clientes GetByCpf: ", err);
      return { success: false, error: "Erro ao buscar o cliente pelo cpf!" };
    }
  },

  async getByEmail(email: string): Promise<{ success: boolean; data?: Clientes[]; error?: string }> {
    try {
      const [rows] = await db.query<Clientes[]>("SELECT * FROM Clientes WHERE email = ?", [email]);
      if (rows.length === 0) return { success: false, error: "Não existe cliente com esse email!!" };

      return { success: true, data: rows };
    } catch (err) {
      logger.error("Clientes GetByEmail: " + err);
      console.error("Clientes GetByEmail: ", err);
      return { success: false, error: "Erro ao buscar o cliente pelo email!" };
    }
  },

  async postCliente(data: ClienteType): Promise<{ success: boolean; error?: string }> {
    try {
      const dados = await clientesDB.getByCpf(data.cpf);
      if (dados.success) return { success: false, error: "CPF já cadastrado no sistema!" };

      const dados2 = await clientesDB.getByEmail(data.email);
      if (dados2.success) return { success: false, error: "E-mail já cadastrado no sistema!" };

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
      return { success: true };
    } catch (err) {
      logger.error("Clientes Post: " + err);
      console.error("Clientes Post: ", err);
      return { success: false, error: "Não foi possível criar o cliente!" };
    }
  },

  async putClienteSpecify(
    tipo: string,
    valor: string | number,
    cpf: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const dados = await clientesDB.getByCpf(cpf);
      if (!dados.success) return { success: false, error: dados.error };

      await db.execute(`UPDATE Cliente SET ${tipo} = ? WHERE cpf = ?`, [valor, cpf]);
      return { success: true };
    } catch (err) {
      logger.error("Clientes PutClient: " + err);
      console.error("Clientes PutClient: ", err);
      return { success: false, error: "Não foi possível atualizar o cliente!" };
    }
  },

  async putClienteAll(data: ClienteType): Promise<{ success: boolean; error?: string }> {
    try {
      const dados = await clientesDB.getByCpf(data.cpf);
      if (!dados.success) return { success: false, error: dados.error };

      await db.execute(
        "UPDATE Cliente SET nome = ?, email = ?, cpf = ?, rua = ?, numeroCasa = ?, idade = ?, telefone = ? WHERE cpf = ?",
        [
          data.nome,
          data.email,
          data.cpf,
          data.rua,
          data.numeroCasa,
          data.idade,
          data.telefone,
          data.cpf,
        ]
      );
      return { success: true };
    } catch (err) {
      logger.error("Clientes PutClient: " + err);
      console.error("Clientes PutClient: ", err);
      return { success: false, error: "Não foi possível atualizar o cliente!" };
    }
  },

  async deleteCliente(id: number): Promise<{ success: boolean; error?: string }> {
    try {
      await db.execute("DELETE FROM Clientes WHERE id = ?", [id]);
      return { success: true };
    } catch (err) {
      logger.error("Clientes Delete: " + err);
      console.error("Clientes Delete: ", err);
      return { success: false, error: "Não foi possível deletar o cliente!" };
    }
  },

  async deleteAll(): Promise<{ success: boolean; error?: string }> {
    try {
      await db.execute("DELETE FROM Clientes");
      return { success: true };
    } catch (err) {
      logger.error("Clientes DeleteAll: " + err);
      console.error("Clientes DeleteAll: ", err);
      return { success: false, error: "Não foi possível deletar todos os cliente!" };
    }
  },
};

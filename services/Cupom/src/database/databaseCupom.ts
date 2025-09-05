import db from "../lib/mysql";
import logger from "../lib/pino";
import { CupomInput } from "../schemas/cupomSchemas";
import { Cupom } from "../types/cupom";

export const CupomDB = {
  async getAll(): Promise<{ sucess: boolean; data?: Cupom[]; error?: string }> {
    try {
      logger.info("Requisitou todos os cupons!");
      const [rows] = await db.query<Cupom[]>("SELECT * FROM Cupom");
      if (rows.length === 0) return { sucess: false, error: "Não possui cupons registrados!" };
      return { sucess: true, data: rows };
    } catch (err) {
      logger.error("Cupom GetAll: " + err);
      console.error("Cupom GetAll: ", err);
      return { sucess: false, error: "Erro ao localizar os cupons!" };
    }
  },

  async getById(id: number): Promise<{ sucess: boolean; data?: Cupom[]; error?: string }> {
    try {
      logger.info("Requisitou cupom de ID: " + id);
      const [rows] = await db.query<Cupom[]>("SELECT * FROM Cupom WHERE id = ?", [id]);
      if (rows.length === 0) return { sucess: false, error: "Não possui cupom esse ID!" };
      return { sucess: true, data: rows };
    } catch (err) {
      logger.error("Cupom GetById: " + err);
      console.error("Cupom GetById: ", err);
      return { sucess: false, error: "Erro ao localizar o cupom!" };
    }
  },

  async getByName(name: string): Promise<{ sucess: boolean; data?: Cupom[]; error?: string }> {
    try {
      logger.info("Requisitou cupom de Nome: " + name);
      const [rows] = await db.query<Cupom[]>("SELECT * FROM Cupom WHERE id = ?", [name]);
      if (rows.length === 0) return { sucess: false, error: "Não possui cupom esse Nome!" };
      return { sucess: true, data: rows };
    } catch (err) {
      logger.error("Cupom GetByName: " + err);
      console.error("Cupom GetByName: ", err);
      return { sucess: false, error: "Erro ao localizar o cupom!" };
    }
  },

  async postCupom(data: CupomInput): Promise<{ sucess: boolean; error?: string }> {
    try {
      const dados = await CupomDB.getByName(data.nome);
      if (dados.sucess) {
        logger.info("Tentou criar com o mesmo nome definido: " + data.nome);
        return { sucess: false, error: "Cupom com o mesmo nome criado já!" };
      }

      const tipo = data.tipo ? "fixo" : "percentual";
      logger.info("Criou o cupom: " + data.nome + ", valor: " + data.valor + " tipo: " + tipo);
      await db.execute("INSERT INTO Cupom(nome,valor,tipo) VALUES(?,?,?)", [
        data.nome,
        data.valor,
        data.tipo,
      ]);
      return { sucess: true };
    } catch (err) {
      logger.error("Cupom PostCupom: " + err);
      console.error("Cupom PostCupom: ", err);
      return { sucess: false, error: "Não foi possível criar o cupom!" };
    }
  },

  async putCupom(data: CupomInput): Promise<{ sucess: boolean; error?: string }> {
    try {
      const dados = await CupomDB.getByName(data.nome);
      if (!dados.sucess) {
        logger.info("Tentou atualizar cupom inexistente com o nome: " + data.nome);
        return { sucess: false, error: dados.error };
      }

      logger.info("Atualizou o Cupom de nome: " + data.nome + " com o valor: " + data.valor);
      await db.execute("UPDATE Cupom SET nome = ?, valor = ? WHERE nome = ?", [
        data.nome,
        data.valor,
        data.nome,
      ]);
      return { sucess: true };
    } catch (err) {
      logger.error("Cupom PutCupom: " + err);
      console.error("Cupom PutCupom: ", err);
      return { sucess: false, error: "Não foi possível atualizar o cupom!" };
    }
  },

  async deleteCupom(id: number): Promise<{ sucess: boolean; error?: string }> {
    try {
      const dados = await CupomDB.getById(id);
      if (!dados.sucess) {
        logger.info("Tentou deletar o cupom de ID: " + id);
        return { sucess: false, error: dados.error };
      }

      const dados2 = await CupomDB.getById(id);
      if (!dados2.sucess || !dados2.data) return { sucess: false };

      logger.info("Deletou o Cupom: " + dados2.data[0].nome);
      await db.execute("DELETE FROM Cupom WHERE id = ?", [id]);
      return { sucess: true };
    } catch (err) {
      logger.error("Cupom DeleteCupom: " + err);
      console.error("Cupom DeleteCupom: ", err);
      return { sucess: false, error: "Não foi possível deletar o cupom!" };
    }
  },

  async deleteAll(): Promise<{ sucess: boolean; error?: string }> {
    try {
      await db.query("DELETE FROM Cupom");
      logger.info("Deletou todos os cupons!");

      return { sucess: true };
    } catch (err) {
      logger.error("Cupom DeleteAllCupom: " + err);
      console.error("Cupom DeleteAllCupom: ", err);
      return { sucess: false, error: "Não foi possível deletar todos os cupons!!" };
    }
  },
};

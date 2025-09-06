import db from "../lib/mysql";
import logger from "../lib/pino";
import { InsertInput, UpdateInput } from "../schemas/produtosSchemas";
import { Produtos } from "../types/produtos";

export const produtosDB = {
  async getAll(): Promise<{ success: boolean; data?: Produtos[]; error?: string }> {
    try {
      const [rows] = await db.query<Produtos[]>("SELECT * FROM Produtos");
      logger.info("Requisitou os produtos!");
      if (rows.length === 0) return { success: false, error: "Não possui produtos na empresa!" };
      return { success: true, data: rows };
    } catch (err) {
      logger.error("Produtos GetAll: " + err);
      console.error("Produtos GetAll: ", err);
      return { success: false, error: "Erro ao encontrar os produtos!" };
    }
  },

  async getById(id: number): Promise<{ success: boolean; data?: Produtos[]; error?: string }> {
    try {
      const [rows] = await db.query<Produtos[]>("SELECT * FROM Produtos WHERE id = ?", [id]);
      logger.info("Iniciou a procura do produto com id: " + id);
      if (rows.length === 0)
        return { success: false, error: "Não foi localizado produto com esse ID!" };
      return { success: true, data: rows };
    } catch (err) {
      logger.error("Produtos GetById: " + err);
      console.error("Produtos GetById: ", err);
      return { success: false, error: "Erro ao localizar produto pelo ID!" };
    }
  },

  async getByName(nome: string): Promise<{ success: boolean; data?: Produtos[]; error?: string }> {
    try {
      const [rows] = await db.query<Produtos[]>("SELECT * FROM Produtos WHERE nome = ?", [nome]);
      logger.info("Iniciou a procura do produto com nome: " + nome);
      if (rows.length === 0)
        return { success: false, error: "Não foi localizado produto com esse nome!" };
      return { success: true, data: rows };
    } catch (err) {
      logger.error("Produtos GetByName: " + err);
      console.error("Produtos GetByName: ", err);
      return { success: false, error: "Erro ao localizar produto pelo nome!!" };
    }
  },

  async postProduto(
    data: InsertInput
  ): Promise<{ success: boolean; data?: Produtos[]; error?: string }> {
    try {
      const [rows] = await db.execute<Produtos[]>(
        "INSERT INTO Produtos(nome,quantidade,descricao) VALUES(?,?,?)",
        [data.nome, data.quantidade, data.descricao]
      );
      logger.info(
        "Adicionou o produto: " +
          data.nome +
          " com a quantidade " +
          data.quantidade +
          " com a descricao: " +
          data.descricao
      );
      return { success: true, data: rows };
    } catch (err) {
      logger.error("Produtos PostProduto: " + err);
      console.error("Produtos PostProduto: ", err);
      return { success: false, error: "Erro ao criar o produto!" };
    }
  },

  async putProduto(data: UpdateInput): Promise<{ success: boolean; error?: string }> {
    try {
      const produto = await produtosDB.getById(data.id);
      if (!produto.success || !produto.data) return { success: false, error: produto.error };

      await db.execute(`UPDATE Produtos SET ${data.tipo} = ? WHERE id = ?`, [data.valor, data.id]);

      logger.info(
        "Atualizou o produto: " +
          produto.data[0].nome +
          " SET: " +
          data.tipo +
          " Valor:" +
          data.valor
      );
      return { success: true };
    } catch (err) {
      logger.error("Produtos PutProduto: " + err);
      console.error("Produtos PutProduto: ", err);
      return { success: false, error: "Erro ao criar o produto!" };
    }
  },

  async putAll(ajustes: Produtos[]): Promise<{ success: boolean; error?: string }> {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      await Promise.all(
        ajustes.map((infos) =>
          connection.execute(
            "UPDATE Produtos SET nome = ?, quantidade = ?, descricao = ? WHERE id = ?",
            [infos.nome, infos.quantidade, infos.descricao, infos.id]
          )
        )
      );

      await connection.commit();
      logger.info("Atualizou todos os produtos: " + ajustes);
      return { success: true };
    } catch (err) {
      await connection.rollback();
      logger.error("Produtos PutAll: " + err);
      console.error("Produtos PutAll: ", err);
      return { success: false, error: "Erro ao atualizar todos os produtos!!" };
    } finally {
      connection.release();
    }
  },

  async deleteById(id: number): Promise<{ success: boolean; error?: string }> {
    try {
      const produto = await produtosDB.getById(id);
      if (!produto.success || !produto.data) return { success: false, error: produto.error };

      await db.execute("DELETE FROM Produtos WHERE id = ?", [id]);
      logger.info("Deletou o produto com nome: " + produto.data[0].nome);
      return { success: true };
    } catch (err) {
      logger.error("Produtos DeleteById: " + err);
      console.error("Produtos DeleteById: ", err);
      return { success: false, error: "Erro ao deletar o produto!!" };
    }
  },

  async deleteAll(): Promise<{ success: boolean; error?: string }> {
    try {
      await db.execute("DELETE FROM Produtos");
      logger.info("Deletou todos os produtos!");
      return { success: true };
    } catch (err) {
      logger.error("Produtos DeleteAll: " + err);
      console.error("Produtos DeleteAll: ", err);
      return { success: false, error: "Erro ao deletar todos os produtos!!" };
    }
  },
};

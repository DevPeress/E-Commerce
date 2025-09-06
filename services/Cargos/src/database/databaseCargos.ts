import db from "../lib/mysql";
import logger from "../lib/pino";
import { Cargos, Criar } from "../types/cargos";

export const cargosDB = {
  async getAll(): Promise<{ success: boolean; data?: Cargos[]; error?: string }> {
    try {
      const [rows] = await db.query<Cargos[]>("SELECT * FROM Cargos");
      logger.info("Buscou a lista de cargos");
      return { success: true, data: rows };
    } catch (err) {
      logger.error("Cargos GetAll: " + err);
      console.error("Cargos GetAll: ", err);
      return { success: false, error: "Erro ao buscar o cargo!" };
    }
  },

  async getById(id: number): Promise<{ success: boolean; data?: Cargos[]; error?: string }> {
    try {
      const [rows] = await db.query<Cargos[]>("SELECT * FROM Cargos WHERE ID = ?", [id]);
      logger.info("Buscou o cargo de ID: " + id);
      if (rows.length > 0) return { success: true, data: rows };
      return { success: false, error: "Cargo inexistente na empresa!" };
    } catch (err) {
      logger.error("Cargos GetById: " + err);
      console.error("Cargos GetById: ", err);
      return { success: false, error: "Erro ao buscar o cargo pelo ID!" };
    }
  },

  async getByCargo(cargo: string): Promise<{ success: boolean; data?: Cargos[]; error?: string }> {
    try {
      const [rows] = await db.query<Cargos[]>("SELECT * From Cargos WHERE cargo = ?", [cargo]);
      logger.info("Buscou o cargo: " + cargo);
      if (rows.length > 0) return { success: true, data: rows };
      return { success: false, error: "Cargo inexistente na empresa!" };
    } catch (err) {
      logger.error("Cargos GetByCargo: " + err);
      console.error("Cargos GetByCargo: ", err);
      return { success: false, error: "Erro ao buscar o cargo pelo nome!" };
    }
  },

  async postCargo(infos: {
    cargo: string;
    perms: string[];
  }): Promise<{ success: boolean; error?: string }> {
    try {
      const dados = await cargosDB.getByCargo(infos.cargo);
      if (!dados.success) return { success: false, error: dados.error };

      await db.execute("INSERT INTO Cargos(cargo,perms) VALUES(?,?)", [infos.cargo, infos.perms]);
      logger.info("Criou o cargo: " + infos.cargo + " com as permissões: " + infos.perms);
      return { success: true };
    } catch (err) {
      logger.error("Cargos PostCargo: " + err);
      console.error("Cargos PostCargo: ", err);
      return { success: false, error: "Erro ao criar o cargo!!" };
    }
  },

  async putCargo(infos: {
    id: number;
    perms: string[];
  }): Promise<{ success: boolean; data?: Cargos[]; error?: string }> {
    try {
      const dados = await cargosDB.getById(infos.id);
      if (!dados.success || !dados.data) return { success: false, error: dados.error };

      const [rows] = await db.execute<Cargos[]>("UPDATE Cargos SET perms = ? WHERE id = ?", [
        JSON.stringify(infos.perms),
        infos.id,
      ]);
      logger.info("Atualizou o cargo: " + dados.data[0].cargo + " Perms: " + infos.perms);
      return { success: true, data: rows };
    } catch (err) {
      logger.error("Cargos PutCargo: " + err);
      console.error("Cargos PutCargo: ", err);
      return { success: false, error: "Erro ao atualizar o cargo!!" };
    }
  },

  async putCargos(ajustes: Criar[]): Promise<{ success: boolean; error?: string }> {
    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      await Promise.all(
        ajustes.map((infos) =>
          connection.execute("UPDATE Cargos SET perms = ? WHERE id = ?", [
            infos.id,
            JSON.stringify(infos.perms),
          ])
        )
      );

      await connection.commit();
      logger.info("Atualizou todos os cargos: " + ajustes);
      return { success: true };
    } catch (err) {
      await connection.rollback();
      logger.error("Cargos PutCargos: " + err);
      console.error("Cargos PutCargos: ", err);
      return { success: false, error: "Erro ao atualizar os cargos" };
    } finally {
      connection.release();
    }
  },

  async deleteById(id: number): Promise<{ success: boolean; error?: string }> {
    try {
      const dados = await cargosDB.getById(id);
      if (!dados.success || !dados.data) return { success: false, error: dados.error };

      await db.execute("DELETE FROM Cargos WHERE id = ?", [id]);
      logger.info("Deletou o cargo de nome: " + dados.data[0].cargo);
      return { success: true };
    } catch (err) {
      logger.error("Cargos DeleteById: " + err);
      console.error("Cargos DeleteById: ", err);
      return { success: false, error: "Erro ao deletar o cargo pelo id!" };
    }
  },

  async deleteAll(): Promise<{ success: boolean; error?: string }> {
    try {
      await db.query("DELETE FROM Cargos");
      logger.info("Deletou todos os cargos!");
      return { success: true };
    } catch (err) {
      logger.error("Cargos DeleteAll: " + err);
      console.error("Cargos DeleteAll: ", err);
      return { success: false, error: "Erro ao deletar os cargos!" };
    }
  },
};

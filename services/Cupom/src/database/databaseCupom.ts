import db from "../lib/mysql";
import logger from "../lib/pino";
import { Cupom } from "../types/cupom";

export const CupomDB = {
  async getAll(): Promise<{ sucess: boolean; data?: Cupom[]; error?: string }> {
    try {
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
      const [rows] = await db.query<Cupom[]>("SELECT * FROM Cupom WHERE id = ?", [name]);
      if (rows.length === 0) return { sucess: false, error: "Não possui cupom esse Nome!" };
      return { sucess: true, data: rows };
    } catch (err) {
      logger.error("Cupom GetByName: " + err);
      console.error("Cupom GetByName: ", err);
      return { sucess: false, error: "Erro ao localizar o cupom!" };
    }
  },
};

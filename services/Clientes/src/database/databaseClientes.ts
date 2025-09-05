import db from "../lib/mysql";
import logger from "../lib/pino";
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
};

import db from "../lib/mysql";
import logger from "../lib/pino";

export const CupomDB = {
  async getAll(): Promise<{ sucess: boolean; data?: []; error?: string }> {
    try {
      const [rows] = await db.query<[]>("SELECT * FROM Cupom");
      if (rows.length === 0) return { sucess: false, error: "Não possui cupons registrados!" };
      return { sucess: true, data: rows };
    } catch (err) {
      logger.error("Cupom GetAll: " + err);
      console.error("Cupom GetAll: ", err);
      return { sucess: false, error: "Erroa o localizar os cupons!" };
    }
  },
};

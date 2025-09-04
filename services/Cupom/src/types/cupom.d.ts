import { RowDataPacket } from "mysql2";

export interface Cupom extends RowDataPacket {
  id: number;
  nome: string;
  valor: number;
  tipo: boolean;
}

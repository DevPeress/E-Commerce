import { RowDataPacket } from "mysql2";

export interface Clientes extends RowDataPacket {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  cep: string;
  rua: string;
  numeroCasa: number;
  idade: number;
  telefone: string;
}

interface MyJwtPayload extends JwtPayload {
  id: number;
  email: string;
  cargo: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: MyJwtPayload;
  }
}

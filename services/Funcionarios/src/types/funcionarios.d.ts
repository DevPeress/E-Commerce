import { RowDataPacket } from "mysql2";

export interface Usuarios extends RowDataPacket {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  idade: number;
  cep: string;
  cargo: number | string;
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

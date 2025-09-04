import { RowDataPacket } from "mysql2/promise";

export interface Cargos extends RowDataPacket {
  id: number;
  cargo: string;
  perms: [];
}

export interface Criar {
  id: number;
  perms: [];
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

import { RowDataPacket } from "mysql2";

export interface Register extends RowDataPacket {
  id: number;
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  idade: number;
  cep: string;
}

export interface Login extends RowDataPacket {
  email: string;
  senha: string;
}

export interface Cargo_Id extends RowDataPacket {
  cargo_id: string;
}

export interface Cargo extends RowDataPacket {
  cargo: string;
}

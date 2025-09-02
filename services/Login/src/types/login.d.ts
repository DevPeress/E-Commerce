import { RowDataPacket } from "mysql2"

export interface Login extends RowDataPacket {
    email: string
    senha: string
}
import { RowDataPacket } from "mysql2"

export interface Produtos extends RowDataPacket {
    id: number
    nome: string
    quantidade: number
    descricao: string
}
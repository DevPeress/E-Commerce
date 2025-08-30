import { RowDataPacket } from "mysql2"

export interface Produtos extends RowDataPacket {
    nome: string
    quantidade: number
    descricao: string
}

export interface Validar {
    nome: string
    valor: string | number | null
}
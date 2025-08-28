import { RowDataPacket } from "mysql2"

export interface Usuarios extends RowDataPacket {
    id: number
    nome: string
    email: string
    cpf: string
    idade: number
    cep: string
    cargo: number
}

export interface Validar {
    nome: string
    valor: string | number | null
}
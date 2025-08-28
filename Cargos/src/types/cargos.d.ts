import { RowDataPacket } from "mysql2/promise"

export interface Cargos extends RowDataPacket {
    id: number
    cargo: string
    perms: []
}

export interface Criar {
    cargo: string
    perms: []
}
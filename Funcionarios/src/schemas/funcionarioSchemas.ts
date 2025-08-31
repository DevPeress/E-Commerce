import { z } from "zod";

export const funcionarioSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  cpf: z.string().regex(/^\d{11}$/, "CPF deve ter 11 dígitos"),
  idade: z.number().int().positive("Idade inválida, valor negativo!"),
  cep: z.string().regex(/^\d{8}$/, "CEP deve ter 8 dígitos"),
  cargo_id: z.number().int().positive("Cargo inválido"),
});

export type FuncionarioInput = z.infer<typeof funcionarioSchema>; 
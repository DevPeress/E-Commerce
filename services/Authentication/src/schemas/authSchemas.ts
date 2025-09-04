import { z } from "zod";

export const registerSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  cpf: z.string().regex(/^\d{11}$/, "CPF deve ter 11 dígitos"),
  idade: z.number().int().positive("Idade digita é inválida!"),
  cep: z.string().regex(/^\d{8}$/, "CEP deve ter 8 dígitos"),
  senha: z.string().min(3, "Senha deve ter no mínimo 3 caracteres"),
});

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(3, "Senha deve ter no mínimo 3 caracteres"),
});

export const recSchema = z.object({
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(3, "Senha deve ter no mínimo 3 caracteres"),
  senhaNova: z.string().min(3, "Senha nova deve ter no mínimo 3 caracteres!"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RecInput = z.infer<typeof recSchema>;

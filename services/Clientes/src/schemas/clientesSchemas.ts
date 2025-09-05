import z from "zod";

export const clienteSchema = z.object({
  nome: z.string().min(7, "Precisa do nome completo do cliente!"),
  email: z.email("Erro incorreto!"),
  cpf: z.string().min(14, "Dados do CPF estão errados!"),
  cep: z.string().min(9, "Dados do CEP estão errados!"),
  rua: z.string().min(5, "Nome da rua muito pequeno!"),
  numeroCasa: z.number().positive("Número inválido!"),
  idade: z.number().positive("Idade inválida!"),
  telefone: z.string().min(15, "Dados do telefone para contato inválido!"),
});

export type ClienteType = z.infer<typeof clienteSchema>;

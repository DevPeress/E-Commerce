import z from "zod";

export const cupomSchema = z.object({
  nome: z.string().min(3, "Cupom tem que ter no minimo 3 caracteres!"),
  valor: z.number().positive("Valor de desconto do cupom inválido!"),
  tipo: z.boolean("Tipo incorreto!"),
});

export type CupomInput = z.infer<typeof cupomSchema>;

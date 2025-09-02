import { z } from "zod";

export const insertSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres!"),
  quantidade: z.number().int().positive("Quantidade do produto não está acima de 0!"),
  descricao: z.string().min(3, "Descrição do produto deve ter no mínimo 3 caracteres!"),
});

export type InsertInput = z.infer<typeof insertSchema>;

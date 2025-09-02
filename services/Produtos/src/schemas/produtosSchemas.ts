import { z } from "zod";

export const insertSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres!"),
  quantidade: z.number().int().positive("Quantidade do produto não está acima de 0!"),
  descricao: z.string().min(3, "Descrição do produto deve ter no mínimo 3 caracteres!"),
});

export const updateSchema = z.object({
  id: z.number().positive("ID Inválido do produto!"),
  tipo: z.string("Não foi selecionado qual troca deve ser feita!"),
  valor: z.string("Não foi informado o valor para a troca!"),
});

export type UpdateInput = z.infer<typeof updateSchema>;
export type InsertInput = z.infer<typeof insertSchema>;

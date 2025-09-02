import { z } from "zod";

export const updateSchema = z.object({
  id: z.number().positive("ID Inválido do produto!"),
  tipo: z.string("Não foi selecionado qual troca deve ser feita!"),
  valor: z.string("Não foi informado o valor para a troca!"),
});

export type UpdateInput = z.infer<typeof updateSchema>; 
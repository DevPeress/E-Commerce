import { clientesDB } from "../database/databaseClientes";

describe("Verificar Database", () => {
  it("Deve informar que os clientes que existem", async () => {
    const result = await clientesDB.getAll();
    expect(result).toEqual({
      success: true,
      data: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          nome: expect.any(String),
          email: expect.any(String),
          cpf: expect.any(String),
          cep: expect.any(String),
          rua: expect.any(String),
          numeroCasa: expect.any(Number),
          idade: expect.any(Number),
          telefone: expect.any(String),
        }),
      ]),
    });
  });

  it("Deve informar os dados certos do cliente pelo ID", async () => {
    const result = await clientesDB.getById(1);
    expect(result).toEqual({
      success: true,
      data: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          nome: expect.any(String),
          email: expect.any(String),
          cpf: expect.any(String),
          cep: expect.any(String),
          rua: expect.any(String),
          numeroCasa: expect.any(Number),
          idade: expect.any(Number),
          telefone: expect.any(String),
        }),
      ]),
    });
  });

  it("Deve informar que não existe o cliente com ID", async () => {
    const result = await clientesDB.getById(10);
    expect(result).toEqual({
      success: false,
      error: "Não existe cliente com essa id",
    });
  });

  it("Deve informar os dados certos do cliente pelo nome", async () => {
    const result = await clientesDB.getByNome("Peres");
    expect(result).toEqual({
      success: true,
      data: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          nome: expect.any(String),
          email: expect.any(String),
          cpf: expect.any(String),
          cep: expect.any(String),
          rua: expect.any(String),
          numeroCasa: expect.any(Number),
          idade: expect.any(Number),
          telefone: expect.any(String),
        }),
      ]),
    });
  });

  it("Deve informar que não existe o cliente com ID", async () => {
    const result = await clientesDB.getByNome("Peres2");
    expect(result).toEqual({
      success: false,
      error: "Não existe cliente com esse nome!!",
    });
  });
});

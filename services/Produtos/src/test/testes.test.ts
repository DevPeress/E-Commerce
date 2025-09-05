import { produtosDB } from "../database/databaseProdutos";

describe("Verificar Database", () => {
  it("Deve informar todos os cupons", async () => {
    const result = await produtosDB.getAll();
    expect(result).toMatchObject({
      sucess: true,
      data: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          nome: expect.any(String),
          quantidade: expect.any(Number),
          descricao: expect.any(String),
        }),
      ]),
    });
  });

  it("Deve informar que existe o produto do ID", async () => {
    const result = await produtosDB.getById(1);
    expect(result).toMatchObject({
      sucess: true,
      data: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          nome: expect.any(String),
          quantidade: expect.any(Number),
          descricao: expect.any(String),
        }),
      ]),
    });
  });

  it("Deve informar que não existe o produto do ID", async () => {
    const result = await produtosDB.getById(2);
    expect(result).toMatchObject({
      sucess: false,
      error: "Não foi localizado produto com esse ID!",
    });
  });

  it("Deve informar que existe o produto do Nome", async () => {
    const result = await produtosDB.getByName("Teste");
    expect(result).toMatchObject({
      sucess: true,
      data: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          nome: expect.any(String),
          quantidade: expect.any(Number),
          descricao: expect.any(String),
        }),
      ]),
    });
  });

  it("Deve informar que não existe o produto do ID", async () => {
    const result = await produtosDB.getByName("Teste2");
    expect(result).toMatchObject({
      sucess: false,
      error: "Não foi localizado produto com esse nome!",
    });
  });
});

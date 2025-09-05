import { CupomDB } from "../database/databaseCupom";

describe("Verificar Database", () => {
  it("Deve informar que o cupom foi criado", async () => {
    const result = await CupomDB.postCupom({
      nome: "Teste",
      valor: 10,
      tipo: false,
    });
    expect(result).toEqual({ sucess: true });
  });

  it("Deve informar todos os cupons", async () => {
    const result = await CupomDB.getAll();
    expect(result).toMatchObject({
      sucess: true,
      data: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          nome: expect.any(String),
          valor: expect.any(String),
          tipo: expect.any(Number),
        }),
      ]),
    });
  });

  it("Deve informar que o cupom existe", async () => {
    const result = await CupomDB.getById(1);
    expect(result).toEqual({
      sucess: true,
      data: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          nome: expect.any(String),
          valor: expect.any(String),
          tipo: expect.any(Number),
        }),
      ]),
    });
  });

  it("Deve informar que o cupom não existe", async () => {
    const result = await CupomDB.getById(2);
    expect(result).toEqual({ sucess: false, error: "Não possui cupom esse ID!" });
  });

  it("Deve informar que o cupom existe", async () => {
    const result = await CupomDB.getByName("Teste");
    expect(result).toEqual({
      sucess: true,
      data: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          nome: expect.any(String),
          valor: expect.any(String),
          tipo: expect.any(Number),
        }),
      ]),
    });
  });

  it("Deve informar que o cupom não existe", async () => {
    const result = await CupomDB.getByName("Teste2");
    expect(result).toEqual({ sucess: false, error: "Não possui cupom esse Nome!" });
  });

  it("Deve informar que o cupom não pode ser criado pois já existe um", async () => {
    const result = await CupomDB.postCupom({
      nome: "Teste",
      valor: 10,
      tipo: false,
    });
    expect(result).toEqual({ sucess: false, error: "Cupom com o mesmo nome criado já!" });
  });

  it("Deve informar que o cupom foi criado", async () => {
    const result = await CupomDB.postCupom({
      nome: "Teste5",
      valor: 10,
      tipo: false,
    });
    expect(result).toEqual({ sucess: true });
  });

  it("Deve informar que o cupom foi criado", async () => {
    const result = await CupomDB.postCupom({
      nome: "Teste3",
      valor: 10,
      tipo: false,
    });
    expect(result).toEqual({ sucess: true });
  });

  it("Deve informar que o cupom foi deletado", async () => {
    const result = await CupomDB.deleteCupom(1);
    expect(result).toEqual({ sucess: true });
  });

  it("Deve informar que todos os cupons foram deletados", async () => {
    const result = await CupomDB.deleteAll();
    expect(result).toEqual({ sucess: true });
  });
});

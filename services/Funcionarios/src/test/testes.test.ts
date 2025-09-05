import { funcionariosDB } from "../database/databaseFuncionarios";

describe("Verificar Database", () => {
  it("Deve informar todos os cupons", async () => {
    const result = await funcionariosDB.getAll();
    expect(result).toMatchObject({
      sucess: true,
      data: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          nome: expect.any(String),
          email: expect.any(String),
          cpf: expect.any(String),
          idade: expect.any(Number),
          cep: expect.any(String),
          cargo: expect.any(String),
        }),
      ]),
    });
  });

  it("Deve informar o funcionario certo de ID 1", async () => {
    const result = await funcionariosDB.getById(1);
    expect(result).toEqual({
      sucess: true,
      data: expect.arrayContaining([
        expect.objectContaining({
          nome: expect.any(String),
          email: expect.any(String),
          cpf: expect.any(String),
          idade: expect.any(Number),
          cep: expect.any(String),
          cargo: expect.any(String),
        }),
      ]),
    });
  });

  it("Deve informar o funcionario de Id 3 não existe", async () => {
    const result = await funcionariosDB.getById(3);
    expect(result).toEqual({
      sucess: false,
      error: "Funcionário não existente!",
    });
  });

  it("Deve informar o funcionario certo pelo email", async () => {
    const result = await funcionariosDB.getByEmail("peres@gmail.com");
    expect(result).toEqual({
      sucess: true,
      data: expect.arrayContaining([
        expect.objectContaining({
          nome: expect.any(String),
          email: expect.any(String),
          cpf: expect.any(String),
          idade: expect.any(Number),
          cep: expect.any(String),
          cargo: expect.any(String),
        }),
      ]),
    });
  });

  it("Deve informar que não existe funcionario com esse mail", async () => {
    const result = await funcionariosDB.getByEmail("peres3@gmail.com");
    expect(result).toEqual({
      sucess: false,
      error: "Email não possui cadastro na empresa!",
    });
  });

  it("Deve informar o funcionario certo pelo cpf", async () => {
    const result = await funcionariosDB.getByCpf("11111111111111");
    expect(result).toEqual({
      sucess: true,
      data: expect.arrayContaining([
        expect.objectContaining({
          nome: expect.any(String),
          email: expect.any(String),
          cpf: expect.any(String),
          idade: expect.any(Number),
          cep: expect.any(String),
          cargo: expect.any(String),
        }),
      ]),
    });
  });

  it("Deve informar que não existe funcionario com esse cpf", async () => {
    const result = await funcionariosDB.getByCpf("11222111111111");
    expect(result).toEqual({
      sucess: false,
      error: "CPF não possui cadastro na empresa!",
    });
  });

  it("Deve informar que deletou o funcionario", async () => {
    const result = await funcionariosDB.deleteFuncionario(1);
    expect(result).toEqual({ sucess: true });
  });

  it("Deve informar que deletou todos", async () => {
    const result = await funcionariosDB.deleteAll();
    expect(result).toEqual({ sucess: true });
  });
});

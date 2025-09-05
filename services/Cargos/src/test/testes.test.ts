import { cargosDB } from "../database/databaseCargos";

describe("Verificar Database", () => {
  it("Pegar todos os Cargos com Sucesso", async () => {
    const dados = await cargosDB.getAll();
    expect(dados).toMatchObject({
      sucess: true,
      data: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          cargo: expect.any(String),
          perms: expect.any(String),
        }),
      ]),
    });
  });

  it("Pegar um cargo baseado em ID com sucesso", async () => {
    const dados = await cargosDB.getById(1);
    expect(dados).toEqual({
      sucess: true,
      data: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          cargo: expect.any(String),
          perms: expect.any(String),
        }),
      ]),
    });
  });

  it("Pegar um cargo baseado em ID e dar erro", async () => {
    const dados = await cargosDB.getById(2);
    expect(dados).toEqual({
      sucess: false,
      error: "Cargo inexistente na empresa!",
    });
  });

  it("Pegar um cargo baseado em Cargo com sucesso", async () => {
    const dados = await cargosDB.getByCargo("Dono");
    expect(dados).toEqual({
      sucess: true,
      data: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          cargo: expect.any(String),
          perms: expect.any(String),
        }),
      ]),
    });
  });

  it("Pegar um cargo baseado em Cargo e dar erro", async () => {
    const dados = await cargosDB.getByCargo("Teste");
    expect(dados).toEqual({
      sucess: false,
      error: "Cargo inexistente na empresa!",
    });
  });
});

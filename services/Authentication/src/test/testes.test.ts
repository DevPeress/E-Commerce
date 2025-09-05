import { AuthDB } from "../database/databaseAuth";

describe("Verificar Database", () => {
  it("Deve informar que não existe email", async () => {
    const result = await AuthDB.getByEmail("pere2s@gmail.com");
    expect(result).toEqual({ sucess: false, error: "Não foi localizado o email!" });
  });

  it("Deve informar que existe email", async () => {
    const result = await AuthDB.getByEmail("peres@gmail.com");
    expect(result).toEqual({ sucess: false, error: "Não foi localizado o email!" });
  });

  it("Deve informar que criou email", async () => {
    const result = await AuthDB.postRegister({
      nome: "Peres",
      email: "teste@gmail.com",
      cpf: "527.734.678-33",
      idade: 21,
      senha: "teste",
      cep: "11111-111",
    });
    expect(result).toEqual({ sucess: true });
  });
});

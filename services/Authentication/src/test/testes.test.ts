import { AuthDB } from "../database/databaseAuth";

describe("Verificar Database", () => {
  it("Deve informar que não existe email", async () => {
    const result = await AuthDB.getByEmail("pere2s@gmail.com");
    expect(result).toEqual({ success: false, error: "Não foi localizado o email!" });
  });

  it("Deve informar que existe email", async () => {
    const result = await AuthDB.getByEmail("peres@gmail.com");
    expect(result).toEqual({ success: false, error: "Não foi localizado o email!" });
  });
});

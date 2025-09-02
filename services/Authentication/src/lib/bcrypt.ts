import bcrypt from "bcrypt";

async function Criptografar(senha: string) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(senha, salt);
  return hashedPassword;
}

function VerificarSenha(senha: string, senhaHash: string) {
  return bcrypt.compare(senha, senhaHash);
}

export { Criptografar, VerificarSenha };

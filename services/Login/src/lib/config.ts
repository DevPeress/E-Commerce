import path from "path";
import dotenv from "dotenv";

dotenv.config();

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`A variável de ambiente ${name} não está definida!`);
  }
  return value;
}

export const JWT_SECRET = getEnvVar("JWT_ENV");
export const PORT = Number(getEnvVar("PORT"));
export const NODE_ENV = getEnvVar("NODE_ENV")

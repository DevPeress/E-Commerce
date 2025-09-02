import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_ENV

export function verifyToken(token: string) {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET não definido");
  }
  return jwt.verify(token, JWT_SECRET);
}

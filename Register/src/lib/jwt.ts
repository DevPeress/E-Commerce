import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_ENV
const JWT_EXPIRES_IN = "8hr"

export function generateToken(payload: object) {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET não definido");
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}
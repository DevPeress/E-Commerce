import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

const JWT_EXPIRES_IN = "8hr"

export function generateToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}
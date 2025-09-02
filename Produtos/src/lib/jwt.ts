import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
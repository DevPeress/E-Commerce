import jwt from "jsonwebtoken";

const JWT_SECRET = "supersecret"; 

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}

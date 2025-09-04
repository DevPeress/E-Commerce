import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import logger from "../lib/pino";
import { JWT_SECRET } from "../lib/config";
import { MyJwtPayload } from "../types/cargos";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as MyJwtPayload;
    req.user = decoded;

    if (decoded.cargo !== "Admin") {
      return res.status(403).json({ message: "Acesso negado: apenas Admin" });
    }

    next();
  } catch (error) {
    logger.error("Auth: " + error);
    console.error("Auth: " + error);
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import logger from "../lib/pino";
import { JWT_SECRET } from "../lib/config";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded; // injeta usuário no request
    next();
  } catch (error) {
    logger.error("Auth: " + error);
    console.error("Auth: " + error);
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}

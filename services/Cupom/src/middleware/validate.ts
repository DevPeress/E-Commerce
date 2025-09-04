/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import logger from "../lib/pino";

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      logger.error("Validate: " + error);
      return res.status(400).json({
        error: "Dados inválidos",
        details: error.errors,
      });
    }
  };
}

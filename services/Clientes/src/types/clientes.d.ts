interface MyJwtPayload extends JwtPayload {
  id: number;
  email: string;
  cargo: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: MyJwtPayload;
  }
}

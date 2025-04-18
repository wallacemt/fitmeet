import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { userService } from "../services/userService";

const jwtSecret = process.env.JWT_SECRET;

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export default async function  authValidator(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    response.status(401).json({ error: "Autenticação necessária." });
  } else {
    const token = authHeader!.replace("Bearer ", "");
    try {
      const auth = jwt.verify(token, jwtSecret!) as {
        id: string;
      };
      
      const user = await userService.findAuthUser(auth.id);
      if (user?.deletedAt) {
        response.status(403).json({ error: "Esta conta foi desativada e não pode ser utilizada." });
        return;
      }
      request.userId = user?.id!;
      next();
    } catch (error: any) {
      response.status(401).json({error: "Token inválido ou expirado."});
      return;
    }
  }
}

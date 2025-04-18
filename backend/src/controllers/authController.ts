import { Express, Router } from "express";
import { authService } from "../services/authService";
import { loginSchema, registerSchema } from "../validations/authValidation";
import validateRequestBody from "../middlewares/requestBodyValidator";
import { userData } from "../types/userData";

const authController = (server: Express) => {
  const router = Router();

  router.post("/register", validateRequestBody(registerSchema), async (req, res) => {
    try {
      const user: userData = req.body;
      await authService.register(user);
      res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
      const status = (error as any).status || 400;
      const message = (error as any).error || "Erro desconhecido.";

      res.status(status).json({ error: message });
    }
  });

  router.post("/sign-in", validateRequestBody(loginSchema), async (req, res) => {
    try {
      const data = await authService.login(req.body);
      res.status(200).json(data);
    } catch (error) {
      const status = (error as any).status || 400;
      res.status(status).json({ error: (error as any).error || "Erro desconhecido." });
    }
  })

  server.use("/auth", router);
};

export default authController;

import { Express, Router, Request, Response } from "express";
import authValidator from "../middlewares/authValidator";
import { userService } from "../services/userService";
import validateRequestBody from "../middlewares/requestBodyValidator";
import { updateSchema } from "../validations/authValidation";
import { updateData } from "../types/userData";
import upload from "../multer/multer";
import { definePreferencesSchema } from "../validations/preferenceValidation";


const userController = (server: Express) => {
  const router = Router();
  router.use(authValidator);

  router.get("", async (req, res) => {
    try {
      const user = await userService.findAuthUser(req.userId);
      res.status(200).json(user);
    } catch (error) {
      const status = (error as any).status || 400;
      res.status(status).json({ error: (error as any).error || "Erro desconhecido." });
    }
  });

  router.post("/avatar", upload.single("avatar"), async (req, res) => {
    try {
      const avatar = await userService.updateAvatar(req.userId, req.file!);
      res.status(200).json({ avatar: avatar });
    } catch (error) {
      const status = (error as any).status || 400;
      res.status(status).json({ error: (error as any).error || "Erro desconhecido." });
    }
  });

  router.post("/update", validateRequestBody(updateSchema), async (req, res) => {
    try {
      const updateData: updateData = req.body;
      const user = await userService.updateUserInfo(req.userId, updateData);
      res.status(200).json(user);
    } catch (error) {
      const status = (error as any).status || 400;
      res.status(status).json({ error: (error as any).error || "Erro desconhecido." });
    }
  });

  router.get("/preferences", async (req: Request, res: Response) => {
    try {
      const userId = req.userId;
      const preferences = await userService.getUserPreferences(userId);
      res.status(200).json(preferences);
    } catch (error) {
      console.error("Erro ao buscar preferências:", error);
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  });

  router.post(
    "/preferences/define",
    validateRequestBody(definePreferencesSchema),
    async (req: Request, res: Response) => {
      try {
        const userId = req.userId;
        const { typeIds } = req.body;

        await userService.defineUserPreferences(userId, typeIds);
        res.status(200).json({ message: "Preferências definidas com sucesso!" });
      } catch (error) {
        const status = (error as any).status || 400;
        res.status(status).json({ error: (error as any).error || "Erro desconhecido." });
      }
    }
  );
  router.delete("/desactivate", async (req, res) => {
    try {
      await userService.desactivateUser(req.userId);
      res.status(200).json({ message: "Conta desativada com sucesso!" });
    } catch (error) {
      const status = (error as any).status || 400;
      res.status(status).json({ error: (error as any).error || "Erro desconhecido." });
    }
  });
  server.use("/user", router);
};

export default userController;

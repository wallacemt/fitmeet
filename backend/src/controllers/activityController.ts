import { Express, Router } from "express";
import authValidator from "../middlewares/authValidator";
import { activityService } from "../services/activityService";
import upload from "../multer/multer";
import { activityType, activityTypeUpdate } from "../types/activityData";

const activityController = (server: Express) => {
  const router = Router();
  router.use(authValidator);
  
  router.get("/all", async (req, res) => {
    try {
      const { filterBy, filter, orderBy, order } = req.query as {
        filterBy: string;
        filter: string;
        orderBy: string;
        order: string;
      };
      
      const activities = await activityService.getActivitiesAll(filterBy, filter, orderBy, order, req.userId);
      console.log(activities);
      res.status(200).json(activities);
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
      res.status(500).json({ error: "Erro inesperado." });
    }
  });
  router.get("/types", async (req, res) => {
    try {
      const types = await activityService.getActivityTypes();
      res.status(200).json(types);
    } catch (error) {
      const status = (error as any).status || 500;
      res.status(status).json({ error: (error as any).error || "Erro inesperado." });
    }
  });

  router.get("/types/:id", async (req, res) => {
    try {
      const type = await activityService.getActivityByTypeId(req.params.id, req.userId);
      res.status(200).json(type);
    } catch (error) {
      const status = (error as any).status || 500;
      res.status(status).json({ error: (error as any).error || "Erro inesperado." });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const activity = await activityService.getActivitiesById(req.params.id, req.userId);
      res.status(200).json(activity);
    } catch (error) {
      const status = (error as any).status || 500;
      res.status(status).json({ error: (error as any).error || "Erro inesperado." });
    }
  });
  router.get("/", async (req, res) => {
    try {
      const { type, orderBy, order, page, pageSize } = req.query;

      const result = await activityService.getActivities(
        page ? parseInt(page as string, 10) : 0,
        pageSize ? parseInt(pageSize as string, 10) : 10,
        req.userId,
        type as string,
        orderBy as string,
        order as "asc" | "desc",
      );

      res.status(200).json(result);
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
      res.status(500).json({ error: "Erro inesperado." });
    }
  });


  router.get("/user/creator", async (req, res) => {
    try {
      const userId = req.userId;
      const { page, pageSize } = req.query;
      const result = await activityService.getUserActivities(
        userId,
        page ? parseInt(page as string, 10) : 0,
        pageSize ? parseInt(pageSize as string, 10) : 10
      );
      res.status(200).json(result);
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
      res.status(500).json({ error: "Erro inesperado." });
    }
  });

  router.get("/user/creator/all", async (req, res) => {
    try {
      const { filterBy, filter, orderBy, order } = req.query as {
        filterBy: string;
        filter: string;
        orderBy: string;
        order: string;
      };
      const id = req.userId;
      const activities = await activityService.getUserActivitiesAll(id, filterBy, filter, orderBy, order);

      res.status(200).json(activities);
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
      res.status(500).json({ error: "Erro inesperado." });
    }
  });

  router.get("/user/participant", async (req, res) => {
    try {
      const userId = req.userId;
      const { orderBy, order, page, pageSize } = req.query;
      const result = await activityService.getActivitiesUserParticipant(
        userId as string,
        orderBy as string,
        order as "asc" | "desc",
        page ? parseInt(page as string, 10) : 0,
        pageSize ? parseInt(pageSize as string, 10) : 10
      );

      res.status(200).json(result);
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
      res.status(500).json({ error: "Erro inesperado." });
    }
  });
  router.get("/user/participant/all", async (req, res) => {
    try {
      const id = req.userId;
      const { filterBy, filter, orderBy, order } = req.query as {
        filterBy: string;
        filter: string;
        orderBy: string;
        order: string;
      };
      const result = await activityService.getActivitiesUserParticipantAll(id, filterBy, filter, orderBy, order);

      res.status(200).json(result);
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
      res.status(500).json({ error: "Erro inesperado." });
    }
  });

  router.get("/:id/participants", async (req, res) => {
    try {
      const id = req.params.id;
      const participants = await activityService.getParticipantsByActivityId(id, req.userId);
      res.status(200).json(participants);
    } catch (error) {
      const status = (error as any).status || 500;
      res.status(status).json({ error: (error as any).error || "Erro inesperado." });
    }
  });

  router.post("/new", upload.single("image"), async (req, res) => {
    try {
      const activityData: activityType = {
        ...req.body,
        private: req.body.private === "true",
        userId: req.userId,
        imageFile: req.file!,
      };

      console.log(activityData);

      const [latitude, longitude] = req.body.address.split(",").map(Number);
      activityData.latitude = latitude;
      activityData.longitude = longitude;

      const newActivity = await activityService.createActivity(activityData);
      res.status(201).json(newActivity);
    } catch (error) {
      const status = (error as any).status || 500;
      const message = (error as any).error || "Erro inesperado.";
      console.error(error);
      res.status(status).json({ error: message });
    }
  });

  router.put("/:id/update", upload.single("image"), async (req, res) => {
    try {
      const activityId = req.params.id;

      const activityData: activityTypeUpdate = req.body;

      if (activityData.private != null) activityData.private = req.body.private === "true";
      if (activityData.address) {
        const [latitude, longitude] = activityData.address.split(",").map((coord) => parseFloat(coord));
        activityData.latitude = latitude;
        activityData.longitude = longitude;
      }
      activityData.imageFile = req.file!;

      const updateActivity = await activityService.updateActivity(activityId, req.userId, activityData);

      res.status(200).json(updateActivity);
    } catch (error) {
      const status = (error as any).status || 500;
      const message = (error as any).error || "Erro inesperado.";
      console.error(error);
      res.status(status).json({ error: message });
    }
  });

  router.put("/:id/approve", async (req, res) => {
    try {
      const { id: activityId } = req.params;

      const participantId: string = req.body.participantId;
      const approved: boolean = req.body.approved;
      await activityService.approveParticipant(activityId, participantId, approved, req.userId);
      res.status(200).json({ message: "Solicitação de participação aprovada com sucesso." });
    } catch (error) {
      const status = (error as any).status || 500;
      const message = (error as any).error || "Erro inesperado.";
      console.error(error);
      res.status(status).json({ error: message });
    }
  });

  router.post("/:id/subscribe", async (req, res) => {
    try {
      const { id: activityId } = req.params;
      const userId = req.userId;

      const subscription = await activityService.subscribeToActivity(activityId, userId);
      res.status(200).json(subscription);
    } catch (error) {
      const status = (error as any).status || 500;
      const message = (error as any).error || "Erro inesperado.";
      console.error(error);
      res.status(status).json({ error: message });
    }
  });

  router.put("/:id/conclude", async (req, res) => {
    try {
      const { id: activityId } = req.params;
      const userId = req.userId;

      await activityService.completedActivity(activityId, userId);
      res.status(200).json({ message: "Atividade concluida com sucesso." });
    } catch (error) {
      const status = (error as any).status || 500;
      const message = (error as any).error || "Erro inesperado.";
      console.error(error);
      res.status(status).json({ error: message });
    }
  });

  router.put("/:id/check-in", async (req, res) => {
    try {
      const { id: activityId } = req.params;
      const userId = req.userId;
      const code = req.body.confirmationCode;

      await activityService.activityCheckin(activityId, userId, code);
      res.status(200).json({ message: "Participação confirmada com sucesso." });

    } catch (error) {
      const status = (error as any).status || 500;
      const message = (error as any).error || "Erro inesperado.";
      console.error(error);
      res.status(status).json({ error: message });
    }
  });

  router.delete("/:id/unsubscribe", async (req, res) => {
    try {
      const { id: activityId } = req.params;
      const userId = req.userId;
      await activityService.unsubscribeFromActivity(activityId, userId);
      res.status(200).json({ message: "Participação cancelada com sucesso." });
    } catch (error) {
      const status = (error as any).status || 500;
      const message = (error as any).error || "Erro inesperado.";
      console.error(error);
      res.status(status).json({ error: message });
    }
  })

  router.delete("/:id/delete", async (req, res) => {
    try {
      const { id: activityId } = req.params;
      const userId = req.userId;
      await activityService.deleteActivity(activityId, userId);
      res.status(200).json({ message: "Atividade excluida com sucesso!" });
    } catch (error) {
      console.log(error);
      const status = (error as any).status || 500;
      const message = (error as any).error || "Erro inesperado.";
      res.status(status).json({ error: message });
    }
  });

  server.use("/activities", router, authValidator);
};

export default activityController;

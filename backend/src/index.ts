import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import authController from "./controllers/authController";
import userController from "./controllers/userController";
import { requestLogger } from "./middlewares/requestLogger";
import swagger from "swagger-ui-express";
import activityController from "./controllers/activityController";
import { seed } from "../prisma/seed";
import { createBucket } from "./services/s3Service";
import { uploadImages } from "./utils/uploadImages";
import { confirmationCode } from "./utils/confirmationCodeGenerate";
import docs from "./swagger.json";
const server = express();
server.use(json());
server.use(
  cors({
    origin: "http://localhost:5173",
  })
);
const port = process.env.PORT;
server.use(requestLogger);
server.use("/docs", swagger.serve, swagger.setup(docs));

authController(server);
userController(server);
activityController(server);

seed();
createBucket();
setTimeout(() => {
  uploadImages();
}, 1500);


server.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});

import { PrismaClient } from "@prisma/client";
import { devDebugger } from "../utils/devDebugger";

export const prisma = new PrismaClient();
async function checkConnection() {
  try {
    await prisma.$connect();
    devDebugger("Conectado ao Postgres com sucesso!");
  } catch (error) {
    devDebugger("Erro ao conectar ao Postgres:", error);
  }
}

checkConnection();

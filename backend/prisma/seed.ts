import { prisma } from "../src/prisma/prismaClient";
import bcrypt from "bcryptjs";
const BUCKET_URL = `http://localhost:4566/${process.env.BUCKET_NAME}`;

export async function seed() {
  try {
    const existingTypes = await prisma.activityType.findMany();
    const typesToCreate = [
      {
        name: "Yoga",
        description: "Prática de exercícios de relaxamento e flexibilidade.",
        image: `${BUCKET_URL}/yoga.jpg`,
      },
      {
        name: "Corrida",
        description: "Atividade de corrida ao ar livre ou em esteira.",
        image: `${BUCKET_URL}/corrida.jpg`,
      },
      {
        name: "Musculação",
        description: "Treinamento de força e resistência em academia.",
        image: `${BUCKET_URL}/musculacao.jpg`,
      },
      {
        name: "Natação",
        description: "Exercícios aquáticos para condicionamento físico.",
        image: `${BUCKET_URL}/natacao.jpg`,
      },
      {
        name: "Ciclismo",
        description: "Prática de pedalada em estrada ou trilha.",
        image: `${BUCKET_URL}/ciclismo.jpg`,
      },
      {
        name: "CrossFit",
        description: "Treinos de alta intensidade combinando diferentes modalidades.",
        image: `${BUCKET_URL}/crossfit.jpg`,
      },
      {
        name: "Futebol",
        description: "Partidas de futebol entre amigos ou profissionais.",
        image: `${BUCKET_URL}/futebooll.jpg`,
      },
    ].filter((type) => !existingTypes.some((existingType: any) => existingType.name === type.name));

    // Seed de usuários
    const existingUsers = await prisma.user.findMany();
    const usersToCreate = [
      {
        name: "Alice Silva",
        email: "alice@exemplo.com",
        cpf: "12345678901",
        password: await bcrypt.hash("senha123", 10),
        avatar: `${BUCKET_URL}/alice.jpg`,
      },
      {
        name: "Bruno Costa",
        email: "bruno@exemplo.com",
        cpf: "23456789012",
        password: await bcrypt.hash("senha123", 10),
        avatar: `${BUCKET_URL}/bruno.jpg`,
      },
      {
        name: "Carla Souza",
        email: "carla@exemplo.com",
        cpf: "34567890123",
        password: await bcrypt.hash("senha123", 10),
        avatar: `${BUCKET_URL}/carla.jpg`,
      },
    ].filter((user) => !existingUsers.some((existingUser: any) => existingUser.email === user.email));

    if (usersToCreate.length > 0) {
      await prisma.user.createMany({ data: usersToCreate });
    }

    const existingActivities = await prisma.activity.findMany();
    const activityTypes = await prisma.activityType.findMany();
    const users = await prisma.user.findMany();

    const activityAddress = {
      latitude: -13.010141,
      longitude: -38.531398,
    };

    const activitiesToCreate = [
      {
        title: "Yoga Matinal",
        description: "Sessão de yoga para começar bem o dia.",
        typeId: activityTypes.find((t: any) => t.name === "Yoga")?.id || "",
        confirmationCode: "YOGA123",
        image: `${BUCKET_URL}/yoga-activity.jpg`,
        scheduledDate: new Date(Date.now() + 86400000),
        creatorId: users.find((u: any) => u.email === "alice@exemplo.com")?.id || "",
      },
      {
        title: "Corrida no Parque",
        description: "Corrida leve para iniciantes.",
        typeId: activityTypes.find((t: any) => t.name === "Corrida")?.id || "",
        confirmationCode: "RUN456",
        image: `${BUCKET_URL}/corrida-activity.jpg`,
        scheduledDate: new Date(Date.now() + 172800000),
        creatorId: users.find((u: any) => u.email === "bruno@exemplo.com")?.id || "",
      },
      {
        title: "Musculação Avançada",
        description: "Treino intenso para quem já pratica.",
        typeId: activityTypes.find((t: any) => t.name === "Musculação")?.id || "",
        confirmationCode: "MUSC789",
        image: `${BUCKET_URL}/musculacao-activity.jpg`,
        scheduledDate: new Date(Date.now() + 259200000),
        creatorId: users.find((u: any) => u.email === "carla@exemplo.com")?.id || "",
      },
    ].filter(
      (activity) =>
        activity.typeId &&
        activity.creatorId &&
        !existingActivities.some((existingActivity: any) => existingActivity.title === activity.title)
    );

    if (activitiesToCreate.length > 0) {
      await prisma.activity.createMany({ data: activitiesToCreate });
      const createdActivities = await prisma.activity.findMany();
      createdActivities.forEach(async (newActivity) => {
        await prisma.activityAddress.create({
          data: {
            activityId: newActivity.id,
            latitude: activityAddress.latitude,
            longitude: activityAddress.longitude,
          },
        });
      });
    }

    const existingAchievements = await prisma.achievement.findMany();
    const achievements = [
      {
        name: "Primeiro Check-in",
        criterion: "Confirmar presença em uma atividade pela primeira vez.",
      },
      {
        name: "Primeira Atividade Criada",
        criterion: "Criar uma atividade pela primeira vez.",
      },
      {
        name: "Atividade Concluída",
        criterion: "Encerrar uma atividade pela primeira vez.",
      },
      {
        name: "Subiu de Nível",
        criterion: "Alcançar um novo nível pela primeira vez.",
      },
      {
        name: "Alterou Foto de Perfil",
        criterion: "Alterar a foto de perfil pela primeira vez.",
      },
    ].filter(
      (achievement) =>
        !existingAchievements.some((existingAchievement: any) => existingAchievement.name === achievement.name)
    );

    if (typesToCreate.length > 0) {
      await prisma.activityType.createMany({
        data: typesToCreate,
      });
    }

    if (achievements.length > 0) {
      await prisma.achievement.createMany({
        data: achievements,
      });
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

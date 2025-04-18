import { prisma } from "../src/prisma/prismaClient";

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
        image: `${BUCKET_URL}/ciclismo.jpg`
      },
      {
        name: "CrossFit",
        description: "Treinos de alta intensidade combinando diferentes modalidades.",
        image: `${BUCKET_URL}/crossfit.jpg`
      },
      {
        name: "Futebol",
        description: "Partidas de futebol entre amigos ou profissionais.",
        image: `${BUCKET_URL}/futebooll.jpg`
      }
    ].filter((type) => !existingTypes.some((existingType) => existingType.name === type.name));


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
    ].filter((achievement) => !existingAchievements.some((existingAchievement) => existingAchievement.name === achievement.name));

    if (typesToCreate.length > 0) {
      await prisma.activityType.createMany({
        data: typesToCreate,
      });
    }

    if(achievements.length > 0) {
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

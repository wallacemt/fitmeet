import { prisma } from "../prisma/prismaClient";
import { unlockAchiviment } from "./achivimentsRepository";

const BASE_XP = 50;
const XP_MULTIPLIER = 1.5;

function calcularXpNecessario(level: number): number {
  return Math.round(BASE_XP * Math.pow(XP_MULTIPLIER, level - 1));
}

export async function addXp(userId: string, xpGanho: number) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  let novoXp = user?.xp! + xpGanho;
  let novoNivel = user?.level!;
  let xpNecesario = calcularXpNecessario(novoNivel);
  let levelUp = false;

  while (novoXp >= xpNecesario) {
    novoXp -= xpNecesario;
    novoNivel++;
    xpNecesario = calcularXpNecessario(novoNivel);
    levelUp = true;
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      xp: novoXp,
      level: novoNivel,
    },
  });

  if(levelUp){
    await unlockAchiviment(userId, "Subiu de Nível");
  }

  return { xp: novoXp, level: novoNivel };
}

import { prisma } from "../prisma/prismaClient";


//     { name: "Subiu de Nível", criterion: "Alcançar um novo nível pela primeira vez." },
// ];
  
export async function unlockAchiviment(userId:string, achivimentName:string) {
    const achiviment = await prisma.achievement.findUnique({ where: { name: achivimentName } });
    const alreadyUnlocked = await prisma.userAchievement.findFirst(
        { where: { userId, achievementId: achiviment?.id } }
    );
    if(!alreadyUnlocked) {
        await prisma.userAchievement.create({
            data: {userId, achievementId: achiviment?.id!}, 
        })
    }
}
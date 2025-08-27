import { prisma } from "../prisma/prismaClient";

export const preferenceRepository = {
  getUserPreferences: async (userId: string) => {
    return prisma.preference.findMany({
      where: { userId },
      select: {
        typeId: true,
        type: {
          select: {
            name: true,
            description: true,
          },
        },
      },
    });
  },

  defineUserPreferences: async (userId: string, typeIds: string[]) => {
    await prisma.preference.deleteMany({
      where: { userId },
    });
    return prisma.preference.createMany({
      data: typeIds.map((typeId) => ({
        userId,
        typeId,
      })),
    });
  },
};

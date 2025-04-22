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
          }
        }
      }
    });
  },

  defineUserPreferences: async (userId: string, typeIds: string[]) => {
    const existingPreferences = await prisma.preference.findMany({
      where: { userId, typeId: { in: typeIds } },
      select: { typeId: true },
    });

    const existingTypeIdsSet = new Set(existingPreferences.map((pref: { typeId: any; }) => pref.typeId));
    const validTypeIds = await prisma.activityType.findMany({
      where: { id: { in: typeIds } },
      select: { id: true },
    });

    const validTypeIdsSet = new Set(validTypeIds.map((type: { id: any; }) => type.id));
    const filteredTypeIds = typeIds.filter(
      typeId => validTypeIdsSet.has(typeId) && !existingTypeIdsSet.has(typeId)
    );

    return prisma.preference.createMany({
      data: filteredTypeIds.map(typeId => ({
        userId,
        typeId,
      })),
      
    });
  },
};

import {prisma} from "../prisma/prismaClient";

export const activityTypesRepository = {
    findOnes: async (ids: string[]) => {
        return prisma.activityType.findMany({ where: { id: { in: ids } } });
    },
    getAll: async () => {
        return prisma.activityType.findMany();
    },

    getById: async (id: string) => {
        return prisma.activityType.findFirst({ where: { id } });
    }
}
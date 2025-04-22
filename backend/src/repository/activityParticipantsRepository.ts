import { prisma } from "../prisma/prismaClient";

export const activityParticipantsRepository = {
  getUserParticipant: async (
    userId: string,
    orderBy?: string,
    order?: "asc" | "desc",
    page: number = 0,
    pageSize: number = 10
  ) => {
    const skip = page * pageSize;

    return prisma.activityParticipant.findMany({
      where: { userId },
      orderBy: orderBy ? { [orderBy]: order || "asc" } : { activityId: "desc" },
      skip,
      take: pageSize,
      include: {
        activity: {
          select: {
            id: true,
            title: true,
            description: true,
            private: true,
            image: true,
            scheduledDate: true,
            type: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
            creator: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
         
        },
      },
    });
  },

  countUserParticipies: async (userId: string) => {
    return prisma.activityParticipant.count({
      where: { userId },
    });
  },

  getUserParticipantsAll: async (
    id: string,
    filterBy: string,
    filter: string,
    orderByField: string,
    direction: string
  ) => {
    const where = {
      userId: id,
      ...(filterBy && filter ? { [filterBy]: { contains: filter, mode: "insensitive" } } : {}),
    };
    const orderBy = orderByField ? { [orderByField]: direction } : {};
    return prisma.activityParticipant.findMany({
      where,
      orderBy,
    });
  },

  getParticipantsByActivityId: async (activityId: string) => {
    return prisma.activityParticipant.findMany({
      where: { activityId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
       
      },
    });
  },

  getUserSubscriptionStatus: async (userId: string, activityId: string) => {
    return prisma.activityParticipant.findFirst({
      where: { userId, activityId },
    });
  },

  
  getUserConfirmedActivities: async (userId: string) => {
    return prisma.activityParticipant.findMany({
      where: {
        userId,
        confirmedAt: { not: null },
      }
    });
  },

  approveParticipant: async (id: string, approved: boolean) => {
    return prisma.activityParticipant.update({
      where: { id },
      data: {
        approved: approved,
        approvedAt: new Date(),
      },
    });
  },

  activityCheckin: async (id: string) => {
    return prisma.activityParticipant.update({
      where: {id},
      data: {
        confirmedAt: new Date(),
      }
    });
  },

  unsubscribeFromActivity: async (userId: string, activityId: string) => {
    return prisma.activityParticipant.deleteMany({
      where: { userId, activityId },
    });
  },

};

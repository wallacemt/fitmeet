import { prisma } from "../prisma/prismaClient";
import { activityType, activityTypeUpdate } from "../types/activityData";
import { confirmationCode } from "../utils/confirmationCodeGenerate";

export const activityRepository = {
  getActivities: async (
    type?: string,
    orderBy?: string,
    order?: "asc" | "desc",
    page: number = 0,
    pageSize: number = 10
  ) => {
    const skip = page * pageSize;
    return prisma.activity.findMany({
      where: type ? { type: { name: type } } : {},
      orderBy: orderBy ? { [orderBy]: order || "asc" } : { createdAt: "desc" },
      skip,
      take: pageSize,
      include: {
        type: true,
        address: true,
        creator: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
  },

  getAllActivities: async (
    filterBy: string | undefined,
    filter: string | undefined,
    orderByField: string,
    direction: string
  ) => {
    const where = filterBy
      ? {
          [filterBy]: { contains: filter, mode: "insensitive" },
        }
      : undefined;

    const orderBy = {
      [orderByField]: direction,
    };
    return await prisma.activity.findMany({
      where,
      orderBy,
      include: {
        type: true,
        address: true,
        creator: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
  },

  getPaginated: async (take: number, skip: number) => {
    return await prisma.activity.findMany({
      take,
      skip,
    });
  },

  countActivities: async (type?: string) => {
    return prisma.activity.count({ where: type ? { type: { name: type } } : {} });
  },

  getUserActivities: async (userId: string, page: number = 0, pageSize: number = 10) => {
    const skip = page * pageSize;

    return prisma.activity.findMany({
      where: { creatorId: userId },
      skip,
      take: pageSize,
      include: {
        type: true,
        address: true,
        creator: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
  },
  getActivityById: async (id: string) => {
    return prisma.activity.findUnique({
      where: { id },
      include: {
        type: true,
        address: true,
        creator: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
  },

  getUserActivitiesAll: async (
    id: string,
    filterBy: string,
    filter: string,
    orderByField: string,
    direction: string
  ) => {
    const where = {
      creatorId: id,
      ...(filterBy && filter ? { [filterBy]: { contains: filter, mode: "insensitive" } } : {}),
    };
    const orderBy = orderByField ? { [orderByField]: direction } : {};
    return prisma.activity.findMany({
      where,
      orderBy,
      include: {
        type: true,
        address: true,
        creator: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
  },
 

  countUserActivities: async (userId: string) => {
    return prisma.activity.count({ where: { creatorId: userId } });
  },
  countConcludeActivityByUser: async (userId: string) => {
    return prisma.activity.count({where: {creatorId: userId, completedAt: {not: null}}})
  },

  create: async (activityData: activityType) => {
    const newActivity = await prisma.activity.create({
      data: {
        title: activityData.title,
        description: activityData.description,
        typeId: activityData.typeId,
        image: activityData.image,
        scheduledDate: new Date(Date.parse(activityData.scheduledDate)),
        private: !!activityData.private,
        creatorId: activityData.userId,
        confirmationCode: confirmationCode(),
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        type: true,
      },
    });
    await prisma.activityAddress.create({
      data: {
        activityId: newActivity.id,
        latitude: activityData.latitude!,
        longitude: activityData.longitude!,
      },
    });

    return {
      ...newActivity,
      address: {
        latitude: activityData.latitude,
        longitude: activityData.longitude,
      },
    };
  },

  getParticipantCountByActivityId: async (activityId: string) => {
    return prisma.activityParticipant.count({ where: { activityId } });
  },
  deleteActivity: async (id: string) => {
    await prisma.activityAddress.deleteMany({ where: { activityId: id } });
    await prisma.activityParticipant.deleteMany({ where: { activityId: id } });
    return prisma.activity.delete({ where: { id } });
  },

  updateActivity: async (id: string, activityData: Partial<activityType>) => {
    if (activityData.latitude !== undefined && activityData.longitude !== undefined) {
      await prisma.activityAddress.update({
        where: { id },
        data: {
          latitude: activityData.latitude,
          longitude: activityData.longitude,
        },
      });
    }

    return prisma.activity.update({
      where: { id },
      data: {
        title: activityData.title,
        description: activityData.description,
        typeId: activityData.typeId,
        image: activityData.image,
        scheduledDate: activityData.scheduledDate ? new Date(Date.parse(activityData.scheduledDate)) : undefined,
        private: !!activityData.private,
        creatorId: activityData.userId,
      },
      include: {
        type: true,
        address: true,
        creator: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
  },

  subscribeToActivity: async (activityId: string, userId:string, approved:boolean) => {
    return prisma.activityParticipant.create({
      data: {
        activityId,
        userId,
        approved,
      },
    })
  },

  findUserSubscription: async(activityId: string, userId:string) => {
    return prisma.activityParticipant.findFirst({
      where: {
        activityId,
        userId
      }
    })
  },
  concludeActivity: async (activityId: string) => {
    return prisma.activity.update({
      where: {id: activityId},
      data: {
        completedAt: new Date()
      }
    })
  },

  
 
};

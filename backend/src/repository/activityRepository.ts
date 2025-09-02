import { prisma } from "../prisma/prismaClient";
import { activityType, activityTypeUpdate } from "../types/activityData";
import { confirmationCode } from "../utils/confirmationCodeGenerate";
import { preferenceRepository } from "./preferenceRepository";

export const activityRepository = {
  getActivities: async (
    page: number = 0,
    pageSize: number = 10,
    userId: string,
    type?: string,
    orderBy?: string,
    order?: "asc" | "desc"
  ) => {
    const skip = page * pageSize;
    const userPreferences = await preferenceRepository.getUserPreferences(userId);
    return prisma.activity.findMany({
      where: {
        creatorId: { not: userId },
        ...(type ? { type: { name: type } } : {}),
        deletedAt: null,
      },
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
    filterBy: string,
    filter: string,
    orderByField: string,
    direction: string,
    creatorId: string
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
      where: { ...where, NOT: { creatorId }, completedAt: null, deletedAt: null },
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

  getActivityByType: async (type: string) => {
    return await prisma.activity.findMany({
      where: {
        OR: [{ typeId: type }, { type: { name: { contains: type, mode: "insensitive" } } }],
        deletedAt: null,
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

  getPaginated: async (take: number, skip: number) => {
    return await prisma.activity.findMany({
      take,
      skip,
    });
  },

  countActivities: async (userId: string, type?: string) => {
    return prisma.activity.count({
      where: {
        creatorId: { not: userId },
        ...(type ? { type: { name: type } } : {}),
      },
    });
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
    return prisma.activity.count({ where: { creatorId: userId, completedAt: { not: null } } });
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
    return prisma.activityParticipant.count({ where: { activityId, approved: true, approvedAt: { not: null } } });
  },
  deleteActivity: async (id: string) => {
    return prisma.activity.update({ where: { id }, data: { deletedAt: new Date() } });
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

  subscribeToActivity: async (activityId: string, userId: string, approved: boolean) => {
    return prisma.activityParticipant.create({
      data: {
        activityId,
        userId,
        approved,
        approvedAt: approved ? new Date() : null,
      },
    });
  },

  findUserSubscription: async (activityId: string, userId: string) => {
    return prisma.activityParticipant.findFirst({
      where: {
        activityId,
        userId,
      },
    });
  },
  concludeActivity: async (activityId: string) => {
    return prisma.activity.update({
      where: { id: activityId },
      data: {
        completedAt: new Date(),
      },
    });
  },
};

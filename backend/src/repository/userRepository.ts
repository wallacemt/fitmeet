import { prisma } from "../prisma/prismaClient";
import { CreateUserInput } from "../types/userData";

export const userRepository = {
  findByEmailOrCpf: async (email: string, cpf: string) => {
    return await prisma.user.findFirst({
      where: {
        OR: [{ email }, { cpf }],
      },
    });
  },
  findByEmail: async (email: string) => {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  findByEmailWithAchievements: async (email: string) => {
    return prisma.user.findUnique({
      where: { email },
      include: {
        achievements: {
          include: {
            achievement: true,
          },
        },
      },
    });
  },

  findById: async (id: string) => {
    return prisma.user.findUnique({
      where: { id },
      include: {
        achievements: {
          include: {
            achievement: true,
          },
        },
      },
    });
  },

  createUser: async (user: CreateUserInput) => {
    return prisma.user.create({
      data: {...user, avatar: `${`http://localhost:4566/${process.env.BUCKET_NAME}/user.jpg`}`},
    });
  },

  updateAvatar: async (id: string, avatar: string) => {
    return prisma.user.update({
      where: { id },
      data: { avatar },
    })
  },
  updateUserInfo: async (id: string, data: any) => {
    return prisma.user.update({
      where: { id },
      data,
    });
  },

  desactivateUser: async (id: string) => {
    return prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  },
};

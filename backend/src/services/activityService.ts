import { unlockAchiviment } from "../repository/achivimentsRepository";
import { activityParticipantsRepository } from "../repository/activityParticipantsRepository";
import { activityRepository } from "../repository/activityRepository";
import { activityTypesRepository } from "../repository/activityTypesRepository";
import { addXp } from "../repository/xpRepository";
import { activityType, activityTypeUpdate } from "../types/activityData";
import { UserSubscriptionStatus } from "../types/userSubscriptionEnum";
import { uploadImage } from "./s3Service";

export const activityService = {
  getActivityTypes: async () => {
    return await activityTypesRepository.getAll();
  },
  getActivities: async (
    page: number = 0,
    pageSize: number = 10,
    userId: string,
    type?: string,
    orderBy?: string,
    order?: "asc" | "desc"
  ) => {
    const activitiesRes = await activityRepository.getActivities(page, pageSize, userId, type, orderBy, order);
    const total = await activityRepository.countActivities(userId, type);
    const totalPages = Math.ceil(total / pageSize);
    const previous = page > 1 ? page - 1 : null;
    const next = page < Math.ceil(total / pageSize) ? page + 1 : null;

    const activities = await Promise.all(
      activitiesRes.map(async (activity: any) => {
        const status = await activityParticipantsRepository.getUserSubscriptionStatus(userId!, activity.id);
        const userStatus: UserSubscriptionStatus =
          status === null
            ? UserSubscriptionStatus.NONE
            : status?.approvedAt === null && status?.approved === false
            ? UserSubscriptionStatus.PENDING
            : status?.approvedAt !== null && status?.approved === false
            ? UserSubscriptionStatus.REJECTED
            : status?.approvedAt !== null && status?.approved === true
            ? UserSubscriptionStatus.ACCEPTED
            : UserSubscriptionStatus.PENDING;
        return {
          id: activity.id,
          title: activity.title,
          description: activity.description,
          type: activity.type.name,
          image: activity.image,
          confirmationCode: activity.confirmationCode,
          participantCount: await activityRepository.getParticipantCountByActivityId(activity.id),
          address: {
            latitude: activity.address?.latitude,
            longitude: activity.address?.longitude,
          },
          scheduleDate: activity.scheduledDate,
          deletedAt: activity.deletedAt,
          createdAt: activity.createdAt,
          completedAt: activity.completedAt,
          private: activity.private,
          creator: {
            id: activity.creator.id,
            name: activity.creator.name,
            avatar: activity.creator.avatar,
          },
          isSelf: activity.creatorId === userId,
          userSubscriptionStatus: userId !== activity.creatorId ? userStatus : undefined,
        };
      })
    );

    return {
      page,
      pageSize,
      totalActivities: total,
      totalPages,
      previous,
      next,
      activities,
    };
  },

  getActivitiesAll: async (
    filterBy: string,
    filter: string,
    orderByField: string,
    direction: string,
    userId?: string
  ) => {
    const activitiesRes = await activityRepository.getAllActivities(
      filterBy,
      filter,
      orderByField || "title",
      direction || "asc"
    );

    const activities = await Promise.all(
      activitiesRes.map(async (activity: any) => {
        const status = await activityParticipantsRepository.getUserSubscriptionStatus(userId!, activity.id);

        const userStatus: UserSubscriptionStatus =
          status === null
            ? UserSubscriptionStatus.NONE
            : status?.approvedAt === null && status?.approved === false
            ? UserSubscriptionStatus.PENDING
            : status?.approvedAt !== null && status?.approved === false
            ? UserSubscriptionStatus.REJECTED
            : status?.approvedAt !== null && status?.approved === true
            ? UserSubscriptionStatus.ACCEPTED
            : UserSubscriptionStatus.PENDING;
        return {
          id: activity.id,
          title: activity.title,
          description: activity.description,
          type: activity.type.name,
          image: activity.image,
          confirmationCode: activity.confirmationCode,
          participantCount: await activityRepository.getParticipantCountByActivityId(activity.id),
          address: {
            latitude: activity.address?.latitude,
            longitude: activity.address?.longitude,
          },
          scheduleDate: activity.scheduledDate,
          createdAt: activity.createdAt,
          completedAt: activity.completedAt,
          deletedAt: activity.deletedAt,
          private: activity.private,
          creator: {
            id: activity.creator.id,
            name: activity.creator.name,
            avatar: activity.creator.avatar,
          },
          isSelf: activity.creatorId === userId,
          userSubscriptionStatus: userId !== activity.creatorId ? userStatus : undefined,
        };
      })
    );
    return activities;
  },

  getUserActivities: async (userId: string, page: number = 0, pageSize: number = 10) => {
    const activitiesRes = await activityRepository.getUserActivities(userId, page, pageSize);
    const total = await activityRepository.countUserActivities(userId);
    const totalPages = Math.ceil(total / pageSize);
    const previous = page > 1 ? page - 1 : null;
    const next = page < Math.ceil(total / pageSize) ? page + 1 : null;

    const activities = await Promise.all(
      activitiesRes.map(async (activity: any) => ({
        id: activity.id,
        title: activity.title,
        description: activity.description,
        type: activity.type.name,
        image: activity.image,
        confirmationCode: activity.confirmationCode,
        participantCount: await activityRepository.getParticipantCountByActivityId(activity.id),
        address: {
          latitude: activity.address?.latitude,
          longitude: activity.address?.longitude,
        },
        scheduleDate: activity.scheduledDate,
        createdAt: activity.createdAt,
        deletedAt: activity.deletedAt,
        completedAt: activity.completedAt,
        private: activity.private,
        creator: {
          id: activity.creator.id,
          name: activity.creator.name,
          avatar: activity.creator.avatar,
        },
      }))
    );

    return {
      page,
      pageSize,
      totalActivities: total,
      totalPages,
      previous,
      next,
      activities,
    };
  },

  getUserActivitiesAll: async (
    id: string,
    filterBy: string,
    filter: string,
    orderByField: string,
    direction: string
  ) => {
    const activitiesRes = await activityRepository.getUserActivitiesAll(
      id,
      filterBy,
      filter,
      orderByField || "title",
      direction || "asc"
    );

    const activities = await Promise.all(
      activitiesRes.map(async (activity: any) => ({
        id: activity.id,
        title: activity.title,
        description: activity.description,
        type: activity.type.name,
        image: activity.image,
        confirmationCode: activity.confirmationCode,
        participantCount: await activityRepository.getParticipantCountByActivityId(activity.id),
        address: {
          latitude: activity.address?.latitude,
          longitude: activity.address?.longitude,
        },
        scheduleDate: activity.scheduledDate,
        createdAt: activity.createdAt,
        completedAt: activity.completedAt,
        deletedAt: activity.deletedAt,
        private: activity.private,
        creator: {
          id: activity.creator.id,
          name: activity.creator.name,
          avatar: activity.creator.avatar,
        },
      }))
    );
    return activities;
  },

  getActivitiesUserParticipant: async (
    userId: string,
    orderBy?: string,
    order?: "asc" | "desc",
    page: number = 0,
    pageSize: number = 10
  ) => {
    const activitiesPages = await activityParticipantsRepository.getUserParticipant(
      userId,
      orderBy,
      order,
      page,
      pageSize
    );
    const activities = await Promise.all(
      activitiesPages.map(async (act) => ({
        ...act,
        participantCount: await activityRepository.getParticipantCountByActivityId(act.activityId),
      }))
    );
    const total = await activityParticipantsRepository.countUserParticipies(userId);
    const totalPages = Math.ceil(total / pageSize);
    const previous = page > 1 ? page - 1 : null;
    const next = page < Math.ceil(total / pageSize) ? page + 1 : null;
    return {
      page,
      pageSize,
      totalActivities: total,
      totalPages,
      previous,
      next,
      activities,
    };
  },

  getActivityByTypeId: async (type: string, userId: string) => {
    const activity = await activityRepository.getActivityByType(type);
    if (!activity) {
      throw { error: "Atividade nao encontrada.", status: 404 };
    }
    return await Promise.all(
      activity.map(async (activity: any) => ({
        id: activity.id,
        title: activity.title,
        description: activity.description,
        type: activity.type.name,
        image: activity.image,
        confirmationCode: activity.confirmationCode,
        participantCount: await activityRepository.getParticipantCountByActivityId(activity.id),
        address: {
          latitude: activity.address?.latitude,
          longitude: activity.address?.longitude,
        },
        scheduleDate: activity.scheduledDate,
        createdAt: activity.createdAt,
        deletedAt: activity.deletedAt,
        completedAt: activity.completedAt,
        private: activity.private,
        creator: {
          id: activity.creator.id,
          name: activity.creator.name,
          avatar: activity.creator.avatar,
        },
        isSelf: activity.creatorId === userId,
      }))
    );
  },

  getActivitiesById: async (id: string, userId: string) => {
    const activity = await activityRepository.getActivityById(id);
    if (!activity) throw { error: "Atividade nao encontrada.", status: 404 };

    const status = await activityParticipantsRepository.getUserSubscriptionStatus(userId!, activity.id);
    const userStatus: UserSubscriptionStatus =
      status?.approvedAt === null && status?.approved === false
        ? UserSubscriptionStatus.PENDING
        : status?.approvedAt !== null && status?.approved === false
        ? UserSubscriptionStatus.REJECTED
        : status?.approvedAt !== null && status?.approved === true
        ? UserSubscriptionStatus.ACCEPTED
        : UserSubscriptionStatus.PENDING;

    return {
      id: activity.id,
      title: activity.title,
      description: activity.description,
      type: activity.type,
      image: activity.image,
      confirmationCode: activity.confirmationCode,
      participantCount: await activityRepository.getParticipantCountByActivityId(activity.id),
      address: {
        latitude: activity.address?.latitude,
        longitude: activity.address?.longitude,
      },
      scheduleDate: activity.scheduledDate,
      createdAt: activity.createdAt,
      deletedAt: activity.deletedAt,
      completedAt: activity.completedAt,
      private: activity.private,
      creator: {
        id: activity.creator.id,
        name: activity.creator.name,
        avatar: activity.creator.avatar,
      },
      isSelf: activity.creatorId === userId,
      userSubscriptionStatus:
        userId !== activity.creatorId ? (status?.approved === undefined ? null : userStatus) : undefined,
    };
  },

  getActivitiesUserParticipantAll: async (
    id: string,
    filterBy: string,
    filter: string,
    orderByField: string,
    direction: string
  ) => {
    const activityParticipant = await activityParticipantsRepository.getUserParticipantsAll(
      id,
      filterBy,
      filter,
      orderByField,
      direction
    );
    return activityParticipant;
  },

  getParticipantsByActivityId: async (activityId: string, userId: string) => {
    const activityParticipant = await activityParticipantsRepository.getParticipantsByActivityId(activityId);

    if (!activityParticipant) throw { error: "Atividade não encontrada.", status: 404 };

    const activityParts = await Promise.all(
      activityParticipant.map(async (participant) => {
        const status = await activityParticipantsRepository.getUserSubscriptionStatus(userId, activityId);
        const userStatus: UserSubscriptionStatus =
          status === null
            ? UserSubscriptionStatus.NONE
            : status?.approvedAt === null && status?.approved === false
            ? UserSubscriptionStatus.PENDING
            : status?.approvedAt !== null && status?.approved === false
            ? UserSubscriptionStatus.REJECTED
            : status?.approvedAt !== null && status?.approved === true
            ? UserSubscriptionStatus.ACCEPTED
            : UserSubscriptionStatus.PENDING;
        return {
          ...participant,
          subscriptionStatus: status ? userStatus : null,
        };
      })
    );
    return activityParts;
  },

  createActivity: async (activityData: activityType) => {
    const { imageFile } = activityData;
    if (!imageFile) throw { error: "Imagem obrigatório.", status: 400 };

    if (imageFile.mimetype !== "image/jpeg" && imageFile.mimetype !== "image/png")
      throw { error: "A imagem deve ser um arquivo PNG ou JPG.", status: 400 };

    activityData.image = await uploadImage(imageFile);

    const typeId = await activityTypesRepository.getByIdOrName(activityData.typeId);
    if (!typeId) throw { error: "Tipo de atividade nao encontrado.", status: 404 };

    const countActivities = await activityRepository.countUserActivities(activityData.userId);
    if (countActivities === 0) {
      await unlockAchiviment(activityData.userId, "Primeira Atividade Criada");
    }
    const activity = await activityRepository.create({
      ...activityData,
    });

    return {
      id: activity.id,
      title: activity.title,
      description: activity.description,
      type: activity.typeId,
      image: activity.image,
      address: {
        latitude: activity.address.latitude,
        longitude: activity.address.longitude,
      },
      scheduledDate: activity.scheduledDate,
      createdAt: activity.createdAt,
      completedAt: activity.completedAt,
      private: activity.private,
      creatorId: {
        id: activity.creator.id,
        name: activity.creator.name,
        avatar: activity.creator.avatar,
      },
    };
  },

  updateActivity: async (activityId: string, userId: string, activityData: activityTypeUpdate) => {
    const activity = await activityRepository.getActivityById(activityId);
    if (!activity) throw { error: "Atividade nao encontrada.", status: 404 };
    const { imageFile } = activityData;
    let imageUrl;

    if (activityData.imageFile) {
      if (imageFile?.mimetype !== "image/jpeg" && imageFile?.mimetype !== "image/png")
        throw { error: "A imagem deve ser um arquivo PNG ou JPG.", status: 400 };
      imageUrl = await uploadImage(imageFile);
    }

    const realTypeId = await activityTypesRepository.getByIdOrName(activityData.typeId || "");

    const activityTransfer: Partial<activityType> = {
      title: activityData.title,
      description: activityData.description,
      typeId: realTypeId?.id,
      image: imageUrl,
      scheduledDate: activityData.scheduledDate,
      private: activityData.private,
      userId: userId,
    };

    const activityUpdate = await activityRepository.updateActivity(activityId, activityTransfer);

    return {
      id: activityUpdate.id,
      title: activityUpdate.title,
      description: activityUpdate.description,
      typeId: await activityTypesRepository.getByIdOrName(activityUpdate.typeId),
      image: activityUpdate.image,
      address: {
        latitude: activityUpdate.address?.latitude,
        longitude: activityUpdate.address?.longitude,
      },
      scheduledDate: activityUpdate.scheduledDate,
      createdAt: activityUpdate.createdAt,
      completedAt: activityUpdate.completedAt,
      private: activityUpdate.private,
      creatorId: {
        id: activityUpdate.creator.id,
        name: activityUpdate.creator.name,
        avatar: activityUpdate.creator.avatar,
      },
    };
  },

  subscribeToActivity: async (activityId: string, userId: string) => {
    const activity = await activityRepository.getActivityById(activityId);
    if (!activity) throw { error: "Atividade nao encontrada.", status: 404 };

    const existingSubscription = await activityRepository.findUserSubscription(activityId, userId);
    if (existingSubscription) throw { error: "Você já se registrou nessa atividade", status: 409 };
    if (activity.completedAt) throw { error: "Atividade ja concluida.", status: 409 };

    if (activity.creator.id === userId) throw { error: "Criador da atividade não pode se inscrever.", status: 409 };

    const isPrivate = activity.private;
    const approved = !isPrivate;

    const subscription = await activityRepository.subscribeToActivity(activityId, userId, approved);

    return {
      id: subscription.id,
      subscriptionStatus: approved ? UserSubscriptionStatus.ACCEPTED : UserSubscriptionStatus.PENDING,
      activityId: subscription.activityId,
      userId: subscription.userId,
    };
  },

  completedActivity: async (activityId: string, userId: string) => {
    const activity = await activityRepository.getActivityById(activityId);

    if (!activity) throw { error: "Atividade não encontrada.", status: 404 };
    if (activity.creatorId !== userId) throw { error: "Apenas o criador da atividade pode concluir-la.", status: 403 };
    if (activity.completedAt) throw { error: "Atividade ja concluida.", status: 409 };

    const activitiesCompleted = await activityRepository.countConcludeActivityByUser(userId);

    if (activitiesCompleted === 0) {
      unlockAchiviment(userId, "Atividade Concluída");
    }
    const activityParticipants = await activityParticipantsRepository.getParticipantsByActivityId(activityId);

    activityParticipants.map(async (participant: any) => {
      addXp(participant.userId, 15);
    });
    addXp(userId, 20);
    await activityRepository.concludeActivity(activityId);
    return;
  },

  approveParticipant: async (id: string, participantId: string, approved: boolean, userId: string) => {
    if (!participantId || approved == null)
      throw { error: "Informe os campos obrigatóprios corretamente.", status: 400 };

    const status = await activityParticipantsRepository.getUserSubscriptionStatus(participantId, id);
    const activity = await activityRepository.getActivityById(id);
    if (!activity) throw { error: "Atividade nao encontrada.", status: 404 };
    if (activity.creatorId !== userId)
      throw { error: "Apenas o criador da atividade pode aprovar participantes.", status: 403 };
    if (!status) throw { error: "Participante nao encontrado.", status: 404 };

    await activityParticipantsRepository.approveParticipant(status.id, approved);
    return;
  },

  activityCheckin: async (activityId: string, userId: string, code: string) => {
    if (!code || !activityId) throw { error: "Informe os campos obrigatóprios corretamente.", status: 400 };

    const activity = await activityRepository.getActivityById(activityId);
    if (!activity) throw { error: "Atividade nao encontrada.", status: 404 };
    if (activity.confirmationCode !== code) throw { error: "Código de confirmação incorreto.", status: 400 };
    if (activity.creator.id === userId)
      throw { error: "Criador da atividade nao pode confirmar na mesma.", status: 409 };

    const status = await activityParticipantsRepository.getUserSubscriptionStatus(userId, activityId);

    if (status?.confirmedAt) throw { error: "Você já confirmou sua participação nessa atividade.", status: 409 };

    const userCheckins = await activityParticipantsRepository.getUserConfirmedActivities(userId);

    if (userCheckins.length === 0) {
      await unlockAchiviment(userId, "Primeiro Check-in");
    }
    await addXp(userId, 10);
    await addXp(activity.creatorId, 5);

    await activityParticipantsRepository.activityCheckin(status?.id!);
    return;
  },

  unsubscribeFromActivity: async (activityId: string, userId: string) => {
    const activity = await activityRepository.getActivityById(activityId);
    if (!activity) throw { error: "Atividade nao encontrada.", status: 404 };

    if (activity.creator.id === userId) throw { error: "Criador da atividade nao pode se desinscrever.", status: 409 };

    const subscription = await activityRepository.findUserSubscription(activityId, userId);
    if (!subscription) throw { error: "Você não se inscreveu nesta atividade. ", status: 400 };

    await activityParticipantsRepository.unsubscribeFromActivity(userId, activityId);

    return;
  },

  deleteActivity: async (id: string, userId: string) => {
    const activity = await activityRepository.getActivityById(id);
    if (!activity) throw { error: "Atividade não encontrada.", status: 404 };

    if (activity.creatorId !== userId) throw { error: "Apenas o criador da atividade pode exclui-la.", status: 403 };

    await activityRepository.deleteActivity(id);

    return;
  },
};

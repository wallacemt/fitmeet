import {
  getActivitiesPag,
  getActivitiesType,
  getActivityParticipant,
  getAllActivities,
  getUserActivities,
  getUserParticipantActivities,
} from "@/services/activitiesApi";
import { getUserPreferences, updateUserPreferences } from "@/services/userApi";
import { ActivitiesPaginatedResponse, ActivityResponse, ActivityType, Participant } from "@/types/ActivityData";

export const useActivities = () => {
  const getActivities = async (): Promise<ActivitiesPaginatedResponse | null> => {
    try {
      const response = await getActivitiesPag();
      return response;
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
      return null;
    }
  };

  const getAllAct = async (): Promise<ActivityResponse[] | undefined> => {
    try {
      const response = await getAllActivities();
      return response;
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
    }
  };

  const getActivitiesTypes = async (): Promise<ActivityType[] | undefined> => {
    try {
      const response = await getActivitiesType();
      return response;
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
    }
  };

  const getUserPreference = async (): Promise<ActivityType[] | undefined> => {
    try {
      const response = await getUserPreferences();
      return response;
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
    }
  };

  const getUserActivitie = async (): Promise<ActivitiesPaginatedResponse | null> => {
    try {
      const response = await getUserActivities();
      return response;
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
      return null;
    }
  };

  const getUserActivitieParticipant = async (): Promise<ActivitiesPaginatedResponse | null> => {
    try {
      const response = await getUserParticipantActivities();
      return response;
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
      return null;
    }
  };
  const updateUserPreference = async (preferences: string[]): Promise<string | undefined> => {
    try {
      const response = await updateUserPreferences(preferences);
      return response;
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const getActivityParticipants = async (activityId: string): Promise<Participant[] | undefined> => {
    try {
      const response = await getActivityParticipant(activityId);
      return response;
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
    }
  };
  return {
    getActivities,
    getActivitiesTypes,
    getAllAct,
    getUserPreference,
    updateUserPreference,
    getUserActivitie,
    getUserActivitieParticipant,
    getActivityParticipants,
  };
};

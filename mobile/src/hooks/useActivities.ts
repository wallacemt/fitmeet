import {useState} from 'react';
import {
  deleteParticiping,
  getActivitesParticipants,
  getActivityById,
  getAllActivities,
  getTypeActivities,
  getUserActivites,
  getUserHistoryActivites,
  postParticiping,
} from '../api/activityApi';
import {
  ActivityResponse,
  ActivityType,
  HistoryActivity,
  Participant,
} from '../types/ActivityData';
import {showToast} from '../utils/showToast';

export const useActivities = () => {
  const [loading, setLoading] = useState(false);
  const getActivities = async (): Promise<ActivityResponse[]> => {
    try {
      const response = await getAllActivities();
      return response;
    } catch (error) {
      console.error('Erro ao buscar atividades:', error);
      throw new Error('Erro ao buscar atividade');
    }
  };

  const getActivityForId = async (id: string): Promise<ActivityResponse> => {
    try {
      const response = await getActivityById(id);
      return response;
    } catch (error) {
      throw new Error('Erro ao buscar atividade');
    }
  };
  const getActivitesUser = async (): Promise<
    ActivityResponse[] | undefined
  > => {
    try {
      const response = await getUserActivites();
      return response;
    } catch (error) {
      console.error('Erro ao buscar atividades:', error);
    }
  };
  const getActivitiesTypes = async (): Promise<ActivityType[] | undefined> => {
    try {
      const response = await getTypeActivities();
      return response;
    } catch (error) {
      console.error('Erro ao buscar atividades:', error);
    }
  };
  const getHistoryActivitiesUser = async (): Promise<
    HistoryActivity[] | undefined
  > => {
    try {
      const response = await getUserHistoryActivites();
      return response;
    } catch (error) {
      console.error('Erro ao buscar atividades:', error);
    }
  };
  const getParticipantsAcitivites = async (
    id: string,
  ): Promise<Participant[] | undefined> => {
    try {
      const response = await getActivitesParticipants(id);
      return response;
    } catch (error) {
      console.error('Erro ao buscar Participantes:', error);
    }
  };
  const subscribeActivity = async (actId: string) => {
    setLoading(true);
    try {
      const response = await postParticiping(actId);
      showToast({
        title: 'Participação Confirmada',
        message: 'Parabens, você agora esta participando desta atividade',
        type: 'success',
      });

      return response;
    } catch (err) {
      showToast({
        title: 'error',
        message:
          err instanceof Error
            ? err.message
            : 'Erro ao participar da atividade.',
        type: 'error',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const unsubscribeActivity = async (actId: string) => {
    setLoading(true);
    try {
      const response = await deleteParticiping(actId);
      showToast({
        title: 'Participação Cancelada',
        message: 'Você não está mais participando desta atividade',
        type: 'success',
      });
      return response;
    } catch (err) {
      showToast({
        title: 'error',
        message:
          err instanceof Error
            ? err.message
            : 'Erro ao cancelar participação na atividade.',
        type: 'error',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return {
    getActivities,
    getActivitiesTypes,
    getActivitesUser,
    getHistoryActivitiesUser,
    getParticipantsAcitivites,
    loading,
    getActivityForId,
    subscribeActivity,
    unsubscribeActivity
  };
};

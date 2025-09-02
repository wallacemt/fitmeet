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
  putApproveOrNotParticipant,
  putCheckin,
  putConclude,
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
  const getActivitiesTypes = async () => {
    try {
      const response = await getTypeActivities();
      return response;
    } catch (error) {
      console.error('Erro ao buscar atividades:', error);
      throw new Error('Erro ao buscar atividade');
    }
  };
  const getHistoryActivitiesUser = async () => {
    try {
      const response = await getUserHistoryActivites();
      return response;
    } catch (error) {
      console.error('Erro ao buscar atividades:', error);
      throw new Error('Erro ao buscar atividade');
    }
  };
  const getParticipantsAcitivites = async (id: string) => {
    try {
      const response = await getActivitesParticipants(id);
      return response;
    } catch (error) {
      console.error('Erro ao buscar Participantes:', error);
      throw new Error('Erro ao buscar participantes');
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

  const handleConclude = async (id: string) => {
    setLoading(true);
    try {
      const response = await putConclude(id);
      showToast({
        title: 'Atividade Concluída',
        message: 'Parabéns, você concluiu esta atividade',
        type: 'success',
      });
      return response;
    } catch (err) {
      showToast({
        title: 'error',
        message:
          err instanceof Error ? err.message : 'Erro ao concluir a atividade.',
        type: 'error',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async (code: string, id: string) => {
    setLoading(true);
    try {
      const response = await putCheckin(code, id);
      showToast({
        title: 'Check-in Realizado',
        message: 'Parabéns, você realizou o check-in nesta atividade',
        type: 'success',
      });
      return response;
    } catch (error) {
      showToast({
        title: 'error',
        message:
          error instanceof Error ? error.message : 'Erro ao realizar check-in.',
        type: 'error',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (
    id: string,
    participantId: string,
    approved: boolean,
  ) => {
    setLoading(true);
    try {
      const response = await putApproveOrNotParticipant(
        participantId,
        approved,
        id,
      );
      showToast({
        title: 'Participante Atualizado',
        message: `O participante foi ${approved ? 'aprovado' : 'rejeitado'}.`,
        type: 'success',
      });
      return response;
    } catch (error) {
      showToast({
        title: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Erro ao atualizar participante.',
        type: 'error',
      });
      throw error;
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
    unsubscribeActivity,
    handleApprove,
    handleCheckIn,
    handleConclude,
  };
};

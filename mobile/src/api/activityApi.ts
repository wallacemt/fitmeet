import axios from 'axios';
import {baseURL, getHeaders} from './api';
import {
  ActivityResponse,
  ActivitySubResponse,
  ActivityType,
  HistoryActivity,
  Participant,
} from '../types/ActivityData';

const activityApi = axios.create({
  baseURL: `${baseURL}/activities`,
  withCredentials: true,
});

export const getAllActivities = async (): Promise<ActivityResponse[]> => {
  try {
    const header = await getHeaders({auth: true});
    const response = await activityApi.get<ActivityResponse[]>('/all', {
      headers: header,
    });
    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const getActivityById = async (
  id: string,
): Promise<ActivityResponse> => {
  try {
    const header = await getHeaders({auth: true});
    const response = await activityApi.get<ActivityResponse>(`/${id}`, {
      headers: header,
    });
    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const getTypeActivities = async (): Promise<ActivityType[]> => {
  try {
    const header = await getHeaders({auth: true});
    const response = await activityApi.get<ActivityType[]>('/types', {
      headers: header,
    });
    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const getUserActivites = async (): Promise<ActivityResponse[]> => {
  try {
    const header = await getHeaders({auth: true});
    const response = await activityApi.get<ActivityResponse[]>(
      '/user/creator/all',
      {
        headers: header,
      },
    );
    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const getActivitesParticipants = async (
  id: string,
): Promise<Participant[]> => {
  try {
    const header = await getHeaders({auth: true});
    const response = await activityApi.get<Participant[]>(
      `${id}/participants`,
      {
        headers: header,
      },
    );
    return response.data;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};

export const getUserHistoryActivites = async (): Promise<HistoryActivity[]> => {
  try {
    const header = await getHeaders({auth: true});
    const response = await activityApi.get<HistoryActivity[]>(
      '/user/participant',
      {
        headers: header,
      },
    );
    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const postParticiping = async (
  id: string,
): Promise<ActivitySubResponse> => {
  try {
    const header = await getHeaders({auth: true});
    const res = await activityApi.post<ActivitySubResponse>(
      `/${id}/subscribe`,
      {},
      {
        headers: header,
      },
    );
    return res.data;
  } catch (error) {
    throw new Error(
      (error as {response: {data: {error: string}}}).response?.data?.error ||
        'Erro ao subscriver na atividade',
    );
  }
};

export const deleteParticiping = async (id: string) => {
  try {
    const header = await getHeaders({auth: true});
    const res = await activityApi.delete<ActivitySubResponse>(
      `/${id}/unsubscribe`,
      {
        headers: header,
      },
    );
    return res.data;
  } catch (error) {
    throw new Error(
      (error as {response: {data: {error: string}}}).response?.data?.error ||
        'Erro ao deletar subscrição',
    );
  }
};

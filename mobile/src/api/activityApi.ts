import axios from 'axios';
import {baseURL, getHeaders} from './api';
import {
  ActivityResponse,
  ActivitySubResponse,
  ActivityType,
  HistoryActivity,
  HistoryActivityRes,
  Participant,
} from '../types/ActivityData';
import {ActivityTypeRequest} from '../hooks/useCreateOrEditActivity';

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

export const getUserHistoryActivites =
  async (): Promise<HistoryActivityRes> => {
    try {
      const header = await getHeaders({auth: true});
      const response = await activityApi.get('/user/participant/all', {
        headers: header,
      });
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

export const postCreateActivity = async (data: ActivityTypeRequest) => {
  try {
    const header = await getHeaders({auth: true});

    const activityImage = {
      uri: data.image,
      type: 'image/jpeg',
      name: `${data.title}-${Date.now()}.jpg`,
    };
    const activityData = new FormData();
    activityData.append('image', activityImage);
    activityData.append('title', data.title);
    activityData.append('description', data.description);
    activityData.append('address', data.address);
    activityData.append('typeId', data.typeId);
    activityData.append('scheduledDate', data.scheduledDate);
    activityData.append('private', data.private.toString());

    const response = await activityApi.post('/new', activityData, {
      headers: {
        ...header,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      (error as {response: {data: {error: string}}}).response?.data?.error ||
        'Erro ao criar atividade',
    );
  }
};

export const postEditActivity = async (
  data: ActivityTypeRequest,
  activityId: string,
) => {
  try {
    const header = await getHeaders({auth: true});

    const activityImage = {
      uri: data.image,
      type: 'image/jpeg',
      name: `${data.title}-${Date.now()}.jpg`,
    };
    const activityData = new FormData();
    activityData.append('image', activityImage);
    activityData.append('title', data.title);
    activityData.append('description', data.description);
    activityData.append('address', data.address);
    activityData.append('typeId', data.typeId);
    activityData.append('scheduledDate', data.scheduledDate);
    activityData.append('private', data.private.toString());

    const response = await activityApi.put(
      `/${activityId}/update`,
      activityData,
      {
        headers: {
          ...header,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(
      (error as {response: {data: {error: string}}}).response?.data?.error ||
        'Erro ao criar atividade',
    );
  }
};

export const putCheckin = async (confirmationCode: string, id: string) => {
  try {
    const header = await getHeaders({auth: true});
    const response = await activityApi.put(
      `/${id}/check-in`,
      {confirmationCode},
      {
        headers: header,
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(
      (error as {response: {data: {error: string}}}).response?.data?.error ||
        'Erro ao realizar check-in',
    );
  }
};

export const putConclude = async (id: string) => {
  try {
    const header = await getHeaders({auth: true});
    const response = await activityApi.put(
      `/${id}/conclude`,
      {},
      {
        headers: header,
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(
      (error as {response: {data: {error: string}}}).response?.data?.error ||
        'Erro ao realizar conclusão',
    );
  }
};

export const putApproveOrNotParticipant = async (
  participantId: string,
  approved: boolean,
  id: string,
) => {
  try {
    const header = await getHeaders({auth: true});
    const response = await activityApi.put(
      `/${id}/conclude`,
      {participantId, approved},
      {
        headers: header,
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(
      (error as {response: {data: {error: string}}}).response?.data?.error ||
        'Erro ao realizar conclusão',
    );
  }
};

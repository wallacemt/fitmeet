import axios from 'axios';
import {baseURL, getHeaders} from './api';
import {UserEditData, UserResponse} from '../types/UserTypes';
import {ActivityType, UserPreferencesType} from '../types/ActivityData';

const userApi = axios.create({
  baseURL: `${baseURL}/user`,
  withCredentials: true,
});

export const getUser = async (token: string): Promise<UserResponse> => {
  try {
    const response = await userApi.get<UserResponse>('', {
      headers: {Authorization: `Bearer ${token}`},
    });
    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const getUserInfo = async (): Promise<UserResponse> => {
  try {
    const header = await getHeaders({auth: true});
    const response = await userApi.get<UserResponse>('', {headers: header});
    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};
export const getUserPreferences = async (): Promise<UserPreferencesType[]> => {
  try {
    const header = await getHeaders({auth: true});
    const response = await userApi.get<UserPreferencesType[]>('/preferences', {
      headers: header,
    });
    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const postDefineUserPreferences = async (typeIds: string[]) => {
  try {
    const header = await getHeaders({auth: true});
    const response = await userApi.post(
      '/preferences/define',
      {typeIds: typeIds},
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

export const userAvatarDefine = async (avatar: string): Promise<string> => {
  try {
    const header = await getHeaders({auth: true});
    const formData = new FormData();
    const avatarFile = {
      uri: avatar,
      type: 'image/jpeg',
      name: 'avatar.jpg',
    };
    formData.append('avatar', avatarFile);
    console.log(formData);
    const response = await userApi.post('/avatar', formData, {
      headers: {
        ...header,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export const postUserEdit = async (data: UserEditData) => {
  try {
    const header = await getHeaders({auth: true});
    const response = await userApi.post('/update', data, {
      headers: header,
    });
    return response.data;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};

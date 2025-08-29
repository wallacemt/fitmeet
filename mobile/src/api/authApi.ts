import axios from 'axios';
import {UserResponse} from '../types/UserTypes';
import {getHeaders, baseURL} from './api';
import {RegisterProps} from '../hooks/useAuth';

const authAPI = axios.create({
  baseURL: `${baseURL}/auth`,
  withCredentials: true,
});

export const loginUser = async (email: string, password: string) => {
  try {
    const userResponse = await authAPI.post(
      '/sign-in',
      {email, password},
      {headers: await getHeaders()},
    );
    return userResponse.data as UserResponse;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data.error;
    } else {
      console.error('Erro desconhecido:', error);
      throw new Error('Erro inesperado');
    }
  }
};

export const registerUser = async (data: RegisterProps) => {
  try {
    const userResponse = await authAPI.post(
      '/register',
      {
        name: data.name,
        email: data.email,
        password: data.password,
        cpf: data.cpf,
      },
      {headers: await getHeaders()},
    );
    return userResponse.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data.error;
    } else {
      console.error('Erro desconhecido:', error);
      throw new Error('Erro inesperado');
    }
  }
};

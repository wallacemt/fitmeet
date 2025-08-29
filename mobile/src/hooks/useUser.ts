import {
  getUserInfo,
  getUserPreferences,
  postDefineUserPreferences,
} from '../api/userApi';
import {UserPreferencesType} from '../types/ActivityData';

export const useUser = () => {
  const getPreferences = async (): Promise<
    UserPreferencesType[] | undefined
  > => {
    try {
      const response = await getUserPreferences();
      return response;
    } catch (error) {
      console.error('Erro ao buscar Preferencias:', error);
      throw new Error('Erro ao buscar Preferencias');
    }
  };
  const definePreferences = async (typeIds: string[]) => {
    try {
      const response = await postDefineUserPreferences(typeIds);
      return response;
    } catch (error) {
      console.error('Erro ao definir Preferencias:', error);
      throw new Error('Erro ao definir Preferencias');
    }
  };
  const getUserApi = async () => {
    try {
      const response = await getUserInfo();
      return response;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw new Error('Erro ao buscar usuário');
    }
  };
  return {
    getPreferences,
    definePreferences,
    getUserApi,
  };
};

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';
import {ActionTypes, reducer} from './reducer/reducer';
import {AuthStateMod, initialState} from './state/state';

import * as Keychain from 'react-native-keychain';
import {loginUser, registerUser} from '../../api/authApi';
import {UserType} from '../../types/UserTypes';
import {RegisterProps} from '../../hooks/useAuth';
import {showToast} from '../../utils/showToast';
import {useTypedNavigation} from '../../hooks/useTypedNavigation';
import {getUser} from '../../api/userApi';
import {tokenValidation} from '../../api/api';

export const TOKEN_STORAGE_KEY = 'com.fitmeet.token';
export const USER_STORAGE_KEY = 'com.fitmeet.user';

export const AppContext = createContext<AuthStateMod>(initialState);

interface AppStateProviderProps {
  children: ReactNode;
}
export function AppStateProvider({children}: AppStateProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [user, setUser] = useState(initialState.user);
  const load = async () => {
    try {
      const token = await Keychain.getGenericPassword({
        service: TOKEN_STORAGE_KEY,
      });
      const user = await Keychain.getGenericPassword({
        service: USER_STORAGE_KEY,
      });

      if (token && user) {
        if ((await tokenValidation(token.password)) === false) {
          dispatch({type: ActionTypes.LOGOUT, payload: null});
          return;
        }
        dispatch({
          type: ActionTypes.LOGIN,
          payload: {token: token.password, user: JSON.parse(user.password)},
        });
        setUser(JSON.parse(user.password));
      } else {
        dispatch({type: ActionTypes.LOGOUT, payload: null});
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    load();
  }, []);

  async function storageAuthData(token: string, user: any) {
    const a = await Keychain.setGenericPassword('token', token, {
      service: TOKEN_STORAGE_KEY,
    });
    const b = await Keychain.setGenericPassword('user', JSON.stringify(user), {
      service: USER_STORAGE_KEY,
    });
    setUser(user);
  }

  const removeAuthData = useCallback(async () => {
    setUser(initialState.user);
    await Keychain.resetGenericPassword({service: TOKEN_STORAGE_KEY});
    await Keychain.resetGenericPassword({service: USER_STORAGE_KEY});
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const data = {
        email,
        password,
      };
      const response = await loginUser(email, password);
      showToast({
        title: `Bem vindo(a) ${response.name}`,
        message: 'Login realizado com sucesso!',
        type: 'success',
      });
      if (response) {
        const userRes = await getUser(response?.token!);
        storageAuthData(response?.token!, userRes);
        dispatch({
          type: ActionTypes.LOGIN,
          payload: {token: response?.token!, userRes},
        });
      }
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }, []);

  const register = useCallback(async (data: RegisterProps) => {
    try {
      const response = await registerUser(data);
      if (response) {
        showToast({
          title: 'Cadastro Realizado',
          message: 'Seu cadastro foi realizado com sucesso!',
          type: 'success',
        });
        login(data.email, data.password);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await removeAuthData();
      dispatch({type: ActionTypes.LOGOUT});
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateData = async () => {
    try {
      const res = await getUser(state.auth.token!);
      return setUser(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AppContext.Provider
      value={{
        auth: {
          ...state.auth,
          login,
          logout,
          register,
        },
        user,
        load: updateData,
      }}>
      {children}
    </AppContext.Provider>
  );
}

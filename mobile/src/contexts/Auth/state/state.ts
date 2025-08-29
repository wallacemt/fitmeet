import {RegisterProps} from '../../../hooks/useAuth';
import {UserResponse} from '../../../types/UserTypes';

interface AuthState {
  token: string | null;
  isAuthenticate: boolean | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterProps) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  user: UserResponse | null;
}

export interface AuthStateMod {
  auth: AuthState;
  user: UserResponse | null;
  load: () => Promise<void>;
}

export const initialState: AuthStateMod = {
  auth: {
    token: null,
    isAuthenticate: null,
    login: async (email: string, password: string) => {},
    logout: () => {},
    register: async () => {},
    isLoading: false,
    user: null,
  },
  user: {
    token: 'string',
    id: 'string',
    name: 'string',
    email: 'string',
    cpf: 'string',
    avatar: 'string',
    xp: 0,
    level: 0,
    achievements: [
      {
        name: 'string',
        criterion: 'string',
      },
    ],
  },
  load: async () => {},
};

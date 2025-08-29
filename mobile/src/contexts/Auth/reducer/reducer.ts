import {AuthStateMod} from '../state/state';

export enum ActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT'
}

interface Action {
  type: ActionTypes;
  payload?: any;
}
export const reducer = (state: AuthStateMod, action: Action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        auth: {
          ...state.auth,
          token: action.payload.token,
          isAuthenticate: true,
          user: action.payload.user,
        },
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        auth: {
          ...state.auth,
          token: null,
          isAuthenticate: false,
          user: null,
        },
    }
    default:
      return state;
  }
};

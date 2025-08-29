import {useContext} from 'react';
import {AppContext} from '../contexts/Auth/AuthState';

export default function useAppContext() {
  return useContext(AppContext);
}

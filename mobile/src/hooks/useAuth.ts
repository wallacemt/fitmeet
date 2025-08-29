import {showToast} from '../utils/showToast';
import {cpfVerify, cpfVerifyMessage, emailVerify, nomeVerify, passwordVerify, passwordVerifyMessages} from '../utils/verifications';
import useAppContext from './useAppContext';

interface LoginProps {
  email: string;
  password: string;
  setEmailError: any;
  setPasswordError: any;
}

export interface RegisterProps {
  name: string;
  cpf: string,
  email: string;
  password: string;

  setNameError?: any;
  setEmailError?: any;
  setPasswordError?: any;
  setCpfError?: any;
}

export const useAuth = () => {
  const {
    auth: {login,register},
  } = useAppContext();
  const handleLogin = async ({
    email,
    password,
    setEmailError,
    setPasswordError,
  }: LoginProps) => {
    try {
      let isError = false;
      if (!emailVerify(email!)) {
        setEmailError(true);
        isError = true;
      }
      if (passwordVerify(password!)) {
        setPasswordError(true);
        isError = true;
      }
      if (isError) return;
      login && (await login(email!, password!));
    } catch (error: any) {
      showToast({title: 'Houve um Error!', message: error, type: 'error'});
    }
  };

  const handleRegister = async ({
    name,
    cpf,
    email,
    password,
    setNameError,
    setEmailError,
    setPasswordError,
    setCpfError,
  }: RegisterProps) => {
    try {
      let isError = false;
      const formaterCpf = cpf.replace(/[^\d]+/g, '');
      if (!emailVerify(email!)) {
        setEmailError(true);
        isError = true;
      }
      if (!passwordVerify(password!)) {
        setPasswordError({isError: true, message: passwordVerifyMessages(password!)});
        isError = true;
      }
      if (!name || !nomeVerify(name!)) {
        setNameError(true);
        isError = true;
      }
      if (!cpfVerify(formaterCpf!)) {
        setCpfError({isError: true, message: cpfVerifyMessage(formaterCpf!)});
        isError = true;
      }
      if (isError) return;
      const data = {
        name,
        email,
        password,
        cpf: formaterCpf,
      }
      register && (await register(data));
    } catch (error: any) {
      showToast({title: 'Houve um Error!', message: error, type: 'error'});
    }
  }
  
  return {handleLogin, handleRegister};
};

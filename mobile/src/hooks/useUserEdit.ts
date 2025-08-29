import {useEffect, useState} from 'react';
import {cpfVerify, emailVerify, nomeVerify} from '../utils/verifications';
import {
  getUserPreferences,
  postDefineUserPreferences,
  postUserEdit,
  userAvatarDefine,
} from '../api/userApi';
import {showToast} from '../utils/showToast';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';

import useAppContext from './useAppContext';
import { useTypedNavigation } from './useTypedNavigation';
import { useNavigation } from '@react-navigation/native';

interface ErrorType {
  isError: boolean;
  message?: string;
}

export const useUserEdit = () => {
  const {user, load} = useAppContext();
  if (!user) throw new Error('User not found');
  const [name, setName] = useState(user.name);
  const [cpf, setCpf] = useState(user.cpf);
  const [email, setEmail] = useState(user.email);
  const [preferencias, setPreferencias] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState<ErrorType>({
    isError: false,
    message: 'Email Invalido',
  });
  const [nameError, setNameError] = useState<ErrorType>({
    isError: false,
    message: 'Nome Invalido',
  });
  const [image, setImage] = useState<string | null>(null);
  const [cpfError, setCpfError] = useState<ErrorType>({
    isError: false,
    message: 'CPF Invalido',
  });
  const {navigate} = useTypedNavigation()

  const handleEdit = async () => {
    setLoading(true);
  
    try {
      let isError = false;
      const formaterCpf = cpf.replace(/[^\d]+/g, '');
      if (!emailVerify(email!)) {
        setEmailError({isError: true});
        isError = true;
      }

      if (!name || !nomeVerify(name!)) {
        setNameError({isError: true});
        isError = true;
      }
      if (!cpfVerify(formaterCpf) && formaterCpf) {
        setCpfError({isError: true});
        isError = true;
      }
      if (isError) return;
      const data = {
        name,
        email,
        cpf: formaterCpf,
      };
      const editRes = await postUserEdit(data);
      if (editRes) {
        showToast({
          title: 'Sucesso!',
          message: 'Dados alterados com sucesso!',
          type: 'success',
        });
      }
      navigate("User")
    } catch (error: any) {
      showToast({title: 'Houve um Error!', message: error, type: 'error'});
    } finally {
      setLoading(false);
    }
  };

  const fetchPreferences = async () => {
    setLoading(true);
    try {
      const preferences = await getUserPreferences();
      setPreferencias(preferences.map(p => p.typeId));
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreferences();
    load()
  }, []);

  async function selectImage() {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };
    const response = await launchImageLibrary(options);

    if (response.assets) {
      setImage(response.assets[0].uri!);
      await userAvatarDefine(image!);
      await load();
    }
  }

  return {
    handleEdit,
    email,
    name,
    cpf,
    preferencias,
    loading,
    error: {emailError, nameError, cpfError},
    setError: {setEmailError, setNameError, setCpfError},
    setEmail,
    setName,
    setCpf,
    setPreferencias,
    setLoading,
    selectImage,
    user,
    fetchPreferences,
  };
};

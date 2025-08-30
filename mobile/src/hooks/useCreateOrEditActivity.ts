import {useState} from 'react';

import {showToast} from '../utils/showToast';
import {useTypedNavigation} from './useTypedNavigation';
import {postCreateActivity, postEditActivity} from '../api/activityApi';
const formSchema = {
  title: (value: string) =>
    value.trim().length > 0 || 'Preencha o campo com o título da atividade',
  description: (value: string) =>
    value.trim().length > 0 || 'Preencha o campo com a descrição da atividade',
  address: (value: string) =>
    value.trim().length > 0 || 'Preencha o campo com o endereço da atividade',
  image: (value: string) => value.trim().length > 0 || 'Selecione uma imagem',
  typeId: (value: string) =>
    value.trim().length > 0 || 'Selecione o tipo de atividade',
  scheduledDate: (value: string) =>
    value.trim().length > 0 ||
    'Preencha o campo com a data e hora da atividade',
  private: (_value: boolean) => true,
};

export type ActivityTypeRequest = {
  title: string;
  description: string;
  address: string[];
  image: string;
  typeId: string;
  scheduledDate: string;
  private: boolean;
};
export const useCreateOrEditActivity = () => {
  const [data, setData] = useState<ActivityTypeRequest>({
    title: '',
    description: '',
    address: [],
    image: '',
    typeId: '',
    scheduledDate: '',
    private: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<
    {
      field: keyof ActivityTypeRequest;
      message: string;
    }[]
  >();
  const {navigate} = useTypedNavigation();
  const parseValue = (value: unknown, field: keyof ActivityTypeRequest) => {
    const result = formSchema[field](value as never);
    if (result !== true) {
      return {field, message: result as string};
    }
    return null;
  };

  const onSubmit = async () => {
    setError(undefined);
    setLoading(true);
    try {
      const errors: {field: keyof ActivityTypeRequest; message: string}[] = [];
      Object.keys(formSchema).forEach(field => {
        const key = field as keyof ActivityTypeRequest;
        const err = parseValue(data[key], key);
        if (err) errors.push(err);
      });
      if (errors.length > 0) {
        setError(errors);
        return;
      }
      const activity: ActivityTypeRequest = {...data};
      const response = await postCreateActivity(activity);
      showToast({
        message: 'Atividade Criada!',
        title: 'Criada',
        type: 'success',
      });
      if (response) {
        navigate('User');
      }
    } catch (error: any) {
      console.error('Erro ao enviar formulário:', error);
      showToast({
        title: 'Error',
        message: String(error.message),
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const onChange = (field: keyof ActivityTypeRequest, value: unknown) => {
    setData(prev => ({...prev, [field]: value}));
  };


  const onSubmitEdit = async (
    activityId: string,
    onClose: () => void,
    onUpdate: () => Promise<void>,
  ) => {
    setError(undefined);
    setLoading(true);
    console.log(data)
    try {
      const errors: {field: keyof ActivityTypeRequest; message: string}[] = [];
      Object.keys(formSchema).forEach(field => {
        const key = field as keyof ActivityTypeRequest;
        const err = data[key] && parseValue(data[key], key);
        if (err) errors.push(err);
      });
      if (errors.length > 0) {
        setError(errors);
        return;
      }
      const activity: ActivityTypeRequest = {...data};
      await postEditActivity(activity, activityId);
      showToast({
        title: 'Editada',
        message: 'Atividade Editada!',
        type: 'success',
      });

      onClose();

      return onUpdate();
    } catch (error: any) {
      console.error('Erro ao enviar formulário:', error);
      showToast({
        title: 'Error',
        message: String(error.message),
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    onSubmit,
    loading,
    error,
    setError,
    onSubmitEdit,
    onChange,
    data,
  };
};

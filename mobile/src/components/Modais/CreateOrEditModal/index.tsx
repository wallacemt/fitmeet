import {CaretLeft, Upload} from 'phosphor-react-native';
import {
  Dimensions,
  Image,
  Modal,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {styles} from './styles';
import Title from '../../Title';
import {useEffect, useState} from 'react';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {Input} from '../../Input';
import {DatePicker} from '../../DatePicker';
import Maps from '../../Maps';
import {Button} from '../../Button';
import {themes} from '../../../assets/themes';
import {ActivityTypeSection} from '../../ActivityTypeSection';
import {imageUriCorrect} from '../../../utils/imageUriCorrect';
import {useCreateOrEditActivity} from '../../../hooks/useCreateOrEditActivity';
import {ActivityResponse} from '../../../types/ActivityData';

const defaultImage = require('../../../assets/images/image-edit.png');
interface CreateOrEditModalProps {
  visible: boolean;
  onClose: () => void;
  type: 'create' | 'edit';
  activity?: ActivityResponse;
  update?: () => Promise<void>;
}
export const CreateOrEditModal = ({
  visible,
  onClose,
  type,
  activity,
  update,
}: CreateOrEditModalProps) => {
  const [image, setImage] = useState<string>(defaultImage);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const {onChange, onSubmit, data, error, loading, onSubmitEdit} =
    useCreateOrEditActivity();
  const pickImage = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };
    const response = await launchImageLibrary(options);
    if (response.assets) {
      setImage(response.assets[0].uri!);
      onChange('image', `${response.assets[0].uri}`);
    }
  };

  useEffect(() => {
    if (type === 'edit') {
      onChange('title', activity?.title || '');
      onChange('description', activity?.description || '');
      onChange(
        'scheduledDate',
        activity?.scheduleDate
          ? new Date(activity.scheduleDate).toISOString().slice(0, -5)
          : '',
      );
      onChange('address', [
        activity?.address.latitude.toString() || '',
        activity?.address.longitude.toString() || '',
      ]);
      onChange('private', activity?.private || true);
      setImage(activity?.image || defaultImage);
      onChange(
        'typeId',
        typeof activity?.type !== 'string' && activity?.type.id,
      );
    }
  }, [type]);

  return (
    <Modal
      animationType="fade"
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <CaretLeft size={34} weight="bold" />
          </TouchableOpacity>
          <Title>
            {type === 'create' ? 'Cadastrar Atividade' : 'Editar Atividade'}
          </Title>
        </View>
        <FlatList
          data={[]}
          renderItem={() => <></>}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.form}>
              <TouchableOpacity onPress={pickImage}>
                <Image
                  source={
                    image && image != defaultImage
                      ? {uri: imageUriCorrect(image)}
                      : defaultImage
                  }
                  resizeMethod="resize"
                  resizeMode="cover"
                  style={{
                    width: Dimensions.get('window').width * 0.9,
                    height: 200,
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>

              <Input.Root
                isError={!!error?.find(err => err.field === 'title')?.message}>
                <Input.Label required>Título</Input.Label>
                <Input.Input
                  value={data.title}
                  onChangeText={value => onChange('title', value)}
                  placeholder="Ex.: Corrida"
                />
                <Input.ErrorMessage>
                  {error?.find(err => err.field === 'title')?.message}
                </Input.ErrorMessage>
              </Input.Root>

              <Input.Root
                isError={
                  !!error?.find(err => err.field === 'description')?.message
                }>
                <Input.Label required>Descrição</Input.Label>
                <Input.Input
                  value={data.description}
                  onChangeText={value => onChange('description', value)}
                  placeholder="Ex.: Corrida de 5km"
                />
                <Input.ErrorMessage>
                  {error?.find(err => err.field === 'description')?.message}
                </Input.ErrorMessage>
              </Input.Root>

              <Input.Root
                isError={
                  !!error?.find(err => err.field === 'scheduledDate')?.message
                }>
                <Input.Label required>Data do Evento</Input.Label>
                <DatePicker
                  onChange={date =>
                    onChange('scheduledDate', `${new Date(date).toISOString()}`)
                  }
                />
                <Input.ErrorMessage>
                  {error?.find(err => err.field === 'scheduledDate')?.message}
                </Input.ErrorMessage>
              </Input.Root>

              <Input.Root
                isError={
                  !!error?.find(err => err.field === 'address')?.message
                }>
                <Input.Label required>Ponto de Encontro</Input.Label>
                <Maps
                  onLocationChange={(latitude, longitude) =>
                    onChange('address', `${latitude}, ${longitude}`)
                  }
                />
                <Input.ErrorMessage>
                  {error?.find(err => err.field === 'address')?.message}
                </Input.ErrorMessage>
              </Input.Root>

              <Input.Root
                style={{gap: 14}}
                isError={
                  !!error?.find(err => err.field === 'private')?.message
                }>
                <Input.Label required>Visibilidade</Input.Label>
                <View style={styles.visibility}>
                  <Button.Root
                    type="ghost"
                    onPress={() => {
                      setIsPrivate(true);
                      onChange('private', true);
                    }}>
                    <Button.Label
                      style={[
                        styles.btnVisibility,
                        isPrivate === true && styles.isSelected,
                      ]}>
                      Privado
                    </Button.Label>
                  </Button.Root>

                  <Button.Root
                    type="ghost"
                    onPress={() => {
                      setIsPrivate(false);
                      onChange('private', false);
                    }}>
                    <Button.Label
                      style={[
                        styles.btnVisibility,
                        !isPrivate && styles.isSelected,
                      ]}>
                      {' '}
                      Público
                    </Button.Label>
                  </Button.Root>
                </View>
                <Input.ErrorMessage>
                  {error?.find(err => err.field === 'private')?.message}
                </Input.ErrorMessage>
              </Input.Root>

              <Input.Root
                isError={!!error?.find(err => err.field === 'typeId')?.message}>
                <ActivityTypeSection
                  type="selection"
                  typeSelected={data.typeId}
                  onChange={type => onChange('typeId', type)}
                />
                <Input.ErrorMessage>
                  {error?.find(err => err.field === 'typeId')?.message}
                </Input.ErrorMessage>
              </Input.Root>

              <Button.Root
                style={{height: 44, marginBottom: 50}}
                disabled={loading}
                onPress={async () => {
                  type === 'create'
                    ? await onSubmit()
                    : await onSubmitEdit(activity?.id || '', onClose, update!);
                }}>
                {loading ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <ActivityIndicator
                      size="large"
                      color={themes.colors.black}
                    />
                  </View>
                ) : (
                  <Button.Label>Criar Atividade</Button.Label>
                )}
              </Button.Root>
            </View>
          }
        />
      </View>
    </Modal>
  );
};

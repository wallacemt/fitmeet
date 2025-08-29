import {CaretLeft} from 'phosphor-react-native';
import {
  Dimensions,
  Image,
  Modal,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import {styles} from './styles';
import Title from '../../Title';
import {useState} from 'react';
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
import { imageUriCorrect } from '../../../utils/imageUriCorrect';

const defaultImage = require('../../../assets/images/image-edit.png');
interface CreateOrEditModalProps {
  visible: boolean;
  onClose: () => void;
  type: 'create' | 'edit';
}
export const  CreateOrEditModal = ({
  visible,
  onClose,
}: CreateOrEditModalProps) => {
  const [image, setImage] = useState<string>(defaultImage);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  const pickImage = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };
    const response = await launchImageLibrary(options);

    if (response.assets) {
      setImage(response.assets[0].uri!);
    }
  };

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
          <Title>Cadastrar Atividade</Title>
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
                    image && image != defaultImage ? {uri: imageUriCorrect(image)} : defaultImage
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
              <Input.Root>
                <Input.Label required>Título</Input.Label>
                <Input.Input placeholder="Ex.: Corrida" />
              </Input.Root>
              <Input.Root>
                <Input.Label required>Descrição</Input.Label>
                <Input.Input placeholder="Ex.: Corrida de 5km" />
              </Input.Root>
              <Input.Root>
                <Input.Label required>Data do Evento</Input.Label>
                <DatePicker
                  onChange={date => console.log(date.toISOString())}
                />
              </Input.Root>
              <Input.Root>
                <Input.Label required>Ponto de Encontro</Input.Label>
                <Maps
                  onLocationChange={(latitude, longitude) =>
                    console.log(latitude, longitude)
                  }
                />
              </Input.Root>
              <Input.Root style={{gap: 14}}>
                <Input.Label required>Visibilidade</Input.Label>
                <View style={styles.visibility}>
                  <Button.Root type="ghost" onPress={() => setIsPrivate(true)}>
                    <Button.Label
                      style={[
                        styles.btnVisibility,
                        isPrivate === true && styles.isSelected,
                      ]}>
                      Privado
                    </Button.Label>
                  </Button.Root>

                  <Button.Root type="ghost" onPress={() => setIsPrivate(false)}>
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
              </Input.Root>
              <Input.Root>
                <ActivityTypeSection type='selection' />
              </Input.Root>

              <Button.Root style={{marginBottom: 65, height: 50}}>
                <Button.Label>Salvar</Button.Label>
              </Button.Root>
            </View>
          }
        />
      </View>
    </Modal>
  );
};

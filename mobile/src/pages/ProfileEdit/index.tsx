import {
  ActivityIndicator,
  Image,
  Modal,
  TouchableOpacity,
  View,
} from 'react-native';
import Title from '../../components/Title';
import {useTypedNavigation} from '../../hooks/useTypedNavigation';
import {Camera, CaretLeft} from 'phosphor-react-native';
import {styles} from './styles';
import {UserImageIcon} from '../../components/UserImageIcon';
import useAppContext from '../../hooks/useAppContext';
import {Button} from '../../components/Button';
import {Input} from '../../components/Input';
import {ActivityTypeSection} from '../../components/ActivityTypeSection';
import {FlatList, Text} from 'react-native-gesture-handler';
import {useEffect, useState} from 'react';
import {CustomText} from '../../components/CustomText';

import {useUserEdit} from '../../hooks/useUserEdit';
import {themes} from '../../assets/themes';

export const ProfileEdit = () => {
  const {
    user,
    handleEdit,
    preferencias,
    loading,
    error,
    setError,
    setEmail,
    setName,
    setCpf,
    fetchPreferences,
    selectImage,
  } = useUserEdit();
  if (!user) return null;
  const [confirmeDesactivivate, setViewConfirmeDesactivivate] = useState(false);
  const navigation = useTypedNavigation();

  return (
    <>
      <FlatList
        data={[]}
        renderItem={() => <></>}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.back}>
                <CaretLeft size={34} weight="bold" />
              </TouchableOpacity>
              <Title>Atualizar Perfil</Title>
            </View>
            <View style={styles.form}>
              <View style={styles.imageContainer}>
                <Button.Root type="ghost" onPress={selectImage}>
                  <Button.Label style={styles.image}>
                    <UserImageIcon url={user.avatar} size={150} />
                    <Camera size={60} style={styles.camera} />
                  </Button.Label>
                </Button.Root>
              </View>
              <Input.Root>
                <Input.Label required>Nome Completo</Input.Label>
                <Input.Input
                  placeholder="Ex.: Joao Pessoa"
                  defaultValue={user.name}
                  onChangeText={text => {
                    setName(text);
                    setError.setNameError({isError: false});
                  }}
                />
                <Input.ErrorMessage
                  isError={error.nameError.isError}
                  style={{marginTop: 5}}>
                  {error.nameError.message || 'Preencha o campo com seu Nome!'}
                </Input.ErrorMessage>
              </Input.Root>
              <Input.Root>
                <Input.Label required>CPF</Input.Label>
                <Input.Input
                  placeholder="Ex.: Joao Pessoa"
                  editable={false}
                  defaultValue={user.cpf || ''}
                  onChangeText={text => {
                    setCpf(text);
                    setError.setCpfError({isError: false});
                  }}
                />
                <Input.ErrorMessage
                  isError={error.cpfError.isError}
                  style={{marginTop: 5}}>
                  {error.cpfError.message || 'Preencha o campo com seu CPF!'}
                </Input.ErrorMessage>
              </Input.Root>
              <Input.Root>
                <Input.Label required>E-mail</Input.Label>
                <Input.Input
                  placeholder="Ex.: Joao Pessoa"
                  defaultValue={user.email}
                  onChangeText={text => {
                    setEmail(text);
                    setError.setEmailError({isError: false});
                  }}
                />
                <Input.ErrorMessage
                  isError={error.emailError.isError}
                  style={{marginTop: 5}}>
                  {error.emailError.message ||
                    'Preencha o campo com seu E-mail!'}
                </Input.ErrorMessage>
              </Input.Root>

              <Input.Root>
                <Input.Label required>Senha</Input.Label>
                <Input.Input disable placeholder="********" />
              </Input.Root>

              <Input.Root>
                <ActivityTypeSection
                  title="Preferências"
                  type="default"
                  loading={loading}
                  userPreference={preferencias || undefined}
                  update={fetchPreferences}
                />
              </Input.Root>
            </View>

            <View style={styles.buttonContainer}>
              <Button.Root style={{height: 44}} disabled={loading} onPress={handleEdit}>
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
                  <Button.Label>Salvar</Button.Label>
                )}
              </Button.Root>

              <Button.Root
                type="ghost"
                onPress={() => {
                  setViewConfirmeDesactivivate(true);
                }}
                disabled={loading}
                >
                <Button.Label style={{fontWeight: 'bold'}}>
                  Desativar Conta
                </Button.Label>
              </Button.Root>
            </View>
          </View>
        }
      />
      {confirmeDesactivivate && (
        <Modal
          animationType="fade"
          visible={confirmeDesactivivate}
          statusBarTranslucent={true}
          onRequestClose={() => setViewConfirmeDesactivivate(false)}>
          <View style={styles.cancelContainer}>
            <Title>Tem certeza que deseja desativar sua conta?</Title>
            <CustomText>
              Ao desativar sua conta, todos os seus dados e histórico de
              atividades serão permanentemente removidos. {''}
              <Text style={{fontWeight: 'bold'}}>
                Esta ação é irreversível e não poderá ser desfeita.
              </Text>
            </CustomText>
            <View style={styles.cancelBtnContainer}>
              <Button.Root
                type="outiline"
                onPress={() => {
                  setViewConfirmeDesactivivate(false);
                }}
                style={{borderColor: '#000'}}>
                <Button.Label style={{color: '#000'}}>Cancelar</Button.Label>
              </Button.Root>

              <Button.Root
                type="desctructive"
                onPress={() => {
                  setViewConfirmeDesactivivate(false);
                }}>
                <Button.Label>Desativar</Button.Label>
              </Button.Root>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

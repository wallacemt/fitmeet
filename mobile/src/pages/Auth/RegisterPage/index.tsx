import {Text, View} from 'react-native';
import {KeyBoardAvContent} from '../../../components/KeyBoardAvContent';
import {styles} from './styles';
import {CaretLeft} from 'phosphor-react-native';
import {themes} from '../../../assets/themes';
import Title from '../../../components/Title';
import {CustomText} from '../../../components/CustomText';
import {Input} from '../../../components/Input';
import {Button} from '../../../components/Button';
import {TextLink} from '../../../components/TextLink';
import {useTypedNavigation} from '../../../hooks/useTypedNavigation';
import {useAuth} from '../../../hooks/useAuth';
import {useState} from 'react';

export const RegisterScreen = () => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [cpf, setCpf] = useState<string>();
  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState({isError: false, message: ""});
  const [cpfError, setCpfError] = useState({isError: false, message: ""});

  const navigation = useTypedNavigation();
  const {handleRegister} = useAuth();
  return (
    <KeyBoardAvContent>
      <View style={styles.container}>
        <Button.Root onPress={() => navigation.goBack()} type='ghost'>
          <CaretLeft size={32} color={themes.colors.black} weight="bold" />
        </Button.Root>
        <View style={styles.header}>
          <Title>Crie Sua Conta</Title>
          <CustomText>Por favor preencha os dados para prosseguir!</CustomText>
        </View>
        <View style={styles.form}>
          <Input.Root isError={nameError}>
            <Input.Label required>Nome Completo</Input.Label>
            <Input.Input
              placeholder="Ex.: Joao Pessoa"
              autoComplete="name"
              value={name}
              onChangeText={text => {
                setName(text);
                setNameError(false);
              }}
            />
            <Input.ErrorMessage style={{marginTop: 5}}>
              Preencha o campo com seu nome!
            </Input.ErrorMessage>
          </Input.Root>

          <Input.Root isError={cpfError.isError}>
            <Input.Label required>CPF</Input.Label>
            <Input.Input
              placeholder="Ex.: 111.111.111-11"
              keyboardType="numeric"
              value={cpf}
              onChangeText={text => {
                setCpf(text);
                setCpfError({isError: false, message: ""});
              }}
            />
            <Input.ErrorMessage style={{marginTop: 5}}>
              {cpfError.message || "Preencha o campo com seu CPF!"}
            </Input.ErrorMessage>
          </Input.Root>

          <Input.Root isError={emailError}>
            <Input.Label required>E-mail</Input.Label>
            <Input.Input
              placeholder="Ex.: nome@email.com"
              value={email}
              autoCapitalize="none"
              autoComplete="email"
              onChangeText={text => {
                setEmail(text);
                setEmailError(false);
              }}
            />
            <Input.ErrorMessage style={{marginTop: 5}}>
              Preencha o campo com seu E-Mail!
            </Input.ErrorMessage>
          </Input.Root>
          <Input.Root isError={passwordError.isError}>
            <Input.Label required>Senha</Input.Label>
            <Input.Input
              placeholder="********"
              autoCapitalize="none"
              autoComplete="off"
              secureTextEntry
              value={password}
              onChangeText={text => {
                setPassword(text);
                setPasswordError({isError: false, message: ""});
              }}
            />
            <Input.ErrorMessage style={{marginTop: 5}}>
             {passwordError.message || "Preencha o campo com sua senha!"}
            </Input.ErrorMessage>
          </Input.Root>

          <Button.Root
            style={styles.button}
            onPress={() =>
              handleRegister({
                email: email!,
                password: password!,
                name: name!,
                cpf: cpf!,
                setNameError: setNameError,
                setEmailError: setEmailError,
                setPasswordError: setPasswordError,
                setCpfError: setCpfError,
              })
            }>
            <Button.Label>Cadastrar</Button.Label>
          </Button.Root>
          <TextLink
            onPress={() => navigation.navigate('Login')}
            simpleText="Já possui uma conta?"
            boldText=" Login"
          />
        </View>
      </View>
    </KeyBoardAvContent>
  );
};

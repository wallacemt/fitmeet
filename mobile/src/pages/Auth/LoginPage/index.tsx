import {Image, View} from 'react-native';
import {styles} from './styles';
import {useState} from 'react';
import {KeyBoardAvContent} from '../../../components/KeyBoardAvContent';
import Title from '../../../components/Title';
import {CustomText} from '../../../components/CustomText';
import {Input} from '../../../components/Input';
import {Button} from '../../../components/Button';
import {TextLink} from '../../../components/TextLink';
import {useAuth} from '../../../hooks/useAuth';
import {useTypedNavigation} from '../../../hooks/useTypedNavigation';

const logo = require('../../../assets/images/logo.png');
export const LoginPage = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const {handleLogin} = useAuth();
  const navigation = useTypedNavigation();
  return (
    <KeyBoardAvContent>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.header}>
          <Title>Faça Login e comece a treinar</Title>
          <CustomText style={styles.subtitle}>
            Encontre parceiros para treinar ao ar livre. Conecte-se e comece
            agora! 💪
          </CustomText>
        </View>
        <View style={styles.form}>
          <Input.Root isError={emailError}>
            <Input.Label required>E-mail</Input.Label>
            <Input.Input
              placeholder="Ex.: nome@email.com"
              value={email}
              autoCapitalize="none"
              onChangeText={text => {
                setEmail(text);
                setEmailError(false);
              }}
            />
            <Input.ErrorMessage style={{marginTop: 5}}>
              Preencha o campo com seu e-mail!
            </Input.ErrorMessage>
          </Input.Root>
          <Input.Root isError={passwordError}>
            <Input.Label required>Senha</Input.Label>
            <Input.Input
              placeholder="********"
              autoCapitalize="none"
              autoComplete="off"
              secureTextEntry
              value={password}
              onChangeText={text => {
                setPassword(text);
                setPasswordError(false);
              }}
            />
            <Input.ErrorMessage style={{marginTop: 5}}>
              Preencha o campo a sua senha!
            </Input.ErrorMessage>
          </Input.Root>
          <Button.Root
            style={styles.button}
            onPress={() =>
              handleLogin({
                email: email!,
                password: password!,
                setEmailError,
                setPasswordError,
              })
            }>
            <Button.Label>Entrar</Button.Label>
          </Button.Root>
          <TextLink
            onPress={() => navigation.navigate('Register')}
            simpleText="Ainda não tem uma conta?"
            boldText=" Cadastre-se"
          />
        </View>
      </View>
    </KeyBoardAvContent>
  );
};

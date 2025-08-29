import {Image, TouchableOpacity, View} from 'react-native';
import {UserType} from '../../types/UserTypes';
import {Text} from 'react-native-gesture-handler';
import {styles} from './styles';
import {UserImageIcon} from '../UserImageIcon';
import {
  ArrowsClockwise,
  CaretLeft,
  NotePencil,
  SignOut,
  Star,
} from 'phosphor-react-native';
import {useTypedNavigation} from '../../hooks/useTypedNavigation';
import useAppContext from '../../hooks/useAppContext';

interface UserHeaderProps {
  user: UserType;
  type?: 'home' | 'profile';
  nav?: any;
}

const HomeHeader = ({user, nav}: UserHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <View style={styles.col}>
        <Text style={styles.subtitle}>Olá, Seja Bem Vindo(a)</Text>
        <Text style={[styles.subtitle, {fontSize: 30}]}>
          {user.name.split(' ').slice(0, 1).join(' ')}
        </Text>
      </View>
      <View style={styles.row}>
        <View style={styles.level}>
          <Star size={16} weight="fill" color="#FFD42A" />
          <Text style={styles.levelText}>{user.level}</Text>
        </View>
        <TouchableOpacity onPress={() => nav.navigate('User')}>
          <UserImageIcon url={user.avatar} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ProfileHeader = ({user, nav}: UserHeaderProps) => {
  const {
    auth: {logout},
    load
  } = useAppContext();

  const handleLogout = () => {
    logout();
    return nav.navigate('Home');
  };
  return (
    <View
      style={[styles.container, {height: 276, justifyContent: 'flex-start'}]}>
      <View style={styles.rowProfile}>
        <TouchableOpacity onPress={() => nav.goBack()}>
          <CaretLeft size={24} weight="bold" />
        </TouchableOpacity>
        <Text style={[styles.title, {marginLeft: 80}]}>PERFIL</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 14}}>
          <TouchableOpacity onPress={load}>
            <ArrowsClockwise size={24} weight="bold" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => nav.navigate('UserEdit')}>
            <NotePencil size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLogout()}>
            <SignOut size={32} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.colProfile}>
        <UserImageIcon url={user.avatar} size={104} />
        <Text style={[styles.title, {fontSize: 28, lineHeight: 32}]}>
          {user.name}
        </Text>
      </View>
    </View>
  );
};

export const UserHeader = ({user, type = 'home'}: UserHeaderProps) => {
  const navigation = useTypedNavigation();
  return type === 'home' ? (
    <HomeHeader user={user} nav={navigation} />
  ) : (
    <ProfileHeader user={user} nav={navigation} />
  );
};

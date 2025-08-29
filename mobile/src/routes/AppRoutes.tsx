import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ActivityIndicator, View} from 'react-native';
import {themes} from '../assets/themes';
import {AuthStack} from './AuthStack';
import {MainStack} from './MainStack';
import useAppContext from '../hooks/useAppContext';
import {ActivityResponse} from '../types/ActivityData';

export type MainStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
  User: undefined;
  UserEdit: undefined;
  ActivityType: {type: string};
  Activity: {activity: ActivityResponse} | {activity: undefined};
};

export default function AppRoutes() {
  const [isLoading, setIsLoading] = useState(true);

  const {
    auth: {isAuthenticate},
  } = useAppContext();

  useEffect(() => {
    if (isAuthenticate !== null) setIsLoading(false);
  }, [isAuthenticate]);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={themes.colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticate ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginPage} from '../pages/Auth/LoginPage';
import {RegisterScreen} from '../pages/Auth/RegisterPage';

const Stack = createStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '../pages/Home';
import {Profile} from '../pages/Profile';
import {ActivityByType} from '../pages/ActivityByType';
import {ProfileEdit} from '../pages/ProfileEdit';
import {Activity} from '../pages/Activity';

const Stack = createStackNavigator();

export function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="User" component={Profile} />
      <Stack.Screen name="UserEdit" component={ProfileEdit} />
      <Stack.Screen name="ActivityType" component={ActivityByType} />
      <Stack.Screen name="Activity" component={Activity} />
    </Stack.Navigator>
  );
}

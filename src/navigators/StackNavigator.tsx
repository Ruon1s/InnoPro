import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';
import InitialLoading from '../screens/InitialLoading';
import PermissionsScreen from '../screens/PermissionsScreen';

export type StackParamList = {
  Initial: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Permissions: undefined;
  Main: undefined;
}

const Stack = createStackNavigator<StackParamList>();

const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Initial" component={InitialLoading} options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" component={SignIn} options={{ title: 'Sign In' }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Sign Up' }} />
      <Stack.Screen name="Permissions" component={PermissionsScreen} />
      <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
import React, {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from '../components/BottomTabNavigator';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createStackNavigator();

const AppRoutes: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};

export default AppRoutes;

import React, {FC} from 'react';
import FastImage from 'react-native-fast-image';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigationState} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import CurrentWeatherScreen from '../screens/CurrentWeatherScreen';
import ForecastScreen from '../screens/ForecastScreen';
import CustomHeader from './CustomHeader';
import CurrentWeatherGif from '../assets/currentWeather.gif';
import LoginGif from '../assets/login.gif';
import LogoutGif from '../assets/logout.gif';
import ForecastGif from '../assets/forecast.gif';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (
  routeName: string,
  focused: boolean,
  size: number,
): React.ReactNode => {
  let iconSource: any;

  if (routeName === 'Login' || routeName === 'SignUp') {
    iconSource = LoginGif;
  } else if (routeName === 'Current Weather') {
    iconSource = CurrentWeatherGif;
  } else if (routeName === 'Forecast') {
    iconSource = ForecastGif;
  } else {
    iconSource = LogoutGif;
  }

  return (
    <FastImage
      resizeMode="contain"
      source={iconSource}
      style={{width: size, height: size}}
    />
  );
};

const BottomTabNavigator: FC = () => {
  const state = useNavigationState(state => state);
  const userEmail = useSelector(state => state.userModule.userEmail);
  const currentRouteName = state.routes[state.index].name;
  const isSignUpScreen = currentRouteName === 'SignUp';

  return (
    <Tab.Navigator>
      {!userEmail ? (
        isSignUpScreen ? (
          <Tab.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              title: 'SignUp',
              tabBarIcon: ({focused, size}) =>
                getTabBarIcon('Login', focused, size),
            }}
          />
        ) : (
          <Tab.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: 'Login',
              tabBarIcon: ({focused, size}) =>
                getTabBarIcon('Login', focused, size),
            }}
          />
        )
      ) : (
        <Tab.Screen
          name="Logout"
          component={LoginScreen}
          options={{
            title: 'Logout',
            tabBarIcon: ({focused, size}) =>
              getTabBarIcon('Logout', focused, size),
          }}
        />
      )}
      <Tab.Screen
        name="Current Weather"
        component={CurrentWeatherScreen}
        options={({route}) => ({
          header: () => <CustomHeader title="Current Weather" route={route} />,
          tabBarIcon: ({focused, size}) =>
            getTabBarIcon('Current Weather', focused, size),
        })}
      />
      <Tab.Screen
        name="Forecast"
        component={ForecastScreen}
        options={({route}) => ({
          header: () => <CustomHeader title="Forecast" route={route} />,
          tabBarIcon: ({focused, size}) =>
            getTabBarIcon('Forecast', focused, size),
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

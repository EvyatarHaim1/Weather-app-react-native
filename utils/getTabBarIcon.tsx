import React from 'react';
import FastImage from 'react-native-fast-image';
import CurrentWeatherGif from '../assets/currentWeather.gif';
import LoginGif from '../assets/login.gif';
import LogoutGif from '../assets/logout.gif';
import ForecastGif from '../assets/forecast.gif';

const iconMap = {
  Login: LoginGif,
  SignUp: LoginGif,
  'Current Weather': CurrentWeatherGif,
  Forecast: ForecastGif,
  Logout: LogoutGif,
};

export const getTabBarIcon = (routeName: string, size: number) => (
  <FastImage
    resizeMode="contain"
    source={iconMap[routeName] || LogoutGif}
    style={{width: size, height: size}}
  />
);

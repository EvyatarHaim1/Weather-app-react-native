import React, {FC, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {get_city_weather, get_fiveDays_forecast} from './store/actions/weather';
import {getUserLocation} from './utils/locationPermissions';
import {FirebaseAuthProvider} from './services/auth/FirebaseAuthProvider';
import {useAuth} from './components/auth/useAuth';
import AppRoutes from './routes/AppRoutes';

const App: FC = () => {
  useAuth(FirebaseAuthProvider);
  const city = useSelector(state => state.weatherModule.city);
  const cityId = useSelector(state => state.weatherModule.cityId);

  useEffect(() => {
    get_city_weather(city);
    get_fiveDays_forecast(cityId);
    getUserLocation();
  }, [city, cityId]);

  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
};

export default App;

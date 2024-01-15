//
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {setUser} from './store/actions/user';
import BottomTabNavigator from './components/BottomTabNavigator';
import SignUpScreen from './screens/SignUpScreen';
import {useSelector} from 'react-redux';
import {
  get_city_weather,
  get_fiveDays_forecast,
  get_user_location,
} from './store/actions/weather';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const Stack = createStackNavigator();

const App: React.FC = () => {
  const city = useSelector(state => state.weatherModule.city);
  const cityId = useSelector(state => state.weatherModule.cityId);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        setUser(firebaseUser?.email as string);
      } else {
        setUser('');
      }
    });

    get_city_weather(city);
    get_fiveDays_forecast(cityId);
    //get user location

    const getUserLocation = async () => {
      let status = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (status === RESULTS.GRANTED) {
        console.log('Location permission is granted');
        Geolocation.getCurrentPosition(
          position => {
            const lat = position?.coords?.latitude;
            const long = position?.coords?.longitude;
            get_user_location(lat, long);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
        // proceed with your location-based functionality
      } else if (status === RESULTS.DENIED) {
        const newStatus = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        if (newStatus === RESULTS.GRANTED) {
          console.log('Location permission granted after request');

          //
        } else {
          console.log('Location permission denied');
          // handle the case where permission is denied
        }
      } else if (status === RESULTS.BLOCKED) {
        console.log('Location permission blocked');
        // inform the user that they need to enable the permission from settings
      }
    };
    getUserLocation();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{headerShown: false}} // Hide the header for Home
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{headerShown: true}} // Show the header for SignUp
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

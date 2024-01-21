import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import {get_user_location} from '../store/actions/weather';

export const checkLocationPermission = async () => {
  let status = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

  if (status === RESULTS.GRANTED) {
    console.log('Location permission is granted');
    // proceed with your location-based functionality
  } else if (status === RESULTS.DENIED) {
    const newStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (newStatus === RESULTS.GRANTED) {
      console.log('Location permission granted after request');
      // proceed with your location-based functionality
    } else {
      console.log('Location permission denied');
      // handle the case where permission is denied
    }
  } else if (status === RESULTS.BLOCKED) {
    console.log('Location permission blocked');
    // inform the user that they need to enable the permission from settings
  }
};

export const getUserLocation = async () => {
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
    const newStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
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

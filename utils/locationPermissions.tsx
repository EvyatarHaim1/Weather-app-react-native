import {PermissionsAndroid} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

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

import {initializeApp} from 'firebase/app';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAt_lbRBK9HIzYBvaMGiiJDGqODBVIbVI0',
  authDomain: 'evyatar-weatherapp-reactnative.firebaseapp.com',
  projectId: 'evyatar-weatherapp-reactnative',
  storageBucket: 'evyatar-weatherapp-reactnative.appspot.com',
  messagingSenderId: '234076008858',
  appId: '1:234076008858:web:e0615c38f92b587f8eca23',
  measurementId: 'G-HMS23X34GN',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export {app, auth};

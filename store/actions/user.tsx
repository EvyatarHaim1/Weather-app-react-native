import {Alert} from 'react-native';
import {SET_USER, SET_USER_LOCATION} from '../reducers/user';
import AuthService from '../../services/auth/authService';
import store from '../store';

export const setUser = (userEmail: string | null) => {
  store.dispatch({
    type: SET_USER,
    payload: userEmail,
  });
};

export const setUserLocation = (userLocation: any) => {
  store.dispatch({
    type: SET_USER_LOCATION,
    payload: userLocation,
  });
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await AuthService.signInWithEmail(email, password);
    setUser(userCredential.user.email);
  } catch (error: any) {
    Alert.alert('Login failed', error.message);
  }
};

export const signInWithGoogle = async () => {
  try {
    const userCredential = await AuthService.signInWithGoogle();
    setUser(userCredential.user.email);
  } catch (error: any) {
    Alert.alert('Login failed', error.message);
  }
};

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await AuthService.signUpWithEmail(email, password);
    setUser(userCredential.user.email); // Assuming the user's email is part of the userCredential object
  } catch (error: any) {
    Alert.alert('Signup failed', error.message);
  }
};

export const sendSignInLink = async (email: string) => {
  try {
    await AuthService.sendSignInLinkToEmail(email);
    Alert.alert(
      'Check your email',
      'A sign-in link has been sent to your email.',
    );
  } catch (error: any) {
    Alert.alert('Failed to send sign-in link', error.message);
  }
};

export const signOut = async () => {
  try {
    await AuthService.signOut();
    setUser(null);
  } catch (error: any) {
    Alert.alert('Logout failed', error.message);
  }
};

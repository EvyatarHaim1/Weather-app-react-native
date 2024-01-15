import {SET_USER, SET_USER_LOCATION} from '../reducers/user';
import store from '../store';

export const setUser = (userEmail: string) => {
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

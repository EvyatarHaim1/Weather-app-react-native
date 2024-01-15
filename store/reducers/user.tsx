export const SET_USER = 'SET_USER';
export const SET_USER_LOCATION = 'SET_USER_LOCATION';

interface UserState {
  userEmail: string;
  userLocation: any;
}

const initialState: UserState = {
  userEmail: '',
};

const userReducer = (
  state: UserState = initialState,
  action: any,
): UserState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userEmail: action.payload,
      };
    case SET_USER_LOCATION:
      return {
        ...state,
        userLocation: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;

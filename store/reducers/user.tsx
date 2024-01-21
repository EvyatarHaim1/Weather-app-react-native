export const SET_USER = 'SET_USER';
export const SET_USER_LOCATION = 'SET_USER_LOCATION';

// Define the shape of your user state
interface UserState {
  userEmail: string | null; // userEmail can be null when the user is not signed in
  userLocation: any; // Consider specifying a more precise type for userLocation
}

// Define the shape of actions that this reducer will handle
interface UserAction {
  type: string;
  payload: any;
}

// Define the initial state with TypeScript
const initialState: UserState = {
  userEmail: null,
  userLocation: null,
};

// Update the reducer function with TypeScript types
const userReducer = (
  state: UserState = initialState,
  action: UserAction,
): UserState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userEmail: action.payload, // action.payload can be a string or null
      };
    case SET_USER_LOCATION:
      // Ensure that the payload for SET_USER_LOCATION matches the expected type for userLocation
      return {
        ...state,
        userLocation: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;

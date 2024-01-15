import {createStore, combineReducers} from 'redux';
import weatherReducer from './reducers/weather';
import userReducer from './reducers/user'; // Correct import for userReducer

const rootReducer = combineReducers({
  weatherModule: weatherReducer,
  userModule: userReducer, // Correctly reference userReducer here
});

// Create the Redux store with the root reducer
const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export default store;

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App'; // Import your main App component
import {Provider} from 'react-redux';
import store from './store/store'; // Import your Redux store
import {name as appName} from './app.json';

const Root = () => {
return(
  <Provider store={store}>
    <App />
  </Provider>
)
};

AppRegistry.registerComponent(appName, () => Root);


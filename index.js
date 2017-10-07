import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import reducers from './reducers';
import thunk from 'redux-thunk';
import App from './App.js';

const store = createStore(reducers, applyMiddleware(thunk));

const ReduxApp = ()=>(
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent('FirebaseForm', () => ReduxApp);

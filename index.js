import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import indexReducer from './indexReducers';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const store = createStore(indexReducer, applyMiddleware(thunk));

// Create class to wrap app within redux store Provider component
class MyApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

// To demo app without warnings
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => MyApp);

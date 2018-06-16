import React, { Component } from 'react';
import AppRoot from './containers/AppRoot';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import ReduxPromise from 'redux-promise';
import { createStore, applyMiddleware, compose } from 'redux';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Signup from "./containers/Signup";
import Login from "./containers/Login";

const store = createStore(rootReducer, applyMiddleware(ReduxPromise));


export default class App extends Component {
  render() {
        return (
    
    <Provider store={store}>
    <Router>
      <Scene key="root">
        <Scene key="login"
          component={Login}
          title="Login"
          initial
          hideNavBar
        />
        <Scene
          key="signup"
          component={Signup}
          title="Signup"
          hideNavBar    
        />
      </Scene>
      </Router>
      </Provider>
    
  );
  }
}





// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });

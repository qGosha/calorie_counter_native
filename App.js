import React, { Component } from 'react';
import AppRoot from './containers/AppRoot';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import ReduxPromise from 'redux-promise';
import { createStore, applyMiddleware, compose } from 'redux';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Scene, Lightbox, Modal } from 'react-native-router-flux';
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Dashboard from "./containers/Dashboard";
import ConfirmWindow from "./containers/ConfirmWindow";

const store = createStore(rootReducer, applyMiddleware(ReduxPromise));

export default class App extends Component {
  render() {
        return (

    <Provider store={store}>
      <Router>
        <Lightbox>
          <Scene key="root">
            <Scene key="login"
              component={Login}
              title="Login"
              initial
              navigationBarStyle={styles.nav}
              navBarButtonColor='#fff'
            />
            <Scene
              key="signup"
              component={Signup}
              title="Signup"
              navigationBarStyle={styles.nav}
              navBarButtonColor='#fff'
            />
            <Scene key="dashboard"
              component={Dashboard}
              title="Dashboard"
              navigationBarStyle={styles.nav}
              navBarButtonColor='red'
              // hideNavBar
            />
            </Scene>
            <Scene key="error" component={ConfirmWindow} hideNavBar />
          </Lightbox>
        </Router>
      </Provider>

  );
  }
}





const styles = StyleSheet.create({
  nav: {
    backgroundColor: '#3498db',
    borderBottomWidth: 0
  },
});

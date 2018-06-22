import React, { Component } from 'react';
import { Router, Scene, Lightbox, Modal } from 'react-native-router-flux';
import { Actions } from 'react-native-router-flux';
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ConfirmWindow from "./ConfirmWindow";
import { connect } from "react-redux";
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import {
  signInUserSuccess,
} from "../actions/index";

const RouterComponent = props => {
 const value = props.value;
 if(value) {
    props.processSignIn(value);
 }
  return (
    <Router>
        <Lightbox>
          <Scene key="root">
            <Scene key="login"
              component={Login}
              title="Login"
              initial={!value}
              init={true}
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
              initial={!!value}
              // navigationBarStyle={styles.nav}
              // navBarButtonColor='red'
              hideNavBar
            />
            </Scene>
            <Scene key="error" component={ConfirmWindow} hideNavBar />
          </Lightbox>
        </Router>
        )
}

const mapDispatchToProps = dispatch => {
  return {
    processSignIn: (data) => dispatch(signInUserSuccess(data)),
  };
};

// const mapStateToProps = state => ({
//   reduxJwt: state.auth.jwt
// });

export default connect(null, mapDispatchToProps)(RouterComponent)

const styles = StyleSheet.create({
  nav: {
    backgroundColor: '#3498db',
    borderBottomWidth: 0
  },
});

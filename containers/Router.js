import React, { Component } from 'react';
// import { Router, Scene, Lightbox, Modal, Drawer, Stack, Tabs } from 'react-native-router-flux';
import { Actions } from 'react-native-router-flux';
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ConfirmWindow from "./ConfirmWindow";
import { connect } from "react-redux";
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import DrawerContent from './DrawerContent';
import {
  signInUserSuccess,
} from "../actions/index";
import { createStackNavigator } from 'react-navigation';




const RouterComponent = props => {
 const value = props.value;
 if(value) {
    props.processSignIn(value);
 }
 const RootStack = createStackNavigator(
   {
     LoginScreen: Login,
     SignupScreen: Signup,
     DashScreen: Dashboard
   },
   {
     initialRouteName: props.value ? 'DashScreen' : 'LoginScreen',
   }
 );
  return (
   <RootStack/>
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
  tabBarStyle: {
  backgroundColor: '#eee',
},
});



// const RouterComponent = props => {
//  const value = props.value;
//  if(value) {
//     props.processSignIn(value);
//  }
//   return (
//     <Router>
//         <Lightbox>
//           <Scene key="root">
//             <Scene key="login"
//               component={Login}
//               title="Login"
//               initial={!value}
//               init={true}
//               navigationBarStyle={styles.nav}
//               navBarButtonColor='#fff'
//             />
//             <Scene
//               key="signup"
//               component={Signup}
//               title="Signup"
//               navigationBarStyle={styles.nav}
//               navBarButtonColor='#fff'
//             />
//             <Scene key="dashboard"
//               component={Dashboard}
//               title="Dashboard"
//               initial={!!value}
//               // navigationBarStyle={styles.nav}
//               // navBarButtonColor='red'
//               hideNavBar
//             />
//             </Scene>
//
//             <Scene key="error" component={ConfirmWindow} hideNavBar />
//
//             <Drawer
//               key="drawer"
//               contentComponent={DrawerContent}
//               drawerWidth={300}
//               open={false}
//             >
//             <Scene key="root">
//
//               <Scene
//                 key="tab_2_1"
//                 component={Dashboard}
//                 title="Tab #2_1"
//                 renderRightButton={() => <Text>Right</Text>}
//               />
//               <Scene
//                 key="tab_2_2"
//                 component={Signup}
//                 title="Tab #2_2"
//                 onBack={() => alert('onBack button!')}
//                 backTitle="Back!"
//                 panHandlers={null}
//               />
//               </Scene>
//             </Drawer>
//           </Lightbox>
//         </Router>
//         )
// }
//
// const mapDispatchToProps = dispatch => {
//   return {
//     processSignIn: (data) => dispatch(signInUserSuccess(data)),
//   };
// };
//
// // const mapStateToProps = state => ({
// //   reduxJwt: state.auth.jwt
// // });
//
// export default connect(null, mapDispatchToProps)(RouterComponent)
//
// const styles = StyleSheet.create({
//   nav: {
//     backgroundColor: '#3498db',
//     borderBottomWidth: 0
//   },
//   tabBarStyle: {
//   backgroundColor: '#eee',
// },
// });

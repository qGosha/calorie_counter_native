import React, { Component } from 'react';
import { Router, Scene, Lightbox, Modal, Drawer, Stack, Tabs, ActionConst, Overlay } from 'react-native-router-flux';
import { Actions } from 'react-native-router-flux';
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import SearchBar from "./SearchBar";
import ConfirmWindow from "./ConfirmWindow";
import { connect } from "react-redux";
import { StyleSheet, View, AsyncStorage } from 'react-native';
import DrawerContent from './DrawerContent';
import { Container, Header, Item, Input, Icon, Button, Text, Content } from 'native-base';
import {
  signInUserSuccess,
} from "../actions/index";


const CustomNav = () => {
  return(
    <Container style={{flexDirection: 'row'}}>
      <Icon type="FontAwesome" name="bars" style={{color: 'blue'}}/>
      <Content>
        <Header searchBar rounded>
          <Item>
            <Icon type="FontAwesome" name="search" />
            <Input placeholder="Search food" />
            <Icon type="MaterialCommunityIcons" name="food" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
      </Content>
    </Container>
  )
}


const RouterComponent = props => {
 const value = props.value;
 if(value) {
    props.processSignIn(value);
 }
 const drawIcon = <Icon type="FontAwesome" name="bars" style={{color: 'blue'}}/>
 return (
        <Router>
           <Scene key="lightbox" lightbox>
             <Scene key="drawer"
             drawer
             drawerWidth={200}
             gesturesEnabled={false}
             contentComponent={DrawerContent}
             drawerIcon={drawIcon}
             >
                 <Scene key="root"
                 hideNavBar
                 hideTabBar
                 drawerLockMode='locked-closed'
                 panHandlers
                 hideDrawerButton>
                   <Scene key="login"
                     component={Login}
                     initial={!value}/>
                   <Scene
                     key="signup"
                     back
                     component={Signup}
                     title="Signup"
                     hideNavBar={false}
                     navigationBarStyle={styles.nav}
                     navBarButtonColor='#fff'/>
                   </Scene>
                   <Scene
                     key="searchbar"
                     back
                     drawerLockMode='locked-closed'
                     component={SearchBar}
                     title="Search"
           
                     navigationBarStyle={styles.nav}
                     navBarButtonColor='#fff'/>

                  <Scene
                     key="dashboard"
                     component={Dashboard}
                     title="Dashboard"
                     initial={!!value} />

             </Scene>
             <Scene key="error" component={ConfirmWindow} hideNavBar />
           </Scene>
         </Router>

 )
//   return (
//     <Router>
//     <Overlay>
//         <Lightbox>
//             <Scene key="login"
//               component={Login}
//               title="Login"
//               initial={!value}
//               init={true}
//               hideNavBar
//             />
//             <Scene
//               key="signup"
//               component={Signup}
//               title="Signup"
//               navigationBarStyle={styles.nav}
//               navBarButtonColor='#fff'
//             />
//             <Scene key="drawer"
//               drawer
//
//               key="drawer"
//               contentComponent={DrawerContent}
//               drawerWidth={300}
//               open={false}
//               initial={!!value}
//             >
//             <Scene key="root">
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
//
//             </Scene>
//
//
// <Scene key="error" component={ConfirmWindow} hideNavBar />
//           </Lightbox>
//           </Overlay>
//         </Router>
//         )
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

import React, { Component } from 'react';
import {
  Router,
  Scene,
  Reducer,
  Lightbox,
  Modal,
  Drawer,
  Stack,
  Tabs,
  ActionConst,
  Overlay,
} from 'react-native-router-flux';
import { Actions } from 'react-native-router-flux';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import DetailedNutr from './DetailedNutr';
import Basket from './Basket';
import SearchBar from './SearchBar';
import IntakeLog from './IntakeLog';
import DatePicker from './DatePicker';
import { ConfirmWindow } from '../components/confirmWindow';
import CalorieLimit from './CalorieLimit';
import { DetailedPeriod } from '../components/detailedPeriod';
import { connect } from 'react-redux';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import DrawerContent from './DrawerContent';
import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Text,
  Content,
} from 'native-base';
import { signInUserSuccess } from '../actions/index';

const CustomNav = () => {
  return (
    <Container style={{ flexDirection: 'row' }}>
      <Icon type="FontAwesome" name="bars" style={{ color: 'blue' }} />
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
  );
};

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

const RouterComponent = props => {
  const value = props.value;
  if (value) {
    props.processSignIn(value);
  }
  const drawIcon = (
    <Icon type="FontAwesome" name="bars" style={{ color: 'blue' }} />
  );
  return (
    <Router createReducer={reducerCreate}>
      <Scene key="lightbox" lightbox>
        <Scene
          key="drawer"
          drawer
          drawerWidth={200}
          gesturesEnabled={false}
          contentComponent={DrawerContent}
          drawerIcon={drawIcon}>
          <Scene key='root'>
              <Scene
              key="login"
              hideNavBar
              hideTabBar
              drawerLockMode="locked-closed"
              panHandlers
              hideDrawerButton
              component={Login}
              initial={!value}
              />
              <Scene
                drawerLockMode="locked-closed"
                panHandlers
                hideDrawerButton
                key="signup"
                back
                component={Signup}
                title="Signup"
                navigationBarStyle={styles.nav}
                navBarButtonColor="#fff"
              />
            <Scene
              key="dashboard"
              component={Dashboard}
              title="Dashboard"
              type='reset'
              initial={!!value}
            />
            <Scene
              hideTabBar={false}
              key="datePicker"
              component={DatePicker}
              title='Calendar'
            />
            <Scene
              hideTabBar={false}
              key="settings"
              component={CalorieLimit}
              title='Settings'
            />
            <Scene
              hideDrawerButton
              hideTabBar
              panHandlers
              back
              key="searchbar"
              drawerLockMode="locked-closed"
              component={SearchBar}
              title="Search"
              navigationBarStyle={styles.nav}
              navBarButtonColor="#fff"
            />
            <Scene
              hideDrawerButton
              hideTabBar
              panHandlers
              back
              onBack={() => Actions.popTo('dashboard')}
              key="basket"
              drawerLockMode="locked-closed"
              component={Basket}
              title="Basket"
              navigationBarStyle={styles.nav}
              navBarButtonColor="#fff"
            />
            <Scene
              hideDrawerButton
              hideTabBar
              panHandlers
              back
              key="detailedNutr"
              drawerLockMode="locked-closed"
              component={DetailedNutr}
              title="Detailed Nutrition"
              navigationBarStyle={styles.nav}
              navBarButtonColor="#fff"
            />
            <Scene
              hideDrawerButton
              hideTabBar
              panHandlers
              back
              key="intakeLog"
              drawerLockMode="locked-closed"
              component={IntakeLog}
              title="Intake Log"
              navigationBarStyle={styles.nav}
              navBarButtonColor="#fff"
            />
            <Scene
              hideDrawerButton
              hideTabBar
              panHandlers
              back
              key="detailedPeriod"
              drawerLockMode="locked-closed"
              component={DetailedPeriod}
              navigationBarStyle={styles.nav}
              navBarButtonColor="#fff"
            />
            </Scene>
           </Scene>
        <Scene key="error" component={ConfirmWindow} hideNavBar />
      </Scene>
    </Router>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    processSignIn: data => dispatch(signInUserSuccess(data)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(RouterComponent);

const styles = StyleSheet.create({
  nav: {
    backgroundColor: '#3498db',
    borderBottomWidth: 0,
  },
});

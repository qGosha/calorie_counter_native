import React from "react";
import {Keyboard} from 'react-native'
// import { BASKET } from '../containers/Modal';
// import { TouchableWithoutFeedback, ScrollView, StyleSheet, View, TextInput, KeyboardAvoidingView, Keyboard,AsyncStorage } from 'react-native';
// import { CalorieLimit } from '../components/calorieLimit';
// import SearchBar from '../containers/search-bar';
// import DatePicker from '../containers/DatePicker';
// import FoodLog from '../containers/FoodLog';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Item, Input, Icon, Button, Text, Content } from 'native-base';

export const DashboardPanel = ({
  onSignOut,
  userInfo,
  showBasketModal,
  dailyCalChange,
  calLimitError,
  dailyCalUpSuccess,
  basket}) => {
    return(

      <Container>
      <Header style={{
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
          <Button iconLeft light block onPress={() => Actions.searchbar()}>
            <Icon type="FontAwesome" name="search"  />
            <Text>Search food</Text>
          </Button>
            <Icon type="FontAwesome" name="shopping-basket"/>
      </Header>

    </Container>


      )
}

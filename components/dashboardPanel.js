import React from "react";

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
      <Content>
      <Header searchBar rounded>
        <Item>
          <Icon type="FontAwesome" name="search" />
          <Input placeholder="Search food" />
          <Icon type="MaterialCommunityIcons" name="food" />
        </Item>
        <Button transparent onPress={() => Actions.drawerOpen()}>
          <Text>Search</Text>
        </Button>
      </Header>
      </Content>
    </Container>


      )
}

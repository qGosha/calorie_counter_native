import React from 'react';
// import { TouchableWithoutFeedback, ScrollView, StyleSheet, View, TextInput, KeyboardAvoidingView, Keyboard,AsyncStorage } from 'react-native';
// import { CalorieLimit } from '../components/calorieLimit';
// import DatePicker from '../containers/DatePicker';
import FoodLog from '../containers/FoodLog';
import { MenuHeader } from './menuHeader';
import { Actions } from 'react-native-router-flux';
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

export const DashboardPanel = ({
  userInfo,
  showBasketModal,
  dailyCalChange,
  calLimitError,
  dailyCalUpSuccess,
  basket,
}) => {
  return (
    <Container>
      <MenuHeader />
      <Content>
      <FoodLog />
      </Content>
    </Container>
  );
};

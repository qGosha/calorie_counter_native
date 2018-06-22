import React from "react";

// import { BASKET } from '../containers/Modal';
import { TouchableWithoutFeedback, ScrollView, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Keyboard,AsyncStorage } from 'react-native';
// import { CalorieLimit } from '../components/calorieLimit';
// import SearchBar from '../containers/search-bar';
// import DatePicker from '../containers/DatePicker';
// import FoodLog from '../containers/FoodLog';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';


export const DashboardPanel = ({
  onSignOut,
  userInfo,
  showBasketModal,
  dailyCalChange,
  calLimitError,
  dailyCalUpSuccess,
  basket}) => {
    return(
      <View>
      <Text>This is your Dashboard</Text>
      <Icon name="sign-out" size={40} color="#900"
      onPress={() => {
        onSignOut();
        Actions.refresh();
      }}/>
      </View>
      )
}

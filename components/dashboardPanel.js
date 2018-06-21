import React from "react";

// import { BASKET } from '../containers/Modal';
import { TouchableWithoutFeedback, ScrollView, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Keyboard,AsyncStorage } from 'react-native';
// import { CalorieLimit } from '../components/calorieLimit';
// import SearchBar from '../containers/search-bar';
// import DatePicker from '../containers/DatePicker';
// import FoodLog from '../containers/FoodLog';
import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = (<Icon name="rocket" size={30} color="#900" />)


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
      <Icon name="rocket" size={30} color="#900" />
      </View>
      )
}

import React from "react";
import { FoodListItem } from '../components/foodListItem';
import { totalNutrients, total, totalNutrElem, getFullNutrition, round } from '../helpers/help_functions';
import {
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  AsyncStorage,
  Image,
  TouchableOpacity,
  ListView,
} from 'react-native';
import {
  List,
  Container,
  ListItem,
  Text,
  Separator,
  Button,
  Content,
  View,
  SwipeRow,
  Icon,
  Right,
  Tab,
  Thumbnail,
  Left,
  Body,
  Tabs,
  Input,
  Picker,
  Item,
} from 'native-base';

export const LogFoodPanel = ({ foods }) => {

  const totalPeriodNutr = (period) => {
    if(!period || !period.length) return false;
    return {
      full_nutrients: totalNutrients(period)
    }
  }
  const intake = (arr, term, time1, time2) => {
    return foods.filter( (item,i) => {
      const consumed = new Date(item.consumed_at).getHours();
      let condition;
      switch(term) {
        case 'snacks':
          condition = ((consumed >= 21 && consumed < 23) || (consumed >= 0 && consumed < 6))
          break;
        default:
          condition = (consumed >= time1 && consumed < time2);
      }
      if (condition) return item;
    })
  }


  const breakfast = intake(foods, 'breakfast', 6, 12);
  const lunch = intake(foods, 'lunch', 12, 17);
  const dinner = intake(foods, 'dinner', 17, 21);
  const snacks = intake(foods, 'snacks');

  const breakfastCal = totalNutrElem(208, breakfast);
  const lunchCal = totalNutrElem(208, lunch);
  const dinnerCal = totalNutrElem(208, dinner);
  const snacksCal = totalNutrElem(208, snacks);


  const totalIntake = {
    Breakfast: totalPeriodNutr(breakfast),
    Lunch: totalPeriodNutr(lunch),
    Dinner: totalPeriodNutr(dinner),
    Snacks: totalPeriodNutr(snacks)
  }

  const headStyle = {
    padding:'10px 8px',
    textTransform: 'uppercase',
    color: '#222'
  }
  const colStyle = {
    textAlign: 'right'
  }
  const iconStyle ={
    cursor: 'pointer',
    fontSize: '17px',
    marginRight: '10px',
    color: '#837474'
  }

   const foodAvatarUrl =
        'https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png';
  const period = (name, totalCal, per) => {
    return per.map( item => {
      const calorie = item.full_nutrients
      ? round(getFullNutrition(208, item))
      : 0;
      return(
         <ListItem avatar>
          <Left>
            <Thumbnail small square source={{ uri: item.photo ? item.photo.thumb : foodAvatarUrl }} />
          </Left>
          <Body>
            <Text>{item.food_name}</Text>
            <Text note>{item.brand_name ? item.brand_name + ', ' : null}{item.serving_qty} {item.serving_unit}</Text>
          </Body>
          <Right>
            <Text style={{color: 'green'}}>{calorie}</Text>
            <Text note>cal</Text>
          </Right>
        </ListItem>
      )
    })    
  }
  return (
      <List>
        <ListItem itemDivider>
          <Text>Breakfast</Text>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon type="FontAwesome" name="info-circle" style={
              [styles.icon, {color: breakfast && breakfast.length ? 'green': 'gray'}]
              }/>
          </TouchableOpacity>
        </ListItem>  
        { period('Breakfast', breakfastCal, breakfast) }
        <ListItem itemDivider>
          <Text>Lunch</Text>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon type="FontAwesome" name="info-circle" style={
              [styles.icon, {color: lunch && lunch.length ? 'green': 'gray'}]
              }/>
           </TouchableOpacity>   
        </ListItem> 
        { period('Lunch', lunchCal, lunch) }
         <ListItem itemDivider>
          <Text>Dinner</Text>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon type="FontAwesome" name="info-circle" style={
              [styles.icon, {color: dinner && dinner.length ? 'green': 'gray'}]
            }/>
          </TouchableOpacity> 
        </ListItem>  
        { period('Dinner', dinnerCal, dinner) } 
        <ListItem itemDivider>
          <Text>Snacks</Text>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon type="FontAwesome" name="info-circle" style={
            [styles.icon, {color: snacks && snacks.length ? 'green': 'gray'}]
            }/>
          </TouchableOpacity> 
        </ListItem>   
        { period('Snacks', snacksCal, snacks) }   
      </List> 
  )
}

const styles = StyleSheet.create({
  icon: {
   fontSize: 20, 
   alignSelf: 'center'
  },
  iconContainer: {
    flex: 1, 
    alignItems: 'center'
    }
  })

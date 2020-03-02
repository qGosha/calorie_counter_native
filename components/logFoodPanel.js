import React from "react";
import { Actions } from 'react-native-router-flux';
import {
  totalNutrients,
  totalNutrElem,
  getFullNutrition,
  round
} from '../helpers/help_functions';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  ListItem,
  Text,
  Icon,
  Right,
  Thumbnail,
  Left,
  Body,
  List,
} from 'native-base';

export const LogFoodPanel = ({ foods, dailyCal }) => {

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
  const period = (name, per) => {
    return per.map( item => {
      const calorie = item.full_nutrients
      ? round(getFullNutrition(208, item))
      : 0;
      return(
         <ListItem
           avatar
           key={item.id}
           onPress={() => Actions.intakeLog({
             foodItem: item,
             title: item.food_name
           }) }>
          <Left>
            <Thumbnail small square source={{ uri: item.photo ? item.photo.thumb : foodAvatarUrl }} />
          </Left>
          <Body>
            <Text>{item.food_name}</Text>
            <Text>{item.brand_name ? item.brand_name + ', ' : null}{item.serving_qty} {item.serving_unit}</Text>
          </Body>
          <Right>
            <Text style={{color: 'green'}}>{calorie}</Text>
            <Text>cal</Text>
          </Right>
        </ListItem>
      )
    })
  }

  return (
      <List>
        <ListItem itemDivider style={styles.container}>
          <Text>Breakfast</Text>
          <TouchableOpacity
           style={styles.iconCont}
           onPress={() => breakfast.length && Actions.detailedPeriod({
             title:'Breakfast',
             foods: totalIntake['Breakfast'],
             dailyCal: dailyCal
           })}>
            <Icon type="FontAwesome" name="info-circle" style={
              [styles.icon, {color: breakfast && breakfast.length ? 'green': 'gray'}]
              }/>
          </TouchableOpacity>
          {breakfastCal ? <Text>{breakfastCal}</Text> : null}
        </ListItem>
        { period('Breakfast', breakfast) }
        <ListItem itemDivider style={styles.container}>
          <Text>Lunch</Text>
          <TouchableOpacity
           style={styles.iconCont}
           onPress={() => lunch.length && Actions.detailedPeriod({
             title:'Lunch',
             foods: totalIntake['Lunch'],
             dailyCal: dailyCal
           })}>
            <Icon type="FontAwesome" name="info-circle" style={
              [styles.icon, {color: lunch && lunch.length ? 'green': 'gray'}]
              }/>
           </TouchableOpacity>
           {lunchCal ? <Text>{lunchCal}</Text> : null}
        </ListItem>
         { period('Lunch', lunch) }
         <ListItem itemDivider style={styles.container}>
          <Text>Dinner</Text>
          <TouchableOpacity
           style={styles.iconCont}
           onPress={() => dinner.length && Actions.detailedPeriod({
             title:'Dinner',
             foods: totalIntake['Dinner'],
             dailyCal: dailyCal
           })}>
            <Icon type="FontAwesome" name="info-circle" style={
              [styles.icon, {color: dinner && dinner.length ? 'green': 'gray'}]
            }/>
          </TouchableOpacity>
          {dinnerCal ? <Text>{dinnerCal}</Text> : null}
        </ListItem>
        { period('Dinner', dinner) }
        <ListItem itemDivider style={styles.container}>
          <Text>Snacks</Text>
          <TouchableOpacity
           style={styles.iconCont}
           onPress={() => snacks.length && Actions.detailedPeriod({
             title:'Snacks',
             foods: totalIntake['Snacks'],
             dailyCal: dailyCal
           })}>
            <Icon type="FontAwesome" name="info-circle" style={
            [styles.icon, {color: snacks && snacks.length ? 'green': 'gray'}]
            }/>
          </TouchableOpacity>
          {snacksCal ? <Text>{snacksCal}</Text> : null}
        </ListItem>
        { period('Snacks', snacks) }
      </List>
  )
}

const styles = StyleSheet.create({
  icon: {
   fontSize: 20,
  },
  iconCont: {
    position: 'absolute',
    left: 100
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
    }
  })

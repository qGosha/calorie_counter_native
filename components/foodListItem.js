import React from 'react';
import { round, getFullNutrition } from '../helpers/help_functions';
import {
  List,
  ListItem,
  Text,
  Separator,
  Button,
  Content,
  View,
} from 'native-base';
import { Image, StyleSheet } from 'react-native';
export const FoodListItem = ({ foods, addToBasket }) => {
  if (!foods || !foods.length) return null;
  const foodAvatarUrl =
    'https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png';

  const myFood = foods.map((foodItem, i) => {
    const foodName = foodItem.food_name;
    const brandName = foodItem.brand_name || '';
    const servingQty = foodItem.serving_qty || '';
    const servingUnit = foodItem.serving_unit || '';
    const ifCaloried = foodItem.hasOwnProperty('nf_calories');
    const calorie = ifCaloried ? round(foodItem.nf_calories) : null;
    const colorieSection = ifCaloried ?
       <View style={{ flex: 1 }}>
        <Text style={{ color: 'green' }}>{calorie}</Text>
        <Text>cal</Text>
      </View> :
      null;
    return (
      <ListItem key={foodItem.id} style={styles.main} onPress={() => addToBasket(foodItem)}>
        <Image
          source={{ uri: foodItem.photo.thumb || foodAvatarUrl }}
          style={styles.image}
        />
        <View style={styles.innerMain}>
          <View style={styles.serving}>
            <Text style={{ textAlign: 'left' }}>{foodName}</Text>
            <Text style={styles.qtyText}>
              {servingQty} {servingUnit}{' '}
            </Text>
          </View>
          {colorieSection}
        </View>
      </ListItem>
    );
  });

  return myFood;
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  innerMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  serving: {
    alignContent: 'space-between',
    flex: 3,
  },
  qtyText: {
    textAlign: 'left',
    fontSize: 14,
    fontStyle: 'italic',
    color: 'gray',
    paddingRight: 35
  },
});

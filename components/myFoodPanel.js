import React from 'react';
import { FoodListItem } from '../components/foodListItem';
import { Text, View } from 'native-base';

export const MyFoodPanel = ({ suggestedFood, addToBasket }) => {
  const foodArr = suggestedFood.foods;
  if (!foodArr || !foodArr.length) return  <Text>This is my panel but there is no food</Text>;
  const foods = foodArr.slice(0,5);

  return(
    <View style={{flex: 1}}>
      <Text>My Food</Text>
     <FoodListItem foods={foods} addToBasket={addToBasket}/>
    </View>
  )
}

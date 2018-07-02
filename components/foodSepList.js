import React from 'react';
import { FoodListItem } from '../components/foodListItem';
import { Text, View, Separator } from 'native-base';

export const SepFoodList = ({ foods, addToBasket, title }) => {
  if (!foods.length) {
    return (
      <View style={{ flex: 1, padding: 15 }}>
        <Text>Nothing has been found...</Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <Separator bordered>
        <Text>{title}</Text>
      </Separator>
      <FoodListItem foods={foods} addToBasket={addToBasket} />
    </View>
  );
};

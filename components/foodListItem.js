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
    // const calorie = foodItem.full_nutrients
    //   ? round(getFullNutrition(208, foodItem))
    //   : 0;
    const ifCaloried = foodItem.hasOwnProperty('nf_calories');
    const calorie = ifCaloried ? round(foodItem.nf_calories) : null;

    // const clickFunc = () => {
    //   if (showModal) {
    //     showModal(INTAKELOG, { foods: foodItem, title: 'Edit food'})
    //   } else {
    //     addToBasket ? addToBasket(foodItem) : false;
    //   }
    //   }
    // const style = {
    //   cursor: (!showModal && !addToBasket) ? 'default' : 'pointer'
    // }
    // const inputStyle = {
    //   maxWidth: '70px',
    //   textAlign: 'center'
    // }
    // const listGroup = <div className='food-description-group-1'>
    //   <span className='food-name'>{foodName} </span>
    //   <span className='food-size'>{`${brandName ? brandName + ',' : ''} ${servingQty} ${servingUnit}`}</span>
    // </div>;

    // const qty = (!showModal && !addToBasket) ?
    // <span><FormControl
    //   type="text"
    //   style={inputStyle}
    //   value={servingQty}
    //   onChange={(event) => onQtyChange(event)} /> {servingUnit}  {foodName}</span> : listGroup;

    // const AdjustElement = ({...props}) => (!showModal && !addToBasket) ? <div {...props}/> : <ListGroupItem {...props}/>;
    // return  (
    //   <AdjustElement
    //     key={foodItem.id}
    //     style={style}
    //     className='food-item'
    //     onClick={() => clickFunc()}>
    //     <Image src={ foodItem.photo.thumb || foodAvatarUrl }
    //     alt='food'
    //     className='food-image'
    //     />
    //     <div className='food-description'>
    //     {qty}
    //     { ifCaloried ? <div className='food-description-group-2'>
    //       <span className='food-calorie'>{calorie}</span>
    //       <span className='food-calorie-name'>cal</span>
    //     </div>: null }
    //     </div>
    //   </AdjustElement>
    // )
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

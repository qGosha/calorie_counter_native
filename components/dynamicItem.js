import React from 'react';
import { totalNutrients, total, totalNutrElem, getFullNutrition, round } from '../helpers/help_functions';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  List,
  ListItem,
  Text,
  Content,
  View,
  Icon,
  Input,
  Picker,
  Item,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import uuid from 'react-native-uuid';

export const DynamicItem = ({
  withInfo,
  item,
  onMeasureChange,
  onQtyChange,
  i
}) => {
  const foodAvatarUrl =
    'https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png';

  const qty =
    item.value === undefined
      ? item.serving_qty
      : item.value;
  const altMesures = item.alt_measures;
  const foodName = item.food_name;
  const calorie = item.full_nutrients
    ? round(getFullNutrition(208, item))
    : 0;
  const options = altMesures
    ? altMesures.map((option, j) => {
        const value = option.measure;
        return <Picker.Item key={uuid.v4()} label={value} value={value} />;
      })
    : null;
  let select;
  if (altMesures && altMesures.length) {
    select = (
      <Picker
        iosIcon={
          <Icon
            name="ios-arrow-down-outline"
            style={{
              position: 'absolute',
              top: 10,
              right: 3,
              marginRight: 0,
              marginLeft: 0,
              paddingTop: 0,
            }}
          />
        }
        mode="dropdown"
        style={styles.picker}
        onValueChange={value => onMeasureChange(value, i)}
        selectedValue={item.serving_unit}>
        {options}
      </Picker>
    );
  } else {
    select = (
      <Picker
        mode="dropdown"
        style={[styles.picker, { borderColor: 'gray' }]}
        enabled={false}
        placeholder={item.serving_unit}
      />
    );
  }
  const colorieSection = (
    <View style={{ flex: 1 }}>
      <Text style={{ color: 'green', textAlign: 'right' }}>{calorie}</Text>
      <Text style={{textAlign: 'right'}}>cal</Text>
    </View>
  );

  return (
    <View style={styles.main}>
      <Image
        source={{ uri: item.photo.thumb || foodAvatarUrl }}
        style={styles.image}
      />
      <View style={{ flex: 4, justifyContent: 'space-between' }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Item regular style={styles.qty}>
            <Input
              style={{ textAlign: 'center' }}
              bordered
              value={qty.toString()}
              onChange={event => onQtyChange(event, i)}
            />
          </Item>
          <View style={{ flex: 1 }}>{select}</View>
        </View>
        <Text style={{ fontSize: 15, fontStyle: 'italic' }}>
          {foodName}
        </Text>
      </View>
      {withInfo && <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={() => Actions.detailedNutr({
        id: i,
        title: foodName,
        onBack: () => Actions.basket(),
        isFromBasket: true
      }) }>
       <Icon type="FontAwesome" name="info-circle" style={{fontSize: 20}}/>
      </TouchableOpacity>}
      {colorieSection}
    </View>
  );
}


const styles = StyleSheet.create({

  qty: {
    width: 60,
    height: 45,
    borderRadius: 5,
  },
  main: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 8,
    paddingLeft: 8,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: '#fff',
  },
  image: {
    width: 35,
    height: 35,
    flex: 1,
    marginRight: 10,
  },
  picker: {
    width: 100,
    alignSelf: 'center',
    borderWidth: 1,
    paddingRight: 20,
  },
});

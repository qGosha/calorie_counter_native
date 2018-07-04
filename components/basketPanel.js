import React from "react";
import { StyleSheet, TextInput, KeyboardAvoidingView, Keyboard, AsyncStorage, Image, ListView } from 'react-native';
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
  Tab,
  Tabs,
  Input,
  Picker,
  Item
} from 'native-base';
// import { TotalPanel } from './totalPanel';
import { MenuHeader } from './menuHeader';
import uuid from 'react-native-uuid';
import { round, getFullNutrition } from '../helpers/help_functions';

export const BasketPanel = ({ handleHide, basket, deleteItem, onQtyChange,
  onMeasureChange, sendItemToTheBasketState, showModal, clearBasket, log, currentDate}) => {
  let basketFood;
  if(!basket.length) {
    basketFood = null;
  } else {
    basketFood = basket.map((basketItem, i) => {
      const foodAvatarUrl = 'https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png';

      const qty =  (basketItem.value === undefined) ? basketItem.serving_qty : basketItem.value;
      const altMesures = basketItem.alt_measures;
      const foodName = basketItem.food_name;
      const calorie = basketItem.full_nutrients ? round(getFullNutrition(208, basketItem)) : 0;
      const options = altMesures ? altMesures.map( (option, j) => {
        const value = option.measure;
        return <Picker.Item key={uuid.v4()} label={value} value={value}/>
      }) : null;
      let select;
      if(altMesures && altMesures.length){
        select = (
          <Picker
            iosIcon={<Icon name="ios-arrow-down-outline" style={{
              position: 'absolute',
              top: 10,
              right: 3,
              marginRight: 0,
              marginLeft: 0,
              paddingTop: 0
            }}/>}
            mode="dropdown"
            style={styles.picker}
            onValueChange={(value)=> alert(value)}
            selectedValue={basketItem.serving_unit}>
            {options}
          </Picker>
        )
      } else {
        select = (
          <Picker
            mode="dropdown"
            style={[styles.picker, {borderColor: 'gray'}]}
            enabled={false}
            placeholder={basketItem.serving_unit}/>
        )
      }
      const colorieSection =
         <View style={{ flex: 1}}>
          <Text style={{ color: 'green' }}>{calorie}</Text>
          <Text>cal</Text>
        </View>;

      return (
         <ListItem style={styles.main}>
           <Image
            source={{ uri: basketItem.photo.thumb || foodAvatarUrl }}
            style={styles.image}
           />
           <View style={{flex: 4, justifyContent: 'space-between'}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
             <Item regular style={styles.qty}>
              <Input
               style={{textAlign: 'center'}}
               bordered
               value={qty.toString()}
               onChange={(event)=> onQtyChange(event, i)}/>
             </Item>
            <View style={{flex: 1}}>
            {select}
            </View>
            </View>
            <Text style={{fontSize: 15, fontStyle: 'italic'}}>{foodName}</Text>
          </View>
          <Icon type="FontAwesome" name="info-circle" style={{fontSize: 18, flex: 0.5}}/>
          {colorieSection}
        </ListItem>
        )
    })
  }
 if(!basketFood) {
   return (
   <View style={{flex: 1}}>
    <Text>Nothing is in here</Text>
   </View>
   )
 }


 const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  return(
    <Container>
    <MenuHeader />
    <Content>
     <Text style={styles.tip}>Swipe left to delete</Text>
      <List
        dataSource={ds.cloneWithRows(basketFood)}
        disableRightSwipe
        renderRow={basketFood => basketFood}
        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
          <Button full danger onPress={() => {
            rowMap[`${secId}${rowId}`].props.closeRow();
            deleteItem(rowId);
          }}>
            <Icon active name="trash" />
          </Button>}
        rightOpenValue={-75}
          />
     </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  qty: {
    width: 60,
    height: 45,
    borderRadius: 5
  },
  main: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 8,
    paddingLeft: 8,
    paddingTop: 10,
    paddingBottom: 5
  },
  image: {
    width: 35,
    height: 35,
    flex: 1,
    marginRight: 10,
  },
  tip: {
    paddingVertical: 5,
    fontSize: 12,
    color: 'gray',
    textAlign: 'center'
  },
  picker: {
    width: 100,
    alignSelf: 'center',
    borderWidth: 1,
    paddingRight: 20
  },
});

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
            iosIcon={<Icon name="ios-arrow-down-outline" />}
            mode="dropdown"
            onValueChange={false}
            selectedValue={basketItem.serving_unit}>
            {options}
          </Picker>
        )
      } else {
        select = (
          <Picker
            iosIcon={<Icon name="ios-arrow-down-outline" />}
            mode="dropdown"
            style={{ height: 25, width: 70 }}
            enabled={false}
            selectedValue={basketItem.serving_unit}/>
        )
      }
  
      return (
         <ListItem style={{flex: 1, flexDirection: 'row'}}>
           <Image
            source={{ uri: basketItem.photo.thumb || foodAvatarUrl }}
            style={styles.image}
           />
           <Item regular style={{flex: 1}}>
            <Input 
             value={qty}
             onChange={false}/>
          </Item>
          <View style={{flex: 1}}>
          {select}
          </View>
          <Icon type="FontAwesome" name="info-circle" style={{fontSize: 15}}/>
        </ListItem>
        )
    //   return(
    //     <Row key={basketItem['consumed_at']+i} nogutter className='basket-row'>
    //     <Col xs={2} md={1}>
    //       <Image src={basketItem.photo.thumb || foodAvatarUrl}
    //         alt='food'
    //         className='food-image'/>
    //     </Col>
    //     <Col xs={6} md={8}>
    //     <Row style={{justifyContent: 'space-between'}}>
    //       <Col xs={3} sm={3} md={2}>
    //         <FormControl
    //           type="text"
    //           value={qty}
    //           onChange={(event) => onQtyChange(event, i)}
    //           className='basket-qty'
    //           autoFocus={true}/>
    //       </Col>
    //       <Col xs={8} sm={8} md={9}>
    //         {select}
    //       </Col>
    //       </Row>
    //       <Row>
    //       <Col xs={12}>
    //       <div className='basket-food-name'>{foodName}</div>
    //       </Col>
    //       </Row>
    //     </Col>
    //     <Col xs={1} sm={1}>
    //     <FontAwesome
    //       className='info-circle'
    //       name='info-circle'
    //       onClick={() => showModal(DETAILED_NUTR, {id: i})}
    //         />
    //     </Col>
    //     <Col xs={2} sm={1}>
    //       <div className='basket-description-group'>
    //         <span className='basket-nutritient'>{calorie}</span>
    //         <span className='food-calorie-name'>cal</span>
    //       </div>
    //     </Col>
    //     <Col xs={1} sm={1}>
    //       <Button bsClass="close" aria-label="Close" onClick={() => deleteItem(i)}>
    //       <span aria-hidden="true">&times;</span>
    //       </Button>
    //     </Col>

    // </Row>
    //   )
    })
  }

 const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  return(
    <Container>
    <Content>
      <List
        dataSource={ds.cloneWithRows(basketFood)}
        renderRow={basketFood => basketFood}
        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
          <Button full danger onPress={() => alert(rowId)}>
            <Icon active name="trash" />
          </Button>}
        rightOpenValue={-75}
          />
     </Content>
    </Container>
  )
}

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

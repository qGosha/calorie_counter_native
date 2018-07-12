import React from 'react';
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
  Tab,
  Tabs,
  Input,
  Picker,
  Item,
} from 'native-base';
import { TotalPanel } from './totalPanel';
import { MenuHeader } from './menuHeader';
import { Actions } from 'react-native-router-flux';
import uuid from 'react-native-uuid';
import { round, getFullNutrition } from '../helpers/help_functions';

export const BasketPanel = ({
  basket,
  deleteItem,
  onQtyChange,
  onMeasureChange,
  clearBasket,
  log
}) => {
  let basketFood;
  if (!basket.length) {
    basketFood = null;
  } else {
    basketFood = basket.map((basketItem, i) => {
      const foodAvatarUrl =
        'https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png';

      const qty =
        basketItem.value === undefined
          ? basketItem.serving_qty
          : basketItem.value;
      const altMesures = basketItem.alt_measures;
      const foodName = basketItem.food_name;
      const calorie = basketItem.full_nutrients
        ? round(getFullNutrition(208, basketItem))
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
            selectedValue={basketItem.serving_unit}>
            {options}
          </Picker>
        );
      } else {
        select = (
          <Picker
            mode="dropdown"
            style={[styles.picker, { borderColor: 'gray' }]}
            enabled={false}
            placeholder={basketItem.serving_unit}
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
        <ListItem style={styles.main}>
          <Image
            source={{ uri: basketItem.photo.thumb || foodAvatarUrl }}
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
          <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={() => Actions.detailedNutr({
            id: i, 
            title: foodName, 
            onBack: () => Actions.basket(),
            isFromBasket: true
          }) }>
           <Icon type="FontAwesome" name="info-circle" style={{fontSize: 20}}/>
          </TouchableOpacity>
          {colorieSection}
        </ListItem>
      );
    });
  }

  const noFoodAdded = (
    <View
      style={{
        alignSelf: 'center',
        marginTop: 90,
        width: 170,
      }}>
      <Icon
        type="FontAwesome"
        name="arrow-up"
        style={{ color: 'grey', alignSelf: 'center' }}
      />
      <Text style={{ color: 'grey', marginTop: 25, textAlign: 'center' }}>
        No food added. Use search to find and add some food to your basket.
      </Text>
    </View>
  );

  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  return (
    <Container>
      <MenuHeader />
      <Content>
        {basketFood ? (
          <View style={{ flex: 1 }}>
            <Text style={styles.tip}>Swipe left to delete</Text>
            <List
              dataSource={ds.cloneWithRows(basketFood)}
              disableRightSwipe
              renderRow={basketFood => basketFood}
              renderRightHiddenRow={(data, secId, rowId, rowMap) => (
                <Button
                  full
                  danger
                  onPress={() => {
                    rowMap[`${secId}${rowId}`].props.closeRow();
                    deleteItem(rowId);
                  }}>
                  <Icon active name="trash" />
                </Button>
              )}
              rightOpenValue={-75}
            />
            <TotalPanel foods={basket} />
            <View style={styles.control}>
              <View style={{ flex: 1 }}>
                <Button
                  iconLeft
                  success
                  onPress={log}
                  style={[styles.buttons, { marginBottom: 8 }]}>
                  <Icon type="FontAwesome" name="pencil" />
                  <Text>Log {basket.length ? basket.length : null} food</Text>
                </Button>
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  iconLeft
                  danger
                  style={styles.buttons}
                  onPress={() =>
                    Actions.error({
                      confirm: true,
                      title: 'Confirm',
                      text:
                        'Are you sure you want to remove all food form the basket?',
                      func: clearBasket,
                      positiveText: 'Yes',
                      negativeText: 'No',
                    })
                  }>
                  <Icon type="FontAwesome" name="trash" />
                  <Text>Clear basket</Text>
                </Button>
              </View>
            </View>
          </View>
        ) : (
          noFoodAdded
        )}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  buttons: {
    width: 200,
    justifyContent: 'flex-start',
    paddingLeft: 30,
  },
  control: {
    flex: 1,
    marginTop: 25,
    alignItems: 'center',
  },
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
    textAlign: 'center',
  },
  picker: {
    width: 100,
    alignSelf: 'center',
    borderWidth: 1,
    paddingRight: 20,
  },
});

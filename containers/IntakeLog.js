import React, { Component } from "react";
import {
  getFoodLog,
  getFoodLogSuccess,
  deleteFoodLogItem,
  setNewBasket,
  updateQty,
} from "../actions/index";
import { DetailedNutrPanel } from "../components/detailedNutrPanel";
import { getFullNutrition, round } from '../helpers/help_functions';
import { connect } from "react-redux";
import uuid from 'react-native-uuid';

import {
  Container,
  Input,
  Content,
  Button,
  Text,
  View,
  Icon,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail
} from 'native-base';
import {
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class IntakeLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: this.props.foodItem
    };
    this.onQtyChange = this.onQtyChange.bind(this);
    this.renewBasket = this.renewBasket.bind(this);
    this.updateQty = this.updateQty.bind(this);
  }

  updateQty() {
    const jwt = this.props.jwt;
    const foods = this.state.foods;
    const currentDate = this.props.currentDate;
    foods["serving_qty"] = +foods.serving_qty
      ? foods.serving_qty
      : foods.last_good_value;
    foods["last_good_value"] = undefined;
    this.props.updateQty(jwt, foods, currentDate);
  }

  onQtyChange(event) {
    const newFoods = Object.assign({}, this.state.foods);
    const newValue = event.nativeEvent.text;
    const oldValue = newFoods["serving_qty"];
    const isnan = value => isNaN(parseInt(value)) || isNaN(value) || !+value;
    if (isnan(newValue)) {
      newFoods["serving_qty"] = newValue;
      if (!newFoods["last_good_value"]) newFoods["last_good_value"] = oldValue;
      this.setState({ foods: newFoods });
    } else {
      const fullNutr = newFoods["full_nutrients"].map(i => {
        const n = i["value"] * (newValue /
            (isnan(oldValue) ? newFoods["last_good_value"] : oldValue));
        return {
          attr_id: i["attr_id"],
          value: n
        };
      });
      newFoods["last_good_value"] = newValue;
      newFoods["serving_qty"] = newValue;
      newFoods["full_nutrients"] = fullNutr;
      this.setState({ foods: newFoods });
    }
  }

  renewBasket(item) {
    const basket = this.props.basket;
    const newItem = {
      ...item,
      id: uuid.v4(),
      full_nutrients: this.state.foods["full_nutrients"],
      isFromFoodLog: true,
      serving_qty: +item.serving_qty ? item.serving_qty : item.last_good_value
    };
    const newBasket = basket.concat(newItem);

    this.props.setNewBasket(newBasket);
    const newBasketForStorage = JSON.stringify(newBasket);
    AsyncStorage.setItem('basket', newBasketForStorage).catch(er => {
      Actions.error({ title: 'Data upload failed', text: er });
    });
    Actions.basket();
  }

  render() {
    const foods = this.state.foods;
    if (!foods) return null;
    const props = this.props;
    const deleteFoodLogItem = props.deleteFoodLogItem;
    const confirmText = "Are you sure you want to delete this item?";
    const jwt = this.props.jwt;
    const deleteButton =
    <Button
      iconLeft
      small
      danger
      style={styles.buttons}
      onPress={() =>
        Actions.error({
          confirm: true,
          title: 'Confirm',
          text:confirmText,
          func: async () =>  {
            await this.props.deleteFoodLogItem(jwt, foods, this.props.currentDate);
            Actions.dashboard();
          },
          positiveText: 'Yes',
          negativeText: 'No',
        })
      }>
      <Icon type="FontAwesome" name="trash" />
      <Text>Delete</Text>
    </Button>

    const copyButton =
    <Button
      small
      iconLeft
      info
      style={styles.buttons}
      onPress={() =>this.renewBasket(foods)}>
      <Icon type="FontAwesome" name="copy" />
      <Text>Copy</Text>
    </Button>

    const updateButton =
      <Button
        small
        iconLeft
        success
        style={styles.buttons}
        onPress={this.updateQty}>
        <Icon type="FontAwesome" name="pencil" />
        <Text>Update</Text>
      </Button>
  const foodAvatarUrl =
    'https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png';
  const foodName = foods.food_name;
  const qty =  foods.serving_qty;
  const value = (foods.value === undefined || isNaN(parseInt(foods.value)) || isNaN(foods.value))
  ? qty : foods.value;
  const servingUnit = foods.serving_unit;
  const calorie = round(getFullNutrition(208, foods));
    return (
      <Container>
        <Content style={{ paddingHorizontal: 15, paddingVertical: 4 }}>
          <View style={{ flex: 1, paddingVertical: 8 }}>
           <ListItem avatar>
              <Left>
                <Thumbnail square source={{ uri: foods.photo ? foods.photo.thumb : foodAvatarUrl }} />
              </Left>
              <Body style={{borderBottomWidth: 0}}>
                <Text>{foodName}</Text>
                <View style={styles.inputCont}>
                <Input
                  style={styles.input}
                  bordered
                  value={value.toString()}
                  onChange={event => this.onQtyChange(event)}
                />
                <Text note>{servingUnit}</Text>
                </View>
              </Body>
              <Right style={{borderBottomWidth: 0}}>
                <Text style={{color: 'green'}}>{calorie}</Text>
                <Text note>cal</Text>
              </Right>
            </ListItem>
          </View>
          <View style={{flex: 1, paddingBottom: 10, paddingTop: 7, borderTopWidth: 1, borderColor: '#ddd'}}>
           <View style={styles.buttonsCont}>
           {updateButton}{copyButton}
           </View>
           <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}}>
           {deleteButton}
           </View>
          </View>
        <DetailedNutrPanel
          foodObj={foods}
          dailyCal={props.dailyCal} />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  dailyCal: state.dash.userInfo["daily_kcal"],
  basket: state.basket,
  jwt: state.auth.jwt,
  currentDate: state.dates.currentDate
});

const mapDispatchToProps = dispatch => {
  return {
    deleteFoodLogItem: (jwt, item, currentDate) => {
      dispatch(deleteFoodLogItem(jwt, item)).then(response => {
        if (!response.error) {
           return Promise.resolve();
        } else {
          return Promise.reject(response.payload.response);
        }
      })
      .catch( er => {
        const message = er && er.response && er.response.data.message || 'Error';
        Actions.error({title: 'Data fetch failed', text: message})
      } )
    },
    setNewBasket: basket => dispatch(setNewBasket(basket)),
    updateQty: (jwt, foods, currentDate) =>
      dispatch(updateQty(jwt, foods)).then(response => {
        if (!response.error) {
          dispatch(getFoodLog(jwt, currentDate)).then(response => {
            if (!response.error) {
              dispatch(getFoodLogSuccess(response.payload.data.foods));
            } else {
                Promise.reject(response.payload.response)
            }
          })
        } else {
          Promise.reject(response.payload.response);
        }
      })
      .catch( er => {
        const message = er && er.response && er.response.data.message || 'Error';
        Actions.error({title: 'Data fetch failed', text: message})
      } )
  };
};
const styles = StyleSheet.create({
  buttonsCont: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8
  },
  buttons: {
    justifyContent: 'flex-start',
  },
  input: {
    flex: 0.5,
    textAlign: 'center',
    borderWidth:1,
    backgroundColor: '#fff',
    marginRight: 5,
    height: 35
  },
  inputCont: {
    flex: 1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'flex-start'
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(IntakeLog);

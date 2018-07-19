import React, { Component } from "react";
import {
  getFoodLog,
  getFoodLogSuccess,
  getFoodLogFailure,
  deleteFoodLogItem,
  deleteFoodLogItemFailure,
  setNewBasket,
  updateQty,
  updateQtyFailure,
  getMonthReport,
  getMonthReportSuccess,
  getMonthReportFailure
} from "../actions/index";
import { DetailedNutrPanel } from "../components/detailedNutrPanel";
import { connect } from "react-redux";
import { v4 } from "uuid";
import { Container, Content,Button, Text, View, Icon } from 'native-base';
import {
  StyleSheet
} from 'react-native';
import { Actions } from 'react-native-router-flux';


class IntakeLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: false
    };
    this.onQtyChange = this.onQtyChange.bind(this);
    this.renewBasket = this.renewBasket.bind(this);
    this.updateQty = this.updateQty.bind(this);
  }
  componentDidMount() {
    const foods = this.props.foodItem;
    this.setState({foods})
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
      id: v4(),
      full_nutrients: this.state.foods["full_nutrients"],
      isFromFoodLog: true,
      serving_qty: +item.serving_qty ? item.serving_qty : item.last_good_value
    };
    const newBasket = basket.concat(newItem);

    this.props.setNewBasket(newBasket);
    Actions.dashboard();
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
      danger
      style={styles.buttons}
      onPress={() =>
        Actions.error({
          confirm: true,
          title: 'Confirm',
          text:confirmText,
          func: () => this.props.deleteFoodLogItem(jwt, foods, this.props.currentDate),
          positiveText: 'Yes',
          negativeText: 'No',
        })
      }>
      <Icon type="FontAwesome" name="trash" />
      <Text>Delete</Text>
    </Button>



    const copyButton =
    <Button
      iconLeft
      info
      style={styles.buttons}
      onPress={() =>this.renewBasket(foods)}>
      <Icon type="FontAwesome" name="copy" />
      <Text>Copy</Text>
    </Button>

    const updateButton =
      <Button
        iconLeft
        success
        style={styles.buttons}
        onPress={this.updateQty}>
        <Icon type="FontAwesome" name="pencil" />
        <Text>Update</Text>
      </Button>

    return (
      <Container>
        <Content style={{ paddingHorizontal: 15, paddingVertical: 4 }}>
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
  tip: {
    paddingVertical: 5,
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(IntakeLog);

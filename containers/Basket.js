import React, { Component } from "react";
import { connect } from "react-redux";
import { BasketPanel } from '../components/basketPanel';
import {
 hideModal,
 setNewBasket,
 showModal,
 logBasketFood,
 logBasketFoodSuccess,
 logBasketFoodFailure,
 getFoodLog,
 getFoodLogSuccess,
 getFoodLogFailure,
 getMonthReport,
 getMonthReportSuccess
} from "../actions/index";
import { BASKET } from '../containers/Modal';

class Basket extends Component {

  constructor(props) {
    super(props);

  this.renewBasket = this.renewBasket.bind(this);
  this.refreshBasket = this.refreshBasket.bind(this);
  this.onQtyChange = this.onQtyChange.bind(this);
  this.onMeasureChange = this.onMeasureChange.bind(this);
  this.clearBasket = this.clearBasket.bind(this);
 }

renewBasket(basket) {
    let checkedBasked;
    if (basket && basket.length) {
      checkedBasked = basket.map((item, i) => {
        const itemQty = item.value;
        if (itemQty === undefined) return item;
        if (!(!isNaN(+itemQty) && isFinite(+itemQty))) {
          item.value = basket[i].last_good_value || 0;
        }
        return item;
      })
    } else {
      checkedBasked = basket
    };
    this.props.setNewBasket(checkedBasked);
    const newBasketForStorage = JSON.stringify(checkedBasked);
    localStorage.setItem('basket', newBasketForStorage);

}

onMeasureChange(event,id) {
  const getNutrition = (nutr) => {
   const result = basket[id].full_nutrients.filter(a => {if (a.attr_id === nutr) return a});
   return (result[0] && result[0].value) ? result[0].value : 0;
  }
  const basket = this.props.basket;
  const value = event.target.value;
  const index = event.target.selectedIndex;

  const servWeight = basket[id].alt_measures[index].serving_weight;
  const newQty = basket[id].alt_measures[index].qty;
  const foodWeight = basket[id].serving_weight_grams;
  const fullBasketNutr = basket[id]['full_nutrients'];
  const isFromFoodLog = basket[id]['isFromFoodLog'];
  const oldOriginalQty = basket[id].alt_measures.filter( i => {
    return i.measure === basket[id].serving_unit
  })[0].qty;
  const fullNutr = fullBasketNutr.map( i => {
    const value = i['value'] ;
    const isFromFoodLog = basket[id]['isFromFoodLog'];

    const n = value / basket[id].serving_weight_grams /
    ((basket[id].value/(isFromFoodLog ? oldOriginalQty : basket[id].serving_qty)) || (basket[id].serving_qty/(isFromFoodLog ? oldOriginalQty : basket[id].serving_qty)))
    * servWeight;

     return {
       attr_id: i['attr_id'],
       value: n
     }
   })

  const weightMultiplier = servWeight / newQty;

  if (basket[id]['isFromFoodLog']) basket[id]['isFromFoodLog'] = undefined;
  basket[id].full_nutrients = fullNutr;
  basket[id].serving_unit = value;
  basket[id].serving_weight_grams = servWeight;

  basket[id].value = newQty;
  basket[id].last_good_value =newQty;
  basket[id].serving_qty = newQty;
  this.renewBasket(basket);
}

onQtyChange(event, id) {
  const getNutrition = (nutr) => {
   const result = basket[id].full_nutrients.filter(a => {if (a.attr_id === nutr) return a});
   return (result[0] && result[0].value) ? result[0].value : 0;
  }
  const basket = this.props.basket;
  const value = event.target.value;
  if (isNaN(parseInt(value)) || isNaN(value) || +value === 0) {
    basket[id].value = value;
    this.renewBasket(basket);
    return;
  }
  const servingWeight = basket[id].serving_weight_grams;
  const multiplier = (Math.abs(value)) || 0;
  const fullBasketNutr = basket[id]['full_nutrients'];
  const fullNutr = fullBasketNutr.map( i => {
    const value = i['value'];

    const n = value * (multiplier / (basket[id].last_good_value || basket[id].serving_qty) );
     return {
       attr_id: i['attr_id'],
       value: n
     }
   })


  if(!isNaN(+value) && isFinite(+value) && +value > 0) {
    basket[id].last_good_value = Math.abs(+value);
  }

  basket[id].value = +value < 0 ? Math.abs(+value) : value;


  basket[id].full_nutrients = fullNutr;
  this.renewBasket(basket);
}


 refreshBasket(id) {
   const oldBasket = this.props.basket;
   const basket = oldBasket.filter( (item, i) => i !== id);
   this.renewBasket(basket);
 }

 clearBasket() {
  const basket = [];
  this.renewBasket(basket);
 }

 render() {
   return(
     <BasketPanel
     handleHide={this.props.hideModal}
     basket={this.props.basket}
     deleteItem={this.refreshBasket}
     onQtyChange={this.onQtyChange}
     onMeasureChange={this.onMeasureChange}
     showModal={this.props.showModal}
     clearBasket={this.clearBasket}
     log={this.props.log}
     currentDate={this.props.currentDate}
     />
   )
 }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideModal: modalType => dispatch(hideModal(modalType)),
    setNewBasket: (basket) => dispatch(setNewBasket(basket)),
    showModal: (modalType, modalProps) => dispatch(showModal(modalType, modalProps)),
    log: (jwt, basket, currentDate) => {
      dispatch(logBasketFood(jwt, basket)).then(response => {
        if (!response.error) {
          Promise.resolve(dispatch(logBasketFoodSuccess(response.payload.data)))
            .then(() => dispatch(getFoodLog(jwt, currentDate)) )
            .then( response => {
               if (!response.error) {
                 dispatch(getFoodLogSuccess(response.payload.data.foods))
               } else {
                 dispatch(getFoodLogFailure(response.payload.response))
               } } )
           .then(() => dispatch(getMonthReport(jwt, currentDate)) )
           .then( response => {
              if (response.error) {
                return Promise.reject(response);
              } else {
                 dispatch(getMonthReportSuccess(response.payload.data.dates))
              } } )
           .then( () => { dispatch(hideModal(BASKET)) } )
           .then( () => { localStorage.setItem('basket', '[]') })
        } else {
          dispatch(logBasketFoodFailure(response.payload.response));
        }
      });
    }
  };
};
const mapStateToProps = state => ({
  basket: state.basket,
  currentDate: state.dates.currentDate
});
export default connect(mapStateToProps, mapDispatchToProps)(Basket);

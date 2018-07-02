import {
  GETDETAILEDFOODINFO,
  GETDETAILEDFOODINFOFAILURE,
  GETDETAILEDFOODINFOSUCCESS,
  SETNEWBASKET,
  LOGBASKETFOOD,
  LOGBASKETFOODSUCCESS,
  LOGBASKETFOODFAILURE
  } from '../actions/index';
  import { fetchFromStorage } from '../helpers/help_functions';
  
let fetchedBasket;
fetchFromStorage('basket').then(response => fetchedBasket = response);
const initialState = fetchedBasket ? JSON.parse(fetchedBasket) : [];

export function basket(state = initialState, action) {
  const payload = action.payload;
  switch (action.type) {
    case GETDETAILEDFOODINFO:
      return state;
    case GETDETAILEDFOODINFOSUCCESS:
      return [...state, payload[0]];
    case SETNEWBASKET:
      return payload;
    case GETDETAILEDFOODINFOFAILURE:
      return state;
    case LOGBASKETFOOD:
      return state;
    case LOGBASKETFOODSUCCESS:
      return [];
    case LOGBASKETFOODFAILURE:
      return state;
    default:
      return state;
  }
}

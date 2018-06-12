import axios from "axios";
import { dateFunc, getFullNutrition } from '../helpers/help_functions';

export const GETFOODLOG = "GETFOODLOG";
export const GETFOODLOGSUCCESS = "GETFOODLOGSUCCESS";
export const GETFOODLOGFAILURE = "GETFOODLOGFAILURE";

export const DELETEFOODLOGITEM = "DELETEFOODLOGITEM";
export const DELETEFOODLOGITEMFAILURE = "DELETEFOODLOGITEMFAILURE";

export const UPDATEQTY = "UPDATEQTY";
export const UPDATEQTYFAILURE = "UPDATEQTYFAILURE";


const ROOT_URL = "https://trackapi.nutritionix.com/v2/";

const jwt = localStorage.getItem('jwt');

export const getFoodLog = (jwt, date) => {
  const headers = {
    ["x-user-jwt"]: jwt
  }
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;


  const query = {
   timezone,
   begin: dateFunc(date.setHours(0,0,0,0), 'full'),
   end: dateFunc(date.setHours(23,59,59,999), 'full')
 }
   const response = axios({
      method: "GET",
      url: ROOT_URL + "log",
      headers,
      params : query
    });

  return {
    type: GETFOODLOG,
    payload: response
  }
}

export const getFoodLogSuccess = response => ({
  type: GETFOODLOGSUCCESS,
  payload: response
})

export const getFoodLogFailure = response => ({
  type: GETFOODLOGFAILURE,
  payload: response
})

export const deleteFoodLogItem = (jwt, item) => {
  const headers = {
    ["x-user-jwt"]: jwt
  }
  const obj = {
    foods: [{id: item['id']}]
  }
  const response = axios({
    method: "DELETE",
    url: ROOT_URL + "log",
    headers,
    data: obj
  });
  return {
    type: DELETEFOODLOGITEM,
    payload: response
  }
}

export const deleteFoodLogItemFailure = response => ({
  type: DELETEFOODLOGITEMFAILURE,
  payload: response
})


export const updateQty = (jwt, foods) => {
  const newFoods = { ...foods, nf_calories: getFullNutrition(208, foods) };
  const headers = {
    ["x-user-jwt"]: jwt
  }
  const obj = {
    foods: [newFoods]
  }
  const response = axios({
    method: "PUT",
    url: ROOT_URL + "log",
    headers,
    data: obj
  });
  return {
    type: UPDATEQTY,
    payload: response
  }
}


export const updateQtyFailure = response => ({
  type: UPDATEQTYFAILURE,
  payload: response
})

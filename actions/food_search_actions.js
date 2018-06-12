import axios from "axios";
const ROOT_URL = "https://trackapi.nutritionix.com/v2/";

export const SEARCHFOOD = "SEARCHFOOD";
export const SEARCHFOODSUCCESS = "SEARCHFOODSUCCESS";
export const SEARCHFOODFAILURE = "SEARCHFOODFAILURE";
export const CLEARSEARCHRESULTS = "CLEARSEARCHRESULTS";

export const searchFood = (jwt, query) => {
  const path = "search/instant";
  const response = axios.get(ROOT_URL + path, {
    headers: { ["x-user-jwt"]: jwt },
    params: { query }
  });
  return {
    type: SEARCHFOOD,
    payload: response
  };
};

export const searchFoodSuccess = response => ({
  type: SEARCHFOODSUCCESS,
  payload: response
});

export const searchFoodFailure = response => ({
  type: SEARCHFOODFAILURE,
  payload: response
});

export const clearSearchResults = () => ({
  type: CLEARSEARCHRESULTS
});

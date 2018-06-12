import { SEARCHFOOD, SEARCHFOODSUCCESS, SEARCHFOODFAILURE, CLEARSEARCHRESULTS, CLEARERROR } from '../actions/index';

export function foodSearch(state = { foundFood: false, error:false}, action) {
  switch (action.type) {
    case SEARCHFOOD:
      return { ...state};
    case SEARCHFOODSUCCESS:
      return { ...state, foundFood: action.payload, error: false }
    case SEARCHFOODFAILURE:
      return { ...state, error: action.payload}
    case CLEARSEARCHRESULTS:
      return { ...state, foundFood: false}  
    case CLEARERROR:
      return { ...state, error: false };    
    default:
      return state;
  }
}

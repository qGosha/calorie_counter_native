import {
  GETFOODLOG,
  GETFOODLOGFAILURE,
  GETFOODLOGSUCCESS,
  DELETEFOODLOGITEM,
  DELETEFOODLOGITEMFAILURE,
  UPDATEQTY,
  UPDATEQTYSUCCESS,
  UPDATEQTYFAILURE,
  CLEARERROR
} from '../actions/index';

const initialState = {
  error: false,
  log: []
}
export function foodLog(state = initialState, action) {
  const payload = action.payload;
  switch (action.type) {
    case GETFOODLOG:
      return state;
    case GETFOODLOGFAILURE:
      return { ...state, error: payload};
    case GETFOODLOGSUCCESS:
      return { ...state, log: payload };
    case DELETEFOODLOGITEM:
      return state;
    case DELETEFOODLOGITEMFAILURE:
      return { ...state, error: payload };
    case UPDATEQTY:
      return state;    
    case UPDATEQTYFAILURE:
      return { ...state, error: payload }; 
    case CLEARERROR:
      return { ...state, error: false };         
    default:
      return state;
  }
}

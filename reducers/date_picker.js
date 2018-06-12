import {
  CHANGECURRENTDATE,
  GETMONTHREPORT,
  GETMONTHREPORTSUCCESS,
  GETMONTHREPORTFAILURE,
  CURRENTDATECALLIMIT,
  CLEARERROR
 } from '../actions/index';

 const initialState = {
   currentDate: new Date(),
   dates: [],
   error: false,
   currentDateLimit: false
 }
  export function dates (state = initialState, action) {
    const payload = action.payload;
    switch (action.type) {
      case CHANGECURRENTDATE:
        return { ...state, currentDate: payload};
      case GETMONTHREPORT:
        return { ...state, dates: [] };
      case GETMONTHREPORTSUCCESS:
        return {...state, dates: payload};
      case GETMONTHREPORTFAILURE:
        return { ...state, error: payload }
      case CURRENTDATECALLIMIT:
        return { ...state, currentDateLimit: payload } 
      case CLEARERROR:
        return { ...state, error: false };     
      default:
        return state;
    }
  }

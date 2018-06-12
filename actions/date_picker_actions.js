import axios from "axios";
import { dateFunc } from '../helpers/help_functions';
const ROOT_URL = "https://trackapi.nutritionix.com/v2/";


export const CHANGECURRENTDATE = "CHANGECURRENTDATE";
export const GETMONTHREPORT = "GETMONTHREPORT";
export const GETMONTHREPORTSUCCESS = "GETMONTHREPORTSUCCESS";
export const GETMONTHREPORTFAILURE = "GETMONTHREPORTFAILURE";
export const CURRENTDATECALLIMIT = "CURRENTDATECALLIMIT";

export const changeCurrentDate = date => ({
  type: CHANGECURRENTDATE,
  payload: date
})


export const getMonthReport = (jwt, date) => {
  const path = "reports/totals";
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const headers = {
    ["x-user-jwt"]: jwt
  }
  const currentDate = date || new Date();
  const query = {
   timezone,
   begin: dateFunc(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)),
   end: dateFunc(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0))
 }
   const response = axios({
      method: "GET",
      url: ROOT_URL + path,
      headers,
      params : query
    });

  return {
    type: GETMONTHREPORT,
    payload: response
  }
}


export const getMonthReportSuccess = response => ({
  type: GETMONTHREPORTSUCCESS,
  payload: response
})

export const getMonthReportFailure = response => ({
  type: GETMONTHREPORTFAILURE,
  payload: response
})


export const setCurrentDateCalLimit = response => ({
  type: CURRENTDATECALLIMIT,
  payload: response
});
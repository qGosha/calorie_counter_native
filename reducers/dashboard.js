import {
  GETUSEROBJECT,
  GETSUGGESTEDFOOD,
  FETCHUSEROBJECTSUCCESS,
  FETCHSUGGESTEDFOODSUCCESS,
  FETCHDASHINFOFAILURE,
  DASHBOARDLOADING,
  DASHBOARDLOADED,
  SETDAILYCAL,
  SETDAILYCALSUCCESS,
  SETDAILYCALFAILURE,
  SETDAILYCALNOTEREMOVE,
  CURRENTDATECALLIMIT,
  SIGNOUT,
  SETTIMEZONE
} from '../actions/index';


  const initialState = {
    userInfo: false,
    loaded: false,
    loading: false,
    suggestedFood:false,
    dailyCalUpSuccess: false,
    calLimitError: false,
    timezone: false
  }

export function dash (state = initialState, action) {
  switch (action.type) {
    case GETUSEROBJECT:
      return { ...state};
    case GETSUGGESTEDFOOD:
      return {...state};
    case FETCHUSEROBJECTSUCCESS:
      return { ...state, userInfo: action.payload }
    case FETCHSUGGESTEDFOODSUCCESS:
      return {...state, suggestedFood: action.payload }
    case FETCHDASHINFOFAILURE:
      return { ...state, loading:false }
    case DASHBOARDLOADING:
      return { ...state, loading: true }
    case DASHBOARDLOADED:
      return { ...state, loading: false, loaded: true }
    case SIGNOUT:
      return { ...state, loaded: false, userInfo: false }
    case SETDAILYCAL:
      return { ...state }
    case SETDAILYCALSUCCESS:
      return { ...state, userInfo: action.payload, dailyCalUpSuccess: true, calLimitError:false }
    case SETDAILYCALFAILURE:
      return { ...state, calLimitError: action.payload, dailyCalUpSuccess: false }
    case SETDAILYCALNOTEREMOVE:
      return { ...state, dailyCalUpSuccess: false, calLimitError: false}
    case SETTIMEZONE:
      return { ...state, timezone: action.payload }
    default:
      return state;
  }
}

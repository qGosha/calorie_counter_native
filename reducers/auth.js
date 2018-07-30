import {
  SHOWSPIN,
  SIGNUP,
  SIGNIN,
  SIGNINERROR,
  SIGNINSUCCESS,
  SIGNOUT,
  SIGNUPSUCCESS,
  SIGNUPERROR
} from '../actions/index';

export function auth (state = {
  logged: false,
  error: false,
  jwt: null,
  isFetching: false
  }, action) {
  switch (action.type) {
  case SIGNUP:
    return { ...state, error: false };
  case SIGNIN:
    return {...state, error: false};
  case SHOWSPIN:
    return { ...state, isFetching: true };
  case SIGNINSUCCESS:
    return {...state, logged: true, isFetching: false, jwt: action.payload};
  case SIGNINERROR:
    return {...state, isFetching: false};
  case SIGNOUT:
      return { ...state, logged: false, jwt:null }
  case SIGNUPSUCCESS:
      return { ...state, logged: true, isFetching: false, jwt: action.payload};
  case SIGNUPERROR:
      return { ...state, isFetching: false};
  default:
    return state;
  }
}

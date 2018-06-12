import {SHOWSPIN, SIGNUP, SIGNIN, SIGNINERROR, SIGNINSUCCESS, SIGNOUT, SIGNUPSUCCESS, SIGNUPERROR, SIGNUPVIEWON, SIGNUPVIEWOFF} from '../actions/index';
import jwtLib from 'jsonwebtoken';

const jwt = localStorage.getItem('jwt');
const jwtVerify = jwtLib.decode(jwt);

export function auth (state = {
  logged: (jwt && jwtVerify.exp > Date.now()/1000 - 5000) ? true : false,
  signup: false, error: false,
  isFetching: false
  }, action) {
let error;
  switch (action.type) {
  case SIGNUP:
    return { ...state, error: false };
  case SIGNIN:
    return {...state, error: false};
  case SHOWSPIN:
    return { ...state, isFetching: true };
  case SIGNINSUCCESS:
    return {...state, logged: true, isFetching: false};
  case SIGNINERROR:
    return {...state, error: action.payload, isFetching: false};
  case SIGNOUT:
      return { ...state, logged: false, userInfo: false}
  case SIGNUPVIEWON:
      return { ...state, signup: true, error: false};
  case SIGNUPSUCCESS:
      return { ...state, logged: true, isFetching: false};
  case SIGNUPERROR:
      return { ...state, error: action.payload, isFetching: false};
  case SIGNUPVIEWOFF:
      return { ...state, signup: false, error: false};
  default:
    return state;
  }
}

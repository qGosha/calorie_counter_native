import axios from "axios";
// const headers = {
//   "x-app-id": "62102386",
//   "x-app-key": "22ebb62ee3322813bd62ad63cab1e9f3",
//   "x-remote-user-id": 0
// };
const ROOT_URL = "https://trackapi.nutritionix.com/v2/";

export const SIGNUPVIEWON = "SIGNUPVIEWON";
export const SIGNUPVIEWOFF = "SIGNUPVIEWOFF";
export const SIGNUP = "SIGNUP";
export const SIGNINSUCCESS = "SIGNINSUCCESS";
export const SIGNINERROR = "SIGNINERROR";
export const SIGNUPSUCCESS = "SIGNUPSUCCESS";
export const SIGNUPERROR = "SIGNUPERROR";
export const SIGNIN = "SIGNIN";
export const SHOWSPIN = "SHOWSPIN";




export const showSignUp = () => ({
  type: SIGNUPVIEWON
});

export const hideSignUp = () => ({
  type: SIGNUPVIEWOFF
});

export const signUpUser = data => {
  const path = "auth/signup";
  const { password, email, first_name } = data;
  const response = axios.post(ROOT_URL + path, {
    password,
    email,
    first_name

  });
  return {
    type: SIGNUP,
    payload: response
  };
};

export const showSpinner = () => ({
  type: SHOWSPIN
});


export const signInUser = data => {
  const path = "auth/signin";
  const { password, email } = data;
  const response = axios.post(ROOT_URL + path, {
    password,
    email
  });
  return {
    type: SIGNIN,
    payload: response
  };
};

export const signInUserSuccess = response => ({
  type: SIGNINSUCCESS,
  payload: response
});

export const signInUserFailure = response => ({
  type: SIGNINERROR,
  payload: response
});


export const signUpUserSuccess = response => ({
  type: SIGNUPSUCCESS,
  payload: response
});


export const signUpUserFailure = response => ({
  type: SIGNUPERROR,
  payload: response
});

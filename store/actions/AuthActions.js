import * as axios from 'axios';
import { LOGIN, LOGIN_FAILED, SIGNUP, SET_LOADING } from "./Types"
import { SERVER_ROOT } from 'react-native-dotenv';
import { Actions } from "react-native-router-flux";


const login = (data, rememberMe) => {
  console.log(data);
  return {
    type: LOGIN,
    data: {userId: data.id, token: data.token, rememberMe: rememberMe}
  };
}

const loginFailed = (error) => {
  // TODO: Render error message (not "error" variable, something intuitive to a non-programmer) to prompt user to try again
  console.log("login failed: ");
  console.log(error);
  return {
    type: LOGIN_FAILED
  }
}

export const setLoading = (isLoading) => {
  return {
    type: SET_LOADING,
    data: {loading: isLoading}
  }
}

const signupFailed = (error) => {
  // TODO: Render error message (not "error" variable, something intuitive to a non-programmer) to prompt user to try again
  console.log("signup failed: ");
  console.log(error);
  return {
    type: SIGNUP_FAILED
  }
}

export const loginHandler = (credential, rememberMe) => {
  return (dispatch) => {
    axios.post('http://' + SERVER_ROOT + '/login', credential)
      .then(response => {
        dispatch(setLoading(false));
        dispatch(login(response.data, rememberMe));
        Actions.main();
      })
      .catch(error => {
        dispatch(setLoading(false));
        dispatch(loginFailed(error));
      })
  }
}

export const signupHandler = (userData) => {
  return (dispatch) => {
    axios.post('http://' + SERVER_ROOT + '/signup', userData)
    .then(response => {
      dispatch(setLoading(false));
      console.log(response.data);
      Actions.login();
    })
    .catch(error => {
      dispatch(setLoading(false));
      dispatch(signupFailed(error));
    })
  }
}


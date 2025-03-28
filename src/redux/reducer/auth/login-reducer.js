import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
  } from "../../action/auth/login-action";
  
  const initialState = {
    loading: false,
    user: null,
    error: "",
  };
  
  const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          user: action.payload,
          error: "",
        };
      case LOGIN_FAILURE:
        return {
          ...state,
          user: null,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default LoginReducer;
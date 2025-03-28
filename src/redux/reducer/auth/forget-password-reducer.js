import {
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAILURE,
  FORGET_PASSWORD_RESET,
} from "../../action/auth/forget-password-action";

const initialState = {
  loading: false,
  success: false,
  message: "",
  error: "",
};

const ForgetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        message: "",
        error: "",
      };
    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
        error: "",
      };
    case FORGET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        message: "",
        error: action.payload,
      };
    case FORGET_PASSWORD_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default ForgetPasswordReducer;

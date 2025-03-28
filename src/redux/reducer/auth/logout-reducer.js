import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "../../action/auth/logout-action";

const initialState = {
  loading: false,
  error: "",
  success: false,
};

const LogoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
        success: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        success: true,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export default LogoutReducer;

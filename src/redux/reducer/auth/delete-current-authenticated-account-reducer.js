import {
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
  RESET_DELETE_ACCOUNT_STATE,
} from "../../action/auth/delete-current-authenticated-account-action";

const initialState = {
  loading: false,
  success: false,
  message: "",
  error: "",
};

const DeleteCurrentAuthenticatedAccountReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case DELETE_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        message: "",
        error: "",
      };
    case DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload.message,
        error: "",
      };
    case DELETE_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        message: "",
        error: action.payload.error,
      };
    case RESET_DELETE_ACCOUNT_STATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default DeleteCurrentAuthenticatedAccountReducer;

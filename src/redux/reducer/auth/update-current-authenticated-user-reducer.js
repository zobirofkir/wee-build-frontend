import {
  UPDATE_CURRENT_USER_REQUEST,
  UPDATE_CURRENT_USER_SUCCESS,
  UPDATE_CURRENT_USER_FAILURE,
  RESET_UPDATE_USER_STATE,
} from "../../action/auth/update-current-authenticated-user-action";

const initialState = {
  loading: false,
  success: false,
  message: null,
  error: null,
};

const updateCurrentAuthenticatedUserReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case UPDATE_CURRENT_USER_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        message: null,
        error: null,
      };
    case UPDATE_CURRENT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
        error: null,
      };
    case UPDATE_CURRENT_USER_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        message: null,
        error: action.payload,
      };
    case RESET_UPDATE_USER_STATE:
      return initialState;
    default:
      return state;
  }
};

export default updateCurrentAuthenticatedUserReducer;

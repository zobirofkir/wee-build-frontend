import {
  GET_CURRENT_THEME_REQUEST,
  GET_CURRENT_THEME_SUCCESS,
  GET_CURRENT_THEME_FAILURE,
} from "../../action/store/get-current-theme-action";

const initialState = {
  loading: false,
  currentTheme: null,
  error: null,
};

const GetCurrentThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_THEME_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_CURRENT_THEME_SUCCESS:
      return {
        ...state,
        loading: false,
        currentTheme: action.payload,
        error: null,
      };
    case GET_CURRENT_THEME_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default GetCurrentThemeReducer;

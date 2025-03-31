import {
  UPDATE_THEME_REQUEST,
  UPDATE_THEME_SUCCESS,
  UPDATE_THEME_FAILURE,
} from "../../action/store/customize-current-theme-action";

const initialState = {
  loading: false,
  updatedTheme: null,
  error: null,
};

const CustomizeCurrentThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_THEME_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_THEME_SUCCESS:
      return {
        ...state,
        loading: false,
        updatedTheme: action.payload,
        error: null,
      };
    case UPDATE_THEME_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default CustomizeCurrentThemeReducer;

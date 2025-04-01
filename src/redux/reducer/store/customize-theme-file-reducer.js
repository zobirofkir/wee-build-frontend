import {
  GET_THEME_FILE_REQUEST,
  GET_THEME_FILE_SUCCESS,
  GET_THEME_FILE_FAILURE,
  UPDATE_THEME_FILE_REQUEST,
  UPDATE_THEME_FILE_SUCCESS,
  UPDATE_THEME_FILE_FAILURE,
} from "../../action/store/customize-theme-file-action";

const initialState = {
  loading: false,
  updating: false,
  currentFile: null,
  error: null,
  updateError: null,
};

const CustomizeThemeFileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_THEME_FILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_THEME_FILE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentFile: action.payload,
        error: null,
      };
    case GET_THEME_FILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_THEME_FILE_REQUEST:
      return {
        ...state,
        updating: true,
        updateError: null,
      };
    case UPDATE_THEME_FILE_SUCCESS:
      return {
        ...state,
        updating: false,
        currentFile: action.payload,
        updateError: null,
      };
    case UPDATE_THEME_FILE_FAILURE:
      return {
        ...state,
        updating: false,
        updateError: action.payload,
      };
    default:
      return state;
  }
};

export default CustomizeThemeFileReducer;

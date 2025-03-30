import {
  APPLY_THEME_REQUEST,
  APPLY_THEME_SUCCESS,
  APPLY_THEME_FAILURE,
} from "../../action/store/apply-theme-action";

const initialState = {
  loading: false,
  success: false,
  error: null,
  appliedTheme: null,
};

const ApplyThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPLY_THEME_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case APPLY_THEME_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        appliedTheme: action.payload,
        error: null,
      };
    case APPLY_THEME_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default ApplyThemeReducer; 
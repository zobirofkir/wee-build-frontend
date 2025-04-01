import {
  LIST_THEME_FILES_REQUEST,
  LIST_THEME_FILES_SUCCESS,
  LIST_THEME_FILES_FAILURE,
} from "../../action/store/list-theme-files-action";

const initialState = {
  loading: false,
  files: [],
  total: 0,
  error: null,
};

const ListThemeFilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_THEME_FILES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LIST_THEME_FILES_SUCCESS:
      return {
        ...state,
        loading: false,
        files: action.payload.files,
        total: action.payload.total,
        error: null,
      };
    case LIST_THEME_FILES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default ListThemeFilesReducer;

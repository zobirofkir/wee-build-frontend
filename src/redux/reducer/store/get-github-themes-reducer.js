import {
  GET_GITHUB_THEMES_REQUEST,
  GET_GITHUB_THEMES_SUCCESS,
  GET_GITHUB_THEMES_FAILURE,
} from "../../action/store/get-github-themes-action";

const initialState = {
  loading: false,
  themes: [],
  error: null,
};

const GetGithubThemesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GITHUB_THEMES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_GITHUB_THEMES_SUCCESS:
      return {
        ...state,
        loading: false,
        themes: action.payload,
        error: null,
      };
    case GET_GITHUB_THEMES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default GetGithubThemesReducer;

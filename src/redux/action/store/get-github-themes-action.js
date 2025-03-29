import axios from "axios";
import { getAuthToken } from "../../../utils/cookie-utils";

export const GET_GITHUB_THEMES_REQUEST = "GET_GITHUB_THEMES_REQUEST";
export const GET_GITHUB_THEMES_SUCCESS = "GET_GITHUB_THEMES_SUCCESS";
export const GET_GITHUB_THEMES_FAILURE = "GET_GITHUB_THEMES_FAILURE";

export const getGithubThemesRequest = () => ({
  type: GET_GITHUB_THEMES_REQUEST,
});

export const getGithubThemesSuccess = (themes) => ({
  type: GET_GITHUB_THEMES_SUCCESS,
  payload: themes,
});

export const getGithubThemesFailure = (error) => ({
  type: GET_GITHUB_THEMES_FAILURE,
  payload: error,
});

export const fetchGithubThemes = () => {

  return async (dispatch) => {
    dispatch(getGithubThemesRequest());

   /**
   * Get authentication token
   */
    try {
      const token = getAuthToken();

      if (!token) {
        throw new Error("No access token found");
      }

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_APP_URL}/auth/themes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const themes = response.data.themes;
      console.log(themes);
      dispatch(getGithubThemesSuccess(themes));
      return themes;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch themes";
      dispatch(getGithubThemesFailure(errorMessage));
      throw error;
    }
  };
};

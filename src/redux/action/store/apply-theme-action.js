import axios from "axios";
import { getAuthToken } from "../../../utils/cookie-utils";

export const APPLY_THEME_REQUEST = "APPLY_THEME_REQUEST";
export const APPLY_THEME_SUCCESS = "APPLY_THEME_SUCCESS";
export const APPLY_THEME_FAILURE = "APPLY_THEME_FAILURE";

export const applyThemeRequest = () => ({
  type: APPLY_THEME_REQUEST,
});

export const applyThemeSuccess = (themeData) => ({
  type: APPLY_THEME_SUCCESS,
  payload: themeData,
});

export const applyThemeFailure = (error) => ({
  type: APPLY_THEME_FAILURE,
  payload: error,
});

export const applyTheme = (themeIdOrName) => {
  return async (dispatch, getState) => {
    dispatch(applyThemeRequest());

    try {
      const token = getAuthToken();

      if (!token) {
        throw new Error("No access token found");
      }

      // Get the themes from the state
      const { themes } = getState().githubThemes;

      // Find the theme object by ID
      const themeObj = themes.find((theme) => theme.id === themeIdOrName);

      // Use the theme name if found, otherwise use the original value
      // This handles both cases: passing an ID or directly passing a name
      const themeName = themeObj ? themeObj.name : themeIdOrName;

      const url = `${process.env.REACT_APP_BACKEND_APP_URL}/auth/themes/${themeName}/apply`;
      console.log("Attempting to connect to:", url);

      const response = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const themeData = response.data;
      dispatch(applyThemeSuccess(themeData));
      return themeData;
    } catch (error) {
      console.error("Full error details:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to apply theme";
      dispatch(applyThemeFailure(errorMessage));
      throw error;
    }
  };
};

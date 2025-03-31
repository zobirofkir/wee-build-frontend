import axios from "axios";
import { getAuthToken } from "../../../utils/cookie-utils";

export const UPDATE_THEME_REQUEST = "UPDATE_THEME_REQUEST";
export const UPDATE_THEME_SUCCESS = "UPDATE_THEME_SUCCESS";
export const UPDATE_THEME_FAILURE = "UPDATE_THEME_FAILURE";

export const updateThemeRequest = () => ({
  type: UPDATE_THEME_REQUEST,
});

export const updateThemeSuccess = (data) => ({
  type: UPDATE_THEME_SUCCESS,
  payload: data,
});

export const updateThemeFailure = (error) => ({
  type: UPDATE_THEME_FAILURE,
  payload: error,
});

export const updateTheme = (themeOptions) => {
  return async (dispatch) => {
    dispatch(updateThemeRequest());

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("No access token found");
      }

      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_APP_URL}/auth/themes/customization/update`,
        {
          options: themeOptions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(updateThemeSuccess(response.data));
      console.log(response.data);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update theme";
      dispatch(updateThemeFailure(errorMessage));
      throw error;
    }
  };
};

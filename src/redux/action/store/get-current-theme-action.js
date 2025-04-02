import axios from "axios";
import { getAuthToken } from "../../../utils/cookie-utils";

export const GET_CURRENT_THEME_REQUEST = "GET_CURRENT_THEME_REQUEST";
export const GET_CURRENT_THEME_SUCCESS = "GET_CURRENT_THEME_SUCCESS";
export const GET_CURRENT_THEME_FAILURE = "GET_CURRENT_THEME_FAILURE";

export const getCurrentThemeRequest = () => ({
  type: GET_CURRENT_THEME_REQUEST,
});

export const getCurrentThemeSuccess = (data) => ({
  type: GET_CURRENT_THEME_SUCCESS,
  payload: data,
});

export const getCurrentThemeFailure = (error) => ({
  type: GET_CURRENT_THEME_FAILURE,
  payload: error,
});

export const fetchCurrentTheme = () => {
  return async (dispatch) => {
    dispatch(getCurrentThemeRequest());

    try {
      const token = getAuthToken();
      if (!token) {
        dispatch(getCurrentThemeFailure("No access token found"));
        return null;
      }

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_APP_URL}/auth/themes/customization/current`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(getCurrentThemeSuccess(response.data));
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch current theme";
      dispatch(getCurrentThemeFailure(errorMessage));
      return null;
    }
  };
};

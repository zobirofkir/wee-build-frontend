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

export const applyTheme = (themeId) => {
  return async (dispatch) => {
    dispatch(applyThemeRequest());

    try {
      const token = getAuthToken();

      if (!token) {
        throw new Error("No access token found");
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_APP_URL}/auth/store/apply-theme`,
        { themeId },
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
      const errorMessage =
        error.response?.data?.message || "Failed to apply theme";
      dispatch(applyThemeFailure(errorMessage));
      throw error;
    }
  };
}; 
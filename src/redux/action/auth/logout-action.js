import axios from "axios";
import { getAuthToken, clearAuthCookies } from "../../../utils/cookie-utils";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutFailure = (error) => ({
  type: LOGOUT_FAILURE,
  payload: error,
});

export const LogoutAction = () => {
  return async (dispatch) => {
    dispatch(logoutRequest());

    try {
      const token = getAuthToken();

      /**
       * Use the existing API endpoint with the token in the header
       */
      await axios.post(
        `${process.env.REACT_APP_BACKEND_APP_URL}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      /**
       * Clear all authentication cookies
       */
      clearAuthCookies();

      /**
       * Clear any remaining user data from localStorage if needed
       */
      localStorage.removeItem("rememberedEmail");

      // Dispatch success action
      dispatch(logoutSuccess());

      /**
       * Redirect to login page
       */
      window.location.href = "/auth/login";
    } catch (error) {
      console.error("Logout error:", error);

      /**
       * Even if the API call fails, we should still clear cookies
       */
      clearAuthCookies();

      const errorMessage =
        error.response?.data?.message || "Failed to logout. Please try again.";
      dispatch(logoutFailure(errorMessage));

      /**
       * Still redirect to login page
       */
      window.location.href = "/auth/login";
    }
  };
};

import axios from "axios";

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
      const token = localStorage.getItem("accessToken");

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
       * Clear all authentication data from localStorage
       */
      localStorage.removeItem("accessToken");
      localStorage.removeItem("name");
      localStorage.removeItem("email");

      /**
       * Dispatch success action
       */
      dispatch(logoutSuccess());

      /**
       * Redirect to login page
       */
      window.location.href = "/auth/login";
    } catch (error) {
      console.error("Logout error:", error);

      /**
       * Even if the API call fails, we should still clear local storage and redirect
       */
      localStorage.removeItem("accessToken");
      localStorage.removeItem("name");
      localStorage.removeItem("email");

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

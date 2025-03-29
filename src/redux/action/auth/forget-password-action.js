import axios from "axios";

export const FORGET_PASSWORD_REQUEST = "FORGET_PASSWORD_REQUEST";
export const FORGET_PASSWORD_SUCCESS = "FORGET_PASSWORD_SUCCESS";
export const FORGET_PASSWORD_FAILURE = "FORGET_PASSWORD_FAILURE";
export const FORGET_PASSWORD_RESET = "FORGET_PASSWORD_RESET";

export const forgetPasswordRequest = () => ({
  type: FORGET_PASSWORD_REQUEST,
});

export const forgetPasswordSuccess = (message) => ({
  type: FORGET_PASSWORD_SUCCESS,
  payload: message,
});

export const forgetPasswordFailure = (error) => ({
  type: FORGET_PASSWORD_FAILURE,
  payload: error,
});

export const forgetPasswordReset = () => ({
  type: FORGET_PASSWORD_RESET,
});

export const ForgetPasswordAction = (email) => {
  return async (dispatch) => {
    dispatch(forgetPasswordRequest());

    try {
      /**
       * Make API request to forget password endpoint
       */
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_APP_URL}/auth/password/email`,
        { email }
      );

      /**
       * Dispatch success with the response message based on status code
       */
      if (response.status >= 200 && response.status < 300) {
        const successMessage =
          response.data.message ||
          "Password reset link has been sent to your email.";
        dispatch(forgetPasswordSuccess(successMessage));
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Forget password error:", error);

      /**
       * Handle error and dispatch failure based on status code
       */
      let errorMessage = "Failed to send reset link. Please try again.";

      if (error.response) {

        const statusCode = error.response.status;

        if (statusCode === 404) {
          errorMessage = "Email address not found in our records.";
        } else if (statusCode === 429) {
          errorMessage = "Too many attempts. Please try again later.";
        } else if (statusCode >= 400 && statusCode < 500) {
          errorMessage =
            error.response.data.message ||
            "Invalid request. Please check your email and try again.";
        } else if (statusCode >= 500) {
          errorMessage = "Server error. Please try again later.";
        }
      } else if (error.request) {
        /**
         * The request was made but no response was received
         */
        errorMessage =
          "No response from server. Please check your internet connection.";
      }

      dispatch(forgetPasswordFailure(errorMessage));
    }
  };
};

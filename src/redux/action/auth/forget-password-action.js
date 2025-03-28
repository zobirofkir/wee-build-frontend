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
       * Dispatch success with the response message
       */
      const successMessage =
        response.data.message ||
        "Password reset link has been sent to your email.";
      dispatch(forgetPasswordSuccess(successMessage));
    } catch (error) {
      console.error("Forget password error:", error);

      /**
       * Handle error and dispatch failure
       */
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send reset link. Please try again.";
      dispatch(forgetPasswordFailure(errorMessage));
    }
  };
};

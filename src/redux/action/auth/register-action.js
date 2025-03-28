import axios from "axios";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const registerRequest = () => ({
  type: REGISTER_REQUEST,
});

export const registerSuccess = (userData) => ({
  type: REGISTER_SUCCESS,
  payload: userData,
});

export const registerFailure = (error, validationErrors = null) => ({
  type: REGISTER_FAILURE,
  payload: { message: error, validationErrors },
});

export const RegisterAction = (name, email, password) => {
  return async (dispatch) => {
    dispatch(registerRequest());
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_APP_URL}/auth/register`,
        {
          name,
          email,
          password,
          username: email.split("@")[0], // Generate a username from email if needed
        }
      );

      const data = response.data.data;
      dispatch(registerSuccess(data));

      // Redirect to login page after successful registration
      window.location.href = "/auth/login";
    } catch (error) {
      let errorMessage = "An error occurred. Please try again.";
      let validationErrors = null;

      if (error.response) {
        // Handle validation errors (422 status)
        if (error.response.status === 422 && error.response.data.errors) {
          errorMessage = error.response.data.message || errorMessage;
          validationErrors = error.response.data.errors;
        } else {
          errorMessage = error.response.data.message || errorMessage;
        }
      }

      dispatch(registerFailure(errorMessage, validationErrors));
    }
  };
};

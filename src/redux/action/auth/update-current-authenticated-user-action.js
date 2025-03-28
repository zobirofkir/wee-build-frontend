import axios from "axios";
import { getCurrentAuthenticatedUser } from "./get-current-authenticated-user-action";
import { getAuthToken } from "../../../utils/cookie-utils";

export const UPDATE_CURRENT_USER_REQUEST = "UPDATE_CURRENT_USER_REQUEST";
export const UPDATE_CURRENT_USER_SUCCESS = "UPDATE_CURRENT_USER_SUCCESS";
export const UPDATE_CURRENT_USER_FAILURE = "UPDATE_CURRENT_USER_FAILURE";
export const RESET_UPDATE_USER_STATE = "RESET_UPDATE_USER_STATE";

export const updateCurrentUserRequest = () => ({
  type: UPDATE_CURRENT_USER_REQUEST,
});

export const updateCurrentUserSuccess = (message) => ({
  type: UPDATE_CURRENT_USER_SUCCESS,
  payload: message,
});

export const updateCurrentUserFailure = (error) => ({
  type: UPDATE_CURRENT_USER_FAILURE,
  payload: error,
});

export const resetUpdateUserState = () => ({
  type: RESET_UPDATE_USER_STATE,
});

export const updateCurrentAuthenticatedUser = (userData) => {
  return async (dispatch) => {
    dispatch(updateCurrentUserRequest());

    try {
      /**
       * Get token from cookie instead of localStorage
       */
      const token = getAuthToken();

      if (!token) {
        throw new Error("No access token found");
      }

      /**
       * Map form data to the format expected by the API if needed
       */
      const apiData = {
        username: userData.username || userData.email, // Ensure username is provided
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        location: userData.location,
        account_type: userData.account_type || "free", // Add account_type field with default value
        // Add password fields only if password is provided
        ...(userData.password
          ? {
              password: userData.password,
              password_confirmation: userData.password_confirmation,
            }
          : {}),
      };

      /**
       * The axios interceptor will automatically add the token to the request headers
       * but we're keeping the explicit headers here for clarity
       */
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_APP_URL}/auth/update`,
        apiData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const successMessage =
        response.data.message || "Profile updated successfully";
      dispatch(updateCurrentUserSuccess(successMessage));

      /**
       * Refresh user data after successful update
       */
      dispatch(getCurrentAuthenticatedUser());

      return successMessage;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update user profile";
      dispatch(updateCurrentUserFailure(errorMessage));
      throw error;
    }
  };
};

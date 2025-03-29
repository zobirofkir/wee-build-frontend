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
      const token = getAuthToken();

      if (!token) {
        throw new Error("No access token found");
      }

      let apiData;
      let headers = {
        Authorization: `Bearer ${token}`,
      };

      /**
       * Check if userData is FormData (for file uploads) or regular object
       */
      if (userData instanceof FormData) {
        apiData = userData;
        
        apiData.append('_method', 'PUT');
        
        console.log("FormData contents:");
        for (let pair of apiData.entries()) {
          console.log(pair[0] + ': ' + (pair[0] === 'avatar' ? 'File object' : pair[1]));
        }
      } else {
        apiData = new FormData();
        
        apiData.append('_method', 'PUT');
        
        apiData.append('name', userData.name);
        apiData.append('email', userData.email);
        apiData.append('username', userData.username || userData.email);
        apiData.append('account_type', userData.account_type || 'free');
        
        if (userData.phone) apiData.append('phone', userData.phone);
        if (userData.location) apiData.append('location', userData.location);
        
        if (userData.avatar) {
          apiData.append('avatar', userData.avatar);
        }
        
        /**
         * Add password fields only if password is provided
         */
        if (userData.password) {
          apiData.append('password', userData.password);
          apiData.append('password_confirmation', userData.password_confirmation);
        }
      }

      /**
       * Send the request with FormData - use POST for file uploads
       */
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_APP_URL}/auth/update`,
        apiData,
        { headers }
      );

      const successMessage = response.data.message || "Profile updated successfully";
      dispatch(updateCurrentUserSuccess(successMessage));
      
      /**
       * Refresh user data after successful update
       */
      dispatch(getCurrentAuthenticatedUser());

      return successMessage;
    } catch (error) {
      console.error("Update user error:", error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || "Failed to update user profile";
      dispatch(updateCurrentUserFailure(errorMessage));
      throw error;
    }
  };
};

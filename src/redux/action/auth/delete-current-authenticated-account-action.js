import axios from "axios";
import { getAuthToken } from "../../../utils/cookie-utils";
import {LogoutAction} from "./logout-action";

export const DELETE_ACCOUNT_REQUEST = "DELETE_ACCOUNT_REQUEST";
export const DELETE_ACCOUNT_SUCCESS = "DELETE_ACCOUNT_SUCCESS";
export const DELETE_ACCOUNT_FAILURE = "DELETE_ACCOUNT_FAILURE";
export const RESET_DELETE_ACCOUNT_STATE = "RESET_DELETE_ACCOUNT_STATE";

export const deleteAccountRequest = () => ({
  type: DELETE_ACCOUNT_REQUEST,
});

export const deleteAccountSuccess = (message) => ({
  type: DELETE_ACCOUNT_SUCCESS,
  payload: { message },
});

export const deleteAccountFailure = (error) => ({
  type: DELETE_ACCOUNT_FAILURE,
  payload: { error },
});

export const resetDeleteAccountState = () => ({
  type: RESET_DELETE_ACCOUNT_STATE,
});

export const deleteCurrentAuthenticatedAccount = (password) => {
  return async (dispatch) => {
    dispatch(deleteAccountRequest());
    try {
      const token = getAuthToken();

      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_APP_URL}/auth/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { password },
        }
      );

      dispatch(
        deleteAccountSuccess(
          response.data.message || "Account deleted successfully"
        )
      );
      
      dispatch(LogoutAction());

      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      window.location.href = "/auth/login";
    } catch (error) {
      let errorMessage = "Failed to delete account. Please try again.";

      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }

      dispatch(deleteAccountFailure(errorMessage));
    }
  };
};

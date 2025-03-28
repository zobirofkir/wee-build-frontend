import axios from "axios";

export const GET_CURRENT_USER_REQUEST = "GET_CURRENT_USER_REQUEST";
export const GET_CURRENT_USER_SUCCESS = "GET_CURRENT_USER_SUCCESS";
export const GET_CURRENT_USER_FAILURE = "GET_CURRENT_USER_FAILURE";

export const getCurrentUserRequest = () => ({
  type: GET_CURRENT_USER_REQUEST,
});

export const getCurrentUserSuccess = (userData) => ({
  type: GET_CURRENT_USER_SUCCESS,
  payload: userData,
});

export const getCurrentUserFailure = (error) => ({
  type: GET_CURRENT_USER_FAILURE,
  payload: error,
});

export const getCurrentAuthenticatedUser = () => {
  return async (dispatch) => {
    dispatch(getCurrentUserRequest());

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("No access token found");
      }

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_APP_URL}/auth/show`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userData = response.data.data;
      dispatch(getCurrentUserSuccess(userData));
      return userData;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch user profile";
      dispatch(getCurrentUserFailure(errorMessage));
      throw error;
    }
  };
};

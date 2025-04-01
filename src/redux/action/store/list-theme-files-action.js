import axios from "axios";
import { getAuthToken } from "../../../utils/cookie-utils";

export const LIST_THEME_FILES_REQUEST = "LIST_THEME_FILES_REQUEST";
export const LIST_THEME_FILES_SUCCESS = "LIST_THEME_FILES_SUCCESS";
export const LIST_THEME_FILES_FAILURE = "LIST_THEME_FILES_FAILURE";

export const listThemeFilesRequest = () => ({
  type: LIST_THEME_FILES_REQUEST,
});

export const listThemeFilesSuccess = (data) => ({
  type: LIST_THEME_FILES_SUCCESS,
  payload: data,
});

export const listThemeFilesFailure = (error) => ({
  type: LIST_THEME_FILES_FAILURE,
  payload: error,
});

export const listThemeFiles = () => {
  return async (dispatch) => {
    dispatch(listThemeFilesRequest());

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("No access token found");
      }

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_APP_URL}/auth/themes/customization/files`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(listThemeFilesSuccess(response.data));
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch theme files";
      dispatch(listThemeFilesFailure(errorMessage));
      throw error;
    }
  };
};

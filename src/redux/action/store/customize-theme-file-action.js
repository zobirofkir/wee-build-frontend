import axios from "axios";
import { getAuthToken } from "../../../utils/cookie-utils";

export const GET_THEME_FILE_REQUEST = "GET_THEME_FILE_REQUEST";
export const GET_THEME_FILE_SUCCESS = "GET_THEME_FILE_SUCCESS";
export const GET_THEME_FILE_FAILURE = "GET_THEME_FILE_FAILURE";

export const UPDATE_THEME_FILE_REQUEST = "UPDATE_THEME_FILE_REQUEST";
export const UPDATE_THEME_FILE_SUCCESS = "UPDATE_THEME_FILE_SUCCESS";
export const UPDATE_THEME_FILE_FAILURE = "UPDATE_THEME_FILE_FAILURE";

export const getThemeFileRequest = () => ({
  type: GET_THEME_FILE_REQUEST,
});

export const getThemeFileSuccess = (data) => ({
  type: GET_THEME_FILE_SUCCESS,
  payload: data,
});

export const getThemeFileFailure = (error) => ({
  type: GET_THEME_FILE_FAILURE,
  payload: error,
});

export const updateThemeFileRequest = () => ({
  type: UPDATE_THEME_FILE_REQUEST,
});

export const updateThemeFileSuccess = (data) => ({
  type: UPDATE_THEME_FILE_SUCCESS,
  payload: data,
});

export const updateThemeFileFailure = (error) => ({
  type: UPDATE_THEME_FILE_FAILURE,
  payload: error,
});

/**
 * Action Creators
 * @param {*} filePath 
 * @returns 
 */
export const getThemeFile = (filePath) => {
  return async (dispatch) => {
    dispatch(getThemeFileRequest());

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("No access token found");
      }

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_APP_URL}/auth/themes/customization/file`,
        {
          params: { file_path: filePath },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(getThemeFileSuccess(response.data));
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to get theme file";
      dispatch(getThemeFileFailure(errorMessage));
      return null;
    }
  };
};

export const updateThemeFile = (filePath, content) => {
  return async (dispatch) => {
    dispatch(updateThemeFileRequest());

    try {
      const token = getAuthToken();

      if (!content || content.trim() === "") {
        throw new Error("Content cannot be empty");
      }

      if (!token) {
        throw new Error("No access token found");
      }

      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_APP_URL}/auth/themes/customization/file`,
        {
          file_path: filePath,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(updateThemeFileSuccess(response.data));
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update theme file";
      dispatch(updateThemeFileFailure(errorMessage));
      return null;
    }
  };
};

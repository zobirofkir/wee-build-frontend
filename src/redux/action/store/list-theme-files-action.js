import axios from "axios";
import { getAuthToken } from "../../../utils/cookie-utils";

export const LIST_THEME_FILES_REQUEST = "LIST_THEME_FILES_REQUEST";
export const LIST_THEME_FILES_SUCCESS = "LIST_THEME_FILES_SUCCESS";
export const LIST_THEME_FILES_FAILURE = "LIST_THEME_FILES_FAILURE";

export const listThemeFilesRequest = () => ({
  type: LIST_THEME_FILES_REQUEST,
});

export const listThemeFilesSuccess = (data) => {
  console.log("Success action data:", data);
  return {
    type: LIST_THEME_FILES_SUCCESS,
    payload: {
      files: data.data || [],
      total: data.data ? data.data.length : 0,
    },
  };
};

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
        `${process.env.REACT_APP_BACKEND_APP_URL}/auth/themes/customization/file`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Full API Response:", response);
      console.log("Response data:", response.data);

      // Handle different possible response structures
      let files = [];
      let total = 0;

      if (response.data) {
        // Case 1: response.data is an array
        if (Array.isArray(response.data)) {
          files = response.data.filter((file) => {
            // Get file extension from path
            const extension = file.path.split(".").pop().toLowerCase();
            // Only include CSS, JS, and HTML files
            const allowedTypes = ["css", "js", "html"];
            return allowedTypes.includes(extension);
          });
          total = files.length;
        }
        // Case 2: response.data has a data property that's an array
        else if (response.data.data && Array.isArray(response.data.data)) {
          files = response.data.data.filter((file) => {
            // Get file extension from path
            const extension = file.path.split(".").pop().toLowerCase();
            // Only include CSS, JS, and HTML files
            const allowedTypes = ["css", "js", "html"];
            return allowedTypes.includes(extension);
          });
          total = files.length;
        }
        // Case 3: response.data has a files property that's an array
        else if (response.data.files && Array.isArray(response.data.files)) {
          files = response.data.files.filter((file) => {
            // Get file extension from path
            const extension = file.path.split(".").pop().toLowerCase();
            // Only include CSS, JS, and HTML files
            const allowedTypes = ["css", "js", "html"];
            return allowedTypes.includes(extension);
          });
          total = files.length;
        } else {
          console.error("Unexpected response structure:", response.data);
          throw new Error(
            "Invalid response format: Expected an array of files"
          );
        }
      }

      dispatch(listThemeFilesSuccess({ data: files, total }));
      return { data: files, total };
    } catch (error) {
      console.error("Error fetching theme files:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch theme files";
      dispatch(listThemeFilesFailure(errorMessage));
      return null;
    }
  };
};

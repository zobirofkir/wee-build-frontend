import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getThemeFile,
  updateThemeFile,
} from "../../redux/action/store/customize-theme-file-action";

const ThemeFileEditorComponent = ({ filePath }) => {
  const dispatch = useDispatch();
  const { loading, updating, currentFile, error, updateError } = useSelector(
    (state) => state.customizeThemeFile
  );
  const [content, setContent] = useState("");

  useEffect(() => {
    if (filePath) {
      dispatch(getThemeFile(filePath));
    }
  }, [dispatch, filePath]);

  useEffect(() => {
    if (currentFile) {
      setContent(currentFile.content || "");
    }
  }, [currentFile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateThemeFile(filePath, content));
    } catch (error) {
      console.error("Failed to update theme file:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-6 rounded-xl border border-red-100 dark:border-red-800">
        <p className="font-medium">Error loading file: {error}</p>
        <button
          onClick={() => dispatch(getThemeFile(filePath))}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Edit Theme File: {filePath}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-[600px] p-4 font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
            placeholder="Enter your file content here..."
          />
        </div>

        {updateError && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-xl border border-red-100 dark:border-red-800">
            <p className="font-medium">Error updating file: {updateError}</p>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={updating}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl hover:from-purple-700 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:hover:scale-100 disabled:hover:shadow-lg"
          >
            {updating ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </span>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ThemeFileEditorComponent;

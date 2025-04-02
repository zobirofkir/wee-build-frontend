import React from "react";
import { getFileIcon } from "../../../utils/get-file-icon";

const EditorHeader = ({
  fileName,
  filePath,
  isFileListVisible,
  onToggleFileList,
  updateError,
  updating,
  onSave,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button
          onClick={onToggleFileList}
          className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={isFileListVisible ? "Hide file list" : "Show file list"}
        >
          <svg
            className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300 transform transition-transform ${
              isFileListVisible ? "rotate-0" : "rotate-180"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <div>
          <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white flex items-center">
            {getFileIcon(fileName)}
            <span className="ml-2 truncate max-w-[200px] sm:max-w-[300px]">
              {fileName}
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 break-all">
            {filePath}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {updateError && (
          <span className="text-xs sm:text-sm text-red-600 dark:text-red-400 flex items-center">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            {updateError}
          </span>
        )}
        <button
          onClick={onSave}
          disabled={updating}
          className="px-3 sm:px-4 py-1.5 sm:py-2 md:flex hidden bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center text-sm shadow-sm"
        >
          {updating ? (
            <>
              <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-white border-t-transparent mr-1.5 sm:mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              Save
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default EditorHeader;

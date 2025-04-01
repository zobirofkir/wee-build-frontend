import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAuthToken } from "../../utils/cookie-utils";
import axios from "axios";

const ThemeFileEditorComponent = ({
  filePath,
  fileName,
  files,
  onFileSelect,
}) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isFileListVisible, setIsFileListVisible] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchFileContent();
  }, [filePath]);

  useEffect(() => {
    // Set initial selected file
    if (files && files.length > 0) {
      const currentFile = files.find((f) => f.path === filePath);
      setSelectedFile(currentFile);
    }
  }, [files, filePath]);

  const fetchFileContent = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = getAuthToken();

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_APP_URL}/auth/themes/customization/file`,
        {
          params: {
            file_path: filePath,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContent(response.data.content);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch file content");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSaveError(null);
      setSaveSuccess(false);
      const token = getAuthToken();

      await axios.put(
        `${process.env.REACT_APP_BACKEND_APP_URL}/auth/themes/customization/file`,
        {
          file_path: filePath,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSaveSuccess(true);
    } catch (error) {
      setSaveError(error.response?.data?.message || "Failed to save file");
    } finally {
      setSaving(false);
    }
  };

  const handleFileClick = (file) => {
    setSelectedFile(file);
    onFileSelect(file);
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    switch (extension) {
      case "css":
        return (
          <svg
            className="w-4 h-4 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
            />
          </svg>
        );
      case "js":
      case "jsx":
        return (
          <svg
            className="w-4 h-4 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        );
      case "html":
        return (
          <svg
            className="w-4 h-4 text-orange-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-purple-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-lg mb-4">
          <p className="font-medium">{error}</p>
        </div>
        <button
          onClick={fetchFileContent}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Editor Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsFileListVisible(!isFileListVisible)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={isFileListVisible ? "Hide file list" : "Show file list"}
          >
            <svg
              className={`w-5 h-5 text-gray-600 dark:text-gray-300 transform transition-transform ${
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
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
              {getFileIcon(fileName)}
              <span className="ml-2">{fileName}</span>
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 break-all">
              {filePath}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {saveSuccess && (
            <span className="text-sm text-green-600 dark:text-green-400 flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Saved successfully!
            </span>
          )}
          {saveError && (
            <span className="text-sm text-red-600 dark:text-red-400 flex items-center">
              <svg
                className="w-4 h-4 mr-1"
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
              {saveError}
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4 mr-2"
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

      {/* Editor Content */}
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="flex h-full">
          {/* File List Sidebar */}
          <div
            className={`${
              isFileListVisible ? "w-64" : "w-0"
            } transition-all duration-300 overflow-hidden border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900`}
          >
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
                Theme Files
              </h3>
              <div className="space-y-2">
                {files?.map((file) => (
                  <button
                    key={file.path}
                    onClick={() => handleFileClick(file)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      selectedFile?.path === file.path
                        ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {getFileIcon(file.name)}
                        <span className="ml-2 truncate">{file.name}</span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {(file.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Editor Area */}
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-full p-4 font-mono text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 resize-none focus:outline-none"
              spellCheck="false"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeFileEditorComponent;

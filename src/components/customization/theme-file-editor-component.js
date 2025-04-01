import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAuthToken } from "../../utils/cookie-utils";
import axios from "axios";

const ThemeFileEditorComponent = ({ filePath, fileName }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchFileContent();
  }, [filePath]);

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
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {fileName}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{filePath}</p>
        </div>
        <div className="flex items-center space-x-2">
          {saveSuccess && (
            <span className="text-sm text-green-600 dark:text-green-400">
              Saved successfully!
            </span>
          )}
          {saveError && (
            <span className="text-sm text-red-600 dark:text-red-400">
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
              "Save"
            )}
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 bg-gray-900 rounded-lg overflow-hidden">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full p-4 font-mono text-sm text-gray-100 bg-gray-900 resize-none focus:outline-none"
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default ThemeFileEditorComponent;

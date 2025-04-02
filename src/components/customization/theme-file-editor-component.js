import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Editor from "@monaco-editor/react";
import {
  getThemeFile,
  updateThemeFile,
} from "../../redux/action/store/customize-theme-file-action";

const ThemeFileEditorComponent = ({
  filePath,
  fileName,
  files,
  onFileSelect,
  isFileListVisible,
  onToggleFileList,
}) => {
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const dispatch = useDispatch();

  const { loading, error, currentFile, updating, updateError } = useSelector(
    (state) => state.customizeThemeFile
  );

  // Get the current theme from the system
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Handle window resize with debounce
  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
        if (editorRef.current) {
          editorRef.current.layout();
        }
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (filePath) {
      dispatch(getThemeFile(filePath));
    }
  }, [filePath, dispatch]);

  useEffect(() => {
    if (currentFile?.content) {
      setContent(currentFile.content);
    }
  }, [currentFile]);

  useEffect(() => {
    if (files && files.length > 0) {
      const currentFile = files.find((f) => f.path === filePath);
      setSelectedFile(currentFile);
    }
  }, [files, filePath]);

  // Handle editor mount
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    // Initial layout
    setTimeout(() => {
      editor.layout();
    }, 0);
  };

  // Handle container resize
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (editorRef.current) {
        editorRef.current.layout();
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const handleSave = async () => {
    try {
      await dispatch(updateThemeFile(filePath, content));
    } catch (error) {
      console.error("Failed to save file:", error);
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
          onClick={() => dispatch(getThemeFile(filePath))}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen sm:h-full relative">
      {/* Editor Header */}
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
            onClick={handleSave}
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

      {/* Editor Content */}
      <div
        ref={containerRef}
        className="flex-1 bg-white dark:bg-gray-800 overflow-hidden relative"
      >
        <div className="flex h-full">
          {/* Editor Area */}
          <div className="flex-1">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              theme={isDarkMode ? "vs-dark" : "light"}
              value={content}
              onChange={setContent}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: !isMobile },
                fontSize: isMobile ? 12 : 14,
                lineNumbers: "on",
                roundedSelection: false,
                scrollBeyondLastLine: false,
                readOnly: false,
                automaticLayout: true,
                wordWrap: isMobile ? "on" : "off",
                padding: { top: 10, bottom: isMobile ? 80 : 60 },
                renderWhitespace: "selection",
                tabSize: 2,
                insertSpaces: true,
                bracketPairColorization: {
                  enabled: true,
                },
                guides: {
                  indentation: true,
                },
                folding: true,
                lineDecorationsWidth: 0,
                lineNumbersMinChars: 3,
                renderLineHighlight: "all",
                scrollbar: {
                  vertical: "visible",
                  horizontal: "visible",
                  useShadows: false,
                  verticalScrollbarSize: 10,
                  horizontalScrollbarSize: 10,
                  arrowSize: 30,
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Fixed Save Button at Bottom for Mobile */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 flex justify-end shadow-lg">
          <button
            onClick={handleSave}
            disabled={updating}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center text-sm shadow-md w-full justify-center"
          >
            {updating ? (
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
                Save Changes
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeFileEditorComponent;

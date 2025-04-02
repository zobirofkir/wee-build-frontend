import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getThemeFile,
  updateThemeFile,
} from "../../redux/action/store/customize-theme-file-action";
import EditorHeaderComponent from "./editor/editor-header-component";
import EditorContentComponent from "./editor/editor-content-component";
import MobileSaveButtonComponent from "./editor/mobile-save-button-component";

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

  /**
   * Get the current theme from the system
   */
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  /**
   * Handle window resize with debounce
   */
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
  }, [files, filePath, setSelectedFile]);

  const handleSave = async () => {
    try {
      await dispatch(updateThemeFile(filePath, content));
    } catch (error) {
      console.error("Failed to save file:", error);
    }
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
      <EditorHeaderComponent
        fileName={fileName}
        filePath={filePath}
        isFileListVisible={isFileListVisible}
        onToggleFileList={onToggleFileList}
        updateError={updateError}
        updating={updating}
        onSave={handleSave}
      />

      <EditorContentComponent
        content={content}
        onContentChange={setContent}
        isDarkMode={isDarkMode}
        isMobile={isMobile}
        containerRef={containerRef}
        onEditorMount={(editor) => (editorRef.current = editor)}
      />

      {isMobile && <MobileSaveButtonComponent updating={updating} onSave={handleSave} />}
    </div>
  );
};

export default ThemeFileEditorComponent;

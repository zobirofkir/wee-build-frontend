import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentTheme } from "../../redux/action/store/get-current-theme-action";
import { updateTheme } from "../../redux/action/store/customize-current-theme-action";
import { listThemeFiles } from "../../redux/action/store/list-theme-files-action";
import AuthAppLayout from "../../layouts/auth/auth-app-layout";
import PreviewSectionLeftSideComponent from "../../components/customization/preview-section-left-side-component";
import EditorRightSideComponent from "../../components/customization/editor-right-side-component";
import ThemeFileEditorComponent from "../../components/customization/theme-file-editor-component";
import FileListSidebar from "../../components/customization/file-list-sidebare-component";
import ThemePagePromptCustomizerComponent from "../../components/customization/theme-page-prompt-customizer-component";
import { presetSchemes } from "../../config/theme-config";
import { useThemeManagementHook } from "../../hooks/use-theme-management-hook";

const CustomizeTheme = () => {
  const dispatch = useDispatch();
  const {
    files,
    loading: filesLoading,
    error: filesError,
  } = useSelector((state) => state.themeFiles);

  const {
    currentTheme,
    loading,
    error,
    updateLoading,
    updateError,
    themeOptions,
    originalTheme,
    handleColorChange,
    handleTypographyChange,
    handleLayoutChange,
    applyPresetScheme,
    handleSubmit,
  } = useThemeManagementHook();

  const [isPreviewMode, setIsPreviewMode] = useState(true);
  const [activeTab, setActiveTab] = useState("visual");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileType, setSelectedFileType] = useState("all");
  const [expandedSections, setExpandedSections] = useState({
    html: true,
    css: true,
    js: true,
  });
  const [isFileListVisible, setIsFileListVisible] = useState(true);

  useEffect(() => {
    dispatch(listThemeFiles());
  }, [dispatch]);

  const toggleSection = (type) => {
    setExpandedSections((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setActiveTab("code");
  };

  if (loading || filesLoading) {
    return (
      <AuthAppLayout>
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent shadow-lg"></div>
        </div>
      </AuthAppLayout>
    );
  }

  if (error || filesError) {
    return (
      <AuthAppLayout>
        <div className="min-h-screen p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-2xl mx-auto bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-8 rounded-2xl shadow-xl border border-red-100 dark:border-red-800">
            <p className="text-lg font-medium mb-6">
              Please Select a Theme First .
            </p>
            <button
              onClick={() => {
                dispatch(fetchCurrentTheme());
                dispatch(listThemeFiles());
              }}
              className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Try again
            </button>
          </div>
        </div>
      </AuthAppLayout>
    );
  }

  return (
    <AuthAppLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {currentTheme && (
          <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
            {/* Preview Section - Left Side */}
            <div
              className={`w-full ${
                isPreviewMode ? "lg:w-1/2" : "lg:w-0"
              } transition-all duration-300 overflow-hidden`}
            >
              <div className="h-full bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700">
                <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                      Theme Preview
                    </h2>
                    <button
                      onClick={() => setIsPreviewMode(!isPreviewMode)}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      aria-label={
                        isPreviewMode ? "Hide preview" : "Show preview"
                      }
                    >
                      <svg
                        className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300 transform transition-transform ${
                          isPreviewMode ? "rotate-0" : "rotate-180"
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
                  </div>
                </div>
                <PreviewSectionLeftSideComponent
                  isPreviewMode={isPreviewMode}
                  currentTheme={currentTheme}
                />
              </div>
            </div>

            {/* Editor Section - Right Side */}
            <div
              className={`w-full ${
                isPreviewMode ? "lg:w-1/2" : "lg:w-full"
              } transition-all duration-300`}
            >
              <div className="h-full bg-white dark:bg-gray-800 shadow-xl">
                <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                      Theme Editor
                    </h2>
                    {!isPreviewMode && (
                      <button
                        onClick={() => setIsPreviewMode(true)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Show preview"
                      >
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300 transform rotate-180"
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
                    )}
                  </div>
                </div>

                <div className="p-3 sm:p-6 overflow-y-auto h-[calc(100%-4rem)]">
                  {/* Tab Navigation */}
                  <div className="flex space-x-2 sm:space-x-4 mb-4 sm:mb-8 border-b border-gray-200 dark:border-gray-700 overflow-x-auto pb-2">
                    <button
                      onClick={() => setActiveTab("visual")}
                      className={`px-3 sm:px-6 py-2 sm:py-3 text-sm font-medium rounded-t-lg transition-all duration-200 whitespace-nowrap ${
                        activeTab === "visual"
                          ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50 dark:bg-purple-900/20"
                          : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      }`}
                    >
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2"
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
                        Visual Editor
                      </span>
                    </button>
                    <button
                      onClick={() => setActiveTab("ai")}
                      className={`px-3 sm:px-6 py-2 sm:py-3 text-sm font-medium rounded-t-lg transition-all duration-200 whitespace-nowrap ${
                        activeTab === "ai"
                          ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50 dark:bg-purple-900/20"
                          : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      }`}
                    >
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        AI Customization
                      </span>
                    </button>
                    <button
                      onClick={() => setActiveTab("code")}
                      className={`px-3 sm:px-6 py-2 sm:py-3 text-sm font-medium rounded-t-lg transition-all duration-200 whitespace-nowrap ${
                        activeTab === "code"
                          ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50 dark:bg-purple-900/20"
                          : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      }`}
                    >
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2"
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
                        Code Editor
                      </span>
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    {activeTab === "visual" ? (
                      <EditorRightSideComponent
                        isPreviewMode={isPreviewMode}
                        handleSubmit={handleSubmit}
                        handleColorChange={handleColorChange}
                        handleTypographyChange={handleTypographyChange}
                        handleLayoutChange={handleLayoutChange}
                        applyPresetScheme={applyPresetScheme}
                        presetSchemes={presetSchemes}
                        themeOptions={themeOptions}
                      />
                    ) : activeTab === "ai" ? (
                      <div className="p-4">
                        <ThemePagePromptCustomizerComponent />
                      </div>
                    ) : (
                      <div className="flex flex-col lg:flex-row h-full">
                        <div
                          className={`transition-all duration-300 ${
                            isFileListVisible ? "w-full lg:w-64" : "w-0"
                          }`}
                        >
                          <FileListSidebar
                            files={files}
                            selectedFile={selectedFile}
                            selectedFileType={selectedFileType}
                            expandedSections={expandedSections}
                            onFileSelect={handleFileSelect}
                            onFileTypeChange={setSelectedFileType}
                            onToggleSection={toggleSection}
                          />
                        </div>

                        {/* Editor Area */}
                        <div className="flex-1 p-3 sm:p-4">
                          {selectedFile ? (
                            <ThemeFileEditorComponent
                              filePath={selectedFile.path}
                              fileName={selectedFile.name}
                              files={files}
                              onFileSelect={handleFileSelect}
                              isFileListVisible={isFileListVisible}
                              onToggleFileList={() =>
                                setIsFileListVisible(!isFileListVisible)
                              }
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                              Select a file to edit
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthAppLayout>
  );
};

export default CustomizeTheme;

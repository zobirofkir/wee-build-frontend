import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentTheme } from "../../redux/action/store/get-current-theme-action";
import { updateTheme } from "../../redux/action/store/customize-current-theme-action";
import AuthAppLayout from "../../layouts/auth/auth-app-layout";
import PreviewSectionLeftSideComponent from "../../components/customization/preview-section-left-side-component";
import EditorRightSideComponent from "../../components/customization/editor-right-side-component";
import ThemeFileEditorComponent from "../../components/customization/theme-file-editor-component";

const CustomizeTheme = () => {
  const dispatch = useDispatch();
  const { currentTheme, loading, error } = useSelector(
    (state) => state.currentTheme
  );
  const { loading: updateLoading, error: updateError } = useSelector(
    (state) => state.customizeCurrentTheme
  );

  const [isPreviewMode, setIsPreviewMode] = useState(true);
  const [originalTheme, setOriginalTheme] = useState(null);
  const [activeTab, setActiveTab] = useState("visual"); // 'visual' or 'code'

  const [themeOptions, setThemeOptions] = useState({
    colors: {
      primary: "#ff0000",
      secondary: "#00ff00",
      background: "#ffffff",
      text: "#000000",
    },
    typography: {
      font_family: "Helvetica, sans-serif",
      font_size: "18px",
      line_height: "1.6",
    },
    layout: {
      container_width: "1400px",
      spacing: "2rem",
    },
  });

  const presetSchemes = {
    default: {
      primary: "#ff0000",
      secondary: "#00ff00",
      background: "#ffffff",
      text: "#000000",
    },
    dark: {
      primary: "#6366f1",
      secondary: "#4f46e5",
      background: "#1f2937",
      text: "#f3f4f6",
    },
    ocean: {
      primary: "#0ea5e9",
      secondary: "#0284c7",
      background: "#f0f9ff",
      text: "#0c4a6e",
    },
    forest: {
      primary: "#22c55e",
      secondary: "#16a34a",
      background: "#f0fdf4",
      text: "#166534",
    },
  };

  useEffect(() => {
    dispatch(fetchCurrentTheme());
  }, [dispatch]);

  useEffect(() => {
    if (currentTheme) {
      setOriginalTheme(currentTheme);
    }
  }, [currentTheme]);

  const handleColorChange = (colorKey, value) => {
    setThemeOptions((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorKey]: value,
      },
    }));
  };

  const handleTypographyChange = (key, value) => {
    setThemeOptions((prev) => ({
      ...prev,
      typography: {
        ...prev.typography,
        [key]: value,
      },
    }));
  };

  const handleLayoutChange = (key, value) => {
    setThemeOptions((prev) => ({
      ...prev,
      layout: {
        ...prev.layout,
        [key]: value,
      },
    }));
  };

  const applyPresetScheme = (scheme) => {
    setThemeOptions((prev) => ({
      ...prev,
      colors: { ...prev.colors, ...scheme },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateTheme(themeOptions));
      dispatch(fetchCurrentTheme());
    } catch (error) {
      console.error("Failed to update theme:", error);
    }
  };

  if (loading) {
    return (
      <AuthAppLayout>
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent shadow-lg"></div>
        </div>
      </AuthAppLayout>
    );
  }

  if (error) {
    return (
      <AuthAppLayout>
        <div className="min-h-screen p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-2xl mx-auto bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-8 rounded-2xl shadow-xl border border-red-100 dark:border-red-800">
            <p className="text-lg font-medium mb-6">Error: {error}</p>
            <button
              onClick={() => dispatch(fetchCurrentTheme())}
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
              } transition-all duration-300`}
            >
              <div className="h-full bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Theme Preview
                    </h2>
                    <button
                      onClick={() => setIsPreviewMode(!isPreviewMode)}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <svg
                        className={`w-6 h-6 text-gray-600 dark:text-gray-300 transform transition-transform ${
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
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Theme Editor
                    </h2>
                    {!isPreviewMode && (
                      <button
                        onClick={() => setIsPreviewMode(true)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <svg
                          className="w-6 h-6 text-gray-600 dark:text-gray-300 transform rotate-180"
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

                <div className="p-6 overflow-y-auto h-[calc(100%-4rem)]">
                  {/* Tab Navigation */}
                  <div className="flex space-x-4 mb-8 border-b border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => setActiveTab("visual")}
                      className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-all duration-200 ${
                        activeTab === "visual"
                          ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50 dark:bg-purple-900/20"
                          : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      }`}
                    >
                      <span className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2"
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
                      onClick={() => setActiveTab("code")}
                      className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-all duration-200 ${
                        activeTab === "code"
                          ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50 dark:bg-purple-900/20"
                          : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      }`}
                    >
                      <span className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2"
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
                    ) : (
                      <ThemeFileEditorComponent filePath="index.html" />
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

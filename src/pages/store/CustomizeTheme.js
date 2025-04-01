import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentTheme } from "../../redux/action/store/get-current-theme-action";
import { updateTheme } from "../../redux/action/store/customize-current-theme-action";
import AuthAppLayout from "../../layouts/auth/auth-app-layout";
import PreviewSectionLeftSideComponent from "../../components/customization/preview-section-left-side-component";

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
      dispatch(fetchCurrentTheme()); // Refresh the current theme
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
            <PreviewSectionLeftSideComponent
              isPreviewMode={isPreviewMode}
              currentTheme={currentTheme}
            />

            {/* Editor Section - Right Side */}
            <div
              className={`w-full ${
                isPreviewMode ? "lg:w-1/2" : "lg:w-full"
              } p-8 overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300`}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-10">
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                    Theme Customization
                  </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                  {/* Preset Schemes Section */}
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 flex items-center">
                      <span className="w-3 h-3 bg-purple-600 rounded-full mr-3"></span>
                      Preset Color Schemes
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {Object.entries(presetSchemes).map(([name, scheme]) => (
                        <button
                          key={name}
                          onClick={() => applyPresetScheme(scheme)}
                          className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 transition-all duration-200 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 bg-white dark:bg-gray-800"
                        >
                          <div className="space-y-4">
                            <div className="flex space-x-3">
                              {Object.values(scheme).map((color, index) => (
                                <div
                                  key={index}
                                  className="w-8 h-8 rounded-full shadow-lg"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                              {name}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Colors Section */}
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 flex items-center">
                      <span className="w-3 h-3 bg-purple-600 rounded-full mr-3"></span>
                      Colors
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {Object.entries(themeOptions.colors).map(
                        ([key, value]) => (
                          <div key={key} className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </label>
                            <div className="flex items-center space-x-4">
                              <input
                                type="color"
                                value={value}
                                onChange={(e) =>
                                  handleColorChange(key, e.target.value)
                                }
                                className="h-14 w-14 rounded-xl border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 cursor-pointer transition-all duration-200 hover:border-purple-500 shadow-md"
                              />
                              <input
                                type="text"
                                value={value}
                                onChange={(e) =>
                                  handleColorChange(key, e.target.value)
                                }
                                className="flex-1 rounded-xl border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 px-4 py-3"
                              />
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Typography Section */}
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 flex items-center">
                      <span className="w-3 h-3 bg-purple-600 rounded-full mr-3"></span>
                      Typography
                    </h2>
                    <div className="space-y-8">
                      {Object.entries(themeOptions.typography).map(
                        ([key, value]) => (
                          <div key={key} className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {key
                                .split("_")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(" ")}
                            </label>
                            <input
                              type="text"
                              value={value}
                              onChange={(e) =>
                                handleTypographyChange(key, e.target.value)
                              }
                              className="w-full rounded-xl border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 px-4 py-3"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Layout Section */}
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 flex items-center">
                      <span className="w-3 h-3 bg-purple-600 rounded-full mr-3"></span>
                      Layout
                    </h2>
                    <div className="space-y-8">
                      {Object.entries(themeOptions.layout).map(
                        ([key, value]) => (
                          <div key={key} className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {key
                                .split("_")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(" ")}
                            </label>
                            <input
                              type="text"
                              value={value}
                              onChange={(e) =>
                                handleLayoutChange(key, e.target.value)
                              }
                              className="w-full rounded-xl border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 px-4 py-3"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {updateError && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-6 rounded-xl border border-red-100 dark:border-red-800">
                      <p className="font-medium">
                        Error updating theme: {updateError}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-end pt-6">
                    <button
                      type="submit"
                      disabled={updateLoading}
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl hover:from-purple-700 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:hover:scale-100 disabled:hover:shadow-lg"
                    >
                      {updateLoading ? (
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
                          Updating...
                        </span>
                      ) : (
                        "Update Theme"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthAppLayout>
  );
};

export default CustomizeTheme;

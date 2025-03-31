import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentTheme } from "../../redux/action/store/get-current-theme-action";
import { updateTheme } from "../../redux/action/store/customize-current-theme-action";
import AuthAppLayout from "../../layouts/auth/auth-app-layout";

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

  const handleReset = () => {
    if (originalTheme) {
      setThemeOptions(originalTheme);
    }
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
        <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent"></div>
        </div>
      </AuthAppLayout>
    );
  }

  if (error) {
    return (
      <AuthAppLayout>
        <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-2xl mx-auto bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-6 rounded-xl shadow-lg">
            <p className="text-lg font-medium mb-4">Error: {error}</p>
            <button
              onClick={() => dispatch(fetchCurrentTheme())}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {currentTheme && (
          <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
            {/* Preview Section - Left Side */}
            <div
              className={`w-full ${
                isPreviewMode ? "lg:w-1/2" : "lg:w-0"
              } p-6 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300`}
            >
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                    Live Preview
                  </h2>
                  <button
                    onClick={() => setIsPreviewMode(!isPreviewMode)}
                    className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    {isPreviewMode ? "Hide Preview" : "Show Preview"}
                  </button>
                </div>
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <iframe
                    src={currentTheme.preview_url}
                    className="w-full h-full border-0"
                    title="Theme Preview"
                  />
                </div>
              </div>
            </div>

            {/* Editor Section - Right Side */}
            <div
              className={`w-full ${
                isPreviewMode ? "lg:w-1/2" : "lg:w-full"
              } p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-all duration-300`}
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Theme Customization
                  </h1>
                  <div className="flex space-x-4">
                    <button
                      onClick={handleReset}
                      className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                      Reset Changes
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Preset Schemes Section */}
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                      Preset Color Schemes
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(presetSchemes).map(([name, scheme]) => (
                        <button
                          key={name}
                          onClick={() => applyPresetScheme(scheme)}
                          className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 transition-colors duration-200"
                        >
                          <div className="space-y-2">
                            <div className="flex space-x-2">
                              {Object.values(scheme).map((color, index) => (
                                <div
                                  key={index}
                                  className="w-6 h-6 rounded-full"
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
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                      Colors
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(themeOptions.colors).map(
                        ([key, value]) => (
                          <div key={key} className="space-y-3">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </label>
                            <div className="flex items-center space-x-3">
                              <input
                                type="color"
                                value={value}
                                onChange={(e) =>
                                  handleColorChange(key, e.target.value)
                                }
                                className="h-12 w-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 cursor-pointer transition-all duration-200 hover:border-purple-500"
                              />
                              <input
                                type="text"
                                value={value}
                                onChange={(e) =>
                                  handleColorChange(key, e.target.value)
                                }
                                className="flex-1 rounded-lg border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                              />
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Typography Section */}
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                      Typography
                    </h2>
                    <div className="space-y-6">
                      {Object.entries(themeOptions.typography).map(
                        ([key, value]) => (
                          <div key={key} className="space-y-3">
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
                              className="w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Layout Section */}
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                      Layout
                    </h2>
                    <div className="space-y-6">
                      {Object.entries(themeOptions.layout).map(
                        ([key, value]) => (
                          <div key={key} className="space-y-3">
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
                              className="w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {updateError && (
                    <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-xl">
                      <p className="font-medium">
                        Error updating theme: {updateError}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={updateLoading}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
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

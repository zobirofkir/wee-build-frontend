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

  useEffect(() => {
    dispatch(fetchCurrentTheme());
  }, [dispatch]);

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
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </AuthAppLayout>
    );
  }

  if (error) {
    return (
      <AuthAppLayout>
        <div className="min-h-screen p-4">
          <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg">
            <p>Error: {error}</p>
            <button
              onClick={() => dispatch(fetchCurrentTheme())}
              className="mt-2 text-sm font-medium underline hover:text-red-800 dark:hover:text-red-200"
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
            <div className="w-full lg:w-1/2 p-4 border-r border-gray-200 dark:border-gray-700">
              <div className="h-full flex flex-col">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Live Preview
                </h2>
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <iframe
                    src={currentTheme.preview_url}
                    className="w-full h-full border-0"
                    title="Theme Preview"
                  />
                </div>
              </div>
            </div>

            {/* Editor Section - Right Side */}
            <div className="w-full lg:w-1/2 p-4 overflow-y-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Theme Customization
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Colors Section */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Colors
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(themeOptions.colors).map(
                        ([key, value]) => (
                          <div key={key} className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </label>
                            <div className="flex items-center space-x-2">
                              <input
                                type="color"
                                value={value}
                                onChange={(e) =>
                                  handleColorChange(key, e.target.value)
                                }
                                className="h-10 w-20 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                              />
                              <input
                                type="text"
                                value={value}
                                onChange={(e) =>
                                  handleColorChange(key, e.target.value)
                                }
                                className="flex-1 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                              />
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Typography Section */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Typography
                    </h2>
                    <div className="space-y-4">
                      {Object.entries(themeOptions.typography).map(
                        ([key, value]) => (
                          <div key={key} className="space-y-2">
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
                              className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Layout Section */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Layout
                    </h2>
                    <div className="space-y-4">
                      {Object.entries(themeOptions.layout).map(
                        ([key, value]) => (
                          <div key={key} className="space-y-2">
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
                              className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {updateError && (
                    <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg">
                      <p>Error updating theme: {updateError}</p>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={updateLoading}
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                      {updateLoading ? "Updating..." : "Update Theme"}
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

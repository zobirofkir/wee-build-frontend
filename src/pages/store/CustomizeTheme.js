import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentTheme } from "../../redux/action/store/get-current-theme-action";
import { updateTheme } from "../../redux/action/store/customize-current-theme-action";
import AuthAppLayout from "../../layouts/auth/auth-app-layout";
import PreviewSectionLeftSideComponent from "../../components/customization/preview-section-left-side-component";
import EditorRightSideComponent from "../../components/customization/editor-right-side-component";

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
          </div>
        )}
      </div>
    </AuthAppLayout>
  );
};

export default CustomizeTheme;

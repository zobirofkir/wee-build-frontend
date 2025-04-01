import React, { createContext, useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentTheme } from "../redux/action/store/get-current-theme-action";
import { updateTheme } from "../redux/action/store/customize-current-theme-action";

const ThemeContext = createContext();

export const presetSchemes = {
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

export const ThemeProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { currentTheme, loading, error } = useSelector(
    (state) => state.currentTheme
  );
  const { loading: updateLoading, error: updateError } = useSelector(
    (state) => state.customizeCurrentTheme
  );

  const [isPreviewMode, setIsPreviewMode] = useState(true);
  const [originalTheme, setOriginalTheme] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

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

  useEffect(() => {
    if (currentTheme) {
      setOriginalTheme(currentTheme);
    }
  }, [currentTheme]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

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

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const value = {
    currentTheme,
    loading,
    error,
    updateLoading,
    updateError,
    isPreviewMode,
    setIsPreviewMode,
    themeOptions,
    handleColorChange,
    handleTypographyChange,
    handleLayoutChange,
    applyPresetScheme,
    handleSubmit,
    presetSchemes,
    darkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

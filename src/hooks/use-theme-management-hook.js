import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentTheme } from "../redux/action/store/get-current-theme-action";
import { updateTheme } from "../redux/action/store/customize-current-theme-action";
import { defaultThemeOptions } from "../config/theme-config";

export const useThemeManagementHook = () => {
  const dispatch = useDispatch();
  const { currentTheme, loading, error } = useSelector(
    (state) => state.currentTheme
  );
  const { loading: updateLoading, error: updateError } = useSelector(
    (state) => state.customizeCurrentTheme
  );

  const [themeOptions, setThemeOptions] = useState(defaultThemeOptions);
  const [originalTheme, setOriginalTheme] = useState(null);

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

  return {
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
  };
};

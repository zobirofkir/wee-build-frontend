import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthAppLayout from "../../layouts/auth/auth-app-layout";
import { fetchGithubThemes } from "../../redux/action/store/get-github-themes-action";
import { applyTheme } from "../../redux/action/store/apply-theme-action";
import { toast } from "react-hot-toast";
import HeaderThemeComponent from "../../components/themes/header-theme-component";
import SearchThemeComponent from "../../components/themes/search-theme-component";
import FilterThemeComponent from "../../components/themes/filter-theme-component";
import ThemeListComponent from "../../components/themes/theme-list-component";
import ApplyThemeButtonComponent from "../../components/themes/apply-theme-button-component";
import EmptyThemeComponent from "../../components/themes/empty-theme-component";

const Theme = () => {
  const dispatch = useDispatch();
  
  const { themes, currentTheme, loading, error } = useSelector(
    (state) => state.githubThemes
  );
  const {
    loading: applyLoading,
    success: applySuccess,
    error: applyError,
  } = useSelector((state) => state.applyTheme);
  const initialFetchDone = useRef(false);

  const [viewMode, setViewMode] = useState("grid");
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectProgress, setSelectProgress] = useState({});
  const [applyProgress, setApplyProgress] = useState(0);

  useEffect(() => {
    if (!initialFetchDone.current) {
      dispatch(fetchGithubThemes());
      initialFetchDone.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    if (applySuccess) {
      toast.success("Theme applied successfully!");
      setSelectedTheme(null);
      setTimeout(() => {
        window.location.href = "/auth/themes/customize";
      }, 2000);
    }
    if (applyError) {
      toast.error(`Failed to apply theme: ${applyError}`);
    }
  }, [applySuccess, applyError]);

  /**
   * Set the selected theme to the current theme when data is loaded
   */
  useEffect(() => {
    if (currentTheme && themes.length > 0) {
      const currentThemeObj = themes.find((t) => t.id === currentTheme.theme);
      if (currentThemeObj) {
        setSelectedTheme(currentThemeObj.id);
      }
    }
  }, [currentTheme, themes]);

  /**
   * Filter themes based on search query only
   */
  const filteredThemes = !themes
    ? []
    : themes.filter((theme) => {
        return (
          !searchQuery ||
          theme.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });

  /**
   * Handle theme selection with progress animation
   * @param {*} themeId
   */
  const handleSelectTheme = (themeId) => {
    if (selectedTheme === themeId) {
      setSelectedTheme(null);
      setSelectProgress({});
      return;
    }

    /**
     * Start progress animation
     */
    setSelectProgress((prev) => ({ ...prev, [themeId]: 0 }));

    /**
     * Simulate progress
     */
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setSelectProgress((prev) => ({ ...prev, [themeId]: progress }));

      if (progress >= 100) {
        clearInterval(interval);
        setSelectedTheme(themeId);

        setTimeout(() => {
          setSelectProgress((prev) => {
            const newProgress = { ...prev };
            delete newProgress[themeId];
            return newProgress;
          });
        }, 200);
      }
    }, 20);
  };

  /**
   * Handle theme application with progress animation
   */
  const handleApplyTheme = () => {
    if (!selectedTheme) return;

    /**
     * Set progress to 0
     */
    setApplyProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setApplyProgress(Math.min(progress, 95));

      if (progress >= 95) {
        clearInterval(interval);
      }
    }, 50);

    /**
     * Actual theme application
     */
    dispatch(applyTheme(selectedTheme))
      .then(() => {
        setApplyProgress(100);
        setTimeout(() => setApplyProgress(0), 500);
      })
      .catch((error) => {
        console.error("Error applying theme:", error);
        clearInterval(interval);
        setApplyProgress(0);
      });
  };

  return (
    <AuthAppLayout>
      <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-screen p-4 md:p-6 lg:p-8">
        {/* Header */}
        <HeaderThemeComponent currentTheme={currentTheme} themes={themes} />

        {/* Search form */}
        <SearchThemeComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Filters and view options - removed category filters */}
        <FilterThemeComponent viewMode={viewMode} setViewMode={setViewMode} />

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg mb-6">
            <p>Error loading themes: {error}</p>
            <button
              onClick={() => dispatch(fetchGithubThemes())}
              className="mt-2 text-sm font-medium underline hover:text-red-800 dark:hover:text-red-200"
            >
              Try again
            </button>
          </div>
        )}

        {/* Themes grid/list */}
        <ThemeListComponent themes={themes} loading={loading} error={error} viewMode={viewMode} selectedTheme={selectedTheme} filteredThemes={filteredThemes} selectProgress={selectProgress} handleSelectTheme={handleSelectTheme} />

        {/* Apply theme button (fixed at bottom) */}
        <ApplyThemeButtonComponent selectedTheme={selectedTheme} themes={themes} applyLoading={applyLoading} applyProgress={applyProgress} handleApplyTheme={handleApplyTheme} />

        {/* Empty state - updated to include search query */}
        <EmptyThemeComponent loading={loading} error={error} filteredThemes={filteredThemes} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      </div>
    </AuthAppLayout>
  );
};

export default Theme;

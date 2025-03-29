import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthAppLayout from "../../layouts/auth/auth-app-layout";
import { FiCheck, FiEye, FiGrid, FiList, FiStar } from "react-icons/fi";
import { fetchGithubThemes } from "../../redux/action/store/get-github-themes-action";

const Theme = () => {
  const dispatch = useDispatch();
  const { themes, loading, error } = useSelector((state) => state.githubThemes);
  
  const [viewMode, setViewMode] = useState("grid");
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    dispatch(fetchGithubThemes());
  }, [dispatch]);

  /**
   * Filter categories - dynamically generated from available themes
   */
  const getCategories = () => {
    if (!themes || themes.length === 0) return [{ id: "all", name: "All Templates" }];
    
    /**
     * Create a set of unique categories, handling undefined categories
     */
    const categorySet = new Set();
    themes.forEach(theme => {
      if (theme.category) {
        categorySet.add(theme.category);
      } else if (theme.type) {
        categorySet.add(theme.type);
      }
    });
    
    const categories = [
      { id: "all", name: "All Templates" },
      ...Array.from(categorySet).map(category => ({
        id: category,
        name: category.charAt(0).toUpperCase() + category.slice(1)
      }))
    ];
    
    return categories;
  };

  const categories = getCategories();

  /**
   * Filter themes based on selected category
   */
  const filteredThemes =
    !themes ? [] :
    filterCategory === "all"
      ? themes
      : themes.filter((theme) => {
          const themeCategory = theme.category || theme.type;
          return themeCategory === filterCategory;
        });

  /**
   * Handle theme selection
   * @param {*} themeId
   */
  const handleSelectTheme = (themeId) => {
    if (selectedTheme === themeId) {
      setSelectedTheme(null);
    } else {
      setSelectedTheme(themeId);
    }
  };

  /**
   * Handle theme application
   */
  const handleApplyTheme = () => {
    /**
     * Logic to apply the selected theme would go here
     */
    alert(`Theme ${themes.find(theme => theme.id === selectedTheme).name} applied successfully!`);
  };

  return (
    <AuthAppLayout>
      <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-screen p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Store Themes
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Choose a template to customize your store's appearance
          </p>
        </div>

        {/* Filters and view options */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilterCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterCategory === category.id
                    ? "bg-purple-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-900/30"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* View options */}
          <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md ${
                viewMode === "grid"
                  ? "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              aria-label="Grid view"
            >
              <FiGrid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md ${
                viewMode === "list"
                  ? "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              aria-label="List view"
            >
              <FiList className="h-5 w-5" />
            </button>
          </div>
        </div>

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
        {!loading && !error && (
          <div
            className={`${
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }`}
          >
            {filteredThemes.map((theme) => (
              <div
                key={theme.id}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg ${
                  selectedTheme === theme.id
                    ? "ring-2 ring-purple-600 dark:ring-purple-400"
                    : ""
                } ${viewMode === "list" ? "flex flex-col md:flex-row" : ""}`}
              >
                {/* Theme image */}
                <div
                  className={`relative ${viewMode === "list" ? "md:w-1/3" : ""}`}
                >
                  <img
                    src={theme.image || `https://placehold.co/600x400/purple/white?text=${theme.name}`}
                    alt={theme.name}
                    className="w-full h-48 object-cover"
                  />
                  {theme.popular && (
                    <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                      <FiStar className="mr-1 h-3 w-3" />
                      Popular
                    </div>
                  )}
                  <button
                    className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 p-2 rounded-full shadow-md hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Preview theme"
                  >
                    <FiEye className="h-4 w-4" />
                  </button>
                </div>

                {/* Theme details */}
                <div className={`p-5 ${viewMode === "list" ? "md:w-2/3" : ""}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {theme.name}
                    </h3>
                    <span className="text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded">
                      {theme.category || theme.type || "General"}
                    </span>
                  </div>

                  {/* Features */}
                  {theme.features && theme.features.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-xs uppercase text-gray-500 dark:text-gray-400 font-medium mb-2">
                        Features
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {theme.features.map((feature, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex space-x-2 mt-auto">
                    <button
                      onClick={() => handleSelectTheme(theme.id)}
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                        selectedTheme === theme.id
                          ? "bg-purple-600 text-white"
                          : "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900"
                      }`}
                    >
                      {selectedTheme === theme.id ? (
                        <span className="flex items-center justify-center">
                          <FiCheck className="mr-1 h-4 w-4" /> Selected
                        </span>
                      ) : (
                        "Select"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Apply theme button (fixed at bottom) */}
        {selectedTheme && (
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 shadow-lg border-t border-gray-200 dark:border-gray-700 z-10">
            <div className="container mx-auto flex justify-between items-center">
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Theme selected:{" "}
                <span className="text-purple-600 dark:text-purple-400">
                  {themes?.find((t) => t.id === selectedTheme)?.name}
                </span>
              </p>
              <button
                onClick={handleApplyTheme}
                className="py-2 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                Apply Theme
              </button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredThemes.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              No themes found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              No themes match your current filter. Try selecting a different
              category.
            </p>
          </div>
        )}
      </div>
    </AuthAppLayout>
  );
};

export default Theme;

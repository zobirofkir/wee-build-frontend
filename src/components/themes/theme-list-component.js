import React from 'react'
import { FiStar, FiEye, FiCheck } from 'react-icons/fi'
const ThemeListComponent = ({themes, loading, error, viewMode, selectedTheme, filteredThemes, selectProgress, handleSelectTheme}) => {
  return (
    <>
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
                } ${
                  viewMode === "list" ? "flex flex-col md:flex-row" : ""
                } relative`}
              >
                {/* Pro/Best badge */}
                {theme.pro && (
                  <div className="absolute top-0 left-0 w-24 h-24 overflow-hidden">
                    <div className="absolute top-0 left-0 transform -translate-y-1/2 -translate-x-1/2 rotate-45 translate-y-12 -translate-x-3 w-36 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-center py-1 font-bold text-xs shadow-md">
                      PRO
                    </div>
                  </div>
                )}
                {theme.best && !theme.pro && (
                  <div className="absolute top-0 left-0 w-24 h-24 overflow-hidden">
                    <div className="absolute top-0 left-0 transform -translate-y-1/2 -translate-x-1/2 rotate-45 translate-y-12 -translate-x-3 w-36 bg-gradient-to-r from-blue-500 to-teal-500 text-white text-center py-1 font-bold text-xs shadow-md">
                      BEST CHOICE
                    </div>
                  </div>
                )}

                {/* Theme image */}
                <div
                  className={`relative ${
                    viewMode === "list" ? "md:w-1/3" : ""
                  }`}
                >
                  <img
                    src={
                      theme.image ||
                      `https://placehold.co/600x400/purple/white?text=${theme.name}`
                    }
                    alt={theme.name}
                    className={`w-full h-48 object-cover ${
                      theme.pro
                        ? "border-b-2 border-amber-500"
                        : theme.best
                        ? "border-b-2 border-blue-500"
                        : ""
                    }`}
                  />
                  {theme.popular && (
                    <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center shadow-md">
                      <FiStar className="mr-1 h-3 w-3" />
                      Popular
                    </div>
                  )}
                  <a
                    href={theme.test_url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button
                      className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 p-2 rounded-full shadow-md hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors"
                      aria-label="Preview theme"
                    >
                      <FiEye className="h-4 w-4" />
                    </button>
                  </a>
                </div>

                {/* Theme details */}
                <div className={`p-5 ${viewMode === "list" ? "md:w-2/3" : ""}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {theme.name}
                      {theme.pro && (
                        <span className="ml-2 inline-block align-middle bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs px-2 py-0.5 rounded-full shadow-sm">
                          PRO
                        </span>
                      )}
                      {theme.best && !theme.pro && (
                        <span className="ml-2 inline-block align-middle bg-gradient-to-r from-blue-500 to-teal-500 text-white text-xs px-2 py-0.5 rounded-full shadow-sm">
                          BEST
                        </span>
                      )}
                    </h3>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded">
                        {theme.category || "General"}
                      </span>
                      {theme.type && (
                        <span className="text-xs text-center font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                          {theme.type}
                        </span>
                      )}
                    </div>
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
                            className={`text-xs px-2 py-1 rounded flex items-center ${
                              theme.pro
                                ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                                : theme.best
                                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            <FiCheck className="mr-1 h-3 w-3" />
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
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors relative overflow-hidden ${
                        selectedTheme === theme.id
                          ? "bg-purple-600 text-white shadow-md"
                          : theme.pro
                          ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:from-amber-600 hover:to-yellow-600 shadow-md"
                          : theme.best
                          ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600 shadow-md"
                          : "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900"
                      }`}
                      disabled={selectProgress[theme.id] !== undefined}
                    >
                      {selectProgress[theme.id] !== undefined ? (
                        <div className="flex items-center justify-center">
                          <span className="mr-2">
                            {selectProgress[theme.id]}%
                          </span>
                          <div
                            className="absolute left-0 bottom-0 h-1 bg-white/30 transition-all duration-100"
                            style={{ width: `${selectProgress[theme.id]}%` }}
                          ></div>
                        </div>
                      ) : selectedTheme === theme.id ? (
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
    </>
  )
}

export default ThemeListComponent
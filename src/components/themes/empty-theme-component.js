import React from 'react'

const EmptyThemeComponent = ({loading, error, filteredThemes, searchQuery, setSearchQuery}) => {
  return (
    <>
        {!loading && !error && filteredThemes.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              No themes found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {searchQuery
                ? `No themes match your search for "${searchQuery}".`
                : "No themes available."}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-purple-600 dark:text-purple-400 font-medium hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        )}
    </>
  )
}

export default EmptyThemeComponent
import React from 'react'
import { FiGrid, FiList } from 'react-icons/fi'

const FilterThemeComponent = ({viewMode, setViewMode}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
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

  )
}

export default FilterThemeComponent
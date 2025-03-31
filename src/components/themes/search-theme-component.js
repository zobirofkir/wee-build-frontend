import React from 'react'

const SearchThemeComponent = ({searchQuery, setSearchQuery}) => {
  return (
    <div className="mb-6">
        <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Search themes by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
        </div>
    </div>
  )
}

export default SearchThemeComponent
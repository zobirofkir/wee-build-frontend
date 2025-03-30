import React from 'react'

const ChatDashboardComponent = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Sales Overview
        </h2>
        <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-md">
            Weekly
            </button>
            <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md">
            Monthly
            </button>
            <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md">
            Yearly
            </button>
        </div>
        </div>
        <div className="h-64 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
        <p className="text-purple-600 dark:text-purple-400">
            Sales Chart Placeholder
        </p>
        </div>
    </div>
  )
}

export default ChatDashboardComponent
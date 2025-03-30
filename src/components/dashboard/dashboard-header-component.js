import React from 'react'

const DashboardHeaderComponent = ({ currentUser }) => {
  return (
    <div className="p-4 md:p-6 lg:p-8 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            Welcome back, {currentUser ? currentUser.name : "User"}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
            Here's what's happening with your AI store today
            </p>
        </div>
        {currentUser && currentUser.domain && (
            <a
            href={`http://${currentUser.domain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors shadow-md"
            >
            <span className="mr-2">View Live Store</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
            </a>
        )}
        </div>
    </div>
  )
}

export default DashboardHeaderComponent
import React from 'react'

const RecentDashboardComponent = ({recentActivity}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Recent Activity
        </h2>
        <button className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
            View all
        </button>
        </div>
        <div className="space-y-4">
        {recentActivity.map((activity, index) => (
            <div
            key={index}
            className="flex items-start border-b dark:border-gray-700 pb-4 last:border-0 last:pb-0"
            >
            <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-4 font-medium">
                {activity.user.charAt(0)}
            </div>
            <div className="flex-1">
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                <span className="font-semibold">{activity.user}</span>{" "}
                {activity.action}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {activity.time}
                </p>
            </div>
            <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                >
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
            </button>
            </div>
        ))}
        </div>
    </div>
  )
}

export default RecentDashboardComponent
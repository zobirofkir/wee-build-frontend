import React from 'react'

const DashboardStatsComponent = ({stats}) => {
  return (
    <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
        <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all hover:shadow-lg border border-gray-100 dark:border-gray-700"
        >
            <div className="flex justify-between items-start">
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.title}
                </p>
                <p className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">
                {stat.value}
                </p>
                <p className="text-sm font-medium text-green-500 mt-1">
                {stat.change}
                </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400">
                {stat.icon}
            </div>
            </div>
        </div>
        ))}
    </div>
  )
}

export default DashboardStatsComponent
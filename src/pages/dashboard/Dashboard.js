import React, { useState } from "react";
import AuthAppLayout from "../../layouts/auth/auth-app-layout";
import {
  FiHome,
  FiShoppingBag,
  FiUsers,
  FiSettings,
  FiBarChart2,
  FiMessageSquare,
  FiHelpCircle,
} from "react-icons/fi";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  /**
   * Stats
   */
  const stats = [
    {
      title: "Total Sales",
      value: "$12,426",
      change: "+16%",
      icon: <FiBarChart2 className="h-6 w-6" />,
    },
    {
      title: "Active Users",
      value: "2,345",
      change: "+3.2%",
      icon: <FiUsers className="h-6 w-6" />,
    },
    {
      title: "AI Models",
      value: "24",
      change: "+2",
      icon: <FiShoppingBag className="h-6 w-6" />,
    },
    {
      title: "Conversion Rate",
      value: "3.6%",
      change: "+0.8%",
      icon: <FiBarChart2 className="h-6 w-6" />,
    },
  ];

  const recentActivity = [
    {
      user: "John Doe",
      action: "purchased AI Chatbot Pro",
      time: "2 minutes ago",
    },
    {
      user: "Sarah Kim",
      action: "subscribed to monthly plan",
      time: "1 hour ago",
    },
    { user: "Mike Johnson", action: "deployed new model", time: "3 hours ago" },
    {
      user: "Emily Chen",
      action: "left a review (5 stars)",
      time: "5 hours ago",
    },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <AuthAppLayout>
      <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
        <div className="dark:bg-gray-900 bg-gray-50 transition-colors duration-300 min-h-screen">
          {/* Dashboard header */}
          <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
            <h1 className="text-2xl font-bold text-purple-800 dark:text-purple-400">
              AI Store Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
              <div className="relative">
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                <button className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                  <FiMessageSquare className="h-5 w-5" />
                </button>
              </div>
              <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium">
                JD
              </div>
            </div>
          </div>

          {/* Dashboard content */}
          <div className="p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Stats cards */}
            <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all hover:shadow-lg"
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

            {/* Main content area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Chart section */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Sales Overview
                </h2>
                <div className="h-64 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <p className="text-purple-600 dark:text-purple-400">
                    Sales Chart Placeholder
                  </p>
                </div>
              </div>

              {/* Recent sales */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start border-b dark:border-gray-700 pb-4 last:border-0 last:pb-0"
                    >
                      <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-4">
                        {activity.user.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white">
                          <span className="font-semibold">{activity.user}</span>{" "}
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick actions */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Quick Actions
                </h2>
                <div className="space-y-2">
                  <button className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                    Add New AI Model
                  </button>
                  <button className="w-full py-2 px-4 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900 transition-colors">
                    View Analytics
                  </button>
                  <button className="w-full py-2 px-4 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900 transition-colors">
                    Manage Users
                  </button>
                </div>
              </div>

              {/* Help section */}
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl shadow-md p-6 text-white">
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-semibold mb-2">Need Help?</h2>
                  <FiHelpCircle className="h-5 w-5" />
                </div>
                <p className="text-sm text-purple-100 mb-4">
                  Contact our support team for assistance with your AI store.
                </p>
                <button className="w-full py-2 px-4 bg-white text-purple-700 rounded-lg hover:bg-purple-50 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthAppLayout>
  );
};

export default Dashboard;

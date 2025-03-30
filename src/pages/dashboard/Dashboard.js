import React, { useEffect } from "react";
import AuthAppLayout from "../../layouts/auth/auth-app-layout";
import { getCurrentAuthenticatedUser } from "../../redux/action/auth/get-current-authenticated-user-action";
import {
  FiBarChart2,
  FiUsers,
  FiShoppingBag,
  FiHelpCircle,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  /**
   * Dispatch
   */
  const dispatch = useDispatch();

  /**
   * Get Current Authenticated User
   */
  useEffect(() => {
    dispatch(getCurrentAuthenticatedUser());
  }, [dispatch]);

  /**
   * Current User
   */
  const { currentUser } = useSelector(
    (state) => state.getCurrentAuthenticatedUser
  );

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

  /**
   * Recent Activity
   */
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

  return (
    <AuthAppLayout>
      <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-screen">
        {/* Dashboard header with user info */}
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

        {/* Dashboard content */}
        <div className="px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Stats cards */}
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

          {/* Main content area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Chart section */}
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

            {/* Recent activity */}
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
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* User profile card */}
            {currentUser && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex flex-col items-center text-center">
                  <div className="h-20 w-20 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 text-2xl font-bold mb-3">
                    {currentUser.name
                      ? currentUser.name.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {currentUser.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {currentUser.email}
                  </p>
                  <div className="mt-4 w-full">
                    <Link
                      to="/auth/profile"
                      className="block w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-center text-sm"
                    >
                      Edit Profile
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Quick actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add New AI Model
                </button>
                <button className="w-full py-2 px-4 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900 transition-colors flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                  View Analytics
                </button>
                <button className="w-full py-2 px-4 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900 transition-colors flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  Manage Users
                </button>
              </div>
            </div>

            {/* Help section */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl shadow-md p-6 text-white border border-purple-500">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold">Need Help?</h2>
                <FiHelpCircle className="h-5 w-5" />
              </div>
              <p className="text-sm text-purple-100 mb-4">
                Our support team is ready to assist you with any questions about
                your AI store.
              </p>
              <button className="w-full py-2 px-4 bg-white text-purple-700 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthAppLayout>
  );
};

export default Dashboard;

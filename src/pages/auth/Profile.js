import React, { useState } from "react";
import AuthAppLayout from "../../layouts/auth/auth-app-layout";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit,
  FiCamera,
  FiLock,
  FiShield,
  FiBell,
  FiGlobe,
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { LogoutAction } from "../../redux/action/auth/logout-action";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const dispatch = useDispatch();

  // Mock user data - in a real app, this would come from your Redux store or API
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "January 2023",
    avatar: null, // URL to avatar image or null
    role: "Administrator",
    plan: "Premium",
  };

  const handleLogout = () => {
    dispatch(LogoutAction());
  };

  return (
    <AuthAppLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="h-24 w-24 md:h-32 md:w-32 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 text-4xl font-bold overflow-hidden">
                {userData.avatar ? (
                  <img
                    src={userData.avatar}
                    alt={userData.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  userData.name.charAt(0)
                )}
              </div>
              <button className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors">
                <FiCamera className="h-4 w-4" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                {userData.name}
              </h1>
              <p className="text-purple-600 dark:text-purple-400">
                {userData.role}
              </p>
              <div className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                Member since {userData.joinDate}
              </div>
              <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                  {userData.plan} Plan
                </span>
                <button
                  onClick={() => setActiveTab("account")}
                  className="px-3 py-1 bg-purple-600 text-white rounded-full text-xs font-medium hover:bg-purple-700 transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs and Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Tabs */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <nav className="flex flex-col">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`flex items-center gap-3 px-4 py-3 text-left ${
                    activeTab === "profile"
                      ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-l-4 border-purple-600"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <FiUser className="h-5 w-5" />
                  <span>Profile Information</span>
                </button>
                <button
                  onClick={() => setActiveTab("account")}
                  className={`flex items-center gap-3 px-4 py-3 text-left ${
                    activeTab === "account"
                      ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-l-4 border-purple-600"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <FiEdit className="h-5 w-5" />
                  <span>Account Settings</span>
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`flex items-center gap-3 px-4 py-3 text-left ${
                    activeTab === "security"
                      ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-l-4 border-purple-600"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <FiLock className="h-5 w-5" />
                  <span>Security</span>
                </button>
                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`flex items-center gap-3 px-4 py-3 text-left ${
                    activeTab === "notifications"
                      ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-l-4 border-purple-600"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <FiBell className="h-5 w-5" />
                  <span>Notifications</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                    Profile Information
                  </h2>
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center py-3 border-b dark:border-gray-700">
                      <div className="md:w-1/3 flex items-center gap-2 text-gray-600 dark:text-gray-400 font-medium">
                        <FiUser className="h-5 w-5" />
                        <span>Full Name</span>
                      </div>
                      <div className="md:w-2/3 text-gray-800 dark:text-white mt-1 md:mt-0">
                        {userData.name}
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center py-3 border-b dark:border-gray-700">
                      <div className="md:w-1/3 flex items-center gap-2 text-gray-600 dark:text-gray-400 font-medium">
                        <FiMail className="h-5 w-5" />
                        <span>Email</span>
                      </div>
                      <div className="md:w-2/3 text-gray-800 dark:text-white mt-1 md:mt-0">
                        {userData.email}
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center py-3 border-b dark:border-gray-700">
                      <div className="md:w-1/3 flex items-center gap-2 text-gray-600 dark:text-gray-400 font-medium">
                        <FiPhone className="h-5 w-5" />
                        <span>Phone</span>
                      </div>
                      <div className="md:w-2/3 text-gray-800 dark:text-white mt-1 md:mt-0">
                        {userData.phone}
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center py-3 border-b dark:border-gray-700">
                      <div className="md:w-1/3 flex items-center gap-2 text-gray-600 dark:text-gray-400 font-medium">
                        <FiMapPin className="h-5 w-5" />
                        <span>Location</span>
                      </div>
                      <div className="md:w-2/3 text-gray-800 dark:text-white mt-1 md:mt-0">
                        {userData.location}
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center py-3">
                      <div className="md:w-1/3 flex items-center gap-2 text-gray-600 dark:text-gray-400 font-medium">
                        <FiGlobe className="h-5 w-5" />
                        <span>Account Type</span>
                      </div>
                      <div className="md:w-2/3 text-gray-800 dark:text-white mt-1 md:mt-0">
                        {userData.role} - {userData.plan} Plan
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "account" && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                    Account Settings
                  </h2>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue={userData.name}
                          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          defaultValue={userData.email}
                          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          defaultValue={userData.phone}
                          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          defaultValue={userData.location}
                          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                        Subscription Plan
                      </h3>
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-purple-700 dark:text-purple-300">
                              {userData.plan} Plan
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              Your plan renews on April 21, 2023
                            </p>
                          </div>
                          <button
                            type="button"
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                          >
                            Upgrade
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg mr-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === "security" && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                    Security Settings
                  </h2>

                  <div className="space-y-6">
                    <div className="pb-6 border-b dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                        Change Password
                      </h3>
                      <form className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Current Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                          >
                            Update Password
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className="pb-6 border-b dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                        Two-Factor Authentication
                      </h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-700 dark:text-gray-300">
                            Secure your account with two-factor authentication
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            We'll send a verification code to your phone when
                            you sign in
                          </p>
                        </div>
                        <div className="flex items-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                        Sessions
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="flex items-center gap-3">
                            <FiShield className="h-5 w-5 text-green-500" />
                            <div>
                              <p className="text-gray-800 dark:text-white font-medium">
                                Current Session
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                San Francisco, CA •{" "}
                                {new Date().toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Active
                          </span>
                        </div>
                        <button className="text-red-600 dark:text-red-400 text-sm font-medium hover:underline">
                          Sign out of all other sessions
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                    Notification Preferences
                  </h2>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b dark:border-gray-700">
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">
                            Email Notifications
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Receive updates about your account via email
                          </p>
                        </div>
                        <div className="flex items-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              defaultChecked
                              className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between py-3 border-b dark:border-gray-700">
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">
                            Product Updates
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Receive notifications about new features and
                            improvements
                          </p>
                        </div>
                        <div className="flex items-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              defaultChecked
                              className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between py-3 border-b dark:border-gray-700">
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">
                            Security Alerts
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Get notified about important security updates
                          </p>
                        </div>
                        <div className="flex items-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              defaultChecked
                              className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between py-3">
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">
                            Marketing Emails
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Receive promotional offers and newsletters
                          </p>
                        </div>
                        <div className="flex items-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthAppLayout>
  );
};

export default Profile;

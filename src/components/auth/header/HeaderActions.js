import React from "react";
import { Link } from "react-router-dom";
import { FiEdit2, FiSun, FiMoon, FiBell, FiUser } from "react-icons/fi";

const HeaderActions = ({
  darkMode,
  toggleDarkMode,
  showNotifications,
  setShowNotifications,
  showProfileMenu,
  setShowProfileMenu,
  avatarPreview,
  currentUser,
}) => {
  return (
    <div className="flex items-center space-x-4">
      {/* View Live Store Button */}
      {currentUser?.preview_url && (
        <a
          href={currentUser.preview_url}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors shadow-md"
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

      {/* Theme Customization */}
      <Link
        to="/auth/themes/customize"
        className="hidden md:flex items-center p-2 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors duration-300"
        title="Customize Theme"
      >
        <FiEdit2 className="h-5 w-5" />
      </Link>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors duration-300"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <FiSun className="h-5 w-5" />
        ) : (
          <FiMoon className="h-5 w-5" />
        )}
      </button>

      {/* Notifications */}
      <div className="relative notifications-container">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors duration-300 relative"
        >
          <FiBell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
      </div>

      {/* Profile Menu */}
      <div className="relative profile-menu-container">
        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
        >
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="Avatar"
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <FiUser className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>
    </div>
  );
};

export default HeaderActions;

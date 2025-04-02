import React from "react";
import { Link } from "react-router-dom";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";

const ProfileMenuComponent = ({ showProfileMenu, handleLogout, avatarPreview }) => {
  if (!showProfileMenu) return null;

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 border dark:border-gray-700">
      <Link
        to="/auth/profile"
        className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/50 transition-colors"
      >
        <FiUser className="h-5 w-5 mr-3" />
        Profile
      </Link>
      <Link
        to="/auth/settings"
        className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/50 transition-colors"
      >
        <FiSettings className="h-5 w-5 mr-3" />
        Settings
      </Link>
      <button
        onClick={handleLogout}
        className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/50 transition-colors"
      >
        <FiLogOut className="h-5 w-5 mr-3" />
        Logout
      </button>
    </div>
  );
};

export default ProfileMenuComponent;

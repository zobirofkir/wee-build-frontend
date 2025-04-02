import React, { useState, useEffect } from "react";
import {
  FiSun,
  FiMoon,
  FiUser,
  FiEdit2,
  FiMenu,
  FiBell,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogoutAction } from "../../redux/action/auth/logout-action";

const HeaderComponent = ({ darkMode, setDarkMode, onMenuClick }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    username: "",
    account_type: "",
    avatar: null,
  });
  const [avatarPreview, setAvatarPreview] = useState(null);

  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state) => state.getCurrentAuthenticatedUser || {}
  );

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        location: currentUser.location || "",
        username: currentUser.username || currentUser.email || "",
        account_type: currentUser.account_type || "free",
        avatar: null,
      });

      if (currentUser.avatar) {
        setAvatarPreview(currentUser.avatar);
      } else {
        setAvatarPreview(null);
      }
    }
  }, [currentUser, setFormData]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  const handleLogout = () => {
    dispatch(LogoutAction());
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileMenu && !event.target.closest(".profile-menu-container")) {
        setShowProfileMenu(false);
      }
      if (
        showNotifications &&
        !event.target.closest(".notifications-container")
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showProfileMenu, showNotifications]);

  return (
    <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left section - Mobile menu and logo */}
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 mr-4"
            >
              <FiMenu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
            <Link to="/auth/dashboard" className="flex items-center">
              <h1 className="text-xl font-bold text-purple-800 dark:text-purple-400 md:hidden block">
                AI Store
              </h1>
            </Link>
          </div>

          {/* Right section - Actions and profile */}
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
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 border dark:border-gray-700">
                  <div className="px-4 py-2 border-b dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {/* Add notification items here */}
                    <div className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        No new notifications
                      </p>
                    </div>
                  </div>
                </div>
              )}
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
              {showProfileMenu && (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;

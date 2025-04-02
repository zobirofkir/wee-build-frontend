import React from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { LogoutAction } from "../../redux/action/auth/logout-action";
import { useProfileHook } from "../../hooks/use-profile-hook";
import { useDropdownHook } from "../../hooks/use-dropdown-hook";
import HeaderActionsComponent from "./header/header-action-component";
import ProfileMenu from "./header/profile-menu-component";
import NotificationsMenu from "./header/notifications-menu-component";

const HeaderComponent = ({ darkMode, setDarkMode, onMenuClick }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state) => state.getCurrentAuthenticatedUser || {}
  );
  const { avatarPreview } = useProfileHook();
  const {
    showProfileMenu,
    setShowProfileMenu,
    showNotifications,
    setShowNotifications,
  } = useDropdownHook();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  const handleLogout = () => {
    dispatch(LogoutAction());
  };

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
          <HeaderActionsComponent
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
            showProfileMenu={showProfileMenu}
            setShowProfileMenu={setShowProfileMenu}
            avatarPreview={avatarPreview}
            currentUser={currentUser}
          />
        </div>
      </div>

      {/* Dropdown Menus */}
      <NotificationsMenu showNotifications={showNotifications} />
      <ProfileMenu
        showProfileMenu={showProfileMenu}
        handleLogout={handleLogout}
        avatarPreview={avatarPreview}
      />
    </header>
  );
};

export default HeaderComponent;

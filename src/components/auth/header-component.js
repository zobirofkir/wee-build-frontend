import React, { useState, useEffect } from "react";
import { 
  FiSun, 
  FiMoon, 
  FiMessageSquare, 
  FiUser 
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogoutAction } from "../../redux/action/auth/logout-action";

const HeaderComponent = ({ darkMode, setDarkMode }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [formData, setFormData] = useState({
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

  const { currentUser, loading, error } = useSelector(
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
  }, [currentUser]);



  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  const handleLogout = () => {
    dispatch(LogoutAction());
  };

  /**
   * Close profile menu when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileMenu && !event.target.closest('.profile-menu-container')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu]);

  return (
    <div className="flex justify-between items-center p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300">

      <Link to="/auth/dashboard">
        <h1 className="text-2xl font-bold text-purple-800 dark:text-purple-400">
          AI
        </h1>
      </Link>
      
      <div className="flex items-center space-x-4">
      
      {/* View Live Store */}
      {currentUser && currentUser.domain && (
            <a
            href={`http://${currentUser.domain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 md:mt-0 md:flex hidden items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors shadow-md"
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

        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 flex items-center transition-colors duration-300"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <FiSun className="h-5 w-5" />
          ) : (
            <FiMoon className="h-5 w-5" />
          )}
        </button>
        <div className="relative">
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          <button 
            className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 transition-colors duration-300"
            aria-label="Messages"
          >
            <FiMessageSquare className="h-5 w-5" />
          </button>
        </div>
        <div className="relative profile-menu-container">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium hover:bg-purple-700 transition-colors"
            aria-label="Profile menu"
          >
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar"
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <FiUser className="h-5 w-5" />
            )}
          </button>
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-10 border dark:border-gray-700 transition-all duration-200">
              <Link
                to="/auth/profile"
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/50 transition-colors"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/50 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent; 
import React, { useState, useEffect } from "react";
import {
  FiHome,
  FiShoppingBag,
  FiEdit2,
  FiMenu,
  FiLogOut,
} from "react-icons/fi";
import DesktopSidebareComponent from "../../components/auth/desktop-sidebare-component";
import MobileSidebareComponent from "../../components/auth/mobile-sidebare-component";
import HeaderComponent from "../../components/auth/header-component";
import { LogoutAction } from "../../redux/action/auth/logout-action";
import { useDispatch } from "react-redux";
import { getCurrentAuthenticatedUser } from "../../redux/action/auth/get-current-authenticated-user-action";

const AuthAppLayout = ({ children }) => {
  const dispatch = useDispatch();

  const [darkMode, setDarkMode] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  /**
   * Initialize dark mode from localStorage
   */
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);

    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  /**
   * Update HTML class when darkMode changes
   */
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const navItems = [
    {
      icon: <FiHome className="h-5 w-5" />,
      label: "Dashboard",
      active: true,
      path: "/auth/dashboard",
    },
    {
      icon: <FiShoppingBag className="h-5 w-5" />,
      label: "Themes",
      active: false,
      path: "/auth/themes",
    },
    {
      icon: <FiEdit2 className="h-5 w-5" />,
      label: "Customization",
      active: false,
      path: "/auth/themes/customize",
    },
  ];

    /**
     * Get Current Authenticated User
    */
    useEffect(() => {
      dispatch(getCurrentAuthenticatedUser());
    }, [dispatch]);
  

  const logout = () => {
    dispatch(LogoutAction());
  };

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ${
        darkMode ? "dark" : ""
      }`}
    >
      {/* Desktop Sidebar */}
      <DesktopSidebareComponent navItems={navItems} logout={logout} />

      {/* Main content area with header */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <HeaderComponent
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onMenuClick={() => setIsMobileSidebarOpen(true)}
        />

        {/* Main content */}
        <div className="flex-1 overflow-auto transition-colors duration-300">
          {children}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebareComponent
        navItems={navItems}
        logout={logout}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
    </div>
  );
};

export default AuthAppLayout;

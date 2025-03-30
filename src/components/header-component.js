import React, { useState, useEffect, useCallback } from "react";
import {
  FiMenu,
  FiX,
  FiMoon,
  FiSun,
  FiLogOut,
} from "react-icons/fi";
import { useTheme } from "../contexts/theme-context";
import { Link, useLocation } from "react-router-dom";
import { getAuthToken } from "../utils/cookie-utils";

const HeaderComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();

  /**
   * Get authentication token from cookie
   */
  const token = getAuthToken();

  /**
   * Handle scroll event to determine if the header should be scrolled
   * Using useCallback to memoize the function
   */
  const handleScroll = useCallback(() => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  /**
   * Close mobile menu when window is resized to desktop size
   * Using useCallback to memoize the function
   */
  const handleResize = useCallback(() => {
    if (window.innerWidth >= 768 && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  /**
   * Close mobile menu when route changes
   */
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  /**
   * Handle logout
   */
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/auth/login";
  };

  /**
   * Navigation links configuration for DRY code
   */
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/features", label: "Features" },
    { path: "/pricing", label: "Pricing" },
    { path: "/contact", label: "Contact" },
  ];

  /**
   * 
   * @param {Check if a link is active} path 
   * @returns 
   */
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white dark:bg-gray-900 shadow-md py-2"
          : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <h1 className="text-xl font-bold text-purple-700 dark:text-purple-400">
                AI Store Builder
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors ${
                  isActive(link.path)
                    ? "text-purple-600 dark:text-purple-400 font-medium"
                    : "text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          {token ? (
            <div className="md:flex hidden items-center space-x-4">
              <Link
                to="/auth/dashboard"
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  isActive("/auth/dashboard")
                    ? "bg-purple-700 text-white"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                aria-label="Logout"
                title="Logout"
              >
                <FiLogOut size={20} />
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors"
                aria-label="Toggle theme"
                title={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              {/* Login/Register links */}
              <Link
                to="/auth/login"
                className={`font-medium transition-colors ${
                  isActive("/auth/login")
                    ? "text-purple-800 dark:text-purple-300"
                    : "text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                }`}
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  isActive("/auth/register")
                    ? "bg-purple-700 text-white"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                Register
              </Link>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors"
                aria-label="Toggle theme"
                title={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {token ? (
              <Link
                to="/auth/dashboard"
                className={`transition-colors ${
                  isActive("/auth/dashboard")
                    ? "text-purple-800 dark:text-purple-300 font-medium"
                    : "text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium"
                } mr-2`}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/auth/login"
                className={`transition-colors ${
                  isActive("/auth/login")
                    ? "text-purple-800 dark:text-purple-300 font-medium"
                    : "text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium"
                } mr-2`}
              >
                Login
              </Link>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            <button
              onClick={toggleMenu}
              className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - with smooth transition */}
      <div
        className={`md:hidden fixed w-full bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ top: scrolled ? "48px" : "64px" }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(link.path)
                  ? "bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300"
                  : "text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-800"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {token ? (
            <button
              onClick={handleLogout}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth/register"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/auth/register")
                  ? "bg-purple-700 text-white"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              } max-w-[120px] text-center`}
            >
              Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default HeaderComponent;

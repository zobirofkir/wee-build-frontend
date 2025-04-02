import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiX, FiLogOut } from "react-icons/fi";

const MobileSidebareComponent = ({ navItems, logout, isOpen, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <Link
            to="/auth/dashboard"
            className="text-xl font-bold text-purple-800 dark:text-purple-400"
          >
            AI Store
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FiX className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                onClick={onClose}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t dark:border-gray-700">
          <button
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg w-full transition-colors duration-200"
            onClick={() => {
              logout();
              onClose();
            }}
          >
            <FiLogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileSidebareComponent;

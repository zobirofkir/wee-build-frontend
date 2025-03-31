import React from 'react'
import { FiLogOut } from "react-icons/fi";
import { Link, useLocation } from 'react-router-dom'

const DesktopSidebareComponent = ({navItems, logout}) => {
  const location = useLocation();
  
  return (
    <div className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 transition-colors duration-300">
        <div className="p-4 border-b dark:border-gray-700">
          <Link to="/auth/dashboard" className='text-xl font-bold text-purple-800 dark:text-purple-400'>
              AI Store
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                      key={index}
                      to={item.path}
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
        </div>

        <div className="p-4 border-t dark:border-gray-700">
          <button 
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg w-full transition-colors duration-200" 
            onClick={logout}
          >
              <FiLogOut className="h-5 w-5 mr-3" />
              Logout
          </button>
        </div>
    </div>
  )
}

export default DesktopSidebareComponent
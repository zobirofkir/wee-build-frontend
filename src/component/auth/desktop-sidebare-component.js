import React from 'react'
import {  FiLogOut } from "react-icons/fi";

const DesktopSidebareComponent = ({navItems}) => {
  return (
    <div className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700">
        <div className="p-4 border-b dark:border-gray-700">
        <h1 className="text-xl font-bold text-purple-800 dark:text-purple-400">
            AI Store
        </h1>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
            {navItems.map((item, index) => (
            <a
                key={index}
                href="/"
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                item.active
                    ? "bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
                <span className="mr-3">{item.icon}</span>
                {item.label}
            </a>
            ))}
        </nav>
        </div>

        <div className="p-4 border-t dark:border-gray-700">
        <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg w-full">
            <FiLogOut className="h-5 w-5 mr-3" />
            Logout
        </button>
        </div>
        
    </div>

  )
}

export default DesktopSidebareComponent
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const MobileSidebareComponent = ({navItems, logout}) => {
  const location = useLocation();
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-10 bg-white dark:bg-gray-800 border-t dark:border-gray-700 flex justify-around p-2 transition-colors duration-300">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
                key={index}
                to={item.path}
                className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-200 ${
                isActive
                    ? "text-purple-800 dark:text-purple-400"
                    : "text-gray-700 dark:text-gray-300"
                }`}
            >
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
    </div>
  )
}

export default MobileSidebareComponent
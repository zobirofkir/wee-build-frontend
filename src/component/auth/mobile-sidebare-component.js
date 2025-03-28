import React from 'react'

const MobileSidebareComponent = ({navItems, logout}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-10 bg-white dark:bg-gray-800 border-t dark:border-gray-700 flex justify-around p-2">
        {navItems.map((item, index) => (
        <a
            key={index}
            href="/"
            className={`flex flex-col items-center p-2 rounded-lg ${
            item.active
                ? "text-purple-800 dark:text-purple-400"
                : "text-gray-700 dark:text-gray-300"
            }`}
        >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
        </a>
        ))}
    </div>
  )
}

export default MobileSidebareComponent
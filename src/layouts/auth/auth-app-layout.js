import React from "react";
import {
  FiHome,
  FiShoppingBag,
  FiUsers,
  FiSettings,
  FiBarChart2,
  FiLogOut,
} from "react-icons/fi";

const AuthAppLayout = ({ children }) => {
  const navItems = [
    { icon: <FiHome className="h-5 w-5" />, label: "Dashboard", active: true },
    {
      icon: <FiShoppingBag className="h-5 w-5" />,
      label: "AI Models",
      active: false,
    },
    {
      icon: <FiUsers className="h-5 w-5" />,
      label: "Customers",
      active: false,
    },
    {
      icon: <FiBarChart2 className="h-5 w-5" />,
      label: "Analytics",
      active: false,
    },
    {
      icon: <FiSettings className="h-5 w-5" />,
      label: "Settings",
      active: false,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}

      {/* Mobile sidebar */}
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

      {/* Main content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
};

export default AuthAppLayout;

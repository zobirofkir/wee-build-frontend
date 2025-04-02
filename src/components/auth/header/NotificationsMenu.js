import React from "react";
import { FiBell } from "react-icons/fi";

const NotificationsMenu = ({ showNotifications }) => {
  if (!showNotifications) return null;

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 border dark:border-gray-700">
      <div className="px-4 py-2 border-b dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Notifications
        </h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        <div className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            No new notifications
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationsMenu;

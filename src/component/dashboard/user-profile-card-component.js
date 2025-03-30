import React from 'react'
import { Link } from "react-router-dom";

const UserProfileCardComponent = ({currentUser}) => {
  return (
    <>
    {currentUser && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col items-center text-center">
            <div className="h-20 w-20 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 text-2xl font-bold mb-3">
              {currentUser.name
                ? currentUser.name.charAt(0).toUpperCase()
                : "U"}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {currentUser.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {currentUser.email}
            </p>
            <div className="mt-4 w-full">
              <Link
                to="/auth/profile"
                className="block w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-center text-sm"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default UserProfileCardComponent
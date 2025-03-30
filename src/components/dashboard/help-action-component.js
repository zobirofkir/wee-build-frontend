import React from 'react'
import { FiHelpCircle } from "react-icons/fi";

const HelpActionComponent = () => {
  return (
    <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl shadow-md p-6 text-white border border-purple-500">
        <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold">Need Help?</h2>
        <FiHelpCircle className="h-5 w-5" />
        </div>
        <p className="text-sm text-purple-100 mb-4">
        Our support team is ready to assist you with any questions about
        your AI store.
        </p>
        <button className="w-full py-2 px-4 bg-white text-purple-700 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center font-medium">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
            />
        </svg>
        Contact Support
        </button>
    </div>
  )
}

export default HelpActionComponent
import React from 'react';
import { 
  FiShoppingBag, 
  FiLayout, 
  FiGrid,
  FiCpu,
  FiSettings,
  FiTrendingUp 
} from "react-icons/fi";

const HeroComponent = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Purple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
              Create Your Online Store in{' '}
              <span className="text-purple-600 dark:text-purple-400">Seconds</span>{' '}
              with AI!
            </h1>
            
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
              Transform your business idea into reality with our AI-powered platform. 
              Design, customize, and launch your e-commerce store effortlessly - no coding required.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors duration-300 transform hover:scale-105">
                Start Now - It's Free
              </button>
              <button className="px-8 py-4 border-2 border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 font-semibold rounded-lg hover:bg-purple-50 dark:hover:bg-gray-800 transition-colors duration-300">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Icon Grid Illustration */}
          <div className="relative">
            <div className="w-full h-full max-w-lg mx-auto grid grid-cols-2 gap-8">
              {/* Icon Cards */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <FiShoppingBag className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Store Setup</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <FiLayout className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">AI Design</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <FiCpu className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Smart AI</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <FiTrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Analytics</span>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-1/4 -left-4 w-8 h-8 bg-purple-200 dark:bg-purple-800 rounded-full opacity-50" />
              <div className="absolute bottom-1/4 -right-4 w-6 h-6 bg-purple-300 dark:bg-purple-700 rounded-full opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroComponent;
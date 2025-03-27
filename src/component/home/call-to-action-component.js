import React from "react";
import { FiArrowRight, FiShoppingBag, FiZap } from "react-icons/fi";

const CallToActionComponent = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-purple-600 to-indigo-700 dark:from-purple-700 dark:to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500 dark:bg-purple-600 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500 dark:bg-indigo-600 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Main Content */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Start Your AI-Powered Store Today!
            </h2>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-purple-100 mb-8">
              Join thousands of entrepreneurs who have launched successful
              online stores in minutes, not months.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <a
                href="#signup"
                className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-purple-600 dark:text-purple-400 font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Get Started for Free
                <FiArrowRight className="ml-2" />
              </a>
              <a
                href="#demo"
                className="inline-flex items-center justify-center px-8 py-4 bg-purple-500 bg-opacity-30 hover:bg-opacity-40 dark:bg-opacity-20 dark:hover:bg-opacity-30 text-white font-bold rounded-lg transition-all duration-300 border-2 border-white border-opacity-20"
              >
                Watch Demo
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-white">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm md:text-base">
                  No credit card required
                </span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm md:text-base">Free 14-day trial</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm md:text-base">Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white dark:bg-gray-800 bg-opacity-10 dark:bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20 text-white">
              <div className="w-12 h-12 bg-purple-500 bg-opacity-30 rounded-lg flex items-center justify-center mb-4">
                <FiZap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Launch in Minutes</h3>
              <p className="text-purple-100">
                Our AI-powered platform handles all the technical details so you
                can focus on your products and customers.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 bg-opacity-10 dark:bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20 text-white">
              <div className="w-12 h-12 bg-purple-500 bg-opacity-30 rounded-lg flex items-center justify-center mb-4">
                <FiShoppingBag className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Sell Anywhere</h3>
              <p className="text-purple-100">
                Reach customers on any device with responsive storefronts
                optimized for desktop, tablet, and mobile.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 bg-opacity-10 dark:bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20 text-white">
              <div className="w-12 h-12 bg-purple-500 bg-opacity-30 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Grow Your Business</h3>
              <p className="text-purple-100">
                Powerful analytics and AI tools help you optimize your store and
                increase sales over time.
              </p>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="mt-16 bg-white dark:bg-gray-800 bg-opacity-10 dark:bg-opacity-10 backdrop-blur-sm rounded-xl p-8 border border-white border-opacity-20 text-center">
            <blockquote className="text-xl md:text-2xl font-medium text-white italic mb-4">
              "I never thought I could launch an online store so quickly. Within
              a day of signing up, I made my first sale!"
            </blockquote>
            <div className="flex items-center justify-center">
              <img
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt="Customer"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="text-left">
                <p className="font-semibold text-white">Jessica T.</p>
                <p className="text-sm text-purple-200">Boutique Owner</p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Ready to transform your e-commerce business?
            </h3>
            <a
              href="#signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-purple-600 dark:text-purple-400 font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Your Free Trial
              <FiArrowRight className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionComponent;

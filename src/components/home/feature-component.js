import React from "react";
import {
  FiEdit,
  FiZap,
  FiLink,
  FiSmartphone,
  FiShoppingCart,
  FiBarChart2,
} from "react-icons/fi";

const FeatureComponent = () => {
  const features = [
    {
      icon: <FiEdit />,
      title: "AI-Generated Product Descriptions",
      description:
        "Create compelling product descriptions automatically with our advanced AI technology. Save time and increase conversions.",
    },
    {
      icon: <FiZap />,
      title: "One-Click Store Creation",
      description:
        "Launch your online store instantly with our streamlined setup process. No technical skills required.",
    },
    {
      icon: <FiLink />,
      title: "Integration with AliExpress & eProlo",
      description:
        "Seamlessly connect with popular platforms to import products and manage your inventory efficiently.",
    },
    {
      icon: <FiSmartphone />,
      title: "Mobile-Friendly Design",
      description:
        "Reach customers on any device with responsive storefronts that look great on desktop, tablet, and mobile.",
    },
    {
      icon: <FiShoppingCart />,
      title: "Easy Product Management",
      description:
        "Add, edit, and organize your products with an intuitive dashboard designed for simplicity.",
    },
    {
      icon: <FiBarChart2 />,
      title: "Sales Analytics",
      description:
        "Track performance with detailed analytics and insights to help grow your business strategically.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features for Your{" "}
            <span className="text-purple-600 dark:text-purple-400">
              Online Store
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Everything you need to create, manage, and grow your e-commerce
            business in one platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-purple-50 dark:bg-gray-800 rounded-xl p-8 transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-6">
                <span className="text-purple-600 dark:text-purple-400 text-2xl">
                  {feature.icon}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeatureComponent;

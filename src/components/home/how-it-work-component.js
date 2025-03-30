import React from "react";
import { FaUserPlus, FaPalette, FaRobot, FaShoppingCart } from "react-icons/fa";

const HowItWorkComponent = () => {
  const steps = [
    {
      icon: (
        <FaUserPlus className="text-4xl md:text-5xl text-purple-600 dark:text-purple-400" />
      ),
      number: "1️⃣",
      title: "Sign up",
      description:
        "Create your account in seconds and get started with your e-commerce journey.",
    },
    {
      icon: (
        <FaPalette className="text-4xl md:text-5xl text-purple-600 dark:text-purple-400" />
      ),
      number: "2️⃣",
      title: "Choose store template",
      description:
        "Select from our professionally designed templates that match your brand.",
    },
    {
      icon: (
        <FaRobot className="text-4xl md:text-5xl text-purple-600 dark:text-purple-400" />
      ),
      number: "3️⃣",
      title: "AI generates a ready-to-use store",
      description:
        "Our AI technology builds your complete store with all the features you need.",
    },
    {
      icon: (
        <FaShoppingCart className="text-4xl md:text-5xl text-purple-600 dark:text-purple-400" />
      ),
      number: "4️⃣",
      title: "Start selling",
      description: "Launch your store and start accepting orders right away.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            How It{" "}
            <span className="text-purple-600 dark:text-purple-400">Works</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Create your online store in just a few simple steps and start
            selling today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1"
            >
              <div className="mb-4 relative">
                <div className="absolute -top-3 -right-3 bg-purple-100 dark:bg-purple-900 rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-sm">{step.number}</span>
                </div>
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorkComponent;

import React, { useState } from "react";
import { FiCheck, FiX, FiHelpCircle } from "react-icons/fi";

const PricingPlanComponent = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started with basic e-commerce features",
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        { name: "Up to 10 products", included: true },
        { name: "Basic store customization", included: true },
        { name: "Standard payment processing", included: true },
        { name: "Community support", included: true },
        { name: "AI product descriptions (5/mo)", included: true },
        { name: "Advanced analytics", included: false },
        { name: "Custom domain", included: false },
        { name: "Priority support", included: false },
      ],
      buttonText: "Start for Free",
      highlighted: false,
    },
    {
      name: "Pro",
      description: "Ideal for growing businesses with advanced needs",
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        { name: "Unlimited products", included: true },
        { name: "Advanced store customization", included: true },
        { name: "Reduced transaction fees", included: true },
        { name: "Email & chat support", included: true },
        { name: "AI product descriptions (50/mo)", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Custom domain", included: true },
        { name: "Priority support", included: false },
      ],
      buttonText: "Get Started",
      highlighted: true,
    },
    {
      name: "Enterprise",
      description: "For large businesses with custom requirements",
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        { name: "Unlimited products", included: true },
        { name: "Full store customization", included: true },
        { name: "Lowest transaction fees", included: true },
        { name: "24/7 dedicated support", included: true },
        { name: "AI product descriptions (unlimited)", included: true },
        { name: "Advanced analytics & reporting", included: true },
        { name: "Custom domain & branding", included: true },
        { name: "Priority support", included: true },
      ],
      buttonText: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent{" "}
            <span className="text-purple-600 dark:text-purple-400">
              Pricing
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Choose the perfect plan for your business needs with no hidden fees
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 flex justify-center items-center space-x-4">
            <span
              className={`text-sm font-medium ${
                billingCycle === "monthly"
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() =>
                setBillingCycle(
                  billingCycle === "monthly" ? "yearly" : "monthly"
                )
              }
              className="relative inline-flex h-6 w-12 items-center rounded-full bg-gray-200 dark:bg-gray-700"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-purple-600 transition-transform ${
                  billingCycle === "yearly" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium ${
                billingCycle === "yearly"
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Yearly{" "}
              <span className="text-green-500 font-semibold">(Save 20%)</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl overflow-hidden ${
                plan.highlighted
                  ? "border-2 border-purple-500 dark:border-purple-400 shadow-xl transform md:-translate-y-4"
                  : "border border-gray-200 dark:border-gray-700 shadow-lg"
              }`}
            >
              {plan.highlighted && (
                <div className="bg-purple-600 dark:bg-purple-500 text-white text-center py-2 font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-8 bg-white dark:bg-gray-800">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 h-12">
                  {plan.description}
                </p>
                <div className="mt-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                      $
                      {billingCycle === "monthly"
                        ? plan.monthlyPrice
                        : plan.yearlyPrice}
                    </span>
                    <span className="ml-1 text-xl text-gray-500 dark:text-gray-400">
                      {plan.monthlyPrice === 0
                        ? ""
                        : billingCycle === "monthly"
                        ? "/month"
                        : "/year"}
                    </span>
                  </div>
                </div>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      {feature.included ? (
                        <FiCheck className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      ) : (
                        <FiX className="h-5 w-5 text-gray-400 flex-shrink-0 mr-2" />
                      )}
                      <span
                        className={`text-sm ${
                          feature.included
                            ? "text-gray-700 dark:text-gray-200"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <button
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      plan.highlighted
                        ? "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white"
                        : "bg-purple-100 hover:bg-purple-200 dark:bg-purple-900 dark:hover:bg-purple-800 text-purple-600 dark:text-purple-400"
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-20 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    Feature Comparison
                  </th>
                  {plans.map((plan, index) => (
                    <th
                      key={index}
                      scope="col"
                      className={`px-3 py-3.5 text-center text-sm font-semibold ${
                        plan.highlighted
                          ? "text-purple-600 dark:text-purple-400"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                <tr>
                  <th
                    scope="row"
                    className="py-4 pl-6 pr-3 text-sm font-medium text-gray-900 dark:text-white flex items-center"
                  >
                    Products
                    <FiHelpCircle className="ml-1 text-gray-400 h-4 w-4" />
                  </th>
                  <td className="px-3 py-4 text-sm text-center text-gray-700 dark:text-gray-300">
                    Up to 10
                  </td>
                  <td className="px-3 py-4 text-sm text-center text-gray-700 dark:text-gray-300 bg-purple-50 dark:bg-purple-900/20">
                    Unlimited
                  </td>
                  <td className="px-3 py-4 text-sm text-center text-gray-700 dark:text-gray-300">
                    Unlimited
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="py-4 pl-6 pr-3 text-sm font-medium text-gray-900 dark:text-white flex items-center"
                  >
                    AI Product Descriptions
                    <FiHelpCircle className="ml-1 text-gray-400 h-4 w-4" />
                  </th>
                  <td className="px-3 py-4 text-sm text-center text-gray-700 dark:text-gray-300">
                    5 per month
                  </td>
                  <td className="px-3 py-4 text-sm text-center text-gray-700 dark:text-gray-300 bg-purple-50 dark:bg-purple-900/20">
                    50 per month
                  </td>
                  <td className="px-3 py-4 text-sm text-center text-gray-700 dark:text-gray-300">
                    Unlimited
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="py-4 pl-6 pr-3 text-sm font-medium text-gray-900 dark:text-white flex items-center"
                  >
                    Transaction Fee
                    <FiHelpCircle className="ml-1 text-gray-400 h-4 w-4" />
                  </th>
                  <td className="px-3 py-4 text-sm text-center text-gray-700 dark:text-gray-300">
                    3.9% + 30¢
                  </td>
                  <td className="px-3 py-4 text-sm text-center text-gray-700 dark:text-gray-300 bg-purple-50 dark:bg-purple-900/20">
                    2.9% + 30¢
                  </td>
                  <td className="px-3 py-4 text-sm text-center text-gray-700 dark:text-gray-300">
                    2.5% + 30¢
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="py-4 pl-6 pr-3 text-sm font-medium text-gray-900 dark:text-white flex items-center"
                  >
                    Custom Domain
                    <FiHelpCircle className="ml-1 text-gray-400 h-4 w-4" />
                  </th>
                  <td className="px-3 py-4 text-center">
                    <FiX className="h-5 w-5 text-gray-400 mx-auto" />
                  </td>
                  <td className="px-3 py-4 text-center bg-purple-50 dark:bg-purple-900/20">
                    <FiCheck className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="px-3 py-4 text-center">
                    <FiCheck className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="py-4 pl-6 pr-3 text-sm font-medium text-gray-900 dark:text-white flex items-center"
                  >
                    Support
                    <FiHelpCircle className="ml-1 text-gray-400 h-4 w-4" />
                  </th>
                  <td className="px-3 py-4 text-sm text-center text-gray-700 dark:text-gray-300">
                    Community
                  </td>
                  <td className="px-3 py-4 text-sm text-center text-gray-700 dark:text-gray-300 bg-purple-50 dark:bg-purple-900/20">
                    Email & Chat
                  </td>
                  <td className="px-3 py-4 text-sm text-center text-gray-700 dark:text-gray-300">
                    24/7 Dedicated
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Link */}
        <div className="mt-10 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Have questions about our pricing?{" "}
            <a
              href="#faq"
              className="text-purple-600 dark:text-purple-400 font-medium hover:underline"
            >
              Check our FAQ
            </a>{" "}
            or{" "}
            <a
              href="#contact"
              className="text-purple-600 dark:text-purple-400 font-medium hover:underline"
            >
              contact us
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingPlanComponent;

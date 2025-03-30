import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiMessageSquare } from "react-icons/fi";

const FaqComponent = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Do I need coding skills to create my online store?",
      answer:
        "No, it's 100% automated! Our platform is designed for entrepreneurs with no technical background. The intuitive interface and AI-powered tools handle all the technical aspects, allowing you to focus on your products and business growth.",
    },
    {
      question: "How long does it take to set up a store?",
      answer:
        "Most users launch their store in under 5 minutes! Our streamlined process guides you through each step, from choosing a template to adding your first products. With our one-click store creation, you can have a professional online presence almost instantly.",
    },
    {
      question: "Can I integrate with AliExpress and other platforms?",
      answer:
        "Yes! We offer seamless integration with AliExpress, eProlo, and other major e-commerce platforms. You can import products directly, sync inventory, and manage orders all from one dashboard without switching between multiple systems.",
    },
    {
      question: "How does the AI product description generator work?",
      answer:
        "Our AI analyzes your product images and basic information to create compelling, SEO-optimized descriptions automatically. Simply upload your product image, provide a few key details, and the AI will generate unique, engaging content that helps convert visitors into customers.",
    },
    {
      question: "What payment methods can I offer my customers?",
      answer:
        "We support all major payment gateways including PayPal, Stripe, Square, and many more. You can offer credit/debit cards, digital wallets, and even alternative payment methods depending on your region. All transactions are secure and PCI compliant.",
    },
    {
      question: "Is there a limit to how many products I can sell?",
      answer:
        "Our Free plan allows up to 10 products, which is perfect for getting started. Our Pro and Enterprise plans offer unlimited products to support your business as it grows. You can upgrade or downgrade your plan at any time based on your needs.",
    },
    {
      question: "Do you charge transaction fees?",
      answer:
        "Yes, there are transaction fees that vary by plan. The Free plan has a 3.9% + 30¢ fee per transaction, the Pro plan reduces this to 2.9% + 30¢, and the Enterprise plan offers our lowest rate at 2.5% + 30¢. These fees help us maintain the platform and provide ongoing support.",
    },
    {
      question: "Can I use my own domain name?",
      answer:
        "Absolutely! While the Free plan provides a subdomain (yourstore.ourplatform.com), both Pro and Enterprise plans allow you to connect your custom domain (yourstore.com). We also offer domain registration services if you don't already have one.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked{" "}
            <span className="text-purple-600 dark:text-purple-400">
              Questions
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Everything you need to know about our platform and services
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-lg overflow-hidden transition-all duration-200 ${
                openIndex === index
                  ? "border-purple-300 dark:border-purple-700 shadow-md"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              <button
                className={`w-full px-6 py-4 flex justify-between items-center text-left ${
                  openIndex === index
                    ? "bg-purple-50 dark:bg-purple-900/20"
                    : "bg-white dark:bg-gray-800"
                }`}
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                <span className="ml-4 flex-shrink-0 text-purple-600 dark:text-purple-400">
                  {openIndex === index ? (
                    <FiChevronUp className="h-5 w-5" />
                  ) : (
                    <FiChevronDown className="h-5 w-5" />
                  )}
                </span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 py-4 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-16 bg-purple-50 dark:bg-purple-900/10 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiMessageSquare className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Can't find the answer you're looking for? Please contact our
            friendly support team.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
            >
              Contact Support
            </a>
            <a
              href="#docs"
              className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              View Documentation
            </a>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Getting Started
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#setup"
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                >
                  Store setup guide
                </a>
              </li>
              <li>
                <a
                  href="#templates"
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                >
                  Template selection
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                >
                  Adding products
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Payments & Shipping
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#payment-setup"
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                >
                  Payment gateways
                </a>
              </li>
              <li>
                <a
                  href="#shipping"
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                >
                  Shipping options
                </a>
              </li>
              <li>
                <a
                  href="#taxes"
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                >
                  Tax configuration
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Account & Billing
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#plans"
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                >
                  Subscription plans
                </a>
              </li>
              <li>
                <a
                  href="#billing"
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                >
                  Billing cycles
                </a>
              </li>
              <li>
                <a
                  href="#account"
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                >
                  Account management
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqComponent;

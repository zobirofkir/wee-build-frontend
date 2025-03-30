import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";

const TestimonialComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Fashion Store Owner",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      content:
        "I created my store in 5 minutes and started selling instantly! The AI product descriptions saved me hours of work and increased my conversion rate by 30%.",
      rating: 5,
      company: "StyleHub Boutique",
      companyLogo: "https://placehold.co/100x40/purple/white?text=StyleHub",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Tech Entrepreneur",
      image: "https://randomuser.me/api/portraits/men/54.jpg",
      content:
        "As someone with no technical background, I was amazed at how easy it was to set up my electronics store. The platform handled everything from product imports to payment processing seamlessly.",
      rating: 5,
      company: "TechGadgets",
      companyLogo: "https://placehold.co/100x40/purple/white?text=TechGadgets",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Handmade Crafts Seller",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      content:
        "The analytics tools helped me understand which products were performing best, allowing me to focus my inventory on high-margin items. My revenue doubled in just three months!",
      rating: 4,
      company: "Crafty Creations",
      companyLogo: "https://placehold.co/100x40/purple/white?text=CraftyC",
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Fitness Equipment Retailer",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      content:
        "The mobile-friendly design means my customers can shop easily from their phones. Plus, the integration with AliExpress made dropshipping incredibly simple to manage.",
      rating: 5,
      company: "FitGear Pro",
      companyLogo: "https://placehold.co/100x40/purple/white?text=FitGear",
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our{" "}
            <span className="text-purple-600 dark:text-purple-400">
              Customers
            </span>{" "}
            Say
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Success stories from entrepreneurs who transformed their business
            with our platform
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Testimonial Content */}
            <div className="p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonials[activeIndex].rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-8">
                  "{testimonials[activeIndex].content}"
                </blockquote>
              </div>
              <div>
                <div className="flex items-center">
                  <img
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonials[activeIndex].name}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {testimonials[activeIndex].role},{" "}
                      {testimonials[activeIndex].company}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Image */}
            <div className="relative bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center p-8">
              <div className="relative w-full max-w-md">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={`https://placehold.co/800x450/purple/white?text=Success+Story`}
                    alt="Success Story"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                  <img
                    src={testimonials[activeIndex].companyLogo}
                    alt={testimonials[activeIndex].company}
                    className="h-8"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
              aria-label="Next testimonial"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-2 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                activeIndex === index
                  ? "bg-purple-600 dark:bg-purple-400"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-purple-300 dark:hover:bg-purple-700"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Success Metrics */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-purple-600 dark:text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              93%
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Of our customers report increased sales within the first month
            </p>
          </div>

          {/* Success Metrics */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-purple-600 dark:text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              5 minutes
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Average time to set up a complete online store and start selling
            </p>
          </div>

          {/* Success Metrics */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-purple-600 dark:text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              10,000+
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Entrepreneurs have launched successful online stores with our
              platform
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <a
            href="#signup"
            className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Join Our Success Stories
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialComponent;

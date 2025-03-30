import React, { useState } from "react";
import {
  FiShoppingBag,
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiArrowRight,
} from "react-icons/fi";

const DemoStoreComponent = () => {
  const [activeTab, setActiveTab] = useState("fashion");

  const demoStores = {
    fashion: {
      name: "StyleHub",
      products: [
        {
          id: 1,
          name: "Premium Denim Jacket",
          price: 89.99,
          image:
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
        },
        {
          id: 2,
          name: "Classic White Sneakers",
          price: 59.99,
          image:
            "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80",
        },
        {
          id: 3,
          name: "Minimalist Watch",
          price: 129.99,
          image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80",
        },
      ],
    },
    electronics: {
      name: "TechZone",
      products: [
        {
          id: 1,
          name: "Wireless Earbuds",
          price: 79.99,
          image:
            "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1378&q=80",
        },
        {
          id: 2,
          name: "Smart Watch",
          price: 149.99,
          image:
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
        },
        {
          id: 3,
          name: "Portable Speaker",
          price: 99.99,
          image:
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1636&q=80",
        },
      ],
    },
    home: {
      name: "HomeEssentials",
      products: [
        {
          id: 1,
          name: "Scented Candle Set",
          price: 34.99,
          image:
            "https://images.unsplash.com/photo-1603006905003-be475563bc59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        },
        {
          id: 2,
          name: "Minimalist Desk Lamp",
          price: 49.99,
          image:
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        },
        {
          id: 3,
          name: "Ceramic Plant Pot",
          price: 29.99,
          image:
            "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
        },
      ],
    },
  };

  const activeStore = demoStores[activeTab];

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            See What Your{" "}
            <span className="text-purple-600 dark:text-purple-400">Store</span>{" "}
            Could Look Like
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Explore our interactive demo stores and visualize your e-commerce
            business before you launch
          </p>
        </div>

        {/* Demo Store Preview */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden max-w-5xl mx-auto">
          {/* Store Header */}
          <div className="bg-purple-600 dark:bg-purple-700 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FiShoppingBag className="text-white text-xl" />
              <h3 className="text-white font-bold text-xl">
                {activeStore.name}
              </h3>
            </div>
            <div className="flex items-center space-x-4">
              <FiSearch className="text-white text-xl cursor-pointer hover:opacity-80 transition-opacity" />
              <FiHeart className="text-white text-xl cursor-pointer hover:opacity-80 transition-opacity" />
              <FiShoppingCart className="text-white text-xl cursor-pointer hover:opacity-80 transition-opacity" />
            </div>
          </div>

          {/* Store Type Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab("fashion")}
              className={`flex-1 py-3 px-4 text-center font-medium ${
                activeTab === "fashion"
                  ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-300"
              }`}
            >
              Fashion Store
            </button>
            <button
              onClick={() => setActiveTab("electronics")}
              className={`flex-1 py-3 px-4 text-center font-medium ${
                activeTab === "electronics"
                  ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-300"
              }`}
            >
              Electronics Store
            </button>
            <button
              onClick={() => setActiveTab("home")}
              className={`flex-1 py-3 px-4 text-center font-medium ${
                activeTab === "home"
                  ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-300"
              }`}
            >
              Home Goods
            </button>
          </div>

          {/* Products Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeStore.products.map((product) => (
                <div
                  key={product.id}
                  className="group border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover object-center group-hover:opacity-90 transition-opacity"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-gray-900 dark:text-white font-medium">
                      {product.name}
                    </h4>
                    <p className="text-purple-600 dark:text-purple-400 font-bold mt-1">
                      ${product.price}
                    </p>
                    <button className="mt-3 w-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 py-2 rounded-md font-medium hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Demo Store Footer */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 text-center">
            <button className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
              Try a Demo Store
              <FiArrowRight className="ml-2" />
            </button>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Experience the full functionality with our interactive demo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoStoreComponent;

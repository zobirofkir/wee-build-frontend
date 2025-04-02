import React from "react";
import { pages } from "./constants";

const PageSelectorComponent = ({ selectedPage, onPageSelect }) => {
  return (
    <div className="flex space-x-2 overflow-x-auto pb-2">
      {pages.map((page) => (
        <button
          key={page.id}
          onClick={() => onPageSelect(page.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
            selectedPage === page.id
              ? "bg-purple-600 text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          {page.name}
        </button>
      ))}
    </div>
  );
};

export default PageSelectorComponent;

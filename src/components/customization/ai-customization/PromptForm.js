import React, { useEffect, useRef } from "react";
import { pages } from "./constants";

const PromptForm = ({
  selectedPage,
  prompt,
  onPromptChange,
  isGenerating,
  error,
  onSubmit,
}) => {
  const textareaRef = useRef(null);
  const selectedPageName = pages.find((p) => p.id === selectedPage)?.name;

  useEffect(() => {
    if (!textareaRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      // Prevent ResizeObserver loop by debouncing the resize events
      window.requestAnimationFrame(() => {
        if (!Array.isArray(entries) || !entries.length) {
          return;
        }
      });
    });

    resizeObserver.observe(textareaRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Customize {selectedPageName} with AI
      </h3>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="prompt"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Describe your desired changes
          </label>
          <textarea
            ref={textareaRef}
            id="prompt"
            rows={4}
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder="Example: Add a hero section with a full-width image and centered text overlay. Include a call-to-action button."
            className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:text-white resize-none"
            style={{ minHeight: "100px", maxHeight: "300px" }}
          />
        </div>

        <div className="flex items-center space-x-4">
          <button
            type="submit"
            disabled={isGenerating || !prompt.trim()}
            className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${
              isGenerating || !prompt.trim()
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {isGenerating ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating...
              </span>
            ) : (
              "Generate Code"
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default PromptForm;

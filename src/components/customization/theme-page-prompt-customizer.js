import React, { useState } from "react";

const ThemePagePromptCustomizer = () => {
  const [selectedPage, setSelectedPage] = useState("home");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [error, setError] = useState("");

  const pages = [
    { id: "home", name: "Home Page" },
    { id: "product", name: "Product Page" },
    { id: "cart", name: "Cart Page" },
    { id: "checkout", name: "Checkout Page" },
    { id: "category", name: "Category Page" },
    { id: "search", name: "Search Page" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setError("");
    setGeneratedCode("");

    try {
      // Here you would integrate with your AI service
      // For now, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setGeneratedCode(
        `// Generated code for ${selectedPage} page based on prompt: ${prompt}`
      );
    } catch (err) {
      setError("Failed to generate code. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Page Selection */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() => setSelectedPage(page.id)}
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

      {/* Prompt Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Customize {pages.find((p) => p.id === selectedPage)?.name} with AI
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="prompt"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Describe your desired changes
            </label>
            <textarea
              id="prompt"
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Example: Add a hero section with a full-width image and centered text overlay. Include a call-to-action button."
              className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
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

      {/* Generated Code Preview */}
      {generatedCode && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Generated Code
          </h3>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-100">
              <code>{generatedCode}</code>
            </pre>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => {
                /* Add apply code functionality */
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              Apply Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemePagePromptCustomizer;

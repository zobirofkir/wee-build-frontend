import React from "react";

const PreviewSectionLeftSideComponent = ({ isPreviewMode, currentTheme }) => {
  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 opacity-50"></div>
        <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 m-4">
          <div className="absolute inset-0">
            <iframe
              src={currentTheme.preview_url}
              className="w-full h-full border-0"
              title="Theme Preview"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/20 to-transparent p-4">
            <div className="flex items-center justify-between">
              <span className="text-white text-sm font-medium">
                Live Preview
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-white text-sm">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewSectionLeftSideComponent;

import React from 'react'

const PreviewSectionLeftSideComponent = ({ isPreviewMode, currentTheme }) => {
  return (
    <div
        className={`w-full ${
        isPreviewMode ? "lg:w-1/2" : "lg:w-0"
        } p-8 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300 shadow-lg`}
    >
        <div className="h-full flex flex-col">
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="relative h-full">
            <iframe
                src={currentTheme.preview_url}
                className="w-full h-full border-0"
                title="Theme Preview"
            />
            </div>
        </div>
        </div>
    </div>
  )
}

export default PreviewSectionLeftSideComponent
import React from 'react'

const ApplyThemeButtonComponent = ({selectedTheme, themes, applyLoading, applyProgress, handleApplyTheme}) => {
  return (
    <>
        {selectedTheme && (
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 shadow-lg border-t border-gray-200 dark:border-gray-700 z-10">
            <div className="container mx-auto flex justify-between items-center">
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Theme selected:{" "}
                <span className="text-purple-600 dark:text-purple-400">
                  {themes?.find((t) => t.id === selectedTheme)?.name}
                </span>
              </p>
              <button
                onClick={handleApplyTheme}
                disabled={applyLoading || applyProgress > 0}
                className={`py-2 px-6 relative overflow-hidden ${
                  applyLoading || applyProgress > 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                } text-white rounded-lg transition-colors flex items-center`}
              >
                {applyProgress > 0 ? (
                  <div className="flex items-center">
                    <span className="mr-2">{Math.round(applyProgress)}%</span>
                    <div
                      className="absolute left-0 bottom-0 h-1 bg-white/30 transition-all duration-100"
                      style={{ width: `${applyProgress}%` }}
                    />
                  </div>
                ) : applyLoading ? (
                  <>
                    <span className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Applying...
                  </>
                ) : (
                  "Apply Theme"
                )}
              </button>
            </div>
          </div>
        )}
    </>
  )
}

export default ApplyThemeButtonComponent
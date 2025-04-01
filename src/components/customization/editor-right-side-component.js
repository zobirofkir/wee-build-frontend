import React from 'react'

const EditorRightSideComponent = ({isPreviewMode, handleSubmit, handleColorChange, handleTypographyChange, handleLayoutChange, applyPresetScheme, presetSchemes, themeOptions, updateLoading, updateError}) => {
  return (
    <div
        className={`w-full ${
        isPreviewMode ? "lg:w-1/2" : "lg:w-full"
        } p-8 overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300`}
    >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            Theme Customization
            </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
            {/* Preset Schemes Section */}
            <div className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 flex items-center">
                <span className="w-3 h-3 bg-purple-600 rounded-full mr-3"></span>
                Preset Color Schemes
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Object.entries(presetSchemes).map(([name, scheme]) => (
                <button
                    key={name}
                    onClick={() => applyPresetScheme(scheme)}
                    className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 transition-all duration-200 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 bg-white dark:bg-gray-800"
                >
                    <div className="space-y-4">
                    <div className="flex space-x-3">
                        {Object.values(scheme).map((color, index) => (
                        <div
                            key={index}
                            className="w-8 h-8 rounded-full shadow-lg"
                            style={{ backgroundColor: color }}
                        />
                        ))}
                    </div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                        {name}
                    </p>
                    </div>
                </button>
                ))}
            </div>
            </div>

            {/* Colors Section */}
            <div className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 flex items-center">
                <span className="w-3 h-3 bg-purple-600 rounded-full mr-3"></span>
                Colors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(themeOptions.colors).map(
                ([key, value]) => (
                    <div key={key} className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <div className="flex items-center space-x-4">
                        <input
                        type="color"
                        value={value}
                        onChange={(e) =>
                            handleColorChange(key, e.target.value)
                        }
                        className="h-14 w-14 rounded-xl border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 cursor-pointer transition-all duration-200 hover:border-purple-500 shadow-md"
                        />
                        <input
                        type="text"
                        value={value}
                        onChange={(e) =>
                            handleColorChange(key, e.target.value)
                        }
                        className="flex-1 rounded-xl border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 px-4 py-3"
                        />
                    </div>
                    </div>
                )
                )}
            </div>
            </div>

            {/* Typography Section */}
            <div className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 flex items-center">
                <span className="w-3 h-3 bg-purple-600 rounded-full mr-3"></span>
                Typography
            </h2>
            <div className="space-y-8">
                {Object.entries(themeOptions.typography).map(
                ([key, value]) => (
                    <div key={key} className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {key
                        .split("_")
                        .map(
                            (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </label>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) =>
                        handleTypographyChange(key, e.target.value)
                        }
                        className="w-full rounded-xl border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 px-4 py-3"
                    />
                    </div>
                )
                )}
            </div>
            </div>

            {/* Layout Section */}
            <div className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 flex items-center">
                <span className="w-3 h-3 bg-purple-600 rounded-full mr-3"></span>
                Layout
            </h2>
            <div className="space-y-8">
                {Object.entries(themeOptions.layout).map(
                ([key, value]) => (
                    <div key={key} className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {key
                        .split("_")
                        .map(
                            (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </label>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) =>
                        handleLayoutChange(key, e.target.value)
                        }
                        className="w-full rounded-xl border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 px-4 py-3"
                    />
                    </div>
                )
                )}
            </div>
            </div>

            {updateError && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-6 rounded-xl border border-red-100 dark:border-red-800">
                <p className="font-medium">
                Error updating theme: {updateError}
                </p>
            </div>
            )}

            <div className="flex justify-end pt-6">
            <button
                type="submit"
                disabled={updateLoading}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl hover:from-purple-700 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:hover:scale-100 disabled:hover:shadow-lg"
            >
                {updateLoading ? (
                <span className="flex items-center">
                    <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    Updating...
                </span>
                ) : (
                "Update Theme"
                )}
            </button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default EditorRightSideComponent
import React from 'react'

const HeaderThemeComponent = ({currentTheme, themes}) => {
  return (
    <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
        Store Themes
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
        Choose a template to customize your store's appearance
        </p>

        {/* Show current theme info */}
        {currentTheme && (
        <div className="mt-2 p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <p className="text-purple-700 dark:text-purple-300">
            <span className="font-medium">Current theme:</span>{" "}
            {themes.find((t) => t.id === currentTheme.theme)?.name}
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                (Applied on{" "}
                {new Date(currentTheme.theme_applied_at).toLocaleDateString()}
                )
            </span>
            </p>
        </div>
        )}
    </div>

  )
}

export default HeaderThemeComponent
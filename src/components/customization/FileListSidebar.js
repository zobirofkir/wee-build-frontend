import React from "react";
import {
  HtmlIcon,
  CssIcon,
  JsIcon,
  DefaultFileIcon,
  ChevronIcon,
} from "../icons/FileIcons";

const FileListSidebar = ({
  files,
  selectedFile,
  selectedFileType,
  expandedSections,
  onFileSelect,
  onFileTypeChange,
  onToggleSection,
}) => {
  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    switch (extension) {
      case "css":
        return <CssIcon />;
      case "js":
      case "jsx":
        return <JsIcon />;
      case "html":
        return <HtmlIcon />;
      default:
        return <DefaultFileIcon />;
    }
  };

  const getFilesByType = (type) => {
    if (!files) return [];
    if (type === "all") return files;
    return files.filter((file) => {
      const extension = file.path.split(".").pop().toLowerCase();
      return extension === type;
    });
  };

  const getFileCountByType = (type) => {
    return getFilesByType(type).length;
  };

  const renderFileSection = (type, title, icon) => {
    const filesOfType = getFilesByType(type);
    if (filesOfType.length === 0) return null;

    return (
      <div className="mb-6">
        <button
          onClick={() => onToggleSection(type)}
          className="w-full flex items-center justify-between mb-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
        >
          <div className="flex items-center">
            <ChevronIcon isExpanded={expandedSections[type]} />
            {icon}
            <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {title}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {getFileCountByType(type)} files
            </span>
            <ChevronIcon isExpanded={expandedSections[type]} />
          </div>
        </button>
        <div
          className={`space-y-1 transition-all duration-200 ${
            expandedSections[type] ? "block" : "hidden"
          }`}
        >
          {filesOfType.map((file) => (
            <button
              key={file.path}
              onClick={() => onFileSelect(file)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                selectedFile?.path === file.path
                  ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {getFileIcon(file.name)}
                  <span className="ml-2 truncate">{file.name}</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {(file.size / 1024).toFixed(1)} KB
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-64 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
            <DefaultFileIcon />
            <span className="ml-2">Theme Files</span>
          </h3>
          <select
            value={selectedFileType}
            onChange={(e) => onFileTypeChange(e.target.value)}
            className="text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Files</option>
            <option value="html">HTML Files</option>
            <option value="css">CSS Files</option>
            <option value="js">JS Files</option>
          </select>
        </div>

        {selectedFileType === "all" ? (
          <>
            {renderFileSection("html", "HTML Files", <HtmlIcon />)}
            {renderFileSection("css", "CSS Files", <CssIcon />)}
            {renderFileSection("js", "JavaScript Files", <JsIcon />)}
          </>
        ) : (
          renderFileSection(
            selectedFileType,
            `${selectedFileType.toUpperCase()} Files`,
            getFileIcon(`file.${selectedFileType}`)
          )
        )}
      </div>
    </div>
  );
};

export default FileListSidebar;

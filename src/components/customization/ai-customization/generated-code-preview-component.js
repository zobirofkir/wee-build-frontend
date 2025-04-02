import React, { useEffect, useRef } from "react";

const GeneratedCodePreviewComponent = ({ generatedCode, onApplyCode }) => {
  const codeContainerRef = useRef(null);

  useEffect(() => {
    if (!codeContainerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      /**
       * Prevent ResizeObserver loop by debouncing the resize events
       */
      window.requestAnimationFrame(() => {
        if (!Array.isArray(entries) || !entries.length) {
          return;
        }
      });
    });

    resizeObserver.observe(codeContainerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Generated Code
      </h3>
      <div
        ref={codeContainerRef}
        className="bg-gray-900 rounded-lg p-4 overflow-x-auto"
        style={{ maxHeight: "400px" }}
      >
        <pre className="text-sm text-gray-100">
          <code>{generatedCode}</code>
        </pre>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={onApplyCode}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
        >
          Apply Changes
        </button>
      </div>
    </div>
  );
};

export default GeneratedCodePreviewComponent;

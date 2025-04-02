import React, { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";

const EditorContentComponent = ({
  content,
  onContentChange,
  isDarkMode,
  isMobile,
  containerRef,
  onEditorMount,
}) => {
  const editorRef = useRef(null);

  // Handle container resize
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (editorRef.current) {
        editorRef.current.layout();
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [containerRef]);

  // Handle editor mount
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    onEditorMount(editor);
    // Initial layout
    setTimeout(() => {
      editor.layout();
    }, 0);
  };

  return (
    <div
      ref={containerRef}
      className="flex-1 bg-white dark:bg-gray-800 overflow-hidden relative"
    >
      <div className="flex h-full">
        <div className="flex-1">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            theme={isDarkMode ? "vs-dark" : "light"}
            value={content}
            onChange={onContentChange}
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: !isMobile },
              fontSize: isMobile ? 12 : 14,
              lineNumbers: "on",
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: false,
              automaticLayout: true,
              wordWrap: isMobile ? "on" : "off",
              padding: { top: 10, bottom: isMobile ? 80 : 60 },
              renderWhitespace: "selection",
              tabSize: 2,
              insertSpaces: true,
              bracketPairColorization: {
                enabled: true,
              },
              guides: {
                indentation: true,
              },
              folding: true,
              lineDecorationsWidth: 0,
              lineNumbersMinChars: 3,
              renderLineHighlight: "all",
              scrollbar: {
                vertical: "visible",
                horizontal: "visible",
                useShadows: false,
                verticalScrollbarSize: 10,
                horizontalScrollbarSize: 10,
                arrowSize: 30,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorContentComponent;

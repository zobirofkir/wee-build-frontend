import React, { useState } from "react";
import PageSelectorComponent from "./ai-customization/page-selector-component";
import PromptForm from "./ai-customization/PromptForm";
import GeneratedCodePreviewComponent from "./ai-customization/generated-code-preview-component";

const ThemePagePromptCustomizerComponent = () => {
  const [selectedPage, setSelectedPage] = useState("home");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [error, setError] = useState("");

  const handleGenerateCode = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setError("");
    setGeneratedCode("");

    try {
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

  const handleApplyCode = () => {
    // Add apply code functionality
    console.log("Applying generated code...");
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <PageSelectorComponent
        selectedPage={selectedPage}
        onPageSelect={setSelectedPage}
      />

      <PromptForm
        selectedPage={selectedPage}
        prompt={prompt}
        onPromptChange={setPrompt}
        isGenerating={isGenerating}
        error={error}
        onSubmit={handleGenerateCode}
      />

      {generatedCode && (
        <GeneratedCodePreviewComponent
          generatedCode={generatedCode}
          onApplyCode={handleApplyCode}
        />
      )}
    </div>
  );
};

export default ThemePagePromptCustomizerComponent;

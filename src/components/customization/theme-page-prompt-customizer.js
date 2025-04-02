import React, { useState } from "react";
import PageSelector from "./ai-customization/PageSelector";
import PromptForm from "./ai-customization/PromptForm";
import GeneratedCodePreview from "./ai-customization/GeneratedCodePreview";

const ThemePagePromptCustomizer = () => {
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

  const handleApplyCode = () => {
    // Add apply code functionality
    console.log("Applying generated code...");
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <PageSelector
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
        <GeneratedCodePreview
          generatedCode={generatedCode}
          onApplyCode={handleApplyCode}
        />
      )}
    </div>
  );
};

export default ThemePagePromptCustomizer;

"use client";

import React, { useState } from "react";
import AnalysisResults from "../AnalysisResults";
import { AnalysisState } from "../../types/analysis";

const UploadText: React.FC = () => {
  const [text, settext] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisState>({
    result: null,
    isLoading: false,
  });

  const analyzeText = async (text: string) => {
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Analysis Failed");
      }

      const result = await response.json();
      setAnalysis({ result, isLoading: false });
    } catch (error) {
      setAnalysis({
        result: null,
        isLoading: false,
        error: "Failed to analyze. Try again!",
      });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === "string") {
        settext(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <div>
        <input type="file" accept=".txt" onChange={handleFileChange} />
        {text && (
          <div className="flex flex-col mt-2 max-w-sm overflow-x-auto">
            <pre>{text}</pre>
          </div>
        )}
      </div>
      <button
        onClick={() => {
          if (text) {
            analyzeText(text);
          }
        }}
        className="px-4 my-4 py-2 bg-teal-500 text-white rounded-lg 
        hover:bg-teal-600 disabled:bg-teal-950
        disabled:cursor-not-allowed transition-colors"
        disabled={!text || analysis.isLoading}
      >
        Analyze Text
      </button>

      {analysis.result && (
        <AnalysisResults result={analysis.result} error={analysis.error} />
      )}
    </div>
  );
};

export default UploadText;

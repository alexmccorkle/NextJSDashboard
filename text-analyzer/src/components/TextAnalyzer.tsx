"use client"; // This tells Next.js this component needs to run on the client side

import React, { useState } from "react";
import AnalysisResults from "./AnalysisResults";
import { AnalysisState } from "../types/analysis";

export default function TextAnalyzer() {
  // We use useState to keep track of what the user types
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisState>({
    result: null,
    isLoading: false,
  });

  const analyzeText = async (text: string) => {
    setAnalysis({ result: null, isLoading: true });

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

  // This function will run when the form is submitted
  const handleSubmit = (e: React.FormEvent) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    if (text.trim()) {
      analyzeText(text);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="text-input"
            className="block text-sm font-medium mb-2"
          >
            Enter text to analyze:
          </label>
          <textarea
            id="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-48 p-4 border rounded-lg focus:ring-2 
            focus:ring-teal-500 focus:border-teal-500 text-teal-950"
            placeholder="Paste or write your text here..."
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-teal-500 text-white rounded-lg 
          hover:bg-teal-600 disabled:bg-teal-950 
          disabled:cursor-not-allowed transition-colors"
          disabled={!text.trim() || analysis.isLoading}
        >
          {analysis.isLoading ? "Analyzing..." : "Analyze Text"}
        </button>
      </form>

      {analysis.result && (
        <AnalysisResults result={analysis.result} error={analysis.error} />
      )}
    </div>
  );
}

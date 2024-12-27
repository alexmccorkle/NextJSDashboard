// src/components/TextAnalyzer.tsx

"use client"; // This tells Next.js this component needs to run on the client side

import React, { useState } from "react";

interface TextMetrics {
  wordCount: number;
  averageWordLength: number;
  sentenceCount: number;
  averageSentenceLength: number;
  uniqueWordRatio: number;
  longWordRatio: number;
  punctuationRatio: number;
}

interface AnalysisResult {
  score: number;
  confidence: number;
  metrics: TextMetrics;
}

interface AnalysisState {
  result: AnalysisResult | null;
  isLoading: boolean;
  error?: string;
}

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
            placeholder="Paste your text here..."
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-teal-500 text-white rounded-lg 
                   hover:bg-teal-600 disabled:bg-teal-300 
                   disabled:cursor-not-allowed transition-colors"
          disabled={!text.trim() || analysis.isLoading}
        >
          {analysis.isLoading ? "Analyzing..." : "Analyze Text"}
        </button>
      </form>

      {analysis.error ? (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          {analysis.error}
        </div>
      ) : (
        analysis.result && (
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4 text-teal-900">
              Analysis Results
            </h2>

            <div className="mb-6">
              <div className="text-2xl font-bold text-teal-600">
                {analysis.result.score.toFixed(1)}% AI Probability
              </div>
              <p className="text-gray-600 text-sm mt-1">
                Confidence: {analysis.result.confidence.toFixed(1)}%
              </p>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <h3 className="text-lg font-medium text-gray-900">
                Detailed Metrics:
              </h3>
              <div>Words: {analysis.result.metrics.wordCount}</div>
              <div>
                Average word length:{" "}
                {analysis.result.metrics.averageWordLength.toFixed(1)}{" "}
                characters
              </div>
              <div>Sentences: {analysis.result.metrics.sentenceCount}</div>
              <div>
                Average sentence length:{" "}
                {analysis.result.metrics.averageSentenceLength.toFixed(1)} words
              </div>
              <div>
                Unique word ratio:{" "}
                {(analysis.result.metrics.uniqueWordRatio * 100).toFixed(1)}%
              </div>
              <div>
                Long word ratio:{" "}
                {(analysis.result.metrics.longWordRatio * 100).toFixed(1)}%
              </div>
              <div>
                Punctuation ratio:{" "}
                {(analysis.result.metrics.punctuationRatio * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

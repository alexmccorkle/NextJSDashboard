"use client";

import { useState, useEffect } from "react";
import AnalysisResults from "./AnalysisResults";

interface Analysis {
  id: number;
  text: string;
  score: number;
  confidence: number;
  wordCount: number;
  averageWordLength: number;
  sentenceCount: number;
  averageSentenceLength: number;
  uniqueWordRatio: number;
  longWordRatio: number;
  punctuationRatio: number;
  createdAt: string;
}

export default function AnalysisList() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        const response = await fetch("/api/analyze");
        if (!response.ok) {
          throw new Error("Failed to fetch analyses");
        }

        const data = await response.json();
        setAnalyses(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
        // If the error is an instance of Error, use the error message, otherwise use a generic message
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyses();
  }, []); // This [] means that the effect will only run once, similar to componentDidMount

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4">Error: {error}</div>;
  }

  if (analyses.length === 0) {
    return <div className="text-center py-4">No analyses found</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white-900">
        Your Previous Uploads
      </h1>
      <div className="space-y-4">
        {analyses.map((analysis) => (
          <div key={analysis.id} className="border rounded-lg p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-500">
                Analysis from {new Date(analysis.createdAt).toLocaleString()}
              </h2>
              <p className="text-sm text-gray-300">{analysis.text}</p>
            </div>

            <AnalysisResults
              result={{
                score: analysis.score,
                confidence: analysis.confidence,
                metrics: {
                  wordCount: analysis.wordCount,
                  averageWordLength: analysis.averageWordLength,
                  sentenceCount: analysis.sentenceCount,
                  averageSentenceLength: analysis.averageSentenceLength,
                  uniqueWordRatio: analysis.uniqueWordRatio,
                  longWordRatio: analysis.longWordRatio,
                  punctuationRatio: analysis.punctuationRatio,
                },
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

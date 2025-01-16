import { AnalysisResult } from "../types/analysis";

interface AnalysisResultsProps {
  result: AnalysisResult;
  error?: string;
  flag?: string;
  user?: string;
}

export default function AnalysisResults({
  result,
  error,
  flag,
  user,
}: AnalysisResultsProps) {
  if (error) {
    return <div className="p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>;
  }

  if (!result) {
    return null;
  }

  const isAdmin = user === "admin";

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      {!isAdmin && flag && (
        <div className="mb-4 flex items-center">
          {flag === "ai" && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
              <span className="mr-1.5 h-2 w-2 rounded-full bg-red-400"></span>
              Flagged as AI-Generated
            </span>
          )}
          {flag === "human" && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <span className="mr-1.5 h-2 w-2 rounded-full bg-teal-400"></span>
              You're definitely human!
            </span>
          )}
        </div>
      )}
      <h2 className="text-xl font-semibold mb-4 text-teal-900">
        Analysis Results
      </h2>

      <div className="mb-6">
        <div
          className={
            result.confidence < 50
              ? "text-2xl font-bold text-teal-600"
              : "text-2xl font-bold text-red-600"
          }
        >
          {result.score.toFixed(1)}% AI Probability
        </div>
        <p className="text-gray-600 text-sm mt-1">
          Confidence: {result.confidence.toFixed(1)}%
        </p>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <h3 className="text-lg font-medium text-gray-900">Detailed Metrics:</h3>
        <div>Words: {result.metrics.wordCount}</div>
        <div>
          Average word length: {result.metrics.averageWordLength.toFixed(1)}{" "}
          characters
        </div>
        <div>Sentences: {result.metrics.sentenceCount}</div>
        <div>
          Average sentence length:{" "}
          {result.metrics.averageSentenceLength.toFixed(1)} words
        </div>
        <div>
          Unique word ratio: {(result.metrics.uniqueWordRatio * 100).toFixed(1)}
          %
        </div>
        <div>
          Long word ratio: {(result.metrics.longWordRatio * 100).toFixed(1)}%
        </div>
        <div>
          Punctuation ratio:{" "}
          {(result.metrics.punctuationRatio * 100).toFixed(1)}%
        </div>
      </div>
    </div>
  );
}

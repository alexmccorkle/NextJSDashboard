export interface AnalysisData {
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
}

// This is your current UI structure
export interface TextMetrics {
  wordCount: number;
  averageWordLength: number;
  sentenceCount: number;
  averageSentenceLength: number;
  uniqueWordRatio: number;
  longWordRatio: number;
  punctuationRatio: number;
}

export interface AnalysisResult {
  score: number;
  confidence: number;
  metrics: TextMetrics;
}

export interface AnalysisState {
  result: AnalysisResult | null;
  isLoading: boolean;
  error?: string;
}

// Convert from API/UI format to database format
export function convertResultToAnalysisData(result: AnalysisResult, text: string): AnalysisData {
  return {
    text,
    score: result.score,
    confidence: result.confidence,
    wordCount: result.metrics.wordCount,
    averageWordLength: result.metrics.averageWordLength,
    sentenceCount: result.metrics.sentenceCount,
    averageSentenceLength: result.metrics.averageSentenceLength,
    uniqueWordRatio: result.metrics.uniqueWordRatio,
    longWordRatio: result.metrics.longWordRatio,
    punctuationRatio: result.metrics.punctuationRatio,
  };
}
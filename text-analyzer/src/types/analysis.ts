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
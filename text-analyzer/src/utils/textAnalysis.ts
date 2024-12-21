// src/utils/textAnalysis.ts

interface TextMetrics {
  wordCount: number
  averageWordLength: number
  sentenceCount: number
  averageSentenceLength: number
  uniqueWordRatio: number
  longWordRatio: number
  punctuationRatio: number
}

interface AnalysisResult {
  score: number
  confidence: number
  metrics: TextMetrics
}

// This function basically computes different text statistics that might indicate if it's AI-generated or not
export function analyzeText(text: string): AnalysisResult {
  // Clean and prep the text for analysis
  const cleanText = text.trim().toLowerCase()
  
  // Split into words (handling hyphenated words and contractions properly)
  const words = cleanText.match(/\b[\w''-]+\b/g) || []
  
  // Split into sentences (handling multiple punctuation marks and abbreviations)
  const sentences = cleanText
    .split(/[.!?]+/)
    .filter(s => s.trim().length > 0)
  
  // Count punctuation marks
  const punctuationCount = (text.match(/[.,!?;:]/g) || []).length
  
  // Calculate unique words
  const uniqueWords = new Set(words)
  
  // Count words with more than 6 characters (considered "long" words)
  const longWords = words.filter(word => word.length > 6)

  // Calculate core metrics
  const metrics: TextMetrics = {
    wordCount: words.length,
    averageWordLength: words.reduce((sum, word) => sum + word.length, 0) / words.length,
    sentenceCount: sentences.length,
    averageSentenceLength: words.length / sentences.length,
    uniqueWordRatio: uniqueWords.size / words.length,
    longWordRatio: longWords.length / words.length,
    punctuationRatio: punctuationCount / words.length
  }

  // Calculate the AI probability score based on various factors
  let score = 0
  let confidenceFactors = 0

  // Factors can be tweaked, this is just for general functionality of this project.

  // Factor 1: Sentence length consistency
  if (metrics.averageSentenceLength > 15) {
    score += 20
    confidenceFactors++
  }

  // Factor 2: Unique word variety
  if (metrics.uniqueWordRatio > 0.7) {
    score += 20
    confidenceFactors++
  }

  // Factor 3: Complex word usage
  if (metrics.longWordRatio > 0.3) {
    score += 20
    confidenceFactors++
  }

  // Factor 4: Punctuation patterns
  if (metrics.punctuationRatio > 0.15) {
    score += 20
    confidenceFactors++
  }

  // Factor 5: Text length consideration
  if (metrics.wordCount > 100) {
    score += 20
    confidenceFactors++
  }

  // Calculate confidence based on how many factors contributed to the score
  const confidence = (confidenceFactors / 5) * 100

  return {
    score: Math.min(Math.max(score, 0), 100),
    confidence,
    metrics
  }
}
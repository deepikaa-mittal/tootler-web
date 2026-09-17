export type SubjectCategory =
  | 'AI & Machine Learning'
  | 'Quantum & Physics'
  | 'Semiconductors & Hardware'
  | 'Biotech & Genomics'
  | 'Aerospace & Space Tech'
  | 'Clean Energy & Fusion'
  | 'Mathematics & Cryptography'
  | 'Robotics & Systems';

export type DomainTag =
  | 'Research Paper'
  | 'Deep Tech'
  | 'System Architecture'
  | 'Applied Math'
  | 'Benchmark'
  | 'Hardware Spec';

export type PaperTag = DomainTag;

export interface Article {
  id: string;
  title: string;
  tagline: string;
  summary: string;
  subject: SubjectCategory;
  paper: PaperTag;
  source: string;
  sourceUrl?: string;
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  paragraphs: string[];
  syllabusMapping: {
    paper: string; // Research Field / Domain
    topic: string;
    subTopic: string;
  };
  prelimsPointers: string[]; // Key Engineering & Theoretical Tenets
  mainsPerspectives: {
    coreDimensions: string[]; // Architectural Tenets
    criticalAnalysis: string[]; // Engineering Bottlenecks & Limitations
    modelQuestion: string; // System Design / Theoretical Challenge
  };
  pyq: {
    question: string;
    year: string;
    paper: string;
    type: 'Paper' | 'Patent' | 'Milestone';
  };
  keyTerms: {
    term: string;
    definition: string;
  }[];
  likesCount: number;
  bookmarksCount: number;
  imageUrl?: string;
}

export interface UserHighlight {
  id: string;
  articleId: string;
  text: string;
  color: 'yellow' | 'blue' | 'green';
  createdAt: string;
}

export interface UserStudyNote {
  id: string;
  articleId: string;
  paragraphIndex?: number;
  note: string;
  createdAt: string;
}

export interface QuizOption {
  id: string;
  optionIndex: number;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  articleId?: string;
  subject: SubjectCategory;
  paper: PaperTag;
  prompt: string;
  options: QuizOption[];
  explanation: string;
  syllabusReference: string;
  difficulty?: 'Intermediate' | 'Advanced' | 'PhD-Level';
}

export interface UserRetentionCard {
  id: string;
  topicName: string;
  subject: SubjectCategory;
  articleId: string;
  articleTitle: string;
  question: QuizQuestion;
  mistakeCount: number;
  intervalDays: number;
  easeFactor: number;
  lastResult?: 'correct' | 'incorrect';
  nextReviewAt: string;
  dueToday: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  targetExam: string; // Focus Field
  targetYear: number;
  optionalSubject: string; // Specialization
  streakDays: number;
  hasActiveStreakToday: boolean;
  totalArticlesRead: number;
  totalQuizzesTaken: number;
  accuracyPercentage: number;
  studyGoalDailyArticles: number;
  studyGoalDailyMinutes: number;
}

export interface EntitlementStatus {
  hasPremiumAccess: boolean;
  tier: 'free' | 'trial' | 'pro';
  reason?: 'trial_active' | 'trial_expired' | 'subscribed' | 'free_tier';
  trialDaysRemaining?: number;
  endsAt?: string;
}

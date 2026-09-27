export type Role = 'student' | 'parent' | 'teacher';

export type StageId = 'basic' | 'beginner' | 'intermediate' | 'upper_intermediate' | 'advanced';

export type Difficulty = 'low' | 'medium' | 'high';

export type TopicCategory = 
  | 'grammar' 
  | 'vocabulary' 
  | 'reading' 
  | 'stories' 
  | 'sentence_formation' 
  | 'translation' 
  | 'nlp_practice';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: Role;
  targetLanguage: string; // e.g. 'English', 'Telugu', 'Hindi', etc.
  nativeLanguage: string; // e.g. 'Telugu', 'English', etc.
  currentStageId: StageId;
  currentLevel: number;
  xp: number;
  stars: number;
  completedLevelIds: number[];
  levelScores: Record<number, { stars: number; accuracy: number; completedAt: string }>;
  badges: string[];
  streakDays: number;
  lastActiveDate: string;
  childEmail?: string; // For parents to monitor
  assignedClass?: string; // For teachers
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  popular?: boolean;
}

export interface Stage {
  id: StageId;
  name: string;
  stageNumber: number;
  levelStart: number;
  levelEnd: number;
  description: string;
  gradient: string;
  cardColor: string;
  accentColor: string;
  icon: string;
  unlocked: boolean;
}

export interface Level {
  id: number; // 1 to 150
  levelNumber: number;
  stageId: StageId;
  title: string;
  category: TopicCategory;
  description: string;
  icon: string;
  xpReward: number;
}

export type QuestionType =
  | 'multiple_choice'
  | 'image_choice'
  | 'image_type'
  | 'scramble_sentence'
  | 'fill_in_the_blank'
  | 'match_pairs'
  | 'listen_repeat'
  | 'grammar_correction';

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  questionText: string;
  options?: string[];
  correctAnswer: string | string[]; // Single string or array of ordered tokens
  explanation: string;
  nativeMeaning?: string;
  emoji?: string;
  imageUrl?: string;
  audioPhrase?: string;
  pairs?: { left: string; right: string }[];
}

export interface TopicLesson {
  id: number;
  levelNumber: number;
  stageId: StageId;
  title: string;
  category: TopicCategory;
  summary: string;
  rules: string[];
  examples: {
    english: string;
    native: string;
    note?: string;
  }[];
  questions: {
    low: Question[];
    medium: Question[];
    high: Question[];
  };
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'starter' | 'progress' | 'mastery' | 'streak';
  unlockedAt?: string;
}

export interface Certificate {
  id: string;
  studentName: string;
  studentEmail: string;
  targetLanguage: string;
  stageName: string;
  completionPercent: number;
  issueDate: string;
  verificationCode: string;
  scoreAccuracy: number;
  totalXp: number;
}

export interface NLPToken {
  word: string;
  pos: string;
  posLabel: string;
  lemma: string;
  explanation?: string;
}

export interface NLPAnalysisResult {
  tokens: NLPToken[];
  isGrammaticallyCorrect: boolean;
  correctedSentence: string;
  errors: {
    errorType: string;
    explanation: string;
    suggestion: string;
  }[];
  syntaxAnalysis: {
    subject: string;
    verb: string;
    object: string;
    sentenceType: string;
    tense: string;
  };
  readability: {
    score: string;
    gradeLevel: string;
    sentiment: string;
  };
}

export interface DailyQuest {
  id: string;
  title: string;
  taskType: 'vocab' | 'grammar' | 'correction' | 'translation' | 'story';
  target: number;
  progress: number;
  completed: boolean;
  xpReward: number;
  question: Question;
}

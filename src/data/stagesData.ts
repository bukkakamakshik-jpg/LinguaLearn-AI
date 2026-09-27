import { Stage, Level, TopicCategory } from '../types';

export const STAGES: Stage[] = [
  {
    id: 'basic',
    name: 'Basic Stage',
    stageNumber: 1,
    levelStart: 1,
    levelEnd: 30,
    description: 'Master fundamentals: alphabet, nouns, verbs, tenses, sentence structure, and vocabulary.',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    cardColor: 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300',
    accentColor: '#10b981',
    icon: '🌱',
    unlocked: true,
  },
  {
    id: 'beginner',
    name: 'Beginner Stage',
    stageNumber: 2,
    levelStart: 31,
    levelEnd: 60,
    description: 'Daily life communication, modal verbs, directions, shopping, and short stories.',
    gradient: 'from-blue-500 via-indigo-500 to-violet-500',
    cardColor: 'bg-blue-950/40 border-blue-500/30 text-blue-300',
    accentColor: '#3b82f6',
    icon: '🚀',
    unlocked: false,
  },
  {
    id: 'intermediate',
    name: 'Intermediate Stage',
    stageNumber: 3,
    levelStart: 61,
    levelEnd: 90,
    description: 'Perfect tenses, passive voice, conditionals, phrasal verbs, and email writing.',
    gradient: 'from-amber-500 via-orange-500 to-rose-500',
    cardColor: 'bg-amber-950/40 border-amber-500/30 text-amber-300',
    accentColor: '#f59e0b',
    icon: '⚡',
    unlocked: false,
  },
  {
    id: 'upper_intermediate',
    name: 'Upper Intermediate',
    stageNumber: 4,
    levelStart: 91,
    levelEnd: 120,
    description: 'Advanced conditionals, subjunctive mood, academic vocabulary, and nuanced arguments.',
    gradient: 'from-purple-500 via-fuchsia-500 to-pink-500',
    cardColor: 'bg-purple-950/40 border-purple-500/30 text-purple-300',
    accentColor: '#a855f7',
    icon: '🔮',
    unlocked: false,
  },
  {
    id: 'advanced',
    name: 'Advanced Stage',
    stageNumber: 5,
    levelStart: 121,
    levelEnd: 150,
    description: 'Stylistic mastery, NLP semantics, idioms, rhetorical devices, and final certificate exam.',
    gradient: 'from-yellow-400 via-amber-500 to-red-500',
    cardColor: 'bg-yellow-950/40 border-yellow-500/30 text-yellow-300',
    accentColor: '#eab308',
    icon: '🏆',
    unlocked: false,
  },
];

// Exact 30 Basic topics as explicitly specified in User Brief
const BASIC_TOPICS = [
  { title: 'Alphabet & Basic Words', cat: 'vocabulary' as TopicCategory, icon: '🔤' },
  { title: 'Nouns (Naming Words)', cat: 'grammar' as TopicCategory, icon: '🏷️' },
  { title: 'Pronouns (He, She, They)', cat: 'grammar' as TopicCategory, icon: '👤' },
  { title: 'Verbs (Action Words)', cat: 'grammar' as TopicCategory, icon: '🏃' },
  { title: 'Helping Verbs', cat: 'grammar' as TopicCategory, icon: '🤝' },
  { title: 'Adjectives (Describers)', cat: 'grammar' as TopicCategory, icon: '🎨' },
  { title: 'Adverbs (Quickly, Well)', cat: 'grammar' as TopicCategory, icon: '⚡' },
  { title: 'Prepositions (In, On, At)', cat: 'grammar' as TopicCategory, icon: '📍' },
  { title: 'Conjunctions (And, But)', cat: 'grammar' as TopicCategory, icon: '🔗' },
  { title: 'Articles (A, An, The)', cat: 'grammar' as TopicCategory, icon: '📄' },
  { title: 'Singular & Plural', cat: 'grammar' as TopicCategory, icon: '👥' },
  { title: 'Subject & Predicate', cat: 'sentence_formation' as TopicCategory, icon: '🧩' },
  { title: 'Simple Sentence Structure', cat: 'sentence_formation' as TopicCategory, icon: '🧱' },
  { title: 'Present Tense Intro', cat: 'grammar' as TopicCategory, icon: '⏰' },
  { title: 'Past Tense Intro', cat: 'grammar' as TopicCategory, icon: '⏳' },
  { title: 'Future Tense Intro', cat: 'grammar' as TopicCategory, icon: '🔮' },
  { title: 'Simple Present Tense', cat: 'grammar' as TopicCategory, icon: '☀️' },
  { title: 'Simple Past Tense', cat: 'grammar' as TopicCategory, icon: '📖' },
  { title: 'Simple Future Tense', cat: 'grammar' as TopicCategory, icon: '🚀' },
  { title: 'Basic Question Formation', cat: 'sentence_formation' as TopicCategory, icon: '❓' },
  { title: 'Yes / No Questions', cat: 'sentence_formation' as TopicCategory, icon: '✅' },
  { title: 'WH Questions (Who, What, Where)', cat: 'sentence_formation' as TopicCategory, icon: '🔍' },
  { title: 'Is / Am / Are Usage', cat: 'grammar' as TopicCategory, icon: '✨' },
  { title: 'Was / Were Usage', cat: 'grammar' as TopicCategory, icon: '🕰️' },
  { title: 'Has / Have / Had Usage', cat: 'grammar' as TopicCategory, icon: '💼' },
  { title: 'Basic Sentence Correction', cat: 'nlp_practice' as TopicCategory, icon: '✍️' },
  { title: 'Basic Punctuation Marks', cat: 'grammar' as TopicCategory, icon: '✏️' },
  { title: 'Capital Letters Rules', cat: 'reading' as TopicCategory, icon: '🔠' },
  { title: 'Common Grammar Mistakes', cat: 'nlp_practice' as TopicCategory, icon: '⚠️' },
  { title: 'Basic Sentence Building', cat: 'sentence_formation' as TopicCategory, icon: '🏰' },
];

const BEGINNER_TOPICS = [
  'Daily Morning Routine', 'Family Members & Relations', 'Ordering Food & Drinks', 'Giving Directions',
  'Expressing Feelings & Emotions', 'Shopping & Price Bargaining', 'Weather, Rain & Seasons', 'My Favorite Hobbies',
  'Doctor & Health Visits', 'Past Continuous Tense', 'Future with "Going to"', 'Modal: Can and Could',
  'Prepositions of Movement', 'Comparatives: Fast & Faster', 'Superlatives: The Greatest', 'Quantifiers: Much & Many',
  'Adverbs of Frequency', 'Describing People & Looks', 'Phone Conversation Etiquette', 'Travel & Hotel Booking',
  'House & Household Rooms', 'Jobs, Professions & Careers', 'Expressing Likes & Dislikes', 'Telling Clock Time & Dates',
  'Compound Sentences with "Because"', 'Reflexive Pronouns: Myself', 'Story: The Thirsty Crow', 'Story: Ravi’s Bicycle Ride',
  'Reading: The Farmers Market', 'Beginner Milestone Challenge',
];

const INTERMEDIATE_TOPICS = [
  'Present Perfect Tense', 'Past Perfect Tense', 'Modals: Should, Must & Ought', 'First Conditional (If... then)',
  'Second Conditional (Imaginary)', 'Passive Voice: Present', 'Passive Voice: Past', 'Reported Speech: Basics',
  'Common Phrasal Verbs: Turn, Look', 'Relative Clauses: Who, Which', 'Gerunds vs Infinitives', 'Writing Formal Emails',
  'Useful Idiomatic Sayings', 'Job Interview Practice', 'Expressing Opinions in Debates', 'Story: The Lost Compass',
  'Reading: Ocean Mysteries', 'Synonym Mastery in Context', 'Antonym Contrast in Sentences', 'Cause and Effect Connectors',
  'Listening: Native Dialogues', 'Word Roots & Prefixes (Un-, Dis-)', 'Suffixes (-ment, -tion)', 'Collocations in Action',
  'Writing a Paragraph Summary', 'Question Tags: Aren’t you?', 'Cultural Nuances in Speech', 'Story: The Midnight train',
  'Intermediate NLP Grammar Check', 'Intermediate Stage Capstone',
];

const UPPER_INTERMEDIATE_TOPICS = [
  'Third Conditional (Regrets)', 'Mixed Conditionals', 'Advanced Passive Constructions', 'The Subjunctive Mood',
  'Inversion for Emphasis', 'Nuanced Phrasal Verbs (Take up, Put off)', 'Formal vs Casual Register', 'Academic Vocabulary Lists',
  'Critical Reading: Editorials', 'Argumentative Writing Structure', 'Deduction: Must have, Can’t have', 'Cleft Sentences: It was...',
  'Participle Clauses (-ing, -ed)', 'Abstract Noun Collocations', 'Story: The Clockmaker’s secret', 'Reading: AI & Future of Tech',
  'Metaphors & Figurative Speech', 'Public Speaking & Presentations', 'Text Synthesis & Paraphrasing', 'Sophisticated Transitions',
  'Tone & Stance in Literature', 'Sentence Stress & Rhythm', 'Nuanced Prepositional Idioms', 'Sentence Transformation Drills',
  'Cross-Cultural Communications', 'Story: Echoes in the Canyon', 'Advanced Grammar Error Diagnosis', 'Reading: Environmental Ecology',
  'Upper Intermediate Capstone 1', 'Upper Intermediate Capstone 2',
];

const ADVANCED_TOPICS = [
  'Stylistic Inversion in Literature', 'Ellipsis and Substitution', 'Rhetorical Devices & Persuasion', 'Advanced Textual Cohesion',
  'Nuances of Subtlety & Irony', 'Legal & Professional Terminology', 'Complex Idioms & Origins', 'Phonetics: Connected Speech',
  'Academic Journal Analysis', 'Reading: Philosophy of Mind & NLP', 'Debate: Technology Ethics', 'Story: The Symphony of Words',
  'Advanced Pragmatics & Politeness', 'Global Dialects & English Varieties', 'Cognitive Metaphor Exploration', 'Precision in Lexical Choice',
  'Complex Adverbial Clauses', 'High-level Restructuring Drills', 'Editorial Proofreading & Revision', 'Advanced Socratic Questioning',
  'Technical Documentation Writing', 'Native Speed Listening Analysis', 'Story: The Cartographer’s Map', 'Cross-linguistic Translation Nuances',
  'Semantic Ambiguity & Disambiguation', 'Corpus Linguistics & NLP Patterns', 'Advanced Sentence Building Mastery', 'Comprehensive Grammar Audit',
  'Grand Linguistic Challenge', 'Final Advanced Mastery & Certification',
];

export const ALL_LEVELS: Level[] = [
  // 1 to 30: Basic
  ...BASIC_TOPICS.map((t, idx) => ({
    id: idx + 1,
    levelNumber: idx + 1,
    stageId: 'basic' as const,
    title: t.title,
    category: t.cat,
    description: `Level ${idx + 1} of Basic Stage: Learn and master ${t.title}.`,
    icon: t.icon,
    xpReward: 100,
  })),

  // 31 to 60: Beginner
  ...BEGINNER_TOPICS.map((title, idx) => ({
    id: idx + 31,
    levelNumber: idx + 31,
    stageId: 'beginner' as const,
    title,
    category: (idx % 4 === 0 ? 'vocabulary' : idx % 4 === 1 ? 'grammar' : idx % 4 === 2 ? 'stories' : 'sentence_formation') as TopicCategory,
    description: `Level ${idx + 31} of Beginner Stage: ${title}.`,
    icon: '🌟',
    xpReward: 120,
  })),

  // 61 to 90: Intermediate
  ...INTERMEDIATE_TOPICS.map((title, idx) => ({
    id: idx + 61,
    levelNumber: idx + 61,
    stageId: 'intermediate' as const,
    title,
    category: (idx % 3 === 0 ? 'grammar' : idx % 3 === 1 ? 'reading' : 'nlp_practice') as TopicCategory,
    description: `Level ${idx + 61} of Intermediate Stage: ${title}.`,
    icon: '⚡',
    xpReward: 150,
  })),

  // 91 to 120: Upper Intermediate
  ...UPPER_INTERMEDIATE_TOPICS.map((title, idx) => ({
    id: idx + 91,
    levelNumber: idx + 91,
    stageId: 'upper_intermediate' as const,
    title,
    category: (idx % 3 === 0 ? 'grammar' : idx % 3 === 1 ? 'stories' : 'sentence_formation') as TopicCategory,
    description: `Level ${idx + 91} of Upper Intermediate Stage: ${title}.`,
    icon: '🔮',
    xpReward: 180,
  })),

  // 121 to 150: Advanced
  ...ADVANCED_TOPICS.map((title, idx) => ({
    id: idx + 121,
    levelNumber: idx + 121,
    stageId: 'advanced' as const,
    title,
    category: (idx === 29 ? 'nlp_practice' : idx % 3 === 0 ? 'reading' : idx % 3 === 1 ? 'grammar' : 'translation') as TopicCategory,
    description: `Level ${idx + 121} of Advanced Stage: ${title}.`,
    icon: idx === 29 ? '🏆' : '✨',
    xpReward: 200,
  })),
];

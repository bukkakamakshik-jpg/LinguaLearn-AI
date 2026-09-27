import { User, Role, StageId, Certificate, Badge } from '../types';

const STORAGE_USERS_KEY = 'lingualearn_users_v2';
const STORAGE_CURRENT_USER_KEY = 'lingualearn_current_user_v2';
const STORAGE_CERTIFICATES_KEY = 'lingualearn_certificates_v2';

export const SYSTEM_BADGES: Badge[] = [
  { id: 'first_lesson', title: 'First Lesson', description: 'Completed your very first lesson', icon: '🌱', category: 'starter' },
  { id: 'grammar_starter', title: 'Grammar Starter', description: 'Mastered basic nouns and verbs', icon: '📖', category: 'starter' },
  { id: 'vocab_builder', title: 'Vocabulary Builder', description: 'Explored fruits, animals and daily words', icon: '🍎', category: 'progress' },
  { id: 'quiz_master', title: 'Quiz Master', description: 'Achieved 100% accuracy on a quiz', icon: '🎯', category: 'mastery' },
  { id: 'story_reader', title: 'Story Reader', description: 'Read a stage story and passed comprehension', icon: '📚', category: 'progress' },
  { id: 'nlp_explorer', title: 'NLP Explorer', description: 'Analyzed tokens and syntax trees in NLP lab', icon: '🧠', category: 'mastery' },
  { id: 'streak_fire', title: '7-Day Streak', description: 'Maintained consecutive daily practice', icon: '🔥', category: 'streak' },
  { id: 'basic_completed', title: 'Basic Stage Completed', description: 'Finished all 30 levels of the Basic Stage', icon: '🏅', category: 'progress' },
  { id: 'beginner_completed', title: 'Beginner Completed', description: 'Completed Level 60 milestone', icon: '🚀', category: 'progress' },
  { id: 'intermediate_completed', title: 'Intermediate Completed', description: 'Mastered Level 90 curriculum', icon: '⚡', category: 'progress' },
  { id: 'upper_completed', title: 'Upper Intermediate Completed', description: 'Finished Level 120 coursework', icon: '🔮', category: 'progress' },
  { id: 'advanced_completed', title: 'Advanced Master', description: 'Completed all 150 levels of LinguaLearn AI', icon: '🏆', category: 'mastery' },
];

export const DEMO_STUDENT: User = {
  id: 'usr_student_1',
  name: 'Aarav Sharma',
  email: 'student@lingualearn.ai',
  password: 'password123',
  role: 'student',
  targetLanguage: 'English',
  nativeLanguage: 'Telugu',
  currentStageId: 'basic',
  currentLevel: 3,
  xp: 350,
  stars: 6,
  completedLevelIds: [1, 2],
  levelScores: {
    1: { stars: 3, accuracy: 100, completedAt: new Date(Date.now() - 86400000).toISOString() },
    2: { stars: 3, accuracy: 90, completedAt: new Date().toISOString() }
  },
  badges: ['first_lesson', 'grammar_starter', 'vocab_builder'],
  streakDays: 7,
  lastActiveDate: new Date().toISOString(),
};

export const DEMO_PARENT: User = {
  id: 'usr_parent_1',
  name: 'Priya Sharma',
  email: 'parent@lingualearn.ai',
  password: 'password123',
  role: 'parent',
  targetLanguage: 'English',
  nativeLanguage: 'Telugu',
  currentStageId: 'basic',
  currentLevel: 3,
  xp: 350,
  stars: 6,
  completedLevelIds: [1, 2],
  levelScores: {},
  badges: [],
  streakDays: 7,
  lastActiveDate: new Date().toISOString(),
  childEmail: 'student@lingualearn.ai'
};

export const DEMO_TEACHER: User = {
  id: 'usr_teacher_1',
  name: 'Prof. Rajesh Kumar',
  email: 'teacher@lingualearn.ai',
  password: 'password123',
  role: 'teacher',
  targetLanguage: 'English',
  nativeLanguage: 'Telugu',
  currentStageId: 'basic',
  currentLevel: 30,
  xp: 4500,
  stars: 90,
  completedLevelIds: Array.from({ length: 30 }, (_, i) => i + 1),
  levelScores: {},
  badges: ['first_lesson', 'grammar_starter', 'basic_completed'],
  streakDays: 14,
  lastActiveDate: new Date().toISOString(),
  assignedClass: 'AIML Section B - Language Lab'
};

// Teacher roster of students for dashboard
export const DEMO_ROSTER_STUDENTS = [
  { id: 's1', name: 'Aarav Sharma', email: 'student@lingualearn.ai', currentLevel: 3, stage: 'Basic', xp: 350, accuracy: 95, streak: 7, lastActive: 'Today' },
  { id: 's2', name: 'Ananya Reddy', email: 'ananya@school.edu', currentLevel: 14, stage: 'Basic', xp: 1420, accuracy: 92, streak: 12, lastActive: 'Yesterday' },
  { id: 's3', name: 'Rohan Varma', email: 'rohan@school.edu', currentLevel: 28, stage: 'Basic', xp: 2900, accuracy: 88, streak: 5, lastActive: '2 days ago' },
  { id: 's4', name: 'Sneha Patel', email: 'sneha@school.edu', currentLevel: 35, stage: 'Beginner', xp: 3800, accuracy: 96, streak: 19, lastActive: 'Today' },
  { id: 's5', name: 'Vikram Joshi', email: 'vikram@school.edu', currentLevel: 62, stage: 'Intermediate', xp: 6400, accuracy: 89, streak: 9, lastActive: '3 days ago' },
];

function initializeStorage() {
  if (typeof window === 'undefined') return;
  const existingUsers = localStorage.getItem(STORAGE_USERS_KEY);
  if (!existingUsers) {
    const initialUsers = [DEMO_STUDENT, DEMO_PARENT, DEMO_TEACHER];
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(initialUsers));
  }
}

initializeStorage();

export function getAllUsers(): User[] {
  if (typeof window === 'undefined') return [DEMO_STUDENT];
  const data = localStorage.getItem(STORAGE_USERS_KEY);
  if (!data) return [DEMO_STUDENT];
  try {
    return JSON.parse(data);
  } catch {
    return [DEMO_STUDENT];
  }
}

export function saveUsers(users: User[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return DEMO_STUDENT;
  const data = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
  if (!data) {
    // Default to student on first launch for zero-friction exploration
    setCurrentUser(DEMO_STUDENT);
    return DEMO_STUDENT;
  }
  try {
    return JSON.parse(data);
  } catch {
    return DEMO_STUDENT;
  }
}

export function setCurrentUser(user: User | null) {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(user));
    // Also sync in users list
    const users = getAllUsers();
    const idx = users.findIndex(u => u.email === user.email);
    if (idx !== -1) {
      users[idx] = user;
    } else {
      users.push(user);
    }
    saveUsers(users);
  } else {
    localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
  }
}

export function registerUser(
  name: string,
  email: string,
  password: string,
  role: Role,
  targetLanguage = 'English',
  nativeLanguage = 'Telugu'
): { success: boolean; user?: User; error?: string } {
  const users = getAllUsers();
  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return { success: false, error: 'An account with this email already exists. Please log in.' };
  }

  const newUser: User = {
    id: `usr_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    name,
    email,
    password,
    role,
    targetLanguage,
    nativeLanguage,
    currentStageId: 'basic',
    currentLevel: 1,
    xp: 50,
    stars: 0,
    completedLevelIds: [],
    levelScores: {},
    badges: ['first_lesson'],
    streakDays: 1,
    lastActiveDate: new Date().toISOString(),
    childEmail: role === 'parent' ? 'student@lingualearn.ai' : undefined
  };

  users.push(newUser);
  saveUsers(users);
  setCurrentUser(newUser);

  return { success: true, user: newUser };
}

export function loginUser(email: string, password?: string): { success: boolean; user?: User; error?: string } {
  const users = getAllUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return { success: false, error: 'User not found. Please register or use a demo account.' };
  }
  if (password && user.password && user.password !== password) {
    return { success: false, error: 'Incorrect password. Try "password123" for demo accounts.' };
  }

  setCurrentUser(user);
  return { success: true, user };
}

export function logoutUser() {
  setCurrentUser(null);
}

export function updateUserProgress(
  levelId: number,
  earnedStars: number,
  accuracy: number,
  xpEarned: number
): User {
  const currentUser = getCurrentUser() || DEMO_STUDENT;
  const completedLevels = new Set(currentUser.completedLevelIds || []);
  const wasAlreadyCompleted = completedLevels.has(levelId);
  completedLevels.add(levelId);

  const updatedScores = { ...(currentUser.levelScores || {}) };
  const prevScore = updatedScores[levelId];
  const bestStars = Math.max(earnedStars, prevScore ? prevScore.stars : 0);

  updatedScores[levelId] = {
    stars: bestStars,
    accuracy: Math.max(accuracy, prevScore ? prevScore.accuracy : 0),
    completedAt: new Date().toISOString(),
  };

  const newCompletedList = Array.from(completedLevels).sort((a, b) => a - b);
  const nextLevel = Math.max(currentUser.currentLevel, levelId + 1);

  // Determine stage progression
  let currentStageId: StageId = currentUser.currentStageId;
  if (nextLevel > 120) currentStageId = 'advanced';
  else if (nextLevel > 90) currentStageId = 'upper_intermediate';
  else if (nextLevel > 60) currentStageId = 'intermediate';
  else if (nextLevel > 30) currentStageId = 'beginner';

  // Badges update
  const newBadges = new Set(currentUser.badges || []);
  if (accuracy === 100) newBadges.add('quiz_master');
  if (levelId >= 2) newBadges.add('grammar_starter');
  if (levelId >= 30) newBadges.add('basic_completed');
  if (levelId >= 60) newBadges.add('beginner_completed');
  if (levelId >= 90) newBadges.add('intermediate_completed');
  if (levelId >= 120) newBadges.add('upper_completed');
  if (levelId >= 150) newBadges.add('advanced_completed');

  const updatedUser: User = {
    ...currentUser,
    currentLevel: nextLevel,
    currentStageId,
    xp: currentUser.xp + (wasAlreadyCompleted ? Math.round(xpEarned / 2) : xpEarned),
    stars: currentUser.stars + (prevScore ? Math.max(0, bestStars - prevScore.stars) : bestStars),
    completedLevelIds: newCompletedList,
    levelScores: updatedScores,
    badges: Array.from(newBadges),
    lastActiveDate: new Date().toISOString(),
  };

  setCurrentUser(updatedUser);
  return updatedUser;
}

export function changeTargetLanguage(newLanguage: string): User {
  const currentUser = getCurrentUser() || DEMO_STUDENT;
  const updatedUser: User = {
    ...currentUser,
    targetLanguage: newLanguage
  };
  setCurrentUser(updatedUser);
  return updatedUser;
}

// Certificate Generator
export function issueCertificate(user: User, stageName = 'Basic Stage'): Certificate {
  const certId = `LL-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const cert: Certificate = {
    id: certId,
    studentName: user.name,
    studentEmail: user.email,
    targetLanguage: user.targetLanguage || 'English',
    stageName,
    completionPercent: 100,
    issueDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    verificationCode: `VERIFIED-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    scoreAccuracy: 92,
    totalXp: user.xp || 1500
  };

  if (typeof window !== 'undefined') {
    const existingCerts = getCertificates();
    existingCerts.push(cert);
    localStorage.setItem(STORAGE_CERTIFICATES_KEY, JSON.stringify(existingCerts));
  }

  return cert;
}

export function getCertificates(): Certificate[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(STORAGE_CERTIFICATES_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

import React, { useState, useEffect } from 'react';
import { User, Level, Difficulty, Stage, Language } from './types';
import { 
  getCurrentUser, 
  setCurrentUser, 
  updateUserProgress, 
  changeTargetLanguage, 
  logoutUser 
} from './services/storageService';
import { getTopicLessonForLevel } from './data/topicsData';
import { Navbar } from './components/Navbar';
import { LevelMap } from './components/LevelMap';
import { AuthModal } from './components/AuthModal';
import { LanguageSelector } from './components/LanguageSelector';
import { TopicDifficultyModal } from './components/TopicDifficultyModal';
import { LessonModal } from './components/LessonModal';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { TranslationView } from './components/TranslationView';
import { NlpAnalysisView } from './components/NlpAnalysisView';
import { StoriesView } from './components/StoriesView';
import { DailyChallengeModal } from './components/DailyChallengeModal';
import { CertificateModal } from './components/CertificateModal';
import { ParentDashboard } from './components/ParentDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { UserProfileModal } from './components/UserProfileModal';
import { StageCelebrationModal } from './components/StageCelebrationModal';
import { LumiAITutor } from './components/LumiAITutor';
import { playClickSound, playCorrectSound } from './services/audioService';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'learn' | 'translate' | 'nlp' | 'stories' | 'daily' | 'parent' | 'teacher'>('learn');

  // Modal controls
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isDailyChallengeOpen, setIsDailyChallengeOpen] = useState(false);
  const [celebratingStage, setCelebratingStage] = useState<Stage | null>(null);

  // Level Gameplay Flow State
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [isDifficultyModalOpen, setIsDifficultyModalOpen] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('low');
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Load user from storage on mount
  useEffect(() => {
    const loaded = getCurrentUser();
    setUser(loaded);
  }, []);

  // 1. Select a Level on the Journey Map -> Open Difficulty Choice
  const handleSelectLevel = (level: Level) => {
    setActiveLevel(level);
    setIsDifficultyModalOpen(true);
  };

  // 2. Select Difficulty (Low / Medium / High) -> Open Topic Lesson
  const handleSelectDifficulty = (diff: Difficulty) => {
    setSelectedDifficulty(diff);
    setIsDifficultyModalOpen(false);
    setIsLessonModalOpen(true);
  };

  // 3. Complete Lesson -> Launch Interactive Quiz
  const handleStartQuiz = () => {
    setIsLessonModalOpen(false);
    setIsQuizOpen(true);
  };

  // 4. Complete Quiz -> Save Progress, Stars, XP
  const handleQuizComplete = (levelId: number, stars: number, score: number, xpEarned: number) => {
    const accuracy = Math.round((score / 3) * 100);
    const updated = updateUserProgress(levelId, stars, accuracy, xpEarned);
    setUser(updated);

    // Check if stage is completed (30th level, 60th level, etc.)
    if (levelId % 30 === 0) {
      setTimeout(() => {
        // Trigger celebration
      }, 500);
    }
  };

  // Handle language switch
  const handleSelectLanguage = (lang: Language) => {
    const updated = changeTargetLanguage(lang.name);
    setUser(updated);
  };

  // Handle Logout
  const handleLogout = () => {
    playClickSound();
    logoutUser();
    setUser(null);
    setIsAuthOpen(true);
  };

  // Lesson data for current level
  const currentLesson = activeLevel
    ? getTopicLessonForLevel(activeLevel.levelNumber, activeLevel.stageId, activeLevel.title)
    : null;

  const currentQuestions = currentLesson
    ? currentLesson.questions[selectedDifficulty] || currentLesson.questions.low
    : [];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        user={user}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'daily') {
            setIsDailyChallengeOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onOpenCertificate={() => setIsCertificateOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'learn' && user && (
          <LevelMap
            user={user}
            onSelectLevel={handleSelectLevel}
            onOpenStageCelebration={(stage) => setCelebratingStage(stage)}
          />
        )}

        {activeTab === 'translate' && <TranslationView />}

        {activeTab === 'nlp' && <NlpAnalysisView />}

        {activeTab === 'stories' && <StoriesView />}

        {activeTab === 'parent' && user && <ParentDashboard parentUser={user} />}

        {activeTab === 'teacher' && user && <TeacherDashboard teacherUser={user} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p className="font-semibold text-slate-400">
          🌍 LinguaLearn AI — NLP-Based Language Learning & Practice System
        </p>
        <p className="text-[11px] mt-1 text-slate-600">
          Built for B.Tech AIML / NLP Mini Project Demonstration • Powered by Gemini & Natural Language Processing
        </p>
      </footer>

      {/* Floating Lumi AI Language Tutor */}
      <LumiAITutor user={user} />

      {/* Modals & Dialogs */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(newUser) => setUser(newUser)}
      />

      <LanguageSelector
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
        selectedLanguage={user?.targetLanguage || 'English'}
        onSelectLanguage={handleSelectLanguage}
      />

      {isDifficultyModalOpen && activeLevel && (
        <TopicDifficultyModal
          isOpen={isDifficultyModalOpen}
          onClose={() => setIsDifficultyModalOpen(false)}
          level={activeLevel}
          onSelectDifficulty={handleSelectDifficulty}
        />
      )}

      {isLessonModalOpen && currentLesson && (
        <LessonModal
          isOpen={isLessonModalOpen}
          onClose={() => setIsLessonModalOpen(false)}
          lesson={currentLesson}
          difficulty={selectedDifficulty}
          onStartQuiz={handleStartQuiz}
        />
      )}

      {isQuizOpen && activeLevel && (
        <InteractiveQuiz
          isOpen={isQuizOpen}
          onClose={() => setIsQuizOpen(false)}
          level={activeLevel}
          difficulty={selectedDifficulty}
          questions={currentQuestions}
          onComplete={handleQuizComplete}
        />
      )}

      {user && (
        <UserProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={user}
          onUpdateUser={(updated) => setUser(updated)}
          onOpenCertificate={() => setIsCertificateOpen(true)}
        />
      )}

      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        user={user}
      />

      {user && (
        <DailyChallengeModal
          isOpen={isDailyChallengeOpen}
          onClose={() => setIsDailyChallengeOpen(false)}
          user={user}
          onRewardXp={(xp) => {
            const updated = { ...user, xp: user.xp + xp, streakDays: (user.streakDays || 1) + 1 };
            setCurrentUser(updated);
            setUser(updated);
          }}
        />
      )}

      {celebratingStage && (
        <StageCelebrationModal
          isOpen={!!celebratingStage}
          onClose={() => setCelebratingStage(null)}
          stage={celebratingStage}
          onUnlockNextStage={() => {
            if (user) {
              const updated = { ...user, xp: user.xp + 500 };
              setCurrentUser(updated);
              setUser(updated);
            }
          }}
        />
      )}
    </div>
  );
}

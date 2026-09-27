import React from 'react';
import { User } from '../types';
import { Shield, Sparkles, BookOpen, Flame, Award, CheckCircle2, TrendingUp, Clock } from 'lucide-react';

interface ParentDashboardProps {
  parentUser: User;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({ parentUser }) => {
  // Child monitored data (Aarav Sharma)
  const child = {
    name: 'Aarav Sharma',
    email: 'student@lingualearn.ai',
    targetLanguage: parentUser.targetLanguage || 'English',
    currentStage: 'Basic Stage (Levels 1–30)',
    currentLevel: 3,
    totalXp: 350,
    stars: 6,
    streak: 7,
    accuracy: 94,
    completedLevels: 2,
    grammarMastery: 92,
    vocabMastery: 96,
    readingComprehension: 88,
    nlpPractice: 90,
    recentLessons: [
      { level: 2, topic: 'Nouns (Naming Words)', score: '9/10', date: 'Today at 10:30 AM', stars: 3 },
      { level: 1, topic: 'Alphabet & Basic Words', score: '10/10', date: 'Yesterday at 4:15 PM', stars: 3 }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/25 mb-3 ring-4 ring-pink-500/20">
          <Shield className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Parent Supervision Portal
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-lg mx-auto">
          Monitors child study habits, quiz accuracy, grammar progression, and certificates. (Read-only verification mode).
        </p>
      </div>

      {/* Child Summary Card */}
      <div className="p-6 rounded-3xl bg-slate-850 border border-slate-700 shadow-xl mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/80 pb-5">
          <div className="flex items-center space-x-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white text-xl font-black shadow-md">
              {child.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-black text-white">{child.name}</h3>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Student
                </span>
              </div>
              <p className="text-xs text-slate-400">{child.email} • Learning {child.targetLanguage}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold flex items-center space-x-1.5">
              <Flame className="w-4 h-4 fill-amber-400" />
              <span>{child.streak} Day Streak</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4" />
              <span>{child.totalXp} XP</span>
            </div>
          </div>
        </div>

        {/* 4 Performance Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Overall Accuracy</span>
            <span className="text-xl font-black text-emerald-400">{child.accuracy}%</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Stage</span>
            <span className="text-sm font-black text-white">Basic (Lvl {child.currentLevel})</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Completed Levels</span>
            <span className="text-xl font-black text-amber-400">{child.completedLevels} / 30</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Stars</span>
            <span className="text-xl font-black text-yellow-300">⭐ {child.stars}</span>
          </div>
        </div>

        {/* Competency Mastery Progress Bars */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-pink-400" />
            <span>Learning Competency Breakdown:</span>
          </h4>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Grammar Fundamentals</span>
              <span className="text-emerald-400 font-bold">{child.grammarMastery}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${child.grammarMastery}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Vocabulary & Word Recognition</span>
              <span className="text-cyan-400 font-bold">{child.vocabMastery}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${child.vocabMastery}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Reading Comprehension</span>
              <span className="text-amber-400 font-bold">{child.readingComprehension}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-400 h-full rounded-full" style={{ width: `${child.readingComprehension}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="p-6 rounded-3xl bg-slate-850 border border-slate-700 shadow-xl">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>Recent Lesson & Quiz Submissions:</span>
        </h4>

        <div className="space-y-2.5">
          {child.recentLessons.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  L{item.level}
                </span>
                <div>
                  <h5 className="text-xs font-bold text-white">{item.topic}</h5>
                  <p className="text-[10px] text-slate-400">{item.date}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-black text-emerald-400 block">{item.score}</span>
                <span className="text-[10px] text-yellow-300 font-bold">{'⭐'.repeat(item.stars)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

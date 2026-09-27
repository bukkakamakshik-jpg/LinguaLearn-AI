import React from 'react';
import { User } from '../types';
import { SYSTEM_BADGES, DEMO_STUDENT, setCurrentUser } from '../services/storageService';
import { X, User as UserIcon, Sparkles, Award, Star, Flame, RotateCcw, ShieldCheck } from 'lucide-react';
import { playClickSound, playCorrectSound } from '../services/audioService';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onUpdateUser: (user: User) => void;
  onOpenCertificate: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
  onOpenCertificate,
}) => {
  if (!isOpen) return null;

  const handleResetProgress = () => {
    playClickSound();
    if (confirm('Are you sure you want to reset your learning progress? This will reset levels and stars to start afresh.')) {
      const resetU: User = {
        ...user,
        currentStageId: 'basic',
        currentLevel: 1,
        xp: 0,
        stars: 0,
        completedLevelIds: [],
        levelScores: {},
        badges: ['first_lesson'],
      };
      setCurrentUser(resetU);
      onUpdateUser(resetU);
      playCorrectSound();
    }
  };

  const completedCount = user.completedLevelIds?.length || 0;
  const overallPercent = Math.round((completedCount / 150) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Card Header */}
        <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-slate-800">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 flex items-center justify-center text-white text-2xl font-black shadow-xl ring-4 ring-emerald-500/20">
            {user.name.charAt(0)}
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-black text-white">{user.name}</h2>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{user.email}</p>
            <p className="text-xs text-emerald-400 font-semibold mt-1">
              🎯 Learning: <strong className="text-white">{user.targetLanguage}</strong> • Current Stage: <strong className="text-white capitalize">{user.currentStageId}</strong>
            </p>
          </div>
        </div>

        {/* KPI Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total XP</span>
            <span className="text-xl font-black text-cyan-400">{user.xp}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Stars Earned</span>
            <span className="text-xl font-black text-yellow-300">⭐ {user.stars}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Streak</span>
            <span className="text-xl font-black text-amber-400">🔥 {user.streakDays || 1}d</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Overall Progress</span>
            <span className="text-xl font-black text-emerald-400">{overallPercent}%</span>
          </div>
        </div>

        {/* Badges Shelf */}
        <div className="overflow-y-auto flex-1 space-y-4 pr-1">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Achievement Badges Showcase ({user.badges?.length || 0} Unlocked)</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {SYSTEM_BADGES.map((badge) => {
              const isUnlocked = user.badges?.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-between ${
                    isUnlocked
                      ? 'bg-gradient-to-b from-amber-500/10 to-yellow-500/5 border-amber-500/40 text-slate-200'
                      : 'bg-slate-850/60 border-slate-800 text-slate-600 opacity-50'
                  }`}
                >
                  <span className="text-3xl mb-1">{badge.icon}</span>
                  <h4 className="text-xs font-bold text-white">{badge.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2">{badge.description}</p>
                  <span className={`text-[9px] font-black uppercase mt-1 px-1.5 py-0.2 rounded ${
                    isUnlocked ? 'text-amber-400 bg-amber-500/20' : 'text-slate-600'
                  }`}>
                    {isUnlocked ? 'Unlocked' : 'Locked'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-5 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={handleResetProgress}
            className="text-xs text-rose-400 hover:text-rose-300 flex items-center space-x-1 font-bold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Progress</span>
          </button>

          <button
            onClick={() => { onClose(); onOpenCertificate(); }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs shadow-md transition transform active:scale-95 flex items-center space-x-1.5"
          >
            <Award className="w-4 h-4" />
            <span>View Verified Certificate</span>
          </button>
        </div>
      </div>
    </div>
  );
};

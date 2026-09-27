import React from 'react';
import { Difficulty, Level } from '../types';
import { X, Zap, ShieldAlert, Award, ArrowRight } from 'lucide-react';
import { playClickSound } from '../services/audioService';

interface TopicDifficultyModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: Level | null;
  onSelectDifficulty: (difficulty: Difficulty) => void;
}

export const TopicDifficultyModal: React.FC<TopicDifficultyModalProps> = ({
  isOpen,
  onClose,
  level,
  onSelectDifficulty,
}) => {
  if (!isOpen || !level) return null;

  const handleSelect = (diff: Difficulty) => {
    playClickSound();
    onSelectDifficulty(diff);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Level Header Banner */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-3">
            <span>Level {level.levelNumber}</span>
            <span>•</span>
            <span className="capitalize">{level.stageId} Stage</span>
          </div>

          <h2 className="text-2xl font-black text-white flex items-center justify-center space-x-2">
            <span>{level.icon}</span>
            <span>{level.title}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            Choose your challenge level. Questions, vocabulary depth, and grading criteria adapt to your selection.
          </p>
        </div>

        {/* Difficulty Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6">
          {/* LOW */}
          <button
            onClick={() => handleSelect('low')}
            className="p-4 rounded-2xl border bg-gradient-to-b from-emerald-950/40 to-slate-900 border-emerald-500/30 hover:border-emerald-400 hover:scale-[1.02] transition text-left group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">🟢</span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Easy
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white group-hover:text-emerald-300 transition">
                LOW
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Simple visual questions, matching drills, and essential vocabulary basics.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-500/20 flex items-center justify-between text-[11px] font-bold text-emerald-400">
              <span>+60 XP Reward</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </button>

          {/* MEDIUM */}
          <button
            onClick={() => handleSelect('medium')}
            className="p-4 rounded-2xl border bg-gradient-to-b from-amber-950/40 to-slate-900 border-amber-500/30 hover:border-amber-400 hover:scale-[1.02] transition text-left group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">🟡</span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Standard
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white group-hover:text-amber-300 transition">
                MEDIUM
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Sentence scrambling, fill-in-the-blanks, and practical grammar structure exercises.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-amber-500/20 flex items-center justify-between text-[11px] font-bold text-amber-400">
              <span>+100 XP Reward</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </button>

          {/* HIGH */}
          <button
            onClick={() => handleSelect('high')}
            className="p-4 rounded-2xl border bg-gradient-to-b from-rose-950/40 to-slate-900 border-rose-500/30 hover:border-rose-400 hover:scale-[1.02] transition text-left group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">🔴</span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Advanced
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white group-hover:text-rose-300 transition">
                HIGH
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Complex error detection, nuanced syntax analysis, and linguistic precision tests.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-rose-500/20 flex items-center justify-between text-[11px] font-bold text-rose-400">
              <span>+150 XP Reward</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </button>
        </div>

        <p className="text-center text-xs text-slate-500">
          💡 Tip: You can replay any level on different difficulty levels to collect more XP and badges!
        </p>
      </div>
    </div>
  );
};

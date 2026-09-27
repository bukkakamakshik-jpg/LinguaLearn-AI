import React, { useEffect } from 'react';
import { Stage } from '../types';
import confetti from 'canvas-confetti';
import { playVictorySound } from '../services/audioService';
import { Trophy, Star, Sparkles, X, ArrowRight, Award } from 'lucide-react';

interface StageCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  stage: Stage | null;
  onUnlockNextStage: () => void;
}

export const StageCelebrationModal: React.FC<StageCelebrationModalProps> = ({
  isOpen,
  onClose,
  stage,
  onUnlockNextStage,
}) => {
  useEffect(() => {
    if (isOpen) {
      playVictorySound();
      try {
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.5 }
        });
      } catch (e) {}
    }
  }, [isOpen]);

  if (!isOpen || !stage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in zoom-in-95">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 border border-amber-500/50 rounded-3xl shadow-2xl overflow-hidden p-8 text-center space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Trophy Animation */}
        <div className="inline-flex p-5 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-600 text-slate-950 shadow-2xl shadow-yellow-500/30 ring-8 ring-yellow-400/20 animate-bounce">
          <Trophy className="w-14 h-14" />
        </div>

        <div>
          <span className="text-xs font-black uppercase tracking-widest text-amber-400 block mb-1">
            Major Milestone Achieved!
          </span>
          <h2 className="text-3xl font-black text-white">
            {stage.name.toUpperCase()} COMPLETED!
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto">
            You have mastered all 30 game-style levels in this stage!
          </p>
        </div>

        {/* 5 Stars */}
        <div className="flex items-center justify-center space-x-2 text-3xl">
          {'⭐'.repeat(5)}
        </div>

        {/* Milestone Breakdown */}
        <div className="grid grid-cols-3 gap-2 p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Levels</span>
            <span className="text-base font-black text-white">30 / 30</span>
          </div>
          <div className="border-x border-slate-700">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Accuracy</span>
            <span className="text-base font-black text-emerald-400">92%</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Stage XP</span>
            <span className="text-base font-black text-cyan-400">+3,000</span>
          </div>
        </div>

        <button
          onClick={() => {
            onUnlockNextStage();
            onClose();
          }}
          className="w-full py-3.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-black text-sm rounded-2xl shadow-xl shadow-emerald-500/25 transition transform active:scale-95 flex items-center justify-center space-x-2"
        >
          <span>Next Learning Stage Unlocked!</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

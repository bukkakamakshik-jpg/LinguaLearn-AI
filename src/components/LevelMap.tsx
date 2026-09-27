import React, { useState } from 'react';
import { Stage, Level, User } from '../types';
import { STAGES, ALL_LEVELS } from '../data/stagesData';
import { Lock, Check, Star, Play, Sparkles, Award, Trophy, ChevronRight, Zap } from 'lucide-react';
import { playClickSound } from '../services/audioService';

interface LevelMapProps {
  user: User;
  onSelectLevel: (level: Level) => void;
  onOpenStageCelebration: (stage: Stage) => void;
}

export const LevelMap: React.FC<LevelMapProps> = ({
  user,
  onSelectLevel,
  onOpenStageCelebration,
}) => {
  const [selectedStageId, setSelectedStageId] = useState<string>(user.currentStageId || 'basic');
  const [demoUnlockAll, setDemoUnlockAll] = useState(false);

  const activeStage = STAGES.find(s => s.id === selectedStageId) || STAGES[0];
  const stageLevels = ALL_LEVELS.filter(l => l.stageId === selectedStageId);

  // Stage completion calculation
  const completedInStage = stageLevels.filter(l => user.completedLevelIds.includes(l.id) || demoUnlockAll);
  const stageCompletionPercent = Math.round((completedInStage.length / stageLevels.length) * 100);

  // Check if stage is unlocked
  const isStageUnlocked = (stage: Stage) => {
    if (demoUnlockAll) return true;
    if (stage.stageNumber === 1) return true;
    // Stage 2 unlocked if user completed level 30, etc.
    const prevStageEnd = (stage.stageNumber - 1) * 30;
    return user.completedLevelIds.includes(prevStageEnd);
  };

  const handleStageSelect = (stage: Stage) => {
    playClickSound();
    if (isStageUnlocked(stage)) {
      setSelectedStageId(stage.id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Stage Carousel / Tabs */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xl font-black text-white flex items-center space-x-2">
              <span>Your Learning Journey</span>
              <span className="text-sm font-normal text-slate-400">({user.targetLanguage})</span>
            </h2>
            <p className="text-xs text-slate-400">
              5 Major Stages • 150 Interactive Game-Style Levels
            </p>
          </div>

          {/* Teacher/Demo Quick Unlock Toggle for B.Tech project presentation */}
          <div className="flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
            <Zap className={`w-3.5 h-3.5 ${demoUnlockAll ? 'text-amber-400 fill-amber-400' : 'text-slate-500'}`} />
            <label className="text-[11px] font-bold text-slate-300 cursor-pointer flex items-center space-x-1.5">
              <span>Demo Mode (Unlock All):</span>
              <input
                type="checkbox"
                checked={demoUnlockAll}
                onChange={(e) => setDemoUnlockAll(e.target.checked)}
                className="rounded accent-emerald-500 cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* 5 Stages Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {STAGES.map((stage) => {
            const unlocked = isStageUnlocked(stage);
            const isSelected = stage.id === selectedStageId;
            const completedCount = ALL_LEVELS.filter(l => l.stageId === stage.id && (user.completedLevelIds.includes(l.id) || demoUnlockAll)).length;

            return (
              <button
                key={stage.id}
                onClick={() => handleStageSelect(stage)}
                disabled={!unlocked}
                className={`relative p-3 rounded-2xl border text-left transition transform active:scale-95 flex flex-col justify-between ${
                  isSelected
                    ? `bg-gradient-to-b ${stage.gradient} text-white shadow-xl shadow-emerald-500/10 border-white/40 ring-2 ring-white/30 scale-[1.02]`
                    : unlocked
                    ? 'bg-slate-850 hover:bg-slate-800 border-slate-700/80 text-slate-300'
                    : 'bg-slate-900/60 border-slate-800/60 text-slate-600 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xl">{stage.icon}</span>
                  {!unlocked ? (
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                  ) : completedCount === 30 ? (
                    <Trophy className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                  ) : (
                    <span className="text-[10px] font-bold opacity-80">
                      {completedCount}/30
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-black truncate">{stage.name}</h4>
                  <p className="text-[10px] opacity-75 font-medium">
                    Lv. {stage.levelStart}–{stage.levelEnd}
                  </p>
                </div>

                {/* Micro Progress Bar */}
                <div className="w-full bg-black/20 h-1 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-white h-full rounded-full transition-all duration-500"
                    style={{ width: `${(completedCount / 30) * 100}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Hero Card */}
      <div className={`p-6 rounded-3xl bg-gradient-to-r ${activeStage.gradient} text-white shadow-2xl mb-10 relative overflow-hidden`}>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/25 backdrop-blur-md text-[11px] font-black uppercase tracking-wider mb-2 border border-white/20">
              <span>STAGE {activeStage.stageNumber}</span>
              <span>•</span>
              <span>LEVELS {activeStage.levelStart} TO {activeStage.levelEnd}</span>
            </div>
            <h3 className="text-2xl font-black">{activeStage.name}</h3>
            <p className="text-xs text-white/90 max-w-lg mt-1 leading-relaxed">
              {activeStage.description}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-black/30 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-center min-w-[120px]">
              <span className="text-[11px] font-bold text-white/80 block">Stage Progress</span>
              <span className="text-xl font-black">{stageCompletionPercent}%</span>
              <div className="w-full bg-white/20 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-yellow-300 h-full rounded-full transition-all duration-500"
                  style={{ width: `${stageCompletionPercent}%` }}
                />
              </div>
            </div>

            {stageCompletionPercent === 100 && (
              <button
                onClick={() => onOpenStageCelebration(activeStage)}
                className="px-4 py-3 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-extrabold text-xs rounded-2xl shadow-xl transition transform active:scale-95 flex items-center space-x-1.5"
              >
                <Trophy className="w-4 h-4" />
                <span>Stage Milestone!</span>
              </button>
            )}
          </div>
        </div>

        {/* Ambient background decorative glow */}
        <div className="absolute -right-8 -bottom-8 text-9xl opacity-15 pointer-events-none select-none">
          {activeStage.icon}
        </div>
      </div>

      {/* Candy Crush / Duolingo-style zigzag Level Map */}
      <div className="relative py-4 flex flex-col items-center">
        {stageLevels.map((level, idx) => {
          const isCompleted = user.completedLevelIds.includes(level.id) || demoUnlockAll;
          // Unlocked if completed, or if it is level 1, or previous level is completed, or demoUnlockAll
          const isUnlocked = isCompleted || level.id === 1 || user.completedLevelIds.includes(level.id - 1) || demoUnlockAll;
          const isCurrentTarget = isUnlocked && !isCompleted;

          const scoreInfo = user.levelScores?.[level.id];
          const stars = scoreInfo ? scoreInfo.stars : isCompleted ? 3 : 0;

          // Sinuous X offset pattern: -60px, -30px, 0px, +30px, +60px, +30px, 0px, -30px...
          const sinOffsets = [0, 45, 80, 45, 0, -45, -80, -45];
          const xOffset = sinOffsets[idx % sinOffsets.length];

          return (
            <div
              key={level.id}
              className="relative my-3 flex flex-col items-center transition-all duration-300"
              style={{ transform: `translateX(${xOffset}px)` }}
            >
              {/* Connector Path Line to Next Node */}
              {idx < stageLevels.length - 1 && (
                <div 
                  className={`w-1.5 h-8 my-1 rounded-full ${
                    isCompleted ? 'bg-gradient-to-b from-emerald-400 to-teal-500' : 'bg-slate-700/60'
                  }`}
                />
              )}

              {/* Node Card / Bubble */}
              <div className="relative group">
                <button
                  onClick={() => {
                    if (isUnlocked) {
                      playClickSound();
                      onSelectLevel(level);
                    }
                  }}
                  disabled={!isUnlocked}
                  className={`relative w-20 h-20 rounded-3xl p-2 transition-all duration-300 transform active:scale-95 flex flex-col items-center justify-center shadow-xl ${
                    isCompleted
                      ? 'bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 text-white ring-4 ring-emerald-400/30 hover:scale-105'
                      : isCurrentTarget
                      ? 'bg-gradient-to-tr from-amber-400 via-yellow-400 to-orange-400 text-slate-900 ring-4 ring-yellow-400/50 animate-bounce scale-110'
                      : 'bg-slate-800/80 border border-slate-700 text-slate-500 opacity-60 cursor-not-allowed'
                  }`}
                >
                  {/* Icon */}
                  <span className="text-2xl drop-shadow">
                    {!isUnlocked ? '🔒' : isCompleted ? '⭐' : level.icon}
                  </span>

                  {/* Level Number */}
                  <span className={`text-[10px] font-black tracking-tight ${isCurrentTarget ? 'text-slate-950' : 'text-white'}`}>
                    Lvl {level.levelNumber}
                  </span>

                  {/* Completed Check Badge */}
                  {isCompleted && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md border-2 border-slate-900">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}

                  {/* Current Target Pulse Ring */}
                  {isCurrentTarget && (
                    <span className="absolute -inset-1 rounded-3xl bg-yellow-400 opacity-40 animate-ping pointer-events-none" />
                  )}
                </button>

                {/* Stars earned under completed node */}
                {isCompleted && (
                  <div className="flex items-center justify-center space-x-0.5 mt-1">
                    <Star className={`w-3 h-3 ${stars >= 1 ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} />
                    <Star className={`w-3 h-3 ${stars >= 2 ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} />
                    <Star className={`w-3 h-3 ${stars >= 3 ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} />
                  </div>
                )}

                {/* Floating Tooltip with Topic Name */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 pointer-events-none hidden group-hover:flex flex-col items-center z-30 min-w-[150px]">
                  <div className="px-3 py-1.5 rounded-xl bg-slate-900/95 border border-slate-700 text-center shadow-xl backdrop-blur-md">
                    <p className="text-xs font-black text-white truncate max-w-[180px]">{level.title}</p>
                    <p className="text-[10px] text-emerald-400 font-semibold capitalize">
                      {level.category.replace('_', ' ')} • +{level.xpReward} XP
                    </p>
                  </div>
                  <div className="w-2 h-2 bg-slate-900 border-r border-b border-slate-700 rotate-45 -mt-1" />
                </div>
              </div>

              {/* Subtitle Topic Chip */}
              <div className="mt-1.5 text-center max-w-[160px]">
                <p className={`text-[11px] font-bold truncate ${isCurrentTarget ? 'text-yellow-300 font-black' : isCompleted ? 'text-slate-200' : 'text-slate-500'}`}>
                  {level.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

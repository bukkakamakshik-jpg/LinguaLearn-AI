import React from 'react';
import { TopicLesson, Difficulty } from '../types';
import { X, Volume2, Sparkles, ArrowRight, CheckCircle2, BookOpen } from 'lucide-react';
import { speakSentence, playClickSound } from '../services/audioService';

interface LessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: TopicLesson;
  difficulty: Difficulty;
  onStartQuiz: () => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  isOpen,
  onClose,
  lesson,
  difficulty,
  onStartQuiz,
}) => {
  if (!isOpen) return null;

  const handleStart = () => {
    playClickSound();
    onStartQuiz();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Level {lesson.levelNumber} Lesson
                </span>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                  difficulty === 'low'
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    : difficulty === 'medium'
                    ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                    : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                }`}>
                  {difficulty.toUpperCase()} DIFFICULTY
                </span>
              </div>
              <h2 className="text-xl font-black text-white mt-0.5">{lesson.title}</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Lesson Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 pr-4">
          {/* Explanation Summary */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Concept Explanation</span>
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              {lesson.summary}
            </p>
          </div>

          {/* Key Rules */}
          {lesson.rules && lesson.rules.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                Key Grammar Rules & Insights:
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {lesson.rules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 text-xs text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bilingual Examples with Speech Audio */}
          {lesson.examples && lesson.examples.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                Examples with Telugu / Native Guide:
              </h3>
              <div className="space-y-2.5">
                {lesson.examples.map((ex, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-800/80 to-slate-850 border border-slate-700/80 flex items-center justify-between group hover:border-emerald-500/40 transition"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-white group-hover:text-emerald-300 transition">
                          "{ex.english}"
                        </span>
                        <button
                          onClick={() => speakSentence(ex.english)}
                          className="p-1 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition"
                          title="Listen to pronunciation"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-emerald-400/90 font-medium mt-0.5">
                        {ex.native}
                      </p>
                      {ex.note && (
                        <p className="text-[11px] text-slate-400 italic mt-0.5">
                          💡 {ex.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-700 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            Review Later
          </button>

          <button
            onClick={handleStart}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-extrabold text-sm shadow-lg shadow-emerald-500/25 transition transform active:scale-95 flex items-center space-x-2"
          >
            <span>Start Practice & Quiz</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

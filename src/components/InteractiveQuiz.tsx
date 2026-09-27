import React, { useState, useEffect } from 'react';
import { Question, Difficulty, Level } from '../types';
import { playCorrectSound, playWrongSound, playVictorySound, speakSentence, playClickSound } from '../services/audioService';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Volume2, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  ThumbsUp,
  HelpCircle,
  X
} from 'lucide-react';

interface InteractiveQuizProps {
  isOpen: boolean;
  onClose: () => void;
  level: Level;
  difficulty: Difficulty;
  questions: Question[];
  onComplete: (levelId: number, stars: number, score: number, xp: number) => void;
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({
  isOpen,
  onClose,
  level,
  difficulty,
  questions,
  onComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [scrambleTokens, setScrambleTokens] = useState<string[]>([]);
  const [selectedScramble, setSelectedScramble] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIndex] || questions[0];

  // Initialize question state when moving to next question
  useEffect(() => {
    setSelectedOption(null);
    setTypedAnswer('');
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setSelectedLeft(null);
    setMatchedPairs({});

    if (currentQ?.type === 'scramble_sentence' && currentQ.questionText) {
      // Split tokens and shuffle
      const tokens = currentQ.questionText.split('/').map(t => t.trim());
      // Randomize display order
      const shuffled = [...tokens].sort(() => Math.random() - 0.5);
      setScrambleTokens(shuffled);
      setSelectedScramble([]);
    }
  }, [currentIndex, currentQ]);

  if (!isOpen || !currentQ) return null;

  // Handle checking answers
  const handleCheckAnswer = () => {
    let correct = false;

    if (currentQ.type === 'multiple_choice' || currentQ.type === 'image_choice' || currentQ.type === 'fill_in_the_blank' || currentQ.type === 'grammar_correction') {
      correct = selectedOption?.trim().toLowerCase() === (currentQ.correctAnswer as string).trim().toLowerCase();
    } else if (currentQ.type === 'image_type') {
      const userClean = typedAnswer.trim().toLowerCase();
      const targetClean = (currentQ.correctAnswer as string).trim().toLowerCase();
      correct = userClean === targetClean;
    } else if (currentQ.type === 'scramble_sentence') {
      const expectedArray = Array.isArray(currentQ.correctAnswer)
        ? (currentQ.correctAnswer as string[]).map(s => s.toLowerCase().trim())
        : (currentQ.correctAnswer as string).split(' ').map(s => s.toLowerCase().trim());

      const userArray = selectedScramble.map(s => s.toLowerCase().trim());
      correct = expectedArray.join(' ') === userArray.join(' ');
    } else if (currentQ.type === 'match_pairs') {
      correct = true; // Pair completion validated interactively
    }

    setIsAnswerChecked(true);
    setIsCorrect(correct);

    if (correct) {
      playCorrectSound();
      setCorrectCount(prev => prev + 1);
    } else {
      playWrongSound();
    }
  };

  const handleNext = () => {
    playClickSound();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Finish Quiz
      setIsFinished(true);
      playVictorySound();
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      // Calculate score and stars
      const finalCorrect = correctCount + (isCorrect ? 0 : 0);
      const accuracy = Math.round((finalCorrect / questions.length) * 100);
      let stars = 1;
      if (accuracy >= 85) stars = 3;
      else if (accuracy >= 60) stars = 2;

      const xpEarned = level.xpReward + (stars === 3 ? 30 : stars === 2 ? 15 : 0);
      onComplete(level.id, stars, finalCorrect, xpEarned);
    }
  };

  // Scramble word chip click
  const handleScrambleWordClick = (word: string, fromSelected: boolean) => {
    playClickSound();
    if (fromSelected) {
      // Remove from selected, return to available
      setSelectedScramble(prev => {
        const idx = prev.indexOf(word);
        if (idx !== -1) {
          const next = [...prev];
          next.splice(idx, 1);
          return next;
        }
        return prev;
      });
      setScrambleTokens(prev => [...prev, word]);
    } else {
      // Add to selected, remove from available
      setScrambleTokens(prev => {
        const idx = prev.indexOf(word);
        if (idx !== -1) {
          const next = [...prev];
          next.splice(idx, 1);
          return next;
        }
        return prev;
      });
      setSelectedScramble(prev => [...prev, word]);
    }
  };

  // Pair Matching Click
  const handlePairClick = (side: 'left' | 'right', item: string) => {
    playClickSound();
    if (side === 'left') {
      setSelectedLeft(item);
    } else if (side === 'right' && selectedLeft) {
      setMatchedPairs(prev => ({ ...prev, [selectedLeft]: item }));
      setSelectedLeft(null);
    }
  };

  const accuracy = Math.round((correctCount / Math.max(questions.length, 1)) * 100);
  const earnedStars = accuracy >= 85 ? 3 : accuracy >= 60 ? 2 : 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{level.icon}</span>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black text-white">
                  Level {level.levelNumber}: {level.title}
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {difficulty}
                </span>
              </div>

              {/* Progress dots */}
              <div className="flex items-center space-x-1 mt-1">
                {questions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? 'w-6 bg-emerald-400'
                        : idx < currentIndex
                        ? 'w-3 bg-emerald-600'
                        : 'w-3 bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {!isFinished ? (
          <div className="p-6 overflow-y-auto flex-1 flex flex-col justify-between">
            <div>
              {/* Question Prompt */}
              <div className="mb-4">
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                  Question {currentIndex + 1} of {questions.length}
                </p>
                <h3 className="text-base sm:text-lg font-extrabold text-white">
                  {currentQ.prompt}
                </h3>
              </div>

              {/* Visual Card / Emoji Container */}
              {currentQ.emoji && (
                <div className="my-4 py-6 px-4 rounded-2xl bg-gradient-to-b from-slate-800/60 to-slate-850/60 border border-slate-700/80 text-center flex flex-col items-center justify-center">
                  <span className="text-6xl sm:text-7xl drop-shadow-lg animate-pulse">
                    {currentQ.emoji}
                  </span>
                  <p className="text-xs text-slate-300 font-semibold mt-2">
                    {currentQ.questionText}
                  </p>
                </div>
              )}

              {/* Text-only Question Header */}
              {!currentQ.emoji && currentQ.type !== 'scramble_sentence' && (
                <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 mb-5 flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-100">
                    {currentQ.questionText}
                  </p>
                  <button
                    onClick={() => speakSentence(currentQ.questionText)}
                    className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-xl transition"
                    title="Listen"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Multiple Choice / Image Choice Options */}
              {(currentQ.type === 'multiple_choice' || currentQ.type === 'image_choice' || currentQ.type === 'fill_in_the_blank' || currentQ.type === 'grammar_correction') && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentQ.options?.map((option, idx) => {
                    const isSelected = selectedOption === option;
                    let optionStyle = 'bg-slate-800/60 border-slate-700/80 text-slate-200 hover:bg-slate-750 hover:border-slate-600';

                    if (isAnswerChecked) {
                      const isOptionCorrect = option.trim().toLowerCase() === (currentQ.correctAnswer as string).trim().toLowerCase();
                      if (isOptionCorrect) {
                        optionStyle = 'bg-emerald-500/20 border-emerald-400 text-emerald-300 ring-2 ring-emerald-400/40';
                      } else if (isSelected) {
                        optionStyle = 'bg-rose-500/20 border-rose-400 text-rose-300 ring-2 ring-rose-400/40';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-emerald-500/20 border-emerald-400 text-emerald-300 ring-2 ring-emerald-400/40';
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswerChecked}
                        onClick={() => { playClickSound(); setSelectedOption(option); }}
                        className={`p-3.5 rounded-2xl border text-left font-bold text-xs sm:text-sm transition flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{option}</span>
                        <span className="text-xs text-slate-500 font-mono">
                          {String.fromCharCode(65 + idx)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Image Type-in */}
              {currentQ.type === 'image_type' && (
                <div className="space-y-3">
                  <input
                    type="text"
                    disabled={isAnswerChecked}
                    value={typedAnswer}
                    onChange={(e) => setTypedAnswer(e.target.value)}
                    placeholder="Type the object name here..."
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                  />
                  <p className="text-[11px] text-slate-400">
                    💡 Type the English word (e.g. "car", "apple", "school").
                  </p>
                </div>
              )}

              {/* Scramble Sentence Activity */}
              {currentQ.type === 'scramble_sentence' && (
                <div className="space-y-4">
                  {/* Selected Words Drop Area */}
                  <div className="min-h-[60px] p-3.5 rounded-2xl bg-slate-950/60 border-2 border-dashed border-emerald-500/30 flex flex-wrap gap-2 items-center">
                    {selectedScramble.length === 0 ? (
                      <span className="text-xs text-slate-500 italic">
                        Tap words below in order to build the sentence...
                      </span>
                    ) : (
                      selectedScramble.map((word, idx) => (
                        <button
                          key={idx}
                          disabled={isAnswerChecked}
                          onClick={() => handleScrambleWordClick(word, true)}
                          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-extrabold shadow-md hover:opacity-90 active:scale-95 transition"
                        >
                          {word}
                        </button>
                      ))
                    )}
                  </div>

                  {/* Available Chips */}
                  <div className="flex flex-wrap gap-2 justify-center pt-2">
                    {scrambleTokens.map((word, idx) => (
                      <button
                        key={idx}
                        disabled={isAnswerChecked}
                        onClick={() => handleScrambleWordClick(word, false)}
                        className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold shadow transition active:scale-95"
                      >
                        {word}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Match Pairs */}
              {currentQ.type === 'match_pairs' && currentQ.pairs && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    {currentQ.pairs.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePairClick('left', p.left)}
                        className={`w-full p-2.5 rounded-xl border text-xs font-bold text-left transition ${
                          selectedLeft === p.left
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                            : matchedPairs[p.left]
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                            : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        {p.left} {matchedPairs[p.left] ? '✅' : ''}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-2">
                    {currentQ.pairs.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePairClick('right', p.right)}
                        className="w-full p-2.5 rounded-xl border bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500 text-xs font-bold text-left transition"
                      >
                        {p.right}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Answer Feedback Banner */}
            {isAnswerChecked && (
              <div className={`mt-6 p-4 rounded-2xl border flex items-start space-x-3 animate-in slide-in-from-bottom-2 ${
                isCorrect
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-500/50 text-rose-300'
              }`}>
                {isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}

                <div>
                  <h4 className="text-sm font-extrabold">
                    {isCorrect ? 'Awesome! Correct Answer (+10 XP)' : 'Not quite right!'}
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    {currentQ.explanation}
                  </p>
                  {currentQ.nativeMeaning && (
                    <p className="text-xs text-emerald-400/90 font-medium mt-1">
                      Telugu: {currentQ.nativeMeaning}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              {!isAnswerChecked ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={
                    (currentQ.type === 'multiple_choice' && !selectedOption) ||
                    (currentQ.type === 'image_type' && !typedAnswer.trim()) ||
                    (currentQ.type === 'scramble_sentence' && selectedScramble.length === 0)
                  }
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition transform active:scale-95"
                >
                  Check Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-500/25 transition transform active:scale-95 flex items-center space-x-2"
                >
                  <span>{currentIndex + 1 < questions.length ? 'Continue' : 'View Results'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Victory Completion Modal */
          <div className="p-8 text-center space-y-6 animate-in zoom-in-95">
            <div className="inline-flex p-4 rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-white shadow-2xl shadow-yellow-500/30 ring-8 ring-yellow-500/20 animate-bounce">
              <span className="text-5xl">🏆</span>
            </div>

            <div>
              <h3 className="text-3xl font-black bg-gradient-to-r from-amber-300 via-yellow-200 to-emerald-400 bg-clip-text text-transparent">
                Congratulations!
              </h3>
              <p className="text-sm font-semibold text-slate-300 mt-1">
                You completed: <span className="text-emerald-400 font-bold">{level.title} - Level {level.levelNumber}</span>
              </p>
            </div>

            {/* Stars Row */}
            <div className="flex items-center justify-center space-x-3 text-4xl">
              <span className={earnedStars >= 1 ? 'animate-pulse' : 'opacity-30'}>⭐</span>
              <span className={earnedStars >= 2 ? 'animate-pulse scale-125' : 'opacity-30'}>⭐</span>
              <span className={earnedStars >= 3 ? 'animate-pulse' : 'opacity-30'}>⭐</span>
            </div>

            {/* Score Stats */}
            <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Score</span>
                <span className="text-lg font-black text-white">{correctCount}/{questions.length}</span>
              </div>
              <div className="border-x border-slate-700">
                <span className="text-xs text-slate-400 block font-medium">Accuracy</span>
                <span className="text-lg font-black text-emerald-400">{accuracy}%</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-medium">XP Earned</span>
                <span className="text-lg font-black text-cyan-400">+{level.xpReward}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center space-x-3">
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setIsFinished(false);
                  setCorrectCount(0);
                }}
                className="px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-bold text-slate-300 flex items-center space-x-1.5 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Practice Again</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/25 transition transform active:scale-95 flex items-center space-x-2"
              >
                <span>Continue Learning Journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

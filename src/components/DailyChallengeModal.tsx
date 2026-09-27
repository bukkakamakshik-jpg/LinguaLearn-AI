import React, { useState } from 'react';
import { User } from '../types';
import { playCorrectSound, playVictorySound, playWrongSound, playClickSound } from '../services/audioService';
import confetti from 'canvas-confetti';
import { 
  Flame, 
  X, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  Trophy 
} from 'lucide-react';

interface DailyChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onRewardXp: (xp: number) => void;
}

export const DailyChallengeModal: React.FC<DailyChallengeModalProps> = ({
  isOpen,
  onClose,
  user,
  onRewardXp,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (!isOpen) return null;

  const challenges = [
    {
      id: 'd1',
      category: 'Vocabulary Drill',
      question: 'What is the opposite (antonym) of the adjective "HAPPY"?',
      options: ['Joyful', 'Sad', 'Excited', 'Bright'],
      correctAnswer: 'Sad',
      explanation: 'The opposite of happy is sad.',
    },
    {
      id: 'd2',
      category: 'Grammar Rule',
      question: 'Fill in the blank: "She ___ to the market yesterday."',
      options: ['go', 'goes', 'went', 'going'],
      correctAnswer: 'went',
      explanation: '"Yesterday" denotes past tense, so we use "went".',
    },
    {
      id: 'd3',
      category: 'Sentence Correction',
      question: 'Which sentence is grammatically correct?',
      options: [
        'He don’t like apples.',
        'He doesn’t likes apples.',
        'He doesn’t like apples.',
        'He not like apples.'
      ],
      correctAnswer: 'He doesn’t like apples.',
      explanation: 'After "doesn’t", the verb remains in base form ("like").',
    },
    {
      id: 'd4',
      category: 'Translation Check',
      question: 'What is the Telugu meaning of "Water"?',
      options: ['గాలి (Air)', 'నీరు (Neeru)', 'భూమి (Earth)', 'నిప్పు (Fire)'],
      correctAnswer: 'నీరు (Neeru)',
      explanation: 'Water in Telugu is నీరు (Neeru).',
    },
    {
      id: 'd5',
      category: 'Story Comprehension',
      question: 'In "The Thirsty Crow", how did the crow raise the water level?',
      options: ['By calling friends', 'By dropping pebbles', 'By tipping the pitcher', 'By waiting for rain'],
      correctAnswer: 'By dropping pebbles',
      explanation: 'Dropping pebbles into the pitcher raised the water level.',
    }
  ];

  const currentChallenge = challenges[currentStep];

  const handleCheck = () => {
    if (!selectedOption) return;
    const correct = selectedOption === currentChallenge.correctAnswer;
    setIsAnswerChecked(true);
    setIsCorrect(correct);

    if (correct) {
      playCorrectSound();
    } else {
      playWrongSound();
    }
  };

  const handleNext = () => {
    playClickSound();
    if (currentStep + 1 < challenges.length) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
      setIsCorrect(false);
    } else {
      setCompleted(true);
      playVictorySound();
      try {
        confetti({ particleCount: 80, spread: 60 });
      } catch (e) {}
      onRewardXp(150);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Streak */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white shadow-lg shadow-amber-500/25 mb-3 ring-4 ring-amber-500/20">
            <Flame className="w-8 h-8 fill-white animate-pulse" />
          </div>

          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-2">
            <span>🔥 {user.streakDays || 1} Day Streak Active</span>
          </div>

          <h2 className="text-2xl font-black text-white">Daily Language Quest</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            Complete 5 quick questions every day to maintain your streak and earn +150 bonus XP!
          </p>
        </div>

        {!completed ? (
          <div>
            {/* Step indicator */}
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
              <span>Challenge {currentStep + 1} of {challenges.length}</span>
              <span className="text-emerald-400">{currentChallenge.category}</span>
            </div>

            <div className="w-full bg-slate-800 h-2 rounded-full mb-5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / challenges.length) * 100}%` }}
              />
            </div>

            {/* Question */}
            <h3 className="text-sm sm:text-base font-extrabold text-white mb-4">
              {currentChallenge.question}
            </h3>

            {/* Options */}
            <div className="space-y-2 mb-5">
              {currentChallenge.options.map((opt, idx) => {
                const isSelected = selectedOption === opt;
                let style = 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-750';

                if (isAnswerChecked) {
                  if (opt === currentChallenge.correctAnswer) {
                    style = 'bg-emerald-500/20 border-emerald-400 text-emerald-300';
                  } else if (isSelected) {
                    style = 'bg-rose-500/20 border-rose-400 text-rose-300';
                  }
                } else if (isSelected) {
                  style = 'bg-amber-500/20 border-amber-400 text-amber-300 ring-2 ring-amber-400/40';
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerChecked}
                    onClick={() => { playClickSound(); setSelectedOption(opt); }}
                    className={`w-full p-3 rounded-2xl border text-left font-bold text-xs sm:text-sm transition flex items-center justify-between ${style}`}
                  >
                    <span>{opt}</span>
                    <span className="text-xs text-slate-500">
                      {String.fromCharCode(65 + idx)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {isAnswerChecked && (
              <div className={`p-3.5 rounded-xl border text-xs font-semibold mb-4 ${
                isCorrect
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
              }`}>
                {isCorrect ? '✅ Correct!' : '❌ Incorrect.'} {currentChallenge.explanation}
              </div>
            )}

            {/* Action */}
            <div className="flex justify-end">
              {!isAnswerChecked ? (
                <button
                  onClick={handleCheck}
                  disabled={!selectedOption}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 disabled:opacity-50 text-white font-extrabold text-xs shadow-md transition"
                >
                  Verify Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-xs shadow-md transition flex items-center space-x-1.5"
                >
                  <span>{currentStep + 1 < challenges.length ? 'Next Question' : 'Claim Daily Reward'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <span className="text-6xl block animate-bounce">🎉</span>
            <h3 className="text-2xl font-black text-white">
              Daily Challenge Complete!
            </h3>
            <p className="text-xs text-slate-300 max-w-xs mx-auto">
              You kept your streak burning strong and earned <span className="font-bold text-amber-400">+150 XP</span>. Come back tomorrow for fresh questions!
            </p>

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-xs shadow-xl transition transform active:scale-95"
            >
              Back to Learning Map
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

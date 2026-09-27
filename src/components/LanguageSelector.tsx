import React from 'react';
import { LANGUAGES } from '../data/languagesData';
import { Language } from '../types';
import { X, CheckCircle2, Globe, Sparkles } from 'lucide-react';
import { playClickSound, playCorrectSound } from '../services/audioService';

interface LanguageSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLanguage: string;
  onSelectLanguage: (lang: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  isOpen,
  onClose,
  selectedLanguage,
  onSelectLanguage,
}) => {
  if (!isOpen) return null;

  const handleSelect = (lang: Language) => {
    playCorrectSound();
    onSelectLanguage(lang);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8">
        <button
          onClick={() => { playClickSound(); onClose(); }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/25 mb-3 ring-4 ring-blue-500/20">
            <Globe className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-black text-white">
            Which language do you want to learn?
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            Choose your target language. All levels, vocabulary, NLP translations, and exercises will dynamically adapt.
          </p>
        </div>

        {/* Languages Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-h-[60vh] overflow-y-auto pr-1">
          {LANGUAGES.map((lang) => {
            const isSelected = selectedLanguage.toLowerCase() === lang.name.toLowerCase();

            return (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang)}
                className={`relative p-3.5 rounded-2xl border text-center transition transform active:scale-95 group flex flex-col items-center justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-emerald-500/20 to-teal-500/10 border-emerald-400 ring-2 ring-emerald-400/40 shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/80 hover:border-slate-600'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                  </div>
                )}

                <div className="text-4xl mb-2 group-hover:scale-110 transition duration-200">
                  {lang.flag}
                </div>

                <div>
                  <h3 className="text-xs font-bold text-white group-hover:text-emerald-300 transition">
                    {lang.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {lang.nativeName}
                  </p>
                </div>

                {lang.popular && (
                  <span className="mt-2 inline-flex items-center space-x-1 text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Popular</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
          <p className="text-xs text-slate-400">
            Selected: <span className="font-bold text-emerald-400">{selectedLanguage}</span>. You can change this at any time from the top bar.
          </p>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { LANGUAGES } from '../data/languagesData';
import { translateText } from '../services/nlpService';
import { speakSentence, playClickSound, playCorrectSound } from '../services/audioService';
import { 
  ArrowLeftRight, 
  Copy, 
  Check, 
  Trash2, 
  Volume2, 
  Sparkles, 
  Globe, 
  BookOpen, 
  Languages 
} from 'lucide-react';

export const TranslationView: React.FC = () => {
  const [fromLang, setFromLang] = useState('English');
  const [toLang, setToLang] = useState('Telugu');
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [transliteration, setTransliteration] = useState('');
  const [grammarNotes, setGrammarNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const sampleSentences = [
    'Hello',
    'I am learning English',
    'I go to school',
    'She reads a book',
    'The sun rises in the east',
    'Welcome to LinguaLearn AI'
  ];

  const handleTranslate = async (textToTranslate = inputText) => {
    if (!textToTranslate.trim()) return;
    setLoading(true);
    playClickSound();

    try {
      const result = await translateText(textToTranslate.trim(), fromLang, toLang);
      setTranslatedText(result.translation);
      setTransliteration(result.transliteration || '');
      setGrammarNotes(result.notes || '');
      playCorrectSound();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    playClickSound();
    const temp = fromLang;
    setFromLang(toLang);
    setToLang(temp);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  const handleCopy = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    playClickSound();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    playClickSound();
    setInputText('');
    setTranslatedText('');
    setTransliteration('');
    setGrammarNotes('');
  };

  const handleSampleClick = (sample: string) => {
    setInputText(sample);
    handleTranslate(sample);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/20 mb-3 ring-4 ring-blue-500/20">
          <Globe className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Multilingual NLP Translation Studio
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-lg mx-auto">
          Translate sentences across Telugu, Hindi, Tamil, Kannada, Spanish, and English with instant grammar notes and phonetic pronunciation.
        </p>
      </div>

      {/* Language Selector Bar */}
      <div className="p-3 bg-slate-800/80 border border-slate-700/80 rounded-2xl mb-4 flex items-center justify-between gap-3 shadow-md">
        <div className="flex-1">
          <label className="text-[10px] uppercase font-black text-slate-400 block mb-1">From Language</label>
          <select
            value={fromLang}
            onChange={(e) => setFromLang(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {LANGUAGES.map(l => (
              <option key={l.code} value={l.name}>{l.flag} {l.name} ({l.nativeName})</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSwap}
          className="mt-4 p-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white transition transform active:rotate-180 duration-300"
          title="Swap Languages"
        >
          <ArrowLeftRight className="w-4 h-4" />
        </button>

        <div className="flex-1">
          <label className="text-[10px] uppercase font-black text-slate-400 block mb-1">To Language</label>
          <select
            value={toLang}
            onChange={(e) => setToLang(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {LANGUAGES.map(l => (
              <option key={l.code} value={l.name}>{l.flag} {l.name} ({l.nativeName})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Translation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Input Card */}
        <div className="bg-slate-850 border border-slate-700 rounded-3xl p-5 shadow-xl flex flex-col justify-between min-h-[260px]">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-slate-300 flex items-center space-x-1.5">
                <span>Original Text ({fromLang})</span>
              </span>
              {inputText && (
                <button
                  onClick={() => speakSentence(inputText)}
                  className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition"
                  title="Listen"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <textarea
              rows={5}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter a sentence to translate..."
              className="w-full bg-transparent text-white text-sm focus:outline-none resize-none placeholder-slate-500 leading-relaxed font-medium"
            />
          </div>

          <div className="pt-3 border-t border-slate-750 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">{inputText.length} characters</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleClear}
                disabled={!inputText}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition disabled:opacity-30"
                title="Clear"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleTranslate()}
                disabled={loading || !inputText.trim()}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{loading ? 'Translating...' : 'Translate'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Output Card */}
        <div className="bg-slate-850 border border-slate-700 rounded-3xl p-5 shadow-xl flex flex-col justify-between min-h-[260px]">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-emerald-400 flex items-center space-x-1.5">
                <span>Translated Text ({toLang})</span>
              </span>
              {translatedText && (
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => speakSentence(translatedText)}
                    className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition"
                    title="Listen"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition"
                    title="Copy Translation"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              )}
            </div>

            {translatedText ? (
              <div className="space-y-3">
                <p className="text-base font-extrabold text-white leading-relaxed">
                  {translatedText}
                </p>

                {transliteration && (
                  <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Pronunciation / Guide:</span>
                    <span>{transliteration}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-32 flex flex-col items-center justify-center text-slate-500 text-xs italic">
                Translation will appear here...
              </div>
            )}
          </div>

          {grammarNotes && (
            <div className="pt-3 border-t border-slate-750 text-[11px] text-emerald-400/90 font-medium">
              💡 {grammarNotes}
            </div>
          )}
        </div>
      </div>

      {/* Quick Sentence Samples */}
      <div className="p-4 rounded-2xl bg-slate-850/60 border border-slate-700/80">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span>Quick Practice Sentence Prompts:</span>
        </h4>
        <div className="flex flex-wrap gap-2">
          {sampleSentences.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => handleSampleClick(sample)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 text-xs font-medium hover:border-cyan-400 transition"
            >
              "{sample}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

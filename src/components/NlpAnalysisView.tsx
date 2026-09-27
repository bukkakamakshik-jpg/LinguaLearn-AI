import React, { useState } from 'react';
import { performNlpAnalysis } from '../services/nlpService';
import { NLPAnalysisResult } from '../types';
import { playClickSound, playCorrectSound, speakSentence } from '../services/audioService';
import { 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  Layers, 
  Volume2, 
  GitBranch, 
  Zap,
  Tag
} from 'lucide-react';

export const NlpAnalysisView: React.FC = () => {
  const [inputSentence, setInputSentence] = useState('I going school.');
  const [analysis, setAnalysis] = useState<NLPAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const samplePrompts = [
    'I going school.',
    'She did not went to the library.',
    'Ravi and Sita are studying English.',
    'The clever crow drank water happily.',
    'He have a new bicycle.'
  ];

  const handleAnalyze = async (sentence = inputSentence) => {
    if (!sentence.trim()) return;
    setLoading(true);
    playClickSound();

    try {
      const res = await performNlpAnalysis(sentence.trim());
      setAnalysis(res);
      playCorrectSound();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getPosBadgeColor = (pos: string) => {
    if (pos.startsWith('NN')) return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    if (pos.startsWith('VB')) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    if (pos.startsWith('JJ')) return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    if (pos.startsWith('RB')) return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    if (pos.startsWith('PRP')) return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
    if (pos.startsWith('IN')) return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
    if (pos.startsWith('DT')) return 'bg-slate-700 text-slate-300 border-slate-600';
    return 'bg-slate-800 text-slate-300 border-slate-700';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/25 mb-3 ring-4 ring-purple-500/20">
          <Cpu className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Natural Language Processing (NLP) Lab
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-lg mx-auto">
          Explore tokenization, Part-Of-Speech (POS) tagging, syntactic dependency extraction, and automated grammar error diagnosis.
        </p>
      </div>

      {/* Input Section */}
      <div className="p-5 rounded-3xl bg-slate-850 border border-slate-700 shadow-xl mb-6">
        <label className="text-xs font-bold text-slate-300 block mb-2 flex items-center justify-between">
          <span>Input Sentence for NLP Processing:</span>
          {inputSentence && (
            <button
              onClick={() => speakSentence(inputSentence)}
              className="text-slate-400 hover:text-emerald-400 p-1 transition"
              title="Speak"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}
        </label>

        <div className="flex gap-2">
          <input
            type="text"
            value={inputSentence}
            onChange={(e) => setInputSentence(e.target.value)}
            placeholder="Type any English sentence to inspect NLP structure..."
            className="flex-1 px-4 py-3 bg-slate-900 border border-slate-700 rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 font-medium"
          />

          <button
            onClick={() => handleAnalyze()}
            disabled={loading || !inputSentence.trim()}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg shadow-purple-500/25 transition transform active:scale-95 flex items-center space-x-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loading ? 'Analyzing...' : 'Analyze Sentence'}</span>
          </button>
        </div>

        {/* Quick Samples */}
        <div className="mt-3 flex flex-wrap gap-2 items-center">
          <span className="text-[11px] font-bold text-slate-400">Samples:</span>
          {samplePrompts.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputSentence(s);
                handleAnalyze(s);
              }}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 hover:border-purple-400 transition"
            >
              "{s}"
            </button>
          ))}
        </div>
      </div>

      {/* Visual Pipeline Results */}
      {analysis && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
          {/* Stage 1: Tokens & POS Tags */}
          <div className="p-5 rounded-3xl bg-slate-850 border border-slate-700 shadow-xl">
            <h3 className="text-sm font-extrabold text-white mb-3 flex items-center space-x-2">
              <Tag className="w-4 h-4 text-purple-400" />
              <span>1. Tokenization & Part-Of-Speech (POS) Tagging</span>
            </h3>

            <div className="flex flex-wrap gap-2.5">
              {analysis.tokens.map((token, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border text-center transition group hover:scale-105 shadow-md ${getPosBadgeColor(token.pos)}`}
                >
                  <p className="text-sm font-black text-white">{token.word}</p>
                  <div className="mt-1 flex items-center justify-center space-x-1">
                    <span className="text-[10px] font-mono font-bold uppercase opacity-80">
                      {token.pos}
                    </span>
                    <span>•</span>
                    <span className="text-[10px] font-bold">{token.posLabel}</span>
                  </div>
                  <p className="text-[9px] text-slate-400 mt-1 opacity-70">
                    Lemma: {token.lemma}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Stage 2: Syntax Analysis & Sentence Tree */}
          <div className="p-5 rounded-3xl bg-slate-850 border border-slate-700 shadow-xl">
            <h3 className="text-sm font-extrabold text-white mb-3 flex items-center space-x-2">
              <GitBranch className="w-4 h-4 text-cyan-400" />
              <span>2. Syntactic Structure & Grammar Tree</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Subject (కర్త)</span>
                <span className="text-sm font-extrabold text-white">{analysis.syntaxAnalysis.subject}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Main Verb (క్రియ)</span>
                <span className="text-sm font-extrabold text-emerald-400">{analysis.syntaxAnalysis.verb}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Object / Predicate</span>
                <span className="text-sm font-extrabold text-cyan-400">{analysis.syntaxAnalysis.object}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Tense & Mood</span>
                <span className="text-sm font-extrabold text-amber-400">{analysis.syntaxAnalysis.tense}</span>
              </div>
            </div>
          </div>

          {/* Stage 3: Sentence Correction & Error Diagnosis */}
          <div className="p-5 rounded-3xl bg-slate-850 border border-slate-700 shadow-xl">
            <h3 className="text-sm font-extrabold text-white mb-3 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>3. Grammar Correction & Rule Verification</span>
            </h3>

            <div className={`p-4 rounded-2xl border mb-3 ${
              analysis.isGrammaticallyCorrect
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
            }`}>
              <div className="flex items-center space-x-2 mb-1">
                {analysis.isGrammaticallyCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                )}
                <span className="text-sm font-extrabold">
                  {analysis.isGrammaticallyCorrect ? 'Sentence is Grammatically Correct!' : 'Grammatical Corrections Identified:'}
                </span>
              </div>

              {!analysis.isGrammaticallyCorrect && (
                <div className="mt-2 space-y-2">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Recommended Corrected Sentence:</span>
                    <span className="text-base font-black text-emerald-400">
                      "{analysis.correctedSentence}"
                    </span>
                  </div>

                  {analysis.errors.map((err, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs text-rose-300">
                      <span className="font-bold uppercase tracking-wider block text-[10px] text-rose-400">
                        {err.errorType}:
                      </span>
                      <span>{err.explanation}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Stage 4: Readability & Sentiment Metrics */}
          <div className="p-5 rounded-3xl bg-slate-850 border border-slate-700 shadow-xl">
            <h3 className="text-sm font-extrabold text-white mb-3 flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>4. Readability & Linguistic Metrics</span>
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Complexity Score</span>
                <span className="text-sm font-black text-purple-400">{analysis.readability.score}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Target Grade</span>
                <span className="text-sm font-black text-cyan-400">{analysis.readability.gradeLevel}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Tone Sentiment</span>
                <span className="text-sm font-black text-emerald-400">{analysis.readability.sentiment}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

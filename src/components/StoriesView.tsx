import React, { useState } from 'react';
import { STORIES, Story } from '../data/storiesData';
import { READING_PASSAGES, ReadingPassage } from '../data/readingsData';
import { speakSentence, playClickSound, playCorrectSound, playWrongSound } from '../services/audioService';
import { 
  BookOpen, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  ArrowRight,
  Bookmark,
  Layers
} from 'lucide-react';

export const StoriesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stories' | 'reading'>('stories');
  const [selectedStory, setSelectedStory] = useState<Story>(STORIES[0]);
  const [selectedReading, setSelectedReading] = useState<ReadingPassage>(READING_PASSAGES[0]);

  // Story Quiz State
  const [storyAnswers, setStoryAnswers] = useState<Record<number, string>>({});
  const [storyQuizChecked, setStoryQuizChecked] = useState(false);
  const [storyScore, setStoryScore] = useState(0);

  // Reading Quiz State
  const [readingAnswers, setReadingAnswers] = useState<Record<string, string>>({});
  const [readingQuizChecked, setReadingQuizChecked] = useState(false);
  const [readingScore, setReadingScore] = useState(0);

  const handleStoryAnswer = (qIdx: number, option: string) => {
    playClickSound();
    setStoryAnswers(prev => ({ ...prev, [qIdx]: option }));
  };

  const handleCheckStoryQuiz = () => {
    let score = 0;
    selectedStory.quizQuestions.forEach((q, idx) => {
      if (storyAnswers[idx] === q.correctAnswer) score++;
    });
    setStoryScore(score);
    setStoryQuizChecked(true);
    if (score === selectedStory.quizQuestions.length) playCorrectSound();
    else playClickSound();
  };

  const handleReadingAnswer = (qId: string, option: string) => {
    playClickSound();
    setReadingAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleCheckReadingQuiz = () => {
    let score = 0;
    selectedReading.questions.forEach((q) => {
      if (readingAnswers[q.id] === q.correctAnswer) score++;
    });
    setReadingScore(score);
    setReadingQuizChecked(true);
    if (score === selectedReading.questions.length) playCorrectSound();
    else playClickSound();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25 mb-3 ring-4 ring-amber-500/20">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Stories & Reading Practice
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-lg mx-auto">
          Immerse yourself in bilingual stories with Telugu translations, vocabulary notes, and reading comprehension quizzes.
        </p>

        {/* Tab Switcher */}
        <div className="inline-flex p-1 bg-slate-800/90 border border-slate-700 rounded-2xl mt-4">
          <button
            onClick={() => { playClickSound(); setActiveTab('stories'); }}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${
              activeTab === 'stories'
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            📖 Short Stories
          </button>
          <button
            onClick={() => { playClickSound(); setActiveTab('reading'); }}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${
              activeTab === 'reading'
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            📰 Reading Passages
          </button>
        </div>
      </div>

      {activeTab === 'stories' ? (
        /* Stories View */
        <div className="space-y-6">
          {/* Stories Selector Carousel */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {STORIES.map((story) => {
              const isSelected = selectedStory.id === story.id;
              return (
                <button
                  key={story.id}
                  onClick={() => {
                    playClickSound();
                    setSelectedStory(story);
                    setStoryAnswers({});
                    setStoryQuizChecked(false);
                  }}
                  className={`p-4 rounded-2xl border text-left transition transform active:scale-95 ${
                    isSelected
                      ? 'bg-gradient-to-b from-amber-500/20 to-orange-500/10 border-amber-400 ring-2 ring-amber-400/40 shadow-xl'
                      : 'bg-slate-850 hover:bg-slate-800 border-slate-700/80 text-slate-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{story.emoji}</div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {story.level}
                  </span>
                  <h4 className="text-sm font-extrabold text-white mt-1.5">{story.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{story.summary}</p>
                </button>
              );
            })}
          </div>

          {/* Active Story Card */}
          <div className="p-6 rounded-3xl bg-slate-850 border border-slate-700 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                  {selectedStory.level} Stage Story
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2 mt-0.5">
                  <span>{selectedStory.emoji}</span>
                  <span>{selectedStory.title}</span>
                </h3>
              </div>

              <button
                onClick={() => speakSentence(selectedStory.paragraphs.map(p => p.english).join(' '))}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-750 text-amber-300 border border-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition"
                title="Listen to full story"
              >
                <Volume2 className="w-4 h-4" />
                <span>Listen Audio</span>
              </button>
            </div>

            {/* Paragraphs */}
            <div className="space-y-4">
              {selectedStory.paragraphs.map((para, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1.5">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-bold text-white leading-relaxed">
                      {para.english}
                    </p>
                    <button
                      onClick={() => speakSentence(para.english)}
                      className="p-1 text-slate-400 hover:text-amber-400 ml-2"
                      title="Listen"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-amber-400/90 font-medium">
                    {para.native}
                  </p>
                </div>
              ))}
            </div>

            {/* Vocabulary Highlight Cards */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center space-x-1.5">
                <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                <span>Key Vocabulary from this Story:</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {selectedStory.vocabulary.map((v, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-center">
                    <p className="text-xs font-black text-white">{v.word}</p>
                    <p className="text-[10px] text-amber-300 font-bold mt-0.5">{v.telugu}</p>
                    <p className="text-[9px] text-slate-400 mt-0.5 leading-tight">{v.meaning}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Comprehension Quiz */}
            <div className="border-t border-slate-700/80 pt-6">
              <h4 className="text-sm font-black text-white mb-3">
                Story Comprehension Quiz ({selectedStory.quizQuestions.length} Questions)
              </h4>

              <div className="space-y-4">
                {selectedStory.quizQuestions.map((q, qIdx) => (
                  <div key={qIdx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
                    <p className="text-xs font-bold text-slate-200">
                      {qIdx + 1}. {q.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = storyAnswers[qIdx] === opt;
                        let optStyle = 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750';

                        if (storyQuizChecked) {
                          if (opt === q.correctAnswer) optStyle = 'bg-emerald-500/20 border-emerald-400 text-emerald-300';
                          else if (isSelected) optStyle = 'bg-rose-500/20 border-rose-400 text-rose-300';
                        } else if (isSelected) {
                          optStyle = 'bg-amber-500/20 border-amber-400 text-amber-300 ring-2 ring-amber-400/40';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={storyQuizChecked}
                            onClick={() => handleStoryAnswer(qIdx, opt)}
                            className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition ${optStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                {storyQuizChecked ? (
                  <span className="text-xs font-bold text-emerald-400">
                    Your Score: {storyScore}/{selectedStory.quizQuestions.length} (Accuracy: {Math.round((storyScore / selectedStory.quizQuestions.length) * 100)}%)
                  </span>
                ) : <span />}

                {!storyQuizChecked ? (
                  <button
                    onClick={handleCheckStoryQuiz}
                    disabled={Object.keys(storyAnswers).length < selectedStory.quizQuestions.length}
                    className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 disabled:opacity-40 text-white font-extrabold text-xs rounded-xl shadow-md transition"
                  >
                    Check Story Answers
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setStoryAnswers({});
                      setStoryQuizChecked(false);
                    }}
                    className="px-4 py-2 border border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition"
                  >
                    Retake Quiz
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Reading Passages View */
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {READING_PASSAGES.map((rp) => {
              const isSelected = selectedReading.id === rp.id;
              return (
                <button
                  key={rp.id}
                  onClick={() => {
                    playClickSound();
                    setSelectedReading(rp);
                    setReadingAnswers({});
                    setReadingQuizChecked(false);
                  }}
                  className={`p-4 rounded-2xl border text-left transition transform active:scale-95 ${
                    isSelected
                      ? 'bg-gradient-to-b from-blue-500/20 to-cyan-500/10 border-blue-400 ring-2 ring-blue-400/40 shadow-xl'
                      : 'bg-slate-850 hover:bg-slate-800 border-slate-700/80 text-slate-300'
                  }`}
                >
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {rp.topic} • {rp.estimatedMinutes} min read
                  </span>
                  <h4 className="text-sm font-extrabold text-white mt-2">{rp.title}</h4>
                </button>
              );
            })}
          </div>

          {/* Reading Card */}
          <div className="p-6 rounded-3xl bg-slate-850 border border-slate-700 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block">
                  {selectedReading.topic}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  {selectedReading.title}
                </h3>
              </div>

              <button
                onClick={() => speakSentence(selectedReading.content)}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-750 text-cyan-300 border border-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition"
                title="Read aloud"
              >
                <Volume2 className="w-4 h-4" />
                <span>Audio Reader</span>
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 text-sm text-slate-200 leading-relaxed font-medium">
              {selectedReading.content}
            </div>

            {/* Key Takeaways */}
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                Key Reading Points:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                {selectedReading.keyPoints.map((kp, idx) => (
                  <li key={idx}>{kp}</li>
                ))}
              </ul>
            </div>

            {/* Reading Comprehension Questions */}
            <div className="border-t border-slate-700/80 pt-6">
              <h4 className="text-sm font-black text-white mb-3">
                Comprehension Check
              </h4>

              <div className="space-y-4">
                {selectedReading.questions.map((q, qIdx) => (
                  <div key={q.id} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <p className="text-xs font-bold text-slate-200">
                      {qIdx + 1}. {q.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = readingAnswers[q.id] === opt;
                        let optStyle = 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750';

                        if (readingQuizChecked) {
                          if (opt === q.correctAnswer) optStyle = 'bg-emerald-500/20 border-emerald-400 text-emerald-300';
                          else if (isSelected) optStyle = 'bg-rose-500/20 border-rose-400 text-rose-300';
                        } else if (isSelected) {
                          optStyle = 'bg-cyan-500/20 border-cyan-400 text-cyan-300 ring-2 ring-cyan-400/40';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={readingQuizChecked}
                            onClick={() => handleReadingAnswer(q.id, opt)}
                            className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition ${optStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                {readingQuizChecked ? (
                  <span className="text-xs font-bold text-emerald-400">
                    Accuracy: {Math.round((readingScore / selectedReading.questions.length) * 100)}% ({readingScore}/{selectedReading.questions.length})
                  </span>
                ) : <span />}

                {!readingQuizChecked ? (
                  <button
                    onClick={handleCheckReadingQuiz}
                    disabled={Object.keys(readingAnswers).length < selectedReading.questions.length}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 disabled:opacity-40 text-white font-extrabold text-xs rounded-xl shadow-md transition"
                  >
                    Submit Reading Answers
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setReadingAnswers({});
                      setReadingQuizChecked(false);
                    }}
                    className="px-4 py-2 border border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition"
                  >
                    Try Again
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

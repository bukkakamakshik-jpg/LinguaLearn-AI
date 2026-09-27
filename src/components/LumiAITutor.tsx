import React, { useState, useRef, useEffect } from 'react';
import { User } from '../types';
import { speakSentence, playClickSound, playCorrectSound } from '../services/audioService';
import { 
  Bot, 
  X, 
  Send, 
  Volume2, 
  Sparkles, 
  MessageSquare, 
  Minimize2, 
  Maximize2,
  HelpCircle
} from 'lucide-react';

interface LumiMessage {
  id: string;
  sender: 'lumi' | 'user';
  text: string;
  timestamp: string;
}

interface LumiAITutorProps {
  user: User | null;
}

export const LumiAITutor: React.FC<LumiAITutorProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<LumiMessage[]>([
    {
      id: 'm1',
      sender: 'lumi',
      text: `Hello ${user?.name ? user.name.split(' ')[0] : 'friend'}! 🌟 I'm Lumi, your personal AI Language Tutor. You can ask me grammar questions, ask me to correct your sentences, or explain rules in Telugu or Hindi. What would you like to practice today?`,
      timestamp: 'Just now'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'What is a verb?',
    "I don't understand present tense.",
    'Correct my sentence: I going school.',
    'Explain nouns in Telugu.',
    'Give me 3 practice examples of articles.'
  ];

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend = inputMessage) => {
    if (!textToSend.trim()) return;

    playClickSound();
    const userMsg: LumiMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend.trim(),
          language: user?.targetLanguage || 'English',
          stage: user?.currentStageId || 'Basic'
        })
      });

      let reply = '';
      if (res.ok) {
        const data = await res.json();
        if (data.reply && !data.fallbackNeeded) {
          reply = data.reply;
        }
      }

      // Intelligent local fallback if API key is not configured
      if (!reply) {
        const lower = textToSend.toLowerCase();
        if (lower.includes('verb')) {
          reply = `A **verb** is an action word! Examples: **run**, **eat**, **learn**, **speak**.\nIn Telugu, it is called **క్రియ (Kriya)**.\nExample: "Ravi *plays* cricket." Here, *plays* is the action verb!`;
        } else if (lower.includes('noun')) {
          reply = `A **noun** is a naming word for a person, place, animal, or thing.\nIn Telugu: **నామవాచకం (Naamavaachakam)**.\nExamples:\n• Person: Teacher, Sita, Doctor\n• Place: School, Hyderabad\n• Thing: Book, Car`;
        } else if (lower.includes('present tense')) {
          reply = `The **Simple Present Tense** describes habits and general truths!\n• I/You/We/They eat an apple.\n• He/She/It eat**s** an apple.\n(Notice the **-s** with He/She/It!)`;
        } else if (lower.includes('correct') || lower.includes('i going')) {
          reply = `Here is the correction:\n❌ "I going school."\n✅ **"I am going to school."**\n\n**Why?**\n1. In English, the continuous "-ing" form requires helping verb **am** with "I".\n2. The destination "school" requires the preposition **to**.`;
        } else if (lower.includes('telugu')) {
          reply = `ఖచ్చితంగా! ఇంగ్లీష్ నేర్చుకోవడం చాలా సులభం. కర్త (Subject) + క్రియ (Verb) + కర్మ (Object) క్రమంలో వాక్యాలు ఉంటాయి. మీకు ఏ టాపిక్ అర్థం కాలేదో అడగండి!`;
        } else {
          reply = `Great question! Regular practice is the secret to mastering languages. Remember the S-V-O rule: Subject + Verb + Object. Try writing a sentence with a noun and verb!`;
        }
      }

      playCorrectSound();
      setMessages(prev => [
        ...prev,
        {
          id: `l_${Date.now()}`,
          sender: 'lumi',
          text: reply,
          timestamp: 'Just now'
        }
      ]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [
        ...prev,
        {
          id: `l_${Date.now()}`,
          sender: 'lumi',
          text: `You're making great progress! Keep practicing daily with quizzes and vocabulary lessons.`,
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => { playClickSound(); setIsOpen(true); }}
          className="fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 text-white rounded-full shadow-2xl shadow-emerald-500/40 ring-4 ring-emerald-400/30 transition transform hover:scale-110 active:scale-95 group flex items-center space-x-2.5"
          title="Chat with Lumi - Your AI Language Tutor"
        >
          <span className="text-2xl animate-spin duration-3000">✨</span>
          <span className="text-xs font-black tracking-wide hidden sm:inline">Ask Lumi AI</span>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[550px] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-xl animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="p-4 border-b border-slate-800 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-400 to-cyan-400 flex items-center justify-center text-slate-900 font-black shadow-md shadow-emerald-500/20">
                ✨
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="text-sm font-black text-white">Lumi</h3>
                  <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    AI Tutor
                  </span>
                </div>
                <p className="text-[10px] text-emerald-400 flex items-center space-x-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span>Online & Ready to Help</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => { playClickSound(); setIsOpen(false); }}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-950/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed font-medium shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-br-none'
                      : 'bg-slate-800 border border-slate-700/80 text-slate-200 rounded-bl-none whitespace-pre-line'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.sender === 'lumi' && (
                  <button
                    onClick={() => speakSentence(msg.text.replace(/[*#]/g, ''))}
                    className="mt-1 ml-1 text-slate-500 hover:text-emerald-400 p-1 transition flex items-center space-x-1 text-[10px]"
                    title="Listen to Lumi"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>Listen</span>
                  </button>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-2 text-slate-400 text-xs italic p-2 bg-slate-850 rounded-xl w-32">
                <span className="animate-spin text-emerald-400">✨</span>
                <span>Lumi is typing...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-3 py-2 border-t border-slate-800 bg-slate-900/90 overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-[10px] px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 shrink-0 hover:border-emerald-400 transition"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 border-t border-slate-800 bg-slate-900 flex items-center space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Ask Lumi grammar, correction, or rules..."
              className="flex-1 px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder-slate-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !inputMessage.trim()}
              className="p-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-40 text-white rounded-xl shadow-md transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

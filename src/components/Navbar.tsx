import React, { useState } from 'react';
import { User } from '../types';
import { LANGUAGES } from '../data/languagesData';
import { isSoundEnabled, toggleSound } from '../services/audioService';
import { 
  Sparkles, 
  Flame, 
  Award, 
  Languages, 
  Volume2, 
  VolumeX, 
  LogOut, 
  User as UserIcon, 
  BookOpen, 
  Globe, 
  Cpu, 
  Calendar,
  Shield,
  GraduationCap
} from 'lucide-react';

interface NavbarProps {
  user: User | null;
  activeTab: 'learn' | 'translate' | 'nlp' | 'stories' | 'daily' | 'parent' | 'teacher';
  setActiveTab: (tab: 'learn' | 'translate' | 'nlp' | 'stories' | 'daily' | 'parent' | 'teacher') => void;
  onOpenLanguageModal: () => void;
  onOpenProfile: () => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenCertificate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeTab,
  setActiveTab,
  onOpenLanguageModal,
  onOpenProfile,
  onOpenAuth,
  onLogout,
  onOpenCertificate
}) => {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [menuOpen, setMenuOpen] = useState(false);

  const currentLang = LANGUAGES.find(l => l.name === user?.targetLanguage) || LANGUAGES[0];

  const handleToggleSound = () => {
    const state = toggleSound();
    setSoundOn(state);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('learn')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-400/30">
              <span className="text-xl">🌍</span>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent tracking-tight">
                  LinguaLearn
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block tracking-wide">
                NLP Language Learning & Practice System
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('learn')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                activeTab === 'learn'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Journey Map</span>
            </button>

            <button
              onClick={() => setActiveTab('translate')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                activeTab === 'translate'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Translation</span>
            </button>

            <button
              onClick={() => setActiveTab('nlp')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                activeTab === 'nlp'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>NLP Lab</span>
            </button>

            <button
              onClick={() => setActiveTab('stories')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                activeTab === 'stories'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span>📚</span>
              <span>Stories & Reading</span>
            </button>

            <button
              onClick={() => setActiveTab('daily')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                activeTab === 'daily'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Daily Challenge</span>
            </button>

            {user?.role === 'parent' && (
              <button
                onClick={() => setActiveTab('parent')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                  activeTab === 'parent'
                    ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40 shadow-sm'
                    : 'text-pink-300/80 hover:text-pink-200 hover:bg-pink-900/30'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Parent Portal</span>
              </button>
            )}

            {user?.role === 'teacher' && (
              <button
                onClick={() => setActiveTab('teacher')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                  activeTab === 'teacher'
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                    : 'text-indigo-300/80 hover:text-indigo-200 hover:bg-indigo-900/30'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Teacher Portal</span>
              </button>
            )}
          </nav>

          {/* User Stats & Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Target Language Picker */}
            <button
              onClick={onOpenLanguageModal}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-xl transition text-xs font-semibold text-slate-200"
              title="Change target language"
            >
              <span className="text-base">{currentLang.flag}</span>
              <span className="hidden sm:inline font-bold">{currentLang.name}</span>
            </button>

            {user && (
              <>
                {/* Streak */}
                <div 
                  className="flex items-center space-x-1 px-2.5 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400 text-xs font-bold cursor-pointer"
                  onClick={() => setActiveTab('daily')}
                  title="Daily Streak"
                >
                  <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
                  <span>{user.streakDays || 1}d</span>
                </div>

                {/* XP */}
                <div 
                  className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-300 text-xs font-bold cursor-pointer"
                  onClick={onOpenProfile}
                  title="Total XP Points"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{user.xp} XP</span>
                </div>

                {/* Stars */}
                <div 
                  className="flex items-center space-x-1 px-2.5 py-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-yellow-300 text-xs font-bold"
                  title="Stars Earned"
                >
                  <span>⭐</span>
                  <span>{user.stars}</span>
                </div>
              </>
            )}

            {/* Sound Toggle */}
            <button
              onClick={handleToggleSound}
              className="p-2 text-slate-400 hover:text-slate-200 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/60 rounded-xl transition"
              title={soundOn ? 'Mute sound effects' : 'Enable sound effects'}
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            {/* Certificate Button */}
            <button
              onClick={onOpenCertificate}
              className="hidden lg:flex items-center space-x-1 px-2.5 py-1.5 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 hover:from-amber-500/30 hover:to-yellow-500/30 border border-amber-400/40 rounded-xl text-amber-300 text-xs font-bold transition shadow-sm"
              title="View Certificate of Completion"
            >
              <Award className="w-3.5 h-3.5 text-yellow-400" />
              <span>Certificate</span>
            </button>

            {/* Profile Dropdown / Auth */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center space-x-2 pl-2 pr-2.5 py-1 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl transition"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-white text-xs shadow-inner">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-xs font-bold text-slate-200 hidden md:block max-w-[100px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase font-black">
                    {user.role}
                  </span>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-800/95 border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95">
                    <div className="px-3 py-2 border-b border-slate-700/60 mb-1">
                      <p className="text-xs font-bold text-white truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                        {user.role}
                      </span>
                    </div>

                    <button
                      onClick={() => { setMenuOpen(false); onOpenProfile(); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-slate-700/70 flex items-center space-x-2 transition"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-emerald-400" />
                      <span>My Learning Profile</span>
                    </button>

                    <button
                      onClick={() => { setMenuOpen(false); onOpenCertificate(); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-slate-700/70 flex items-center space-x-2 transition"
                    >
                      <Award className="w-3.5 h-3.5 text-yellow-400" />
                      <span>Verified Certificate</span>
                    </button>

                    {user.role === 'parent' && (
                      <button
                        onClick={() => { setMenuOpen(false); setActiveTab('parent'); }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-pink-300 hover:bg-pink-900/30 flex items-center space-x-2 transition"
                      >
                        <Shield className="w-3.5 h-3.5 text-pink-400" />
                        <span>Parent Portal</span>
                      </button>
                    )}

                    {user.role === 'teacher' && (
                      <button
                        onClick={() => { setMenuOpen(false); setActiveTab('teacher'); }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-indigo-300 hover:bg-indigo-900/30 flex items-center space-x-2 transition"
                      >
                        <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Teacher Portal</span>
                      </button>
                    )}

                    <div className="border-t border-slate-700/60 my-1"></div>

                    <button
                      onClick={() => { setMenuOpen(false); onLogout(); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:bg-rose-900/30 flex items-center space-x-2 transition"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-400" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-500/20 transition"
              >
                Login / Register
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-800/80 overflow-x-auto space-x-2 text-[11px] font-bold">
          <button
            onClick={() => setActiveTab('learn')}
            className={`px-2.5 py-1 rounded-lg ${activeTab === 'learn' ? 'text-emerald-300 bg-emerald-500/20' : 'text-slate-400'}`}
          >
            Journey
          </button>
          <button
            onClick={() => setActiveTab('translate')}
            className={`px-2.5 py-1 rounded-lg ${activeTab === 'translate' ? 'text-blue-300 bg-blue-500/20' : 'text-slate-400'}`}
          >
            Translate
          </button>
          <button
            onClick={() => setActiveTab('nlp')}
            className={`px-2.5 py-1 rounded-lg ${activeTab === 'nlp' ? 'text-purple-300 bg-purple-500/20' : 'text-slate-400'}`}
          >
            NLP Lab
          </button>
          <button
            onClick={() => setActiveTab('stories')}
            className={`px-2.5 py-1 rounded-lg ${activeTab === 'stories' ? 'text-amber-300 bg-amber-500/20' : 'text-slate-400'}`}
          >
            Stories
          </button>
          <button
            onClick={() => setActiveTab('daily')}
            className={`px-2.5 py-1 rounded-lg ${activeTab === 'daily' ? 'text-rose-300 bg-rose-500/20' : 'text-slate-400'}`}
          >
            Daily
          </button>
          {user?.role === 'parent' && (
            <button
              onClick={() => setActiveTab('parent')}
              className={`px-2.5 py-1 rounded-lg ${activeTab === 'parent' ? 'text-pink-300 bg-pink-500/20' : 'text-slate-400'}`}
            >
              Parent
            </button>
          )}
          {user?.role === 'teacher' && (
            <button
              onClick={() => setActiveTab('teacher')}
              className={`px-2.5 py-1 rounded-lg ${activeTab === 'teacher' ? 'text-indigo-300 bg-indigo-500/20' : 'text-slate-400'}`}
            >
              Teacher
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

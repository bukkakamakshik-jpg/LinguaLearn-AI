import React, { useState } from 'react';
import { Role, User } from '../types';
import { registerUser, loginUser, DEMO_STUDENT, DEMO_PARENT, DEMO_TEACHER } from '../services/storageService';
import { X, Sparkles, UserCheck, Shield, GraduationCap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { playClickSound } from '../services/audioService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'login',
}) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [role, setRole] = useState<Role>('student');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    playClickSound();

    if (isLogin) {
      if (!email || !password) {
        setError('Please enter both email and password.');
        return;
      }
      const res = loginUser(email, password);
      if (res.success && res.user) {
        onSuccess(res.user);
        onClose();
      } else {
        setError(res.error || 'Login failed.');
      }
    } else {
      // Register
      if (!fullName.trim()) {
        setError('Please provide your full name.');
        return;
      }
      if (!email.trim() || !password) {
        setError('Please fill in all required fields.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }

      const res = registerUser(fullName.trim(), email.trim(), password, role);
      if (res.success && res.user) {
        onSuccess(res.user);
        onClose();
      } else {
        setError(res.error || 'Registration failed.');
      }
    }
  };

  const handleQuickDemo = (demoUser: User) => {
    playClickSound();
    setEmail(demoUser.email);
    setPassword('password123');
    const res = loginUser(demoUser.email, 'password123');
    if (res.success && res.user) {
      onSuccess(res.user);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700 rounded-full transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Hero */}
        <div className="px-6 pt-8 pb-4 text-center bg-gradient-to-b from-emerald-950/40 via-transparent to-transparent border-b border-slate-800/60">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 shadow-xl shadow-emerald-500/20 mb-3 ring-4 ring-emerald-500/20 animate-bounce">
            <span className="text-3xl">🌍</span>
          </div>

          <h2 className="text-2xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            LinguaLearn AI
          </h2>

          <p className="text-xs font-semibold text-emerald-400/90 tracking-widest uppercase mt-1">
            Learn • Practice • Improve • Speak
          </p>

          <p className="text-xs text-slate-400 mt-2 max-w-xs mx-auto">
            {isLogin
              ? 'Welcome back! Sign in to continue your language learning adventure.'
              : 'Join millions of learners mastering languages through AI & NLP.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 p-1 mx-6 mt-4 rounded-2xl">
          <button
            type="button"
            onClick={() => { setIsLogin(true); setError(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              isLogin
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsLogin(false); setError(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              !isLogin
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-3.5">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium animate-shake">
              ⚠️ {error}
            </div>
          )}

          {!isLogin && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                />
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Select Role</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center space-y-1 ${
                      role === 'student'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/30'
                        : 'bg-slate-800/60 border-slate-700/80 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <UserCheck className="w-4 h-4" />
                    <span className="text-[11px] font-bold">Student</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('parent')}
                    className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center space-y-1 ${
                      role === 'parent'
                        ? 'bg-pink-500/20 border-pink-500 text-pink-300 ring-2 ring-pink-500/30'
                        : 'bg-slate-800/60 border-slate-700/80 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                    <span className="text-[11px] font-bold">Parent</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('teacher')}
                    className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center space-y-1 ${
                      role === 'teacher'
                        ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 ring-2 ring-indigo-500/30'
                        : 'bg-slate-800/60 border-slate-700/80 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span className="text-[11px] font-bold">Teacher</span>
                  </button>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. learner@lingualearn.ai"
              className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password (e.g. password123)"
              className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Confirm Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-500/25 transition transform active:scale-95 flex items-center justify-center space-x-2"
          >
            <span>{isLogin ? 'Sign In & Start Learning' : 'Create My Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-Click Quick Demo Accounts (Crucial for B.Tech project presentation) */}
        <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 bg-slate-950/30">
          <p className="text-[11px] font-bold text-slate-400 mb-2.5 text-center flex items-center justify-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>1-Click Demo Login (Instant Presentation Access):</span>
          </p>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo(DEMO_STUDENT)}
              className="px-2 py-2 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 hover:border-emerald-500/60 rounded-xl text-emerald-300 text-[11px] font-bold transition flex flex-col items-center space-y-0.5"
            >
              <span>🎓 Student</span>
              <span className="text-[9px] text-slate-400 font-normal">Aarav (Lvl 3)</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo(DEMO_PARENT)}
              className="px-2 py-2 bg-pink-950/40 hover:bg-pink-900/50 border border-pink-500/30 hover:border-pink-500/60 rounded-xl text-pink-300 text-[11px] font-bold transition flex flex-col items-center space-y-0.5"
            >
              <span>👨‍👩‍👧 Parent</span>
              <span className="text-[9px] text-slate-400 font-normal">Priya Sharma</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo(DEMO_TEACHER)}
              className="px-2 py-2 bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-500/30 hover:border-indigo-500/60 rounded-xl text-indigo-300 text-[11px] font-bold transition flex flex-col items-center space-y-0.5"
            >
              <span>🧑‍🏫 Teacher</span>
              <span className="text-[9px] text-slate-400 font-normal">Prof. Rajesh</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

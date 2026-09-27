import React, { useState } from 'react';
import { User } from '../types';
import { DEMO_ROSTER_STUDENTS } from '../services/storageService';
import { GraduationCap, Users, Sparkles, Award, FileSpreadsheet, Send, Search, CheckCircle2 } from 'lucide-react';
import { playClickSound, playCorrectSound } from '../services/audioService';

interface TeacherDashboardProps {
  teacherUser: User;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ teacherUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(DEMO_ROSTER_STUDENTS[0]);
  const [remarkText, setRemarkText] = useState('');
  const [remarkSent, setRemarkSent] = useState(false);

  const filteredStudents = DEMO_ROSTER_STUDENTS.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendRemark = () => {
    if (!remarkText.trim()) return;
    playCorrectSound();
    setRemarkSent(true);
    setTimeout(() => {
      setRemarkSent(false);
      setRemarkText('');
    }, 2500);
  };

  const handleExportCSV = () => {
    playClickSound();
    const headers = 'ID,Name,Email,Stage,CurrentLevel,XP,Accuracy,Streak\n';
    const rows = DEMO_ROSTER_STUDENTS.map(s => `${s.id},"${s.name}",${s.email},${s.stage},${s.currentLevel},${s.xp},${s.accuracy}%,${s.streak}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LinguaLearn_ClassRoster_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25 mb-3 ring-4 ring-indigo-500/20">
          <GraduationCap className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Teacher Classroom Analytics Portal
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-lg mx-auto">
          Track class enrollment, monitor individual grammar & vocabulary accuracy, send student praise, and export performance reports.
        </p>
      </div>

      {/* Classroom KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6">
        <div className="p-4 rounded-2xl bg-slate-850 border border-slate-700 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Class Roster</span>
          <span className="text-2xl font-black text-white">{DEMO_ROSTER_STUDENTS.length} Active Students</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-850 border border-slate-700 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Class Avg Accuracy</span>
          <span className="text-2xl font-black text-emerald-400">92%</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-850 border border-slate-700 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Class Completion Rate</span>
          <span className="text-2xl font-black text-cyan-400">84%</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-850 border border-slate-700 text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Quiz Sessions</span>
          <span className="text-2xl font-black text-amber-400">248</span>
        </div>
      </div>

      {/* Main Roster & Student Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Roster Table */}
        <div className="lg:col-span-2 p-5 rounded-3xl bg-slate-850 border border-slate-700 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search students by name or email..."
                className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-750 text-indigo-300 border border-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-750 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="pb-2.5 font-bold">Student</th>
                  <th className="pb-2.5 font-bold">Stage & Level</th>
                  <th className="pb-2.5 font-bold">XP</th>
                  <th className="pb-2.5 font-bold">Accuracy</th>
                  <th className="pb-2.5 font-bold">Streak</th>
                  <th className="pb-2.5 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredStudents.map((st) => {
                  const isSelected = selectedStudent.id === st.id;
                  return (
                    <tr
                      key={st.id}
                      onClick={() => { playClickSound(); setSelectedStudent(st); }}
                      className={`cursor-pointer transition ${
                        isSelected ? 'bg-indigo-500/10 text-indigo-200' : 'hover:bg-slate-800/50 text-slate-200'
                      }`}
                    >
                      <td className="py-3 pr-2">
                        <div className="font-extrabold text-white">{st.name}</div>
                        <div className="text-[10px] text-slate-400">{st.email}</div>
                      </td>
                      <td className="py-3 pr-2 font-semibold">
                        <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-bold">
                          {st.stage} • Lvl {st.currentLevel}
                        </span>
                      </td>
                      <td className="py-3 pr-2 font-bold text-cyan-400">{st.xp}</td>
                      <td className="py-3 pr-2 font-black text-emerald-400">{st.accuracy}%</td>
                      <td className="py-3 pr-2 font-bold text-amber-400">🔥 {st.streak}d</td>
                      <td className="py-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedStudent(st);
                          }}
                          className="px-2.5 py-1 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 rounded-lg text-[10px] font-bold"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Student Inspector Panel */}
        <div className="p-5 rounded-3xl bg-slate-850 border border-slate-700 shadow-xl space-y-4">
          <div className="flex items-center space-x-3 border-b border-slate-700 pb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-lg">
              {selectedStudent.name.charAt(0)}
            </div>
            <div>
              <h4 className="text-sm font-black text-white">{selectedStudent.name}</h4>
              <p className="text-[11px] text-slate-400">{selectedStudent.email}</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-400">Current Stage</span>
              <span className="font-bold text-white">{selectedStudent.stage} (Level {selectedStudent.currentLevel})</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-400">Average Accuracy</span>
              <span className="font-bold text-emerald-400">{selectedStudent.accuracy}%</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-400">Total Points</span>
              <span className="font-bold text-cyan-400">{selectedStudent.xp} XP</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-400">Consecutive Streak</span>
              <span className="font-bold text-amber-400">🔥 {selectedStudent.streak} Days</span>
            </div>
          </div>

          {/* Send Teacher Encouragement */}
          <div className="pt-2">
            <label className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
              Send Student Encouragement Remark:
            </label>
            <textarea
              rows={3}
              value={remarkText}
              onChange={(e) => setRemarkText(e.target.value)}
              placeholder="e.g. Excellent work on Level 2 Nouns! Keep up the daily practice."
              className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            />

            <button
              onClick={handleSendRemark}
              disabled={!remarkText.trim() || remarkSent}
              className="w-full mt-2 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 disabled:opacity-40 text-white font-bold text-xs rounded-xl transition flex items-center justify-center space-x-1.5"
            >
              {remarkSent ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Remark Sent to Student!</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Encouragement</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

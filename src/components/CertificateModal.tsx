import React, { useRef } from 'react';
import { User } from '../types';
import { issueCertificate } from '../services/storageService';
import { X, Award, Printer, Download, Sparkles, ShieldCheck, CheckCircle } from 'lucide-react';
import { playClickSound } from '../services/audioService';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const certRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  if (!user) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <div className="bg-slate-900 border border-slate-700 p-6 rounded-3xl max-w-md text-center">
          <Award className="w-12 h-12 text-amber-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Guest Access Restricted</h3>
          <p className="text-xs text-slate-400 mb-4">
            Official certificates of completion are only awarded to registered and logged-in students.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl text-xs font-bold"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const certificate = issueCertificate(user, `${user.targetLanguage} Language Proficiency`);

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  const handleDownload = () => {
    playClickSound();
    // Native print-to-PDF / save dialog
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-4">
        {/* Modal Controls Bar */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between no-print">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="text-xs font-black text-white uppercase tracking-wider">
              Verified Certificate of Completion
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center space-x-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Canvas */}
        <div ref={certRef} className="p-6 sm:p-10 bg-slate-950 text-slate-900 relative print:p-8">
          {/* Ornate Golden Certificate Border */}
          <div className="relative border-8 border-double border-amber-500/80 rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-amber-50/95 via-amber-100/90 to-yellow-50/95 shadow-inner">
            {/* Watermark Logo in background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
              <span className="text-[180px] font-black">🌍</span>
            </div>

            {/* Corner Decorative Ornaments */}
            <div className="absolute top-2 left-2 text-amber-600 text-lg">✦</div>
            <div className="absolute top-2 right-2 text-amber-600 text-lg">✦</div>
            <div className="absolute bottom-2 left-2 text-amber-600 text-lg">✦</div>
            <div className="absolute bottom-2 right-2 text-amber-600 text-lg">✦</div>

            {/* Top Certificate Header */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-3xl">🌍</span>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                  LinguaLearn AI
                </span>
              </div>
              <p className="text-[11px] font-bold text-amber-800 tracking-widest uppercase">
                NLP-Based Language Learning & Practice System
              </p>

              <div className="pt-4">
                <h1 className="text-2xl sm:text-4xl font-serif font-black text-amber-950 uppercase tracking-wider">
                  Certificate of Completion
                </h1>
                <div className="w-32 h-1 bg-gradient-to-r from-amber-400 via-amber-600 to-amber-400 mx-auto mt-2 rounded-full" />
              </div>
            </div>

            {/* Award Text */}
            <div className="text-center my-8 space-y-3">
              <p className="text-xs sm:text-sm font-serif italic text-slate-700">
                This official certificate is proudly awarded to:
              </p>

              <h2 className="text-2xl sm:text-4xl font-serif font-black text-slate-900 border-b-2 border-slate-300 pb-2 inline-block px-8">
                {user.name}
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed pt-2">
                for successfully completing the rigorous curriculum and evaluation of the
                <br />
                <strong className="text-amber-950 text-base font-bold">
                  LinguaLearn AI Language Learning Program
                </strong>
              </p>

              {/* Course Meta Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto pt-4 text-xs">
                <div className="p-2.5 rounded-xl bg-white/80 border border-amber-300/80 text-center shadow-sm">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Language</span>
                  <span className="font-extrabold text-slate-900">{user.targetLanguage}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/80 border border-amber-300/80 text-center shadow-sm">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Proficiency</span>
                  <span className="font-extrabold text-slate-900 capitalize">{user.currentStageId}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/80 border border-amber-300/80 text-center shadow-sm">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Completion</span>
                  <span className="font-extrabold text-emerald-700">100% Verified</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/80 border border-amber-300/80 text-center shadow-sm">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Total XP</span>
                  <span className="font-extrabold text-amber-800">{user.xp} XP</span>
                </div>
              </div>
            </div>

            {/* Footer with Signatures & Seal */}
            <div className="pt-6 border-t border-amber-300/60 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs">
              {/* Date & ID */}
              <div className="text-center sm:text-left space-y-1">
                <p className="text-[11px] text-slate-600 font-medium">
                  Issue Date: <strong className="text-slate-900">{certificate.issueDate}</strong>
                </p>
                <p className="text-[10px] font-mono text-slate-500">
                  Certificate ID: <strong className="text-slate-800">{certificate.id}</strong>
                </p>
                <p className="text-[9px] font-mono text-slate-500 flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600 inline" />
                  <span>{certificate.verificationCode}</span>
                </p>
              </div>

              {/* Official Seal Emblem */}
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 flex items-center justify-center p-1 shadow-lg ring-4 ring-amber-400/40">
                  <div className="w-full h-full rounded-full border-2 border-dashed border-amber-900 flex flex-col items-center justify-center text-center p-1">
                    <span className="text-xs">🏆</span>
                    <span className="text-[8px] font-black uppercase text-amber-950 tracking-tighter leading-none mt-0.5">
                      LinguaLearn
                    </span>
                    <span className="text-[7px] font-bold text-amber-900 leading-none">
                      OFFICIAL SEAL
                    </span>
                  </div>
                </div>
              </div>

              {/* Signature Line */}
              <div className="text-center sm:text-right space-y-1">
                <div className="font-serif italic text-base text-slate-800 font-bold border-b border-slate-400 pb-1">
                  Dr. Rajesh Kumar, Ph.D.
                </div>
                <p className="text-[10px] font-bold text-slate-700">Director of NLP & AI Curriculum</p>
                <p className="text-[9px] text-slate-500">LinguaLearn AI Academic Board</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

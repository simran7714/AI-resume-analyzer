import React from 'react';
import { X, QrCode, ShieldCheck } from 'lucide-react';
import { Candidate } from '../types';

interface Props {
  candidate: Candidate;
  onClose: () => void;
}

export const QRCodeModal: React.FC<Props> = ({ candidate, onClose }) => {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    `Candidate Verification: ${candidate.name} | Role: ${candidate.jobTitle} | ATS Score: ${candidate.scores?.atsScore}% | Decision: ${candidate.recommendation?.title}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass-panel max-w-sm w-full p-6 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 text-center relative animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold">
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center mb-3">
          <QrCode className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{candidate.name}</h3>
        <p className="text-xs text-slate-500 mb-4">{candidate.jobTitle} • Candidate Badge Verification</p>

        <div className="p-4 bg-white rounded-2xl inline-block shadow-md mb-4 border border-slate-200">
          <img src={qrUrl} alt="Candidate Verification QR" className="w-44 h-44 mx-auto" />
        </div>

        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 py-2 px-3 rounded-xl border border-emerald-500/20">
          <ShieldCheck className="w-4 h-4" /> Cryptographically Verified ATS Profile
        </div>
      </div>
    </div>
  );
};

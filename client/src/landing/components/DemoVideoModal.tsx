import React, { useState } from 'react';
import { X, Play, Pause, RotateCcw, Sparkles, CheckCircle2 } from 'lucide-react';

interface Props {
  onClose: () => void;
  onAnalyze: () => void;
}

export const DemoVideoModal: React.FC<Props> = ({ onClose, onAnalyze }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel max-w-3xl w-full rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-white overflow-hidden relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-4 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold">ResumeAI Platform Walkthrough & ATS Demo</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white font-bold">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Mockup */}
        <div className="p-8 bg-gradient-to-b from-slate-900 to-slate-950 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40 shadow-xl shadow-emerald-500/10">
            <Play className="w-8 h-8 fill-current ml-1" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h4 className="text-xl font-bold">Watch How AI Screens Resumes in 30 Seconds</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Demonstrating PDF text parsing, 0–100 ATS score ring calculation, keyword matching, and single-click AI resume improver PDF exports.
            </p>
          </div>

          {/* Key Takeaways */}
          <div className="grid sm:grid-cols-3 gap-3 text-left pt-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <span className="font-bold text-emerald-400 block mb-1">1. Resume Upload</span>
              <span className="text-slate-400">Extracts skills, experience, education from PDF & DOCX.</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <span className="font-bold text-blue-400 block mb-1">2. ATS Matching</span>
              <span className="text-slate-400">Compares against job role requirements.</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <span className="font-bold text-purple-400 block mb-1">3. Action Plan</span>
              <span className="text-slate-400">Generates improved resume PDF with STAR bullets.</span>
            </div>
          </div>

          {/* Action button */}
          <div className="pt-4 flex justify-center">
            <button
              onClick={() => {
                onClose();
                onAnalyze();
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/25"
            >
              Try Live Screening Demo Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

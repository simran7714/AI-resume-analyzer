import React, { useState, useEffect } from 'react';
import { X, Sparkles, Download, CheckCircle2, FileText, Loader2, ArrowRight } from 'lucide-react';
import { Candidate, ImprovedResume } from '../types';
import * as api from '../utils/api';
import { useApp } from '../context/AppContext';

interface Props {
  candidate: Candidate;
  onClose: () => void;
}

export const ResumeImprovementModal: React.FC<Props> = ({ candidate, onClose }) => {
  const { addToast } = useApp();
  const [improved, setImproved] = useState<ImprovedResume | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await api.fetchImprovedResume(candidate.id);
        setImproved(data);
      } catch (err) {
        addToast('Failed to generate improved resume', 'error');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [candidate.id]);

  const handleDownloadPDF = () => {
    window.open(`/api/candidates/${candidate.id}/improved-resume-pdf`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="glass-panel max-w-4xl w-full my-8 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-600 text-white shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">AI Resume Optimizer</h3>
              <p className="text-xs text-slate-500">Generating ATS-Optimized formatting & content for {candidate.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPDF}
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-purple-500/20 disabled:opacity-50"
            >
              <Download className="w-4 h-4" /> Download Improved PDF
            </button>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white font-bold">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {loading ? (
            <div className="py-20 text-center space-y-3">
              <Loader2 className="w-10 h-10 text-purple-500 animate-spin mx-auto" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Rewriting resume content, optimizing keyword density & fixing formatting...
              </p>
            </div>
          ) : improved ? (
            <div className="space-y-6">
              {/* Improvements summary bar */}
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                <h4 className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Applied Optimizations
                </h4>
                <div className="grid sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                  {improved.improvementsApplied.map((imp, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="text-purple-500 font-bold">✓</span>
                      <span>{imp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Improved Resume Canvas Preview */}
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-inner font-sans text-slate-800 dark:text-slate-200 space-y-5 text-sm">
                <div className="text-center pb-4 border-b border-slate-200 dark:border-slate-800">
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{improved.name}</h1>
                  <p className="text-xs text-slate-500 mt-1">
                    {improved.email} • {improved.phone} • {improved.location}
                  </p>
                  <p className="text-xs text-indigo-500 mt-0.5">{improved.linkedin} • {improved.github}</p>
                </div>

                <div>
                  <h2 className="text-xs font-bold tracking-wider uppercase text-purple-600 dark:text-purple-400 mb-1 border-b pb-0.5 border-purple-500/20">
                    Professional Summary
                  </h2>
                  <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">{improved.professionalSummary}</p>
                </div>

                <div>
                  <h2 className="text-xs font-bold tracking-wider uppercase text-purple-600 dark:text-purple-400 mb-2 border-b pb-0.5 border-purple-500/20">
                    Core Technical Skills
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    {improved.coreSkills.map((sk) => (
                      <span key={sk} className="px-2.5 py-1 text-xs font-semibold rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-300">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xs font-bold tracking-wider uppercase text-purple-600 dark:text-purple-400 mb-2 border-b pb-0.5 border-purple-500/20">
                    Professional Experience
                  </h2>
                  <div className="space-y-3">
                    {improved.experience.map((exp, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between font-bold text-xs text-slate-900 dark:text-white">
                          <span>{exp.role} — <span className="font-semibold text-purple-500">{exp.company}</span></span>
                          <span className="text-slate-400">{exp.duration}</span>
                        </div>
                        <ul className="mt-1 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                          {exp.bulletPoints.map((bp, bidx) => (
                            <li key={bidx} className="flex items-start gap-2">
                              <span className="text-purple-500 font-bold">•</span>
                              <span>{bp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

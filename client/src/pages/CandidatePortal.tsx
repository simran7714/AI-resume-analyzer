import React, { useState } from 'react';
import { Sparkles, Download, CheckCircle2, AlertTriangle, BookOpen, FileText, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ResumeUploader } from '../components/ResumeUploader';
import { SkillGapChart } from '../components/SkillGapChart';
import { RecommendationBadge } from '../components/RecommendationBadge';
import { Candidate } from '../types';

export const CandidatePortal: React.FC = () => {
  const { setImproverCandidate } = useApp();
  const [analyzedCandidate, setAnalyzedCandidate] = useState<Candidate | null>(null);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Banner Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-xl">
        <div className="max-w-2xl space-y-2">
          <span className="px-3 py-1 text-xs font-extrabold uppercase tracking-wider rounded-full bg-white/20">
            Candidate Self-Analysis Portal
          </span>
          <h2 className="text-3xl font-black tracking-tight">Test & Optimize Your Resume ATS Score</h2>
          <p className="text-sm text-indigo-100 leading-relaxed">
            Upload your resume against your target job role. Receive instant AI feedback on formatting, ATS score, missing skills, and download a pre-formatted ATS-friendly resume.
          </p>
        </div>
      </div>

      {/* Upload Box */}
      {!analyzedCandidate ? (
        <ResumeUploader onSuccess={(c) => setAnalyzedCandidate(c)} />
      ) : (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Your Personal ATS Analysis Results</h3>
            <button
              onClick={() => setAnalyzedCandidate(null)}
              className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700"
            >
              Analyze Another Resume
            </button>
          </div>

          {/* Scores Overview Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass-panel p-5 rounded-2xl text-center border-indigo-500/30">
              <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{analyzedCandidate.scores?.atsScore}%</span>
              <p className="text-xs font-bold text-slate-500 uppercase mt-1">ATS Score</p>
            </div>
            <div className="glass-panel p-5 rounded-2xl text-center border-purple-500/30">
              <span className="text-3xl font-black text-purple-600 dark:text-purple-400">{analyzedCandidate.scores?.skillMatchPct}%</span>
              <p className="text-xs font-bold text-slate-500 uppercase mt-1">Skill Match</p>
            </div>
            <div className="glass-panel p-5 rounded-2xl text-center border-emerald-500/30">
              <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{analyzedCandidate.scores?.grammarScore}%</span>
              <p className="text-xs font-bold text-slate-500 uppercase mt-1">Grammar</p>
            </div>
            <div className="glass-panel p-5 rounded-2xl text-center border-cyan-500/30">
              <span className="text-3xl font-black text-cyan-600 dark:text-cyan-400">{analyzedCandidate.scores?.formattingScore}%</span>
              <p className="text-xs font-bold text-slate-500 uppercase mt-1">Formatting</p>
            </div>
          </div>

          {/* Recommendation & Radar Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Recommendation Status</h4>
                <RecommendationBadge decision={analyzedCandidate.recommendation?.decision || 'REJECT'} title={analyzedCandidate.recommendation?.title} />
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-100 dark:bg-slate-800 p-4 rounded-xl">
                {analyzedCandidate.recommendation?.summary}
              </p>

              {/* Missing Skills */}
              {analyzedCandidate.recommendation?.missingRequiredSkills?.length > 0 && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <h5 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Missing Required Skills for Role
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {analyzedCandidate.recommendation.missingRequiredSkills.map(sk => (
                      <span key={sk} className="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-300">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Download Improved Resume CTA */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white space-y-3">
                <h4 className="text-sm font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-300" /> Generate AI-Improved Resume
                </h4>
                <p className="text-xs text-purple-100">
                  Let AI optimize your grammar, restructure bullet points into STAR format, and inject missing ATS keywords.
                </p>
                <button
                  onClick={() => setImproverCandidate(analyzedCandidate)}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-white text-purple-700 hover:bg-purple-50 shadow-md flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" /> Open Resume Improver & Download PDF
                </button>
              </div>
            </div>

            {/* Radar Chart */}
            <div className="glass-panel p-6 rounded-2xl">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Skill & Qualifications Match Radar</h4>
              <SkillGapChart candidate={analyzedCandidate} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

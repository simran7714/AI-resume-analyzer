import React from 'react';
import {
  FileText,
  Calendar,
  Sparkles,
  Volume2,
  QrCode,
  AlertOctagon,
  ChevronRight,
  UserCheck,
  XCircle,
  Clock
} from 'lucide-react';
import { Candidate } from '../types';
import { RecommendationBadge } from './RecommendationBadge';
import { useApp } from '../context/AppContext';

interface Props {
  candidate: Candidate;
  onSelect: (candidate: Candidate) => void;
}

export const CandidateCard: React.FC<Props> = ({ candidate, onSelect }) => {
  const { setSchedulerCandidate, setImproverCandidate, setComparisonCandidate, setQrModalCandidate, updateCandidateState } = useApp();

  const atsScore = candidate.scores?.atsScore || 0;
  const decision = candidate.recommendation?.decision || 'REJECT';

  const atsColor =
    atsScore >= 85 ? 'text-emerald-500 border-emerald-500/30 bg-emerald-500/10'
    : atsScore >= 70 ? 'text-amber-500 border-amber-500/30 bg-amber-500/10'
    : 'text-rose-500 border-rose-500/30 bg-rose-500/10';

  return (
    <div
      onClick={() => onSelect(candidate)}
      className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 transition-all duration-200 hover:shadow-lg hover:border-indigo-500/40 cursor-pointer group relative overflow-hidden"
    >
      {/* Top Banner Row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {candidate.name}
            </h4>
            {candidate.duplicateDetected && (
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                Duplicate Upload
              </span>
            )}
            {candidate.fraudWarning && (
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 flex items-center gap-1">
                <AlertOctagon className="w-3 h-3" /> Fraud Alert
              </span>
            )}
          </div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {candidate.jobTitle} • {candidate.experienceYears} Yrs Exp • {candidate.education}
          </p>
        </div>

        {/* ATS Score Dial */}
        <div className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl border font-black ${atsColor}`}>
          <span className="text-lg leading-none">{atsScore}%</span>
          <span className="text-[9px] uppercase font-bold tracking-wider opacity-80">ATS Score</span>
        </div>
      </div>

      {/* Decision Status Badge */}
      <div className="flex items-center justify-between mb-4">
        <RecommendationBadge decision={decision} title={candidate.recommendation?.title} size="sm" />
        <span className="text-[11px] text-slate-400">
          Applied {new Date(candidate.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Skills Match Summary */}
      <div className="mb-4 space-y-1.5 text-xs">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
          <span>Skill Match ({candidate.scores?.skillMatchPct || 0}%):</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {(candidate.skills || []).slice(0, 5).map((sk, idx) => (
            <span
              key={`${sk}-${idx}`}
              className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              {sk}
            </span>
          ))}
          {(candidate.skills || []).length > 5 && (
            <span className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-400">
              +{(candidate.skills || []).length - 5} more
            </span>
          )}
        </div>

        {candidate.recommendation?.missingRequiredSkills?.length > 0 && (
          <div className="pt-1">
            <span className="text-[11px] font-bold text-rose-500">Missing Required: </span>
            <span className="text-[11px] text-rose-400 font-medium">
              {candidate.recommendation.missingRequiredSkills.join(', ')}
            </span>
          </div>
        )}
      </div>

      {/* Footer Quick Action Buttons */}
      <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-1 text-xs font-semibold">
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setSchedulerCandidate(candidate)}
            title="Schedule Interview"
            className="p-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 transition-colors"
          >
            <Calendar className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setImproverCandidate(candidate)}
            title="AI Improved Resume"
            className="p-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setQrModalCandidate(candidate)}
            title="Candidate Verification QR"
            className="p-1.5 rounded-lg bg-slate-500/10 hover:bg-slate-500/20 text-slate-600 dark:text-slate-400 transition-colors"
          >
            <QrCode className="w-3.5 h-3.5" />
          </button>
        </div>

        <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold group-hover:translate-x-0.5 transition-transform">
          Explainable AI Analysis <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};

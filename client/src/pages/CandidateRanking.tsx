import React from 'react';
import { Trophy, Award, Medal, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RecommendationBadge } from '../components/RecommendationBadge';

export const CandidateRanking: React.FC = () => {
  const { candidates, setSelectedCandidate, selectedJobId, jobs } = useApp();

  const rankedCandidates = [...candidates].sort((a, b) => {
    return (b.scores?.overallCandidateScore || 0) - (a.scores?.overallCandidateScore || 0);
  });

  return (
    <div className="space-y-6 pb-12">
      <div>
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-amber-500" />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Candidate Leaderboard Ranking</h2>
        </div>
        <p className="text-xs text-slate-500">
          Applicants dynamically ranked by AI Overall Match Score (#1 Top Choice).
        </p>
      </div>

      <div className="glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-4 text-center">Rank</th>
                <th className="p-4">Candidate & Role</th>
                <th className="p-4 text-center">Overall Score</th>
                <th className="p-4 text-center">ATS Score</th>
                <th className="p-4 text-center">Skill Match</th>
                <th className="p-4 text-center">Experience</th>
                <th className="p-4">Recommendation</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800">
              {rankedCandidates.map((c, idx) => {
                const rank = idx + 1;
                const isTop3 = rank <= 3;
                return (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedCandidate(c)}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <td className="p-4 text-center font-bold">
                      {rank === 1 ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold">
                          <Trophy className="w-3.5 h-3.5" /> #1 Best Fit
                        </span>
                      ) : rank === 2 ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold">
                          <Medal className="w-3.5 h-3.5" /> #2
                        </span>
                      ) : rank === 3 ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-700/20 text-amber-800 dark:text-amber-300 font-bold">
                          <Award className="w-3.5 h-3.5" /> #3
                        </span>
                      ) : (
                        <span className="text-slate-400 font-bold">#{rank}</span>
                      )}
                    </td>
                    <td className="p-4 font-bold text-slate-900 dark:text-white">
                      <div>{c.name}</div>
                      <div className="text-[11px] font-medium text-slate-400">{c.jobTitle}</div>
                    </td>
                    <td className="p-4 text-center font-black text-sm text-indigo-600 dark:text-indigo-400">
                      {c.scores?.overallCandidateScore || 0}%
                    </td>
                    <td className="p-4 text-center font-bold text-emerald-600 dark:text-emerald-400">
                      {c.scores?.atsScore || 0}%
                    </td>
                    <td className="p-4 text-center font-semibold">{c.scores?.skillMatchPct || 0}%</td>
                    <td className="p-4 text-center font-semibold">{c.experienceYears} Yrs</td>
                    <td className="p-4">
                      <RecommendationBadge decision={c.recommendation?.decision || 'REJECT'} title={c.recommendation?.title} size="sm" />
                    </td>
                    <td className="p-4 text-right">
                      <button className="px-3 py-1.5 text-xs font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 inline-flex items-center gap-1">
                        Inspect <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

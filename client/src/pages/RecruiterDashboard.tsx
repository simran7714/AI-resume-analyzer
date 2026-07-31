import React, { useState } from 'react';
import {
  Users,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Award,
  Search,
  Filter,
  Download,
  Plus,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/StatCard';
import { CandidateCard } from '../components/CandidateCard';
import { ResumeUploader } from '../components/ResumeUploader';
import { CandidateDetailModal } from '../components/CandidateDetailModal';
import { JobDescriptionModal } from '../components/JobDescriptionModal';
import { exportCandidatesToExcel } from '../utils/exportUtils';
import { Candidate } from '../types';

export const RecruiterDashboard: React.FC = () => {
  const {
    candidates,
    analytics,
    selectedCandidate,
    setSelectedCandidate,
    refreshData,
    loadingCandidates,
    selectedJobId,
    jobs
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [minAtsFilter, setMinAtsFilter] = useState<number>(0);
  const [skillFilter, setSkillFilter] = useState<string>('');
  const [showUploader, setShowUploader] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);

  // Filter candidates locally
  const filteredCandidates = candidates.filter((c) => {
    if (statusFilter !== 'all' && c.recommendation?.decision !== statusFilter) return false;
    if ((c.scores?.atsScore || 0) < minAtsFilter) return false;
    if (skillFilter && !(c.skills || []).some(s => s.toLowerCase().includes(skillFilter.toLowerCase()))) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchEmail = c.email.toLowerCase().includes(q);
      const matchRole = c.jobTitle.toLowerCase().includes(q);
      const matchSkill = (c.skills || []).some(s => s.toLowerCase().includes(q));
      if (!matchName && !matchEmail && !matchRole && !matchSkill) return false;
    }
    return true;
  });

  const total = candidates.length;
  const approvedCount = candidates.filter(c => c.recommendation?.decision === 'APPROVE').length;
  const manualCount = candidates.filter(c => c.recommendation?.decision === 'MANUAL_REVIEW').length;
  const rejectedCount = candidates.filter(c => c.recommendation?.decision === 'REJECT').length;
  const avgAts = analytics?.averageAtsScore || 0;

  const handleExportExcel = () => {
    exportCandidatesToExcel(filteredCandidates, `Screening_Report_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Recruiter Screening Hub
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time ATS Scoring, Multi-Tier AI Recommendation & Hiring Analytics
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => refreshData()}
            title="Refresh Candidates"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loadingCandidates ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleExportExcel}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-700"
          >
            <Download className="w-4 h-4 text-emerald-500" /> Export Excel
          </button>
          <button
            onClick={() => setShowJobModal(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-700"
          >
            <Plus className="w-4 h-4 text-indigo-500" /> Create Job
          </button>
          <button
            onClick={() => setShowUploader(!showUploader)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-4 h-4" /> {showUploader ? 'Close Uploader' : 'Screen New Resume'}
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Applications"
          value={total}
          subtitle="Screened candidates"
          icon={Users}
          color="indigo"
        />
        <StatCard
          title="Approved Candidates"
          value={approvedCount}
          subtitle="ATS Score ≥ 85 & 90% Match"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Manual Review"
          value={manualCount}
          subtitle="ATS Score 70–84"
          icon={AlertTriangle}
          color="amber"
        />
        <StatCard
          title="Rejected Candidates"
          value={rejectedCount}
          subtitle="Below criteria"
          icon={XCircle}
          color="rose"
        />
        <StatCard
          title="Average ATS Score"
          value={`${avgAts}%`}
          subtitle="Across active candidates"
          icon={Award}
          color="purple"
        />
      </div>

      {/* Uploader Section */}
      {showUploader && (
        <div className="animate-in fade-in zoom-in-95 duration-200">
          <ResumeUploader onSuccess={() => setShowUploader(false)} />
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidate name, skills, role..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto text-xs">
          <div className="flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold text-slate-500">Decision:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold focus:outline-none"
            >
              <option value="all">All Outcomes</option>
              <option value="APPROVE">Approved Only</option>
              <option value="MANUAL_REVIEW">Manual Review Only</option>
              <option value="REJECT">Rejected Only</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-500">Min ATS:</span>
            <select
              value={minAtsFilter}
              onChange={(e) => setMinAtsFilter(Number(e.target.value))}
              className="px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold focus:outline-none"
            >
              <option value={0}>Any Score</option>
              <option value={85}>≥ 85% (Approved)</option>
              <option value={70}>≥ 70% (Manual)</option>
              <option value={50}>≥ 50%</option>
            </select>
          </div>
        </div>
      </div>

      {/* Candidate Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Applicant Evaluation List ({filteredCandidates.length})
          </h3>
        </div>

        {filteredCandidates.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCandidates.map((cand) => (
              <CandidateCard key={cand.id} candidate={cand} onSelect={setSelectedCandidate} />
            ))}
          </div>
        ) : (
          <div className="glass-panel p-12 rounded-2xl text-center space-y-3">
            <Users className="w-10 h-10 text-slate-400 mx-auto" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No candidates match your current filter.</p>
            <p className="text-xs text-slate-500">Try adjusting your search terms or upload a new candidate resume.</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedCandidate && (
        <CandidateDetailModal candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} />
      )}
      {showJobModal && (
        <JobDescriptionModal onClose={() => setShowJobModal(false)} />
      )}
    </div>
  );
};

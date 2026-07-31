import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  Calendar,
  Sparkles,
  Download,
  Mail,
  Share2,
  QrCode,
  MessageSquare,
  ShieldCheck,
  Zap,
  BookOpen
} from 'lucide-react';
import { Candidate } from '../types';
import { RecommendationBadge } from './RecommendationBadge';
import { SkillGapChart } from './SkillGapChart';
import { VoiceSummaryPlayer } from './VoiceSummaryPlayer';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import * as api from '../utils/api';

interface Props {
  candidate: Candidate;
  onClose: () => void;
}

export const CandidateDetailModal: React.FC<Props> = ({ candidate, onClose }) => {
  const { updateCandidateState, setSchedulerCandidate, setImproverCandidate, setQrModalCandidate, addToast } = useApp();
  const { role, user } = useAuth();

  const [activeTab, setActiveTab] = useState<'explain' | 'radar' | 'notes' | 'email'>('explain');
  const [newNote, setNewNote] = useState('');
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);

  const scores = candidate.scores || {};
  const decision = candidate.recommendation?.decision || 'REJECT';

  const handleDecisionChange = async (newDecision: 'APPROVE' | 'MANUAL_REVIEW' | 'REJECT') => {
    try {
      const updated = await api.updateCandidateDecision(candidate.id, newDecision, `Decision updated to ${newDecision}`, user.name);
      updateCandidateState(updated);
      addToast(`Candidate updated to ${newDecision}`, 'success');
    } catch (err) {
      addToast('Failed to update decision', 'error');
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    try {
      setIsSubmittingNote(true);
      const updated = await api.updateCandidateDecision(candidate.id, candidate.recommendation.decision, newNote, user.name);
      updateCandidateState(updated);
      setNewNote('');
      addToast('Recruiter note added', 'success');
    } catch (err) {
      addToast('Failed to add note', 'error');
    } finally {
      setIsSubmittingNote(false);
    }
  };

  const handleDownloadPDFReport = () => {
    window.open(`/api/candidates/${candidate.id}/report-pdf`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="glass-panel max-w-4xl w-full my-8 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">{candidate.name}</h2>
              <RecommendationBadge decision={decision} title={candidate.recommendation?.title} size="md" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Applied for <span className="font-bold text-indigo-600 dark:text-indigo-400">{candidate.jobTitle}</span> • {candidate.email} • {candidate.phone}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPDFReport}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Download className="w-4 h-4" /> Download Report PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Audio Voice Summary Player */}
          {candidate.voiceSummaryText && (
            <VoiceSummaryPlayer text={candidate.voiceSummaryText} candidateName={candidate.name} />
          )}

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-center">
              <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{scores.overallCandidateScore}%</span>
              <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Overall Score</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{scores.atsScore}%</span>
              <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">ATS Score</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center">
              <span className="text-2xl font-black text-purple-600 dark:text-purple-400">{scores.skillMatchPct}%</span>
              <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Skill Match</p>
            </div>
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-center">
              <span className="text-2xl font-black text-cyan-600 dark:text-cyan-400">{scores.experienceMatchPct}%</span>
              <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Experience</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs font-bold">
            <button
              onClick={() => setActiveTab('explain')}
              className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'explain'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <Zap className="w-4 h-4" /> Explainable AI Rationale
            </button>
            <button
              onClick={() => setActiveTab('radar')}
              className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'radar'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> Skill Matrix Radar
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'notes'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Recruiter Notes ({candidate.recruiterNotes?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`px-4 py-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'email'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <Mail className="w-4 h-4" /> Automated Email Preview
            </button>
          </div>

          {/* TAB 1: EXPLAINABLE AI RATIONALE */}
          {activeTab === 'explain' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Decision Box Rationale */}
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-500" /> Transparent AI Recommendation Summary
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {candidate.recommendation?.summary}
                </p>
              </div>

              {/* Rejection / Missing Requirements Section */}
              {candidate.recommendation?.rejectionReasons?.length > 0 && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" /> Rejection Reasons / Key Deficiencies
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    {candidate.recommendation.rejectionReasons.map((r, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-500 font-bold">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Strengths & Weaknesses Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Candidate Key Strengths
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    {(candidate.recommendation?.strengths || []).map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">+</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Weaknesses & Missing Skills
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    {(candidate.recommendation?.weaknesses || []).map((w, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">-</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Detailed Scores Progress Gauges */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Granular Evaluation Metrics
                </h4>

                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="flex justify-between font-semibold mb-1">
                      <span>Grammar Score:</span>
                      <span className="text-indigo-600 dark:text-indigo-400">{scores.grammarScore}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${scores.grammarScore}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold mb-1">
                      <span>Resume Formatting:</span>
                      <span className="text-indigo-600 dark:text-indigo-400">{scores.formattingScore}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${scores.formattingScore}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold mb-1">
                      <span>Education Alignment:</span>
                      <span className="text-purple-600 dark:text-purple-400">{scores.educationMatchPct}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: `${scores.educationMatchPct}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold mb-1">
                      <span>Certification Match:</span>
                      <span className="text-purple-600 dark:text-purple-400">{scores.certificationMatchPct}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: `${scores.certificationMatchPct}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Plan Suggestions */}
              <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/15">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> AI Resume Improvement Action Plan
                </h4>
                <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                  {(candidate.recommendation?.improvementSuggestions || []).map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-indigo-500 font-bold">→</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: SKILL RADAR CHART */}
          {activeTab === 'radar' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <p className="text-xs text-slate-500">
                Comparison chart of candidate scores vs baseline threshold required for approval (85%+ ATS).
              </p>
              <SkillGapChart candidate={candidate} />
            </div>
          )}

          {/* TAB 3: RECRUITER NOTES */}
          {activeTab === 'notes' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <form onSubmit={handleAddNote} className="space-y-2">
                <textarea
                  rows={3}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Write recruiter comment or interview notes..."
                  className="w-full p-3 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={isSubmittingNote}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs"
                >
                  Add Recruiter Note
                </button>
              </form>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase">History Log</h4>
                {candidate.recruiterNotes?.length > 0 ? (
                  candidate.recruiterNotes.map((n, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                      <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200 mb-1">
                        <span>{n.author}</span>
                        <span className="text-[10px] text-slate-400">{new Date(n.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">{n.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">No recruiter notes added yet.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: AUTOMATED EMAIL PREVIEW */}
          {activeTab === 'email' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                <p className="font-bold text-slate-900 dark:text-white mb-1">
                  To: <span className="font-normal text-indigo-500">{candidate.email}</span>
                </p>
                <p className="font-bold text-slate-900 dark:text-white mb-3">
                  Subject: <span className="font-normal">{decision === 'APPROVE' ? `Interview Invitation: ${candidate.jobTitle}` : decision === 'MANUAL_REVIEW' ? `Application Update: ${candidate.jobTitle}` : `Thank you for your application: ${candidate.jobTitle}`}</span>
                </p>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                  {decision === 'APPROVE' ? (
                    `Dear ${candidate.name},\n\nThank you for applying for the ${candidate.jobTitle} position at Apex Technologies.\n\nBased on your outstanding ATS evaluation score (${scores.atsScore}%) and strong experience in ${(candidate.skills || []).slice(0, 3).join(', ')}, we are thrilled to invite you to a technical interview.\n\nPlease click below to confirm your interview slot.\n\nBest regards,\nRecruitment Team`
                  ) : decision === 'MANUAL_REVIEW' ? (
                    `Dear ${candidate.name},\n\nThank you for applying for the ${candidate.jobTitle} role. Your resume has passed initial screening and is currently under manual review by our lead engineering manager.\n\nWe will update you within 48 hours.\n\nBest regards,\nTalent Acquisition`
                  ) : (
                    `Dear ${candidate.name},\n\nThank you for your interest in the ${candidate.jobTitle} position.\n\nAfter reviewing your application against our job requirements, we regret to inform you that we will not be moving forward at this time.\n\nExact feedback areas for your resume:\n- ${candidate.recommendation?.rejectionReasons?.join('\n- ')}\n\nWe wish you every success in your career journey.\n\nBest regards,\nRecruitment Team`
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-slate-100/80 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
          {/* Quick Override Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Override:</span>
            <button
              onClick={() => handleDecisionChange('APPROVE')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                decision === 'APPROVE'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-emerald-500/20'
              }`}
            >
              Approve
            </button>
            <button
              onClick={() => handleDecisionChange('MANUAL_REVIEW')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                decision === 'MANUAL_REVIEW'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-amber-500/20'
              }`}
            >
              Manual Review
            </button>
            <button
              onClick={() => handleDecisionChange('REJECT')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                decision === 'REJECT'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-rose-500/20'
              }`}
            >
              Reject
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSchedulerCandidate(candidate)}
              className="px-3 py-1.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1 shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5" /> Schedule Interview
            </button>
            <button
              onClick={() => setImproverCandidate(candidate)}
              className="px-3 py-1.5 text-xs font-bold rounded-xl bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-1 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" /> Improved Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

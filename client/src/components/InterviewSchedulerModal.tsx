import React, { useState } from 'react';
import { X, Calendar, Clock, Video, Mail, CheckCircle2 } from 'lucide-react';
import { Candidate } from '../types';
import { useApp } from '../context/AppContext';
import * as api from '../utils/api';

interface Props {
  candidate: Candidate;
  onClose: () => void;
}

export const InterviewSchedulerModal: React.FC<Props> = ({ candidate, onClose }) => {
  const { updateCandidateState, addToast } = useApp();
  const [date, setDate] = useState('2026-08-05');
  const [time, setTime] = useState('14:00');
  const [meetUrl, setMeetUrl] = useState('https://meet.google.com/abc-defg-hij');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailPreview, setEmailPreview] = useState<any>(null);

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const res = await api.scheduleInterview(candidate.id, { date, time, meetUrl });
      updateCandidateState(res.candidate);
      setEmailPreview(res.emailPreview);
      addToast(`Interview scheduled for ${candidate.name}! Invitation email generated.`, 'success');
    } catch (err) {
      addToast('Failed to schedule interview', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="glass-panel max-w-lg w-full my-8 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="p-6 bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Schedule Technical Interview</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-bold">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-500">
            Scheduling interview for candidate <span className="font-bold text-indigo-500">{candidate.name}</span> for role <span className="font-bold text-slate-700 dark:text-slate-300">{candidate.jobTitle}</span>.
          </p>

          <form onSubmit={handleSchedule} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                <Video className="w-3.5 h-3.5" /> Video Meeting Link
              </label>
              <input
                type="url"
                value={meetUrl}
                onChange={(e) => setMeetUrl(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" /> Confirm & Send Interview Email
            </button>
          </form>

          {emailPreview && (
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500">
                <Mail className="w-4 h-4" /> Invitation Email Dispatched:
              </div>
              <div className="text-[11px] font-mono whitespace-pre-wrap text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                {emailPreview.body}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

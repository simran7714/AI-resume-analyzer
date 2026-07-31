import React, { useState } from 'react';
import { Briefcase, Plus, Edit, Trash2, MapPin, DollarSign, Award, Layers } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { JobDescriptionModal } from '../components/JobDescriptionModal';
import { JobDescription } from '../types';

export const JobManagement: React.FC = () => {
  const { jobs, refreshData, addToast } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState<JobDescription | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete job description "${title}"?`)) return;
    try {
      await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
      addToast(`Deleted job ${title}`, 'success');
      refreshData();
    } catch (err) {
      addToast('Failed to delete job', 'error');
    }
  };

  const handleEdit = (job: JobDescription) => {
    setEditingJob(job);
    setShowModal(true);
  };

  const handleCreateNew = () => {
    setEditingJob(null);
    setShowModal(true);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Job Descriptions Manager</h2>
          <p className="text-xs text-slate-500">Configure target requirements, min experience, and required skills for ATS screening.</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-500/20"
        >
          <Plus className="w-4 h-4" /> Create Job Role
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 hover:border-indigo-500/40 transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  {job.department}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{job.title}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                  <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> {job.salary}</span>
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleEdit(job)}
                  className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(job.id, job.title)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">{job.description}</p>

            <div className="space-y-2 text-xs">
              <div>
                <span className="font-bold text-slate-500">Min Experience & Education: </span>
                <span className="text-slate-800 dark:text-slate-200 font-semibold">{job.minExperience} Yrs • {job.minEducation}</span>
              </div>

              <div>
                <span className="font-bold text-slate-500">Required Skills: </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {(job.requiredSkills || []).map((sk, idx) => (
                    <span key={`${sk}-${idx}`} className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-indigo-500/15 text-indigo-600 dark:text-indigo-300">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {job.preferredSkills?.length > 0 && (
                <div>
                  <span className="font-bold text-slate-500">Preferred Skills: </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {job.preferredSkills.map((sk, idx) => (
                      <span key={`${sk}-${idx}`} className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <JobDescriptionModal jobToEdit={editingJob} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

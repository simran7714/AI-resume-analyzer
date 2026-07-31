import React, { useState } from 'react';
import { X, Briefcase, Plus, Save } from 'lucide-react';
import { PRESET_JOB_TEMPLATES, JobTemplate } from '../utils/jobTemplates';
import { JobDescription } from '../types';
import { useApp } from '../context/AppContext';
import * as api from '../utils/api';

interface Props {
  jobToEdit?: JobDescription | null;
  onClose: () => void;
}

export const JobDescriptionModal: React.FC<Props> = ({ jobToEdit, onClose }) => {
  const { refreshData, addToast } = useApp();

  const [title, setTitle] = useState(jobToEdit?.title || '');
  const [department, setDepartment] = useState(jobToEdit?.department || 'Engineering');
  const [location, setLocation] = useState(jobToEdit?.location || 'San Francisco, CA (Hybrid)');
  const [type, setType] = useState(jobToEdit?.type || 'Full-time');
  const [salary, setSalary] = useState(jobToEdit?.salary || '$130,000 - $160,000');
  const [minExperience, setMinExperience] = useState(jobToEdit?.minExperience || 4);
  const [minEducation, setMinEducation] = useState(jobToEdit?.minEducation || "Bachelor's Degree");
  const [reqSkills, setReqSkills] = useState(jobToEdit?.requiredSkills?.join(', ') || 'React, TypeScript, Node.js, PostgreSQL');
  const [prefSkills, setPrefSkills] = useState(jobToEdit?.preferredSkills?.join(', ') || 'AWS, Docker, GraphQL, Redis');
  const [reqCerts, setReqCerts] = useState(jobToEdit?.requiredCertifications?.join(', ') || 'AWS Certified Associate');
  const [description, setDescription] = useState(jobToEdit?.description || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApplyTemplate = (tmpl: JobTemplate) => {
    setTitle(tmpl.title);
    setDepartment(tmpl.department);
    setLocation(tmpl.location);
    setType(tmpl.type);
    setSalary(tmpl.salary);
    setMinExperience(tmpl.minExperience);
    setMinEducation(tmpl.minEducation);
    setReqSkills(tmpl.requiredSkills.join(', '));
    setPrefSkills(tmpl.preferredSkills.join(', '));
    setReqCerts(tmpl.requiredCertifications.join(', '));
    setDescription(tmpl.description);
    addToast(`Applied Template: ${tmpl.title}`, 'info');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      addToast('Job title is required', 'error');
      return;
    }

    try {
      setIsSubmitting(true);
      const jobData = {
        title,
        department,
        location,
        type,
        salary,
        minExperience: Number(minExperience),
        minEducation,
        requiredSkills: reqSkills.split(',').map(s => s.trim()).filter(Boolean),
        preferredSkills: prefSkills.split(',').map(s => s.trim()).filter(Boolean),
        requiredCertifications: reqCerts.split(',').map(s => s.trim()).filter(Boolean),
        description
      };

      if (jobToEdit) {
        await fetch(`/api/jobs/${jobToEdit.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(jobData)
        });
        addToast('Job description updated successfully', 'success');
      } else {
        await api.createJob(jobData);
        addToast('New Job Description created', 'success');
      }

      await refreshData();
      onClose();
    } catch (err) {
      addToast('Failed to save job description', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="glass-panel max-w-2xl w-full my-8 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="p-6 bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {jobToEdit ? 'Edit Job Description' : 'Create New Job Opening'}
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white font-bold">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {!jobToEdit && (
            <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-2">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block">
                🚀 Fast-Track: Select Pre-Set Industry Job Template
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_JOB_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => handleApplyTemplate(tmpl)}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 hover:text-indigo-600 transition-all cursor-pointer"
                  >
                    + {tmpl.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Job Role Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Full Stack Engineer"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Department</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Engineering, Design, Data..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Min Experience (Years)</label>
              <input
                type="number"
                value={minExperience}
                onChange={(e) => setMinExperience(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Salary Range</label>
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Minimum Education</label>
            <input
              type="text"
              value={minEducation}
              onChange={(e) => setMinEducation(e.target.value)}
              placeholder="e.g. Bachelor's in CS or Master's"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Required Mandatory Skills (comma-separated)</label>
            <input
              type="text"
              value={reqSkills}
              onChange={(e) => setReqSkills(e.target.value)}
              placeholder="React, TypeScript, Node.js, PostgreSQL"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Preferred Bonus Skills (comma-separated)</label>
            <input
              type="text"
              value={prefSkills}
              onChange={(e) => setPrefSkills(e.target.value)}
              placeholder="AWS, Docker, GraphQL, Redis"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Required Certifications</label>
            <input
              type="text"
              value={reqCerts}
              onChange={(e) => setReqCerts(e.target.value)}
              placeholder="AWS Certified Associate, Meta Developer"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Role Overview & Responsibilities</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide role background..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1 shadow-md"
            >
              <Save className="w-4 h-4" /> Save Job Opening
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

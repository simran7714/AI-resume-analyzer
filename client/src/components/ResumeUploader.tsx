import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import * as api from '../utils/api';
import confetti from 'canvas-confetti';

interface Props {
  onSuccess?: (candidate: any) => void;
}

export const ResumeUploader: React.FC<Props> = ({ onSuccess }) => {
  const { jobs, selectedJobId, addToast, refreshData, setSelectedCandidate } = useApp();
  const { geminiApiKey } = useAuth();

  const [activeJobId, setActiveJobId] = useState<string>(selectedJobId !== 'all' ? selectedJobId : (jobs[0]?.id || 'job-1'));
  const [file, setFile] = useState<File | null>(null);
  const [pasteText, setPasteText] = useState<string>('');
  const [mode, setMode] = useState<'file' | 'text'>('file');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const dropped = e.dataTransfer.files[0];
      if (validateFile(dropped)) {
        setFile(dropped);
      }
    }
  };

  const validateFile = (f: File) => {
    const ext = f.name.toLowerCase().slice(f.name.lastIndexOf('.'));
    if (ext !== '.pdf' && ext !== '.docx' && ext !== '.doc') {
      addToast('Please upload a PDF or DOCX resume file.', 'error');
      return false;
    }
    if (f.size > 10 * 1024 * 1024) {
      addToast('File size must be under 10MB.', 'error');
      return false;
    }
    return true;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (validateFile(e.target.files[0])) {
        setFile(e.target.files[0]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'file' && !file) {
      addToast('Please choose a PDF or DOCX file to upload.', 'error');
      return;
    }
    if (mode === 'text' && pasteText.trim().length < 50) {
      addToast('Please paste complete resume content (min 50 chars).', 'error');
      return;
    }

    try {
      setIsUploading(true);
      const resultCandidate = await api.uploadResume(
        mode === 'file' ? { file: file! } : { text: pasteText },
        activeJobId,
        geminiApiKey
      );

      addToast(`Resume Analyzed! ${resultCandidate.name} scored ${resultCandidate.scores.atsScore}% ATS.`, 'success');
      
      if (resultCandidate.recommendation.decision === 'APPROVE') {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      }

      await refreshData();
      setSelectedCandidate(resultCandidate);
      if (onSuccess) onSuccess(resultCandidate);

      // Reset
      setFile(null);
      setPasteText('');
    } catch (err: any) {
      addToast(err.message || 'Failed to process resume screening', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-indigo-500" />
            Upload Candidate Resume
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Supports PDF and DOCX formats for automatic ATS & Skill Match analysis.
          </p>
        </div>
        
        {/* Toggle Mode */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setMode('file')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              mode === 'file' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            File Upload
          </button>
          <button
            type="button"
            onClick={() => setMode('text')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              mode === 'text' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            Paste Text
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Job Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Target Job Role for Screening *
          </label>
          <select
            value={activeJobId}
            onChange={(e) => setActiveJobId(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
          >
            {jobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title} ({j.department}) — Min {j.minExperience} yrs exp required
              </option>
            ))}
          </select>
        </div>

        {/* Dropzone */}
        {mode === 'file' ? (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
              dragActive
                ? 'border-indigo-500 bg-indigo-500/10'
                : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 bg-slate-50/50 dark:bg-slate-800/30'
            }`}
          >
            <input
              type="file"
              id="resume-file-input"
              accept=".pdf,.docx,.doc"
              onChange={handleFileSelect}
              className="hidden"
            />
            <label htmlFor="resume-file-input" className="cursor-pointer block">
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 text-indigo-500 mx-auto flex items-center justify-center mb-3">
                <FileText className="w-6 h-6" />
              </div>
              {file ? (
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{file.name}</p>
                  <p className="text-xs text-slate-500 mt-1">{(file.size / 1024).toFixed(1)} KB • Ready for screening</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Click to browse or drag & drop resume here
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Supports PDF & DOCX (Max 10MB)</p>
                </div>
              )}
            </label>
          </div>
        ) : (
          <div>
            <textarea
              rows={6}
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              placeholder="Paste candidate resume text content here..."
              className="w-full p-3 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 font-mono"
            />
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isUploading}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing Resume & Running AI Recommendation Matrix...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Screen Resume & Generate Recommendation
            </>
          )}
        </button>
      </form>
    </div>
  );
};

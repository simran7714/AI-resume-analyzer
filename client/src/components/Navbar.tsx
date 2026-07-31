import React, { useState } from 'react';
import {
  Sparkles,
  Sun,
  Moon,
  Key,
  Briefcase,
  UserCheck,
  ShieldCheck,
  Layers,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const Navbar: React.FC = () => {
  const { role, setRole, user, geminiApiKey, setGeminiApiKey } = useAuth();
  const { theme, toggleTheme, jobs, selectedJobId, setSelectedJobId, setActiveTab } = useApp();
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [keyInput, setKeyInput] = useState(geminiApiKey);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'candidate') {
      setActiveTab('candidate-portal');
    } else if (newRole === 'admin') {
      setActiveTab('admin');
    } else {
      setActiveTab('dashboard');
    }
  };

  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    setGeminiApiKey(keyInput.trim());
    setShowApiKeyModal(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('landing')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-bold animate-glow">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-emerald-500 via-sky-500 to-blue-600 dark:from-emerald-400 dark:via-sky-400 dark:to-blue-400 bg-clip-text text-transparent">
              ResumeAI
            </h1>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
              Recruiter Screening & Recommendation Matrix
            </p>
          </div>
        </div>

        {/* Target Job Selector */}
        {role === 'recruiter' && (
          <div className="hidden md:flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <Briefcase className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Job Context:</span>
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="all" className="dark:bg-slate-800">All Active Job Roles ({jobs.length})</option>
              {jobs.map((j) => (
                <option key={j.id} value={j.id} className="dark:bg-slate-800">
                  {j.title} ({j.department})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Center: Role Switcher Tabs */}
        <div className="flex items-center p-1 bg-slate-200/80 dark:bg-slate-800/80 rounded-xl border border-slate-300/50 dark:border-slate-700">
          <button
            onClick={() => handleRoleChange('recruiter')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              role === 'recruiter'
                ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            Recruiter
          </button>
          <button
            onClick={() => handleRoleChange('candidate')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              role === 'candidate'
                ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Candidate
          </button>
          <button
            onClick={() => handleRoleChange('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              role === 'admin'
                ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Admin
          </button>
        </div>

        {/* Right Tools & Profile */}
        <div className="flex items-center gap-3">
          {/* Landing Page Button */}
          <button
            onClick={() => setActiveTab('landing')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-500 transition-colors border border-slate-200 dark:border-slate-700"
          >
            ← Back to Landing Page
          </button>

          {/* Gemini API Key Button */}
          <button
            onClick={() => setShowApiKeyModal(true)}
            title="Configure Google Gemini API Key"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors relative"
          >
            <Key className="w-4 h-4 text-amber-500" />
            {geminiApiKey && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title="Toggle Dark/Light Mode"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* User Profile Pill */}
          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/30" />
            <div className="text-left">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">{user.name}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 capitalize">{role} Account</p>
            </div>
          </div>
        </div>
      </div>

      {/* API Key Config Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel max-w-md w-full p-6 rounded-2xl shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Google Gemini API Key</h3>
              </div>
              <button
                onClick={() => setShowApiKeyModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
              Enter your Google Gemini API key (`AIza...`) for live model analysis. If left blank, the application will use its built-in rule-based NLP recommendation engine.
            </p>
            <form onSubmit={handleSaveApiKey} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  API Key
                </label>
                <input
                  type="password"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowApiKeyModal(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20"
                >
                  Save API Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

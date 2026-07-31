import React from 'react';
import {
  LayoutDashboard,
  Trophy,
  Briefcase,
  FileText,
  BarChart3,
  ShieldCheck,
  BotMessageSquare,
  Sparkles,
  UploadCloud
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

interface Props {
  onOpenChatbot?: () => void;
}

export const Sidebar: React.FC<Props> = ({ onOpenChatbot }) => {
  const { activeTab, setActiveTab } = useApp();
  const { role } = useAuth();

  const recruiterNav = [
    { id: 'dashboard', label: 'Overview Dashboard', icon: LayoutDashboard },
    { id: 'candidates', label: 'Screened Candidates', icon: FileText },
    { id: 'ranking', label: 'Leaderboard Ranking', icon: Trophy },
    { id: 'jobs', label: 'Job Descriptions', icon: Briefcase },
    { id: 'analytics', label: 'Hiring Analytics', icon: BarChart3 },
    { id: 'admin', label: 'Admin Audit Panel', icon: ShieldCheck },
  ];

  const candidateNav = [
    { id: 'candidate-portal', label: 'Upload & ATS Check', icon: UploadCloud },
    { id: 'ranking', label: 'Candidate Leaderboard', icon: Trophy },
  ];

  const navItems = role === 'candidate' ? candidateNav : recruiterNav;

  return (
    <aside className="w-64 shrink-0 glass-panel border-r border-slate-200/80 dark:border-slate-800 p-4 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        <div>
          <p className="px-3 text-[10px] uppercase font-extrabold tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            Main Navigation ({role.toUpperCase()})
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* AI Resume Guidance Bot CTA */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 text-left">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-lg bg-indigo-600 text-white">
            <BotMessageSquare className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-900 dark:text-white">AI Resume Coach</span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
          Get real-time advice on ATS optimization, skill keywords, and formatting.
        </p>
        <button
          onClick={onOpenChatbot}
          className="w-full py-2 px-3 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center justify-center gap-1.5 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Launch Assistant
        </button>
      </div>
    </aside>
  );
};

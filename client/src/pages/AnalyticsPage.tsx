import React from 'react';
import { BarChart3, TrendingUp, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AnalyticsCharts } from '../components/AnalyticsCharts';

export const AnalyticsPage: React.FC = () => {
  const { analytics } = useApp();

  if (!analytics) {
    return <div className="p-8 text-center text-slate-400">Loading Analytics...</div>;
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-500" />
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Hiring & Screening Analytics</h2>
          </div>
          <p className="text-xs text-slate-500">Comprehensive recruitment pipeline stats, approval ratios, and skill gaps.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl">
          <p className="text-xs font-bold text-slate-500 uppercase">Approval Rate</p>
          <h3 className="text-2xl font-black text-emerald-500 mt-1">{analytics.approvalRatePct}%</h3>
        </div>
        <div className="glass-panel p-5 rounded-2xl">
          <p className="text-xs font-bold text-slate-500 uppercase">Rejection Rate</p>
          <h3 className="text-2xl font-black text-rose-500 mt-1">{analytics.rejectionRatePct}%</h3>
        </div>
        <div className="glass-panel p-5 rounded-2xl">
          <p className="text-xs font-bold text-slate-500 uppercase">Average ATS Score</p>
          <h3 className="text-2xl font-black text-purple-500 mt-1">{analytics.averageAtsScore}%</h3>
        </div>
        <div className="glass-panel p-5 rounded-2xl">
          <p className="text-xs font-bold text-slate-500 uppercase">Total Applications</p>
          <h3 className="text-2xl font-black text-indigo-500 mt-1">{analytics.totalApplications}</h3>
        </div>
      </div>

      <AnalyticsCharts analytics={analytics} />
    </div>
  );
};

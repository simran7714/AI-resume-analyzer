import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  AreaChart,
  Area
} from 'recharts';
import { AnalyticsData } from '../types';

interface Props {
  analytics: AnalyticsData;
}

export const AnalyticsCharts: React.FC<Props> = ({ analytics }) => {
  const pieData = [
    { name: 'Approved', value: analytics.approvedCandidates, color: '#10b981' },
    { name: 'Manual Review', value: analytics.manualReviewCandidates, color: '#f59e0b' },
    { name: 'Rejected', value: analytics.rejectedCandidates, color: '#ef4444' }
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Approval Distribution Donut */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Recommendation Distribution</h4>
        <p className="text-xs text-slate-500 mb-4">Breakdown of candidates by automated screening outcome</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#fff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 text-xs font-semibold pt-2">
          {pieData.map(p => (
            <div key={p.name} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }}></div>
              <span className="text-slate-600 dark:text-slate-300">{p.name}: <span className="font-bold">{p.value}</span></span>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Distribution */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Applicant Experience Spread</h4>
        <p className="text-xs text-slate-500 mb-4">Candidate count grouped by total years of experience</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics.experienceDistribution}>
              <XAxis dataKey="range" stroke="#94a3b8" tick={{ fontSize: 11 }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Most Common Missing Skills */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 lg:col-span-2">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Top Missing Skills Across Applicants</h4>
        <p className="text-xs text-slate-500 mb-4">Skills most frequently missing in candidates for target roles</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={analytics.missingSkillsList.slice(0, 6)}>
              <XAxis type="number" stroke="#94a3b8" tick={{ fontSize: 11 }} />
              <YAxis dataKey="skill" type="category" stroke="#94a3b8" tick={{ fontSize: 11 }} width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="count" fill="#ec4899" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

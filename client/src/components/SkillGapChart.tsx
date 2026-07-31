import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import { Candidate } from '../types';

interface Props {
  candidate: Candidate;
}

export const SkillGapChart: React.FC<Props> = ({ candidate }) => {
  const scores = candidate.scores || {};

  const chartData = [
    { subject: 'ATS Score', Score: scores.atsScore || 0, Benchmark: 85 },
    { subject: 'Skill Match', Score: scores.skillMatchPct || 0, Benchmark: 90 },
    { subject: 'Experience', Score: scores.experienceMatchPct || 0, Benchmark: 80 },
    { subject: 'Education', Score: scores.educationMatchPct || 0, Benchmark: 80 },
    { subject: 'Grammar', Score: scores.grammarScore || 0, Benchmark: 90 },
    { subject: 'Formatting', Score: scores.formattingScore || 0, Benchmark: 90 },
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
          <PolarGrid stroke="#64748b" strokeDasharray="3 3" opacity={0.3} />
          <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fontSize: 11 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#64748b" opacity={0.3} />
          <Radar
            name="Candidate Fit"
            dataKey="Score"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.4}
          />
          <Radar
            name="Approval Threshold"
            dataKey="Benchmark"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.1}
            strokeDasharray="4 4"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              borderColor: '#334155',
              borderRadius: '12px',
              fontSize: '12px',
              color: '#fff'
            }}
          />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

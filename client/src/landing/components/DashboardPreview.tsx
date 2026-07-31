import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Target, Sparkles, CheckCircle2, AlertTriangle, Download, ArrowUpRight, BarChart2 } from 'lucide-react';
import { ATSScoreGaugeIllustration, JobMatchConnectIllustration } from './SVGIllustrations';

export const DashboardPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ats' | 'skills' | 'improver'>('ats');

  return (
    <section id="dashboard" className="py-20 lg:py-28 relative bg-slate-50/50 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold uppercase tracking-wider">
            Live Interactive Mockup
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            See the Power of{' '}
            <span className="bg-gradient-to-r from-emerald-500 via-sky-500 to-blue-600 bg-clip-text text-transparent">
              ResumeAI Dashboard
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Real-time candidate evaluation, ATS score calculation, missing keyword analysis, and single-click report generation.
          </p>

          {/* Tab buttons */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveTab('ats')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'ats'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              ATS Score & Analysis
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'skills'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              Skill Matrix Radar
            </button>
            <button
              onClick={() => setActiveTab('improver')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'improver'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              AI Resume Improver
            </button>
          </div>
        </div>

        {/* Dashboard Mockup Window */}
        <div className="glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden relative">
          
          {/* Top Window Bar */}
          <div className="px-6 py-4 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 ml-2">Candidate: Alex Rivera (Senior Full Stack Engineer)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold border border-emerald-500/30">
                RECOMMENDATION: APPROVED
              </span>
              <button className="px-3 py-1 rounded-xl bg-emerald-500 text-white text-xs font-bold flex items-center gap-1">
                <Download className="w-3.5 h-3.5" /> Export PDF
              </button>
            </div>
          </div>

          {/* Main Dashboard Body */}
          <div className="p-6 lg:p-8 space-y-6">
            
            {activeTab === 'ats' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Gauge 1 */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center space-y-2">
                    <ATSScoreGaugeIllustration score={92} className="w-full h-28 mx-auto" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Overall ATS Score</span>
                    <span className="text-xs text-emerald-500 font-extrabold">Top 5% Candidate</span>
                  </div>

                  {/* Gauge 2 */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center space-y-2">
                    <JobMatchConnectIllustration className="w-full h-28 mx-auto" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Job Description Match</span>
                    <span className="text-xs text-sky-500 font-extrabold">95% Role Alignment</span>
                  </div>

                  {/* Strength & Weakness Card */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white block">Key AI Evaluation</span>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-start gap-2 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>Strong technical bullet points with quantitative impact metrics.</span>
                      </div>
                      <div className="flex items-start gap-2 text-amber-600 dark:text-amber-400">
                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>Missing keyword: "CI/CD deployment throughput".</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Technical Skill Alignment Breakdown</h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 font-medium block">Frontend Architecture</span>
                    <span className="text-lg font-black text-emerald-500">100%</span>
                    <span className="text-[10px] text-slate-400 block">React, TypeScript, Tailwind</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 font-medium block">Backend Services</span>
                    <span className="text-lg font-black text-sky-500">92%</span>
                    <span className="text-[10px] text-slate-400 block">Node.js, Express, PostgreSQL</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 font-medium block">Cloud Infrastructure</span>
                    <span className="text-lg font-black text-blue-500">88%</span>
                    <span className="text-[10px] text-slate-400 block">AWS S3, Docker, Redis</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 font-medium block">DevOps & CI/CD</span>
                    <span className="text-lg font-black text-amber-500">75%</span>
                    <span className="text-[10px] text-slate-400 block">GitHub Actions, Terraform</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'improver' && (
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-500" /> AI Rewritten STAR Bullet Points
                  </h4>
                  <span className="text-xs font-bold text-emerald-500">+12% Score Boost Applied</span>
                </div>
                
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300">
                    <span className="font-bold block mb-1">Original Bullet:</span>
                    "Worked on React web application and fixed bugs."
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                    <span className="font-bold block mb-1">AI Optimized STAR Bullet:</span>
                    "Architected high-performance React + TypeScript frontend, reducing core web vitals load latency by 42% for over 250,000 active monthly users."
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};

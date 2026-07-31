import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  Play,
  ArrowRight,
  ShieldCheck,
  Award,
  Zap,
  FileText,
  TrendingUp,
  BarChart2,
  Check
} from 'lucide-react';
import LightPillar from '../../components/LightPillar';

interface Props {
  onAnalyze: () => void;
  onTryDemo: () => void;
  onWatchVideo: () => void;
}

export const HeroSection: React.FC<Props> = ({
  onAnalyze,
  onTryDemo,
  onWatchVideo,
}) => {
  return (
    <section id="hero" className="relative pt-32 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
      {/* LightPillar WebGL Effect */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-30 dark:opacity-50">
        <LightPillar
          topColor="#10B981"
          bottomColor="#0EA5E9"
          intensity={1.0}
          rotationSpeed={0.3}
          glowAmount={0.005}
          pillarWidth={3.0}
          pillarHeight={0.4}
          noiseIntensity={0.5}
          pillarRotation={0}
          interactive={false}
          mixBlendMode="screen"
        />
      </div>

      {/* Background Radial Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/20 via-sky-500/20 to-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10 animate-glow" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-8 text-center lg:text-left"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold uppercase tracking-wider shadow-xs">
              <Sparkles className="w-4 h-4" />
              <span>Next-Gen AI Resume Screening Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              Analyze Your Resume Like a{' '}
              <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500 bg-clip-text text-transparent">
                Professional Recruiter
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Upload your resume and instantly receive an ATS score, AI-powered analysis, job description matching, keyword optimization, skill-gap detection, recruiter insights, and personalized improvement suggestions.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onAnalyze}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" /> Analyze Resume
              </button>

              <button
                onClick={onTryDemo}
                className="px-7 py-4 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-extrabold text-sm border border-slate-200 dark:border-slate-700 shadow-sm hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-emerald-500" /> Try Demo
              </button>

              <button
                onClick={onWatchVideo}
                className="px-5 py-4 rounded-2xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Trust highlights */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-bold">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> No Credit Card Required
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> PDF & DOCX Support
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> Instant ATS Feedback
              </span>
            </div>
          </motion.div>

          {/* Right Hero Framed Laptop Mockup Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            {/* Laptop Screen Outer Shell */}
            <div className="glass-panel rounded-3xl p-3 bg-slate-900/90 border border-slate-700/80 shadow-2xl ring-1 ring-white/10 relative overflow-hidden backdrop-blur-2xl">
              
              {/* Laptop Top Camera & Window Header */}
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-800/80 bg-slate-950/80 rounded-t-2xl">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[10px] font-mono text-slate-400">resume_ai_screener.app</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">● AI LIVE</span>
              </div>

              {/* Dashboard Content inside Laptop Frame */}
              <div className="p-4 space-y-4 bg-slate-950/60 rounded-b-2xl">
                
                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                    <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" className="text-slate-800" fill="transparent" />
                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" strokeDasharray={125} strokeDashoffset={125 - (125 * 92) / 100} className="text-emerald-500" strokeLinecap="round" fill="transparent" />
                      </svg>
                      <span className="absolute text-xs font-black text-white">92%</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">ATS Score</span>
                      <span className="text-xs font-extrabold text-emerald-400">Top 5% Candidate</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 font-black text-xs border border-sky-500/30">
                      95%
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Job Role Match</span>
                      <span className="text-xs font-extrabold text-sky-400">Sr. Full Stack</span>
                    </div>
                  </div>
                </div>

                {/* Resume & Skill Keyword Progress */}
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-slate-300">Technical Skill Keywords</span>
                    <span className="text-emerald-400">18 / 19 Matched</span>
                  </div>

                  <div className="space-y-1.5">
                    <div>
                      <div className="flex justify-between text-[9px] text-slate-400 mb-0.5">
                        <span>React, TypeScript, Node.js</span>
                        <span className="text-emerald-400 font-bold">100%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full w-full" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[9px] text-slate-400 mb-0.5">
                        <span>AWS, Docker, GraphQL</span>
                        <span className="text-sky-400 font-bold">90%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-sky-500 rounded-full w-[90%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Recruiter Suggestion */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[10px] text-amber-300 flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>
                    <strong className="font-bold">AI Suggestion:</strong> Add quantifiable CI/CD deployment throughput metrics.
                  </span>
                </div>

              </div>
            </div>

            {/* Laptop Base Stand */}
            <div className="h-2.5 w-4/5 mx-auto bg-slate-800 rounded-b-xl border-x border-b border-slate-700/60 flex justify-center items-center">
              <div className="w-16 h-0.5 rounded-full bg-slate-600" />
            </div>

            {/* Floating Glass Badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-5 -left-5 z-20 glass-panel px-3.5 py-2.5 rounded-2xl shadow-xl border border-emerald-500/40 flex items-center gap-2.5 bg-slate-900/90 text-white"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Recruiter Status</span>
                <span className="text-xs font-extrabold text-emerald-400">Approved for Interview</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-5 -right-5 z-20 glass-panel px-3.5 py-2.5 rounded-2xl shadow-xl border border-sky-500/40 flex items-center gap-2.5 bg-slate-900/90 text-white"
            >
              <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Skill Match</span>
                <span className="text-xs font-extrabold text-sky-400">95% Alignment</span>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

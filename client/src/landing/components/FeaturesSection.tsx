import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  FileSearch,
  Sparkles,
  Trophy,
  Target,
  Key,
  AlertTriangle,
  CheckCircle2,
  Layout,
  FileText,
  BarChart3,
  Code2,
  Briefcase,
  Clock,
  Wand2,
  Download,
  BotMessageSquare,
  Video
} from 'lucide-react';
import {
  ATSScoreGaugeIllustration,
  DocumentParserIllustration,
  AIBrainIllustration,
  JobMatchConnectIllustration,
  LeaderboardRankIllustration,
  KeywordSearchIllustration,
  ShieldSecurityIllustration,
  FastLightningIllustration,
  CareerGrowthIllustration
} from './SVGIllustrations';

export const FeaturesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'ats' | 'ai' | 'career'>('all');

  const features = [
    {
      id: 'ats-score',
      title: 'ATS Score Checker',
      desc: 'Calculates an accurate 0–100 ATS compatibility score based on modern recruiter parsing algorithms.',
      icon: Award,
      illustration: ATSScoreGaugeIllustration,
      category: 'ats',
      tag: '0-100 Score Ring'
    },
    {
      id: 'resume-parser',
      title: 'Resume Parser',
      desc: 'Instantly extracts structured contact info, work experience, education, skills, and certifications from PDF & DOCX.',
      icon: FileSearch,
      illustration: DocumentParserIllustration,
      category: 'ats',
      tag: 'PDF & DOCX Support'
    },
    {
      id: 'ai-review',
      title: 'AI Resume Review',
      desc: 'Deep Gemini LLM evaluation highlighting bullet point impact, quantifiable achievements, and recruiter readability.',
      icon: Sparkles,
      illustration: AIBrainIllustration,
      category: 'ai',
      tag: 'Gemini 1.5 Pro Engine'
    },
    {
      id: 'resume-ranking',
      title: 'Resume Ranking Leaderboard',
      desc: 'Rank all candidate applicants dynamically from #1 Best Fit down for instant recruiter shortlisting.',
      icon: Trophy,
      illustration: LeaderboardRankIllustration,
      category: 'ats',
      tag: 'Multi-Candidate Sorting'
    },
    {
      id: 'jd-match',
      title: 'Job Description Matching',
      desc: 'Compares candidate experience and skill sets directly against target job role requirements.',
      icon: Target,
      illustration: JobMatchConnectIllustration,
      category: 'ats',
      tag: 'Vector Match Dial'
    },
    {
      id: 'keyword-optimization',
      title: 'Keyword Optimization',
      desc: 'Identifies missing ATS keywords and suggests relevant industry phrasing for your resume bullet points.',
      icon: Key,
      illustration: KeywordSearchIllustration,
      category: 'ai',
      tag: 'High-Impact Phrases'
    },
    {
      id: 'missing-skills',
      title: 'Missing Skills Detection',
      desc: 'Detects mandatory and preferred skill gaps between candidate profile and target job specifications.',
      icon: AlertTriangle,
      illustration: DocumentParserIllustration,
      category: 'ats',
      tag: 'Skill Gap Breakdown'
    },
    {
      id: 'grammar-checker',
      title: 'Grammar & Clarity Checker',
      desc: 'Polishes sentence structure, eliminates typos, and enforces action-verb phrasing.',
      icon: CheckCircle2,
      illustration: AIBrainIllustration,
      category: 'ai',
      tag: 'STAR Bullet Format'
    },
    {
      id: 'formatting-analysis',
      title: 'Formatting & Layout Analysis',
      desc: 'Ensures single-column standard ATS layout compliance without tables or font parsing errors.',
      icon: Layout,
      illustration: DocumentParserIllustration,
      category: 'ats',
      tag: '100% Parsing Safety'
    },
    {
      id: 'summary-generator',
      title: 'Resume Summary Generator',
      desc: 'Generates concise, punchy professional executive summaries tailored to your target industry.',
      icon: FileText,
      illustration: KeywordSearchIllustration,
      category: 'ai',
      tag: 'Tailored Pitch'
    },
    {
      id: 'skill-gap-analysis',
      title: 'Skill Gap Radar Matrix',
      desc: 'Visualizes candidate skill match against job role requirements in an interactive radar chart.',
      icon: BarChart3,
      illustration: ATSScoreGaugeIllustration,
      category: 'ats',
      tag: 'Radar Analytics'
    },
    {
      id: 'technical-analysis',
      title: 'Technical Skills Evaluation',
      desc: 'Evaluates programming languages, frameworks, cloud tools, and technical proficiency.',
      icon: Code2,
      illustration: LeaderboardRankIllustration,
      category: 'ats',
      tag: 'Framework Alignment'
    },
    {
      id: 'project-evaluation',
      title: 'Project Evaluation',
      desc: 'Assesses project complexity, architecture impact, and quantitative metrics provided.',
      icon: Briefcase,
      illustration: CareerGrowthIllustration,
      category: 'career',
      tag: 'Project Metrics'
    },
    {
      id: 'experience-analysis',
      title: 'Experience & Tenure Analysis',
      desc: 'Calculates total relevant years of experience and career trajectory progression.',
      icon: Clock,
      illustration: CareerGrowthIllustration,
      category: 'career',
      tag: 'Career Velocity'
    },
    {
      id: 'resume-builder',
      title: 'AI Resume Improver',
      desc: 'One-click tool that automatically rewrites resume bullet points using the STAR method.',
      icon: Wand2,
      illustration: DocumentParserIllustration,
      category: 'ai',
      tag: '1-Click Auto Rewrite'
    },
    {
      id: 'report-generator',
      title: 'Professional Report Generator',
      desc: 'Generates comprehensive PDF Candidate Screening Reports with strengths, weaknesses, and hiring recommendations.',
      icon: Download,
      illustration: ATSScoreGaugeIllustration,
      category: 'ats',
      tag: 'PDF Export'
    },
    {
      id: 'career-assistant',
      title: 'AI Career Assistant Chatbot',
      desc: 'Interactive 24/7 AI chatbot providing real-time resume feedback and career guidance.',
      icon: BotMessageSquare,
      illustration: AIBrainIllustration,
      category: 'career',
      tag: '24/7 AI Chat'
    },
    {
      id: 'interview-prep',
      title: 'Interview Preparation',
      desc: 'Generates customized technical and behavioral interview questions based on detected resume skill gaps.',
      icon: Video,
      illustration: JobMatchConnectIllustration,
      category: 'career',
      tag: 'Mock Questions'
    }
  ];

  const filtered = activeCategory === 'all'
    ? features
    : features.filter(f => f.category === activeCategory);

  return (
    <section id="features" className="py-20 lg:py-28 relative bg-slate-50/50 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold uppercase tracking-wider">
            Comprehensive AI Capability Suite
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            18 Powerful Features for{' '}
            <span className="bg-gradient-to-r from-emerald-500 via-sky-500 to-blue-600 bg-clip-text text-transparent">
              Recruiters & Job Seekers
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            From granular 0–100 ATS scoring to instant bullet point rewriting and candidate leaderboard ranking.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'All 18 Features' },
              { id: 'ats', label: 'ATS & Screening' },
              { id: 'ai', label: 'AI Review & Rewrite' },
              { id: 'career', label: 'Career Growth' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((f, idx) => {
            const Icon = f.icon;
            const Illustration = f.illustration;
            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Header Row with Icon & Tag */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/20 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {f.tag}
                    </span>
                  </div>

                  {/* SVG Illustration Preview Box */}
                  <div className="w-full py-2 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex items-center justify-center overflow-hidden group-hover:bg-emerald-500/5 transition-colors">
                    <Illustration className="w-full h-28 transform group-hover:scale-105 transition-transform duration-300" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

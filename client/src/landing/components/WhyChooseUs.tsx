import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shield, Zap, Target, TrendingUp, Users } from 'lucide-react';
import {
  AIBrainIllustration,
  ShieldSecurityIllustration,
  FastLightningIllustration,
  JobMatchConnectIllustration,
  CareerGrowthIllustration,
  LeaderboardRankIllustration
} from './SVGIllustrations';

export const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      title: 'AI Brain Evaluation',
      desc: 'Powered by advanced Google Gemini LLM entity parsing models tailored specifically to modern recruitment standards.',
      icon: Sparkles,
      illustration: AIBrainIllustration,
      color: 'emerald'
    },
    {
      title: 'Enterprise Encryption Security',
      desc: 'Your candidate resumes and corporate job specifications are encrypted end-to-end with 256-bit SSL security.',
      icon: Shield,
      illustration: ShieldSecurityIllustration,
      color: 'blue'
    },
    {
      title: '30-Second Rapid Screening',
      desc: 'Automates manual resume screening from hours into seconds, eliminating hiring bottlenecks completely.',
      icon: Zap,
      illustration: FastLightningIllustration,
      color: 'amber'
    },
    {
      title: 'Precision ATS Matching',
      desc: 'Calculates exact keyword alignment, experience relevance, education verification, and formatting compatibility.',
      icon: Target,
      illustration: JobMatchConnectIllustration,
      color: 'sky'
    },
    {
      title: 'Actionable Career Recommendations',
      desc: 'Provides candidates with clear step-by-step missing skill alerts and optimized STAR bullet point suggestions.',
      icon: TrendingUp,
      illustration: CareerGrowthIllustration,
      color: 'purple'
    },
    {
      title: 'Recruiter Ranking Leaderboard',
      desc: 'Rank hundreds of candidate resumes side-by-side on a dynamic leaderboard for instant top-tier shortlisting.',
      icon: Users,
      illustration: LeaderboardRankIllustration,
      color: 'indigo'
    }
  ];

  return (
    <section className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold uppercase tracking-wider">
            Why Choose ResumeAI
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Built for Modern Recruitment &{' '}
            <span className="bg-gradient-to-r from-emerald-500 via-sky-500 to-blue-600 bg-clip-text text-transparent">
              Career Growth
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Engineered to deliver trustworthy, transparent, and objective AI recommendations.
          </p>
        </div>

        {/* 6 Benefit Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            const Illustration = b.illustration;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500/50 hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/20 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Illustration Box */}
                  <div className="w-full py-2 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-center overflow-hidden">
                    <Illustration className="w-full h-32 group-hover:scale-105 transition-transform duration-300" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                      {b.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                      {b.desc}
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

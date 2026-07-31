import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, ShieldCheck } from 'lucide-react';

interface Props {
  onSelectPlan: (planName: string) => void;
}

export const PricingSection: React.FC<Props> = ({ onSelectPlan }) => {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'Forever free',
      desc: 'Ideal for students and casual job seekers checking ATS baseline.',
      highlight: false,
      cta: 'Get Started Free',
      features: [
        '3 Resume ATS Scans / month',
        'Basic ATS Compatibility Score',
        'Top 5 Missing Skills Detection',
        'PDF & DOCX File Parser',
        'Standard Email Support'
      ]
    },
    {
      name: 'Pro',
      price: annual ? '$15' : '$19',
      period: annual ? 'per month, billed annually' : 'per month',
      desc: 'Perfect for active job hunters aiming for top tech & corporate roles.',
      highlight: true,
      badge: 'Most Popular',
      cta: 'Start Pro 7-Day Free Trial',
      features: [
        'Unlimited AI Resume Scans',
        'Full 0–100 Granular ATS Evaluation',
        'Gemini AI Deep Resume Review',
        'AI Resume Improver & PDF Export',
        'Interactive Skill Gap Radar Chart',
        'Keyword Optimization Suggestions',
        'AI Career Assistant Chatbot 24/7',
        'Priority Customer Support'
      ]
    },
    {
      name: 'Enterprise Recruiter',
      price: annual ? '$39' : '$49',
      period: annual ? 'per month, billed annually' : 'per month',
      desc: 'Designed for HR recruiters, talent leads, and hiring agencies.',
      highlight: false,
      cta: 'Contact Enterprise Sales',
      features: [
        'Multi-User Team Workspaces',
        'Automated Applicant Ranking Leaderboard',
        'Custom Job Description Templates',
        'Automated Interview Email Dispatch',
        'Fraud & Keyword Stuffing Inspector',
        'Bulk Export to PDF & Excel',
        'Dedicated Gemini API Key Integration',
        'Custom Admin Audit Logs'
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-slate-50/50 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold uppercase tracking-wider">
            Flexible Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Simple Plans for Every{' '}
            <span className="bg-gradient-to-r from-emerald-500 via-sky-500 to-blue-600 bg-clip-text text-transparent">
              Career Stage
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            No hidden fees. Upgrade or cancel your subscription at any time.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <span className={`text-xs font-bold ${!annual ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className="w-14 h-8 rounded-full bg-slate-200 dark:bg-slate-700 p-1 relative transition-colors cursor-pointer"
            >
              <div
                className={`w-6 h-6 rounded-full bg-emerald-500 transition-transform ${
                  annual ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-bold ${annual ? 'text-slate-900 dark:text-white' : 'text-slate-500'} flex items-center gap-1.5`}>
              Annually <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, idx) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`glass-panel p-8 rounded-3xl border flex flex-col justify-between relative transition-all duration-300 ${
                p.highlight
                  ? 'border-emerald-500 shadow-2xl shadow-emerald-500/15 bg-white dark:bg-slate-900 ring-2 ring-emerald-500/40'
                  : 'border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70'
              }`}
            >
              {p.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-blue-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                  {p.badge}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{p.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{p.desc}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">{p.price}</span>
                  <span className="text-xs text-slate-500 font-semibold">/ {p.period}</span>
                </div>

                <ul className="space-y-3 pt-2 text-xs text-slate-700 dark:text-slate-300">
                  {p.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => onSelectPlan(p.name)}
                  className={`w-full py-3.5 px-4 rounded-2xl font-extrabold text-xs transition-all cursor-pointer shadow-md ${
                    p.highlight
                      ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white shadow-emerald-500/25 hover:shadow-lg'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {p.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

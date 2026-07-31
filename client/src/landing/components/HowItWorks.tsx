import React from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Cpu, Target, FileCheck2, ArrowRight } from 'lucide-react';
import {
  DocumentParserIllustration,
  AIBrainIllustration,
  JobMatchConnectIllustration,
  ATSScoreGaugeIllustration
} from './SVGIllustrations';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Upload Candidate Resume',
      desc: 'Drag & drop any PDF or Word (.docx) file. Our intelligent parser instantly extracts work history, skills, education, and certifications.',
      icon: UploadCloud,
      illustration: DocumentParserIllustration,
      color: 'emerald'
    },
    {
      num: '02',
      title: 'AI Deep Resume Analysis',
      desc: 'Google Gemini LLMs evaluate sentence clarity, bullet point impact, quantifiable achievements, STAR format compliance, and formatting bugs.',
      icon: Cpu,
      illustration: AIBrainIllustration,
      color: 'blue'
    },
    {
      num: '03',
      title: 'Compare with Job Description',
      desc: 'Match applicant experience directly against job role criteria to detect missing ATS keywords, mandatory skill gaps, and experience fit.',
      icon: Target,
      illustration: JobMatchConnectIllustration,
      color: 'sky'
    },
    {
      num: '04',
      title: 'Generate ATS Score & Report',
      desc: 'Receive an instant 0–100 ATS Score, hiring recommendation (Approve/Reject/Review), and download a complete PDF report or improved resume.',
      icon: FileCheck2,
      illustration: ATSScoreGaugeIllustration,
      color: 'purple'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-600 dark:text-sky-400 text-xs font-extrabold uppercase tracking-wider">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            How ResumeAI Works in{' '}
            <span className="bg-gradient-to-r from-emerald-500 via-sky-500 to-blue-600 bg-clip-text text-transparent">
              30 Seconds
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Automating manual resume screening into transparent, recruiter-trusted AI recommendations.
          </p>
        </div>

        {/* 4-Step Timeline Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const Illustration = step.illustration;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 relative flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-xl transition-all group"
              >
                <div>
                  {/* Step Number & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-300 dark:text-slate-700 group-hover:text-emerald-500 transition-colors">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/20">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* SVG Illustration Preview */}
                  <div className="w-full py-2 mb-4 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-center">
                    <Illustration className="w-full h-32 group-hover:scale-105 transition-transform duration-300" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {idx < 3 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-slate-300 dark:text-slate-700">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

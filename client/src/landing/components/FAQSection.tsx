import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, HelpCircle, Sparkles } from 'lucide-react';
import { FAQAssistantIllustration } from './SVGIllustrations';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [search, setSearch] = useState('');

  const faqs = [
    {
      q: 'What is an ATS Score?',
      a: 'An ATS (Applicant Tracking System) Score is a quantitative measure (0–100) evaluating how effectively your resume can be read, parsed, and indexed by automated recruiting software used by top companies. It factors in keyword alignment, formatting compliance, section hierarchy, and qualification thresholds.'
    },
    {
      q: 'How does AI analyze resumes in ResumeAI?',
      a: 'ResumeAI combines natural language processing (NLP) entity extraction algorithms with Google Gemini LLMs to parse your work history, skills, education, and certifications. It compares your vector profile against target job role specifications to generate transparent strengths, weaknesses, and recommendations.'
    },
    {
      q: 'Is my resume data secure and private?',
      a: 'Yes, absolutely. ResumeAI uses enterprise-grade SSL/TLS encryption for all file uploads and database storage. We do not sell your personal data or share your uploaded resume files with third parties.'
    },
    {
      q: 'What resume file formats are supported?',
      a: 'We support PDF (.pdf) and Microsoft Word (.docx, .doc) files up to 10MB, as well as raw plain text pasting.'
    },
    {
      q: 'Can I compare multiple resumes against a job role?',
      a: 'Yes! Recruiters and job seekers can upload multiple candidate resumes or version drafts to compare ATS scores, skill match percentages, and leaderboard rankings side-by-side.'
    },
    {
      q: 'Can I download AI-improved resumes and PDF reports?',
      a: 'Yes, with one click you can download a complete PDF Candidate Screening Report as well as a pre-formatted, ATS-friendly improved resume version with polished STAR bullet points.'
    }
  ];

  const filteredFaqs = faqs.filter(f =>
    f.q.toLowerCase().includes(search.toLowerCase()) ||
    f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="faq" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-600 dark:text-blue-400 text-xs font-extrabold uppercase tracking-wider">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Everything you need to know about ResumeAI, ATS scoring, and security.
          </p>

          {/* Search Box */}
          <div className="relative max-w-md mx-auto pt-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search FAQ questions..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 shadow-sm"
            />
          </div>
        </div>

        {/* Grid: Left Vector Illustration + Right Accordion */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: AI Assistant Illustration & Help Badge */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-4">
              <FAQAssistantIllustration className="w-full h-48 mx-auto" />
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-500" /> Need Custom Assistance?
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Our AI Assistant is available 24/7 inside the app dashboard to answer specific questions about your resume formatting and ATS optimization.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion List */}
          <div className="lg:col-span-7 space-y-4">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 dark:text-white hover:text-emerald-500 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-500' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

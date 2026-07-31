import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { JobMatchConnectIllustration } from './SVGIllustrations';

interface Props {
  onAnalyze: () => void;
  onSignUp: () => void;
}

export const FinalCTA: React.FC<Props> = ({ onAnalyze, onSignUp }) => {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-blue-600/10 pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-8 sm:p-14 rounded-3xl border border-emerald-500/30 shadow-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-[#0F172A] text-white text-center relative overflow-hidden"
        >
          {/* Animated Glow Rings */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none animate-glow" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Transform Your Career Today
            </span>

            {/* Workflow Vector SVG Graphic */}
            <div className="max-w-md mx-auto py-2">
              <JobMatchConnectIllustration className="w-full h-36 mx-auto" />
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Ready to Land Your{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
                Dream Job?
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
              Upload your resume today and receive AI-powered insights that help you create a recruiter-friendly resume, optimize your ATS score, and land interviews 3x faster.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={onAnalyze}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-extrabold text-xs shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" /> Analyze Resume Now
              </button>

              <button
                onClick={onSignUp}
                className="px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs border border-white/20 backdrop-blur-md hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-emerald-400" /> Create Free Account
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free 3 Scans Monthly
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> PDF & DOCX Compatibility
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Privacy & Encrypted Data
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

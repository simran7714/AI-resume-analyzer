import React, { useState } from 'react';
import { Sparkles, Send, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LandingFooter: React.FC = () => {
  const { addToast } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    addToast('Thank you for subscribing to ResumeAI updates!', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-16 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-8">
          
          {/* Brand Bio (Col 1 & 2) */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-blue-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-emerald-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                Resume<span className="text-emerald-500">AI</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The world's leading AI-powered Resume Screening & Candidate Recommendation SaaS platform. Transform your resume into a recruiter magnet.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="space-y-2 pt-2">
              <label className="block text-[11px] font-bold text-slate-300">Subscribe to Career AI Newsletter</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none w-full"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-colors shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

          {/* Col 3: Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">ATS Score Checker</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">AI Resume Review</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Skill Gap Radar</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Resume Optimizer</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Candidate Ranking</a></li>
              <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing Plans</a></li>
            </ul>
          </div>

          {/* Col 4: Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Blog & Guides</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">API Docs</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">System Status</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Community</a></li>
            </ul>
          </div>

          {/* Col 5: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">About ResumeAI</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Careers <span className="px-1.5 py-0.5 text-[9px] rounded-md bg-emerald-500/20 text-emerald-400 font-bold ml-1">We're Hiring</span></a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Press & Media</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Affiliate Program</a></li>
            </ul>
          </div>

          {/* Col 6: Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">Legal & Trust</h4>
            <ul className="space-y-2 text-[11px]">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Refund Policy</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">GDPR & Accessibility</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-emerald-400" /> Security Policy</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Social & Copyright Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© 2026 ResumeAI SaaS Inc. All rights reserved. Powered by Google Gemini AI.</p>

          <div className="flex items-center gap-4 text-slate-400">
            <a href="#" className="hover:text-emerald-400 transition-colors" title="LinkedIn">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.63 1.63 0 1 0 0 3.25 1.63 1.63 0 0 0 0-3.25z"/></svg>
            </a>
            <a href="#" className="hover:text-emerald-400 transition-colors" title="GitHub">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
            </a>
            <a href="#" className="hover:text-emerald-400 transition-colors" title="Twitter / X">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

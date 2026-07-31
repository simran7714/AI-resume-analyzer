import React from 'react';
import { motion } from 'framer-motion';
import { GoogleLogoSVG, MicrosoftLogoSVG, AmazonLogoSVG, MetaLogoSVG } from './SVGIllustrations';

export const TrustedBy: React.FC = () => {
  const companies = [
    { name: 'Google', icon: GoogleLogoSVG },
    { name: 'Microsoft', icon: MicrosoftLogoSVG },
    { name: 'Amazon', icon: AmazonLogoSVG },
    { name: 'Meta', icon: MetaLogoSVG },
    { name: 'IBM', text: 'IBM' },
    { name: 'Infosys', text: 'Infosys' },
    { name: 'TCS', text: 'TCS' },
    { name: 'Adobe', text: 'Adobe' },
  ];

  return (
    <section className="py-12 border-y border-slate-200/60 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-8">
          TRUSTED BY RECRUITERS & CANDIDATES AT TOP GLOBAL TECH COMPANIES
        </p>

        {/* Ticker Logos Grid */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
          {companies.map((c, idx) => {
            const IconComp = c.icon;
            return (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="flex items-center gap-2.5 font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors cursor-pointer text-sm sm:text-base tracking-tight"
              >
                {IconComp ? (
                  <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                )}
                <span>{c.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

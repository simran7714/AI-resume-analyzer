import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'David Chen',
      role: 'Senior Software Engineer',
      company: 'Meta',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      stars: 5,
      review: 'ResumeAI helped me pinpoint missing Kubernetes & AWS keywords that were blocking my resume at top tech companies. Landed interviews at Meta and Google within 2 weeks!'
    },
    {
      name: 'Sarah Jenkins',
      role: 'Head of Talent Acquisition',
      company: 'Apex Cloud Solutions',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      stars: 5,
      review: 'As an HR recruiter handling over 500 applications per job opening, ResumeAI reduced our screening time by 80%. The explainable AI score and missing skill warnings are game-changing.'
    },
    {
      name: 'Marcus Vance',
      role: 'Cloud Architect',
      company: 'Vanguard Tech',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      stars: 5,
      review: 'The ATS formatting check and automated PDF improver generated a clean single-column resume that boosted my callback rate from 5% to over 40%.'
    },
    {
      name: 'Dr. Elena Rostova',
      role: 'Lead ML Scientist',
      company: 'Columbia AI Labs',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      stars: 5,
      review: 'Extremely accurate AI keyword matching. It breaks down complex machine learning skill sets and gives transparent scores without black-box AI decisions.'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-20 lg:py-28 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-600 dark:text-purple-400 text-xs font-extrabold uppercase tracking-wider">
            User Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Loved by Job Seekers &{' '}
            <span className="bg-gradient-to-r from-purple-500 to-emerald-500 bg-clip-text text-transparent">
              Recruiters
            </span>
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-2xl relative"
            >
              <Quote className="w-12 h-12 text-emerald-500/20 absolute top-6 right-8 pointer-events-none" />

              <div className="space-y-6">
                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(testimonials[currentIndex].stars)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-base sm:text-xl text-slate-700 dark:text-slate-200 font-medium leading-relaxed italic">
                  "{testimonials[currentIndex].review}"
                </p>

                {/* Author Details */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-200/60 dark:border-slate-800">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/30"
                  />
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {testimonials[currentIndex].role} at{' '}
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{testimonials[currentIndex].company}</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === idx ? 'w-8 bg-emerald-500' : 'w-2 bg-slate-300 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-500 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-500 hover:text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

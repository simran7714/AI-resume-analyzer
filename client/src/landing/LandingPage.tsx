import React, { useState } from 'react';
import { LandingNavbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustedBy } from './components/TrustedBy';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorks } from './components/HowItWorks';
import { DashboardPreview } from './components/DashboardPreview';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { PricingSection } from './components/PricingSection';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { LandingFooter } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { DemoVideoModal } from './components/DemoVideoModal';
import { ResumeUploader } from '../components/ResumeUploader';
import { X, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Props {
  onLaunchDashboard: () => void;
}

export const LandingPage: React.FC<Props> = ({ onLaunchDashboard }) => {
  const { setSelectedCandidate } = useApp();
  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showAnalyzeModal, setShowAnalyzeModal] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      
      {/* Sticky Glass Navbar */}
      <LandingNavbar
        onOpenAuth={(mode) => setAuthModal(mode)}
        onOpenAnalyze={() => setShowAnalyzeModal(true)}
        onLaunchDashboard={onLaunchDashboard}
      />

      {/* Hero Section */}
      <HeroSection
        onAnalyze={() => setShowAnalyzeModal(true)}
        onTryDemo={onLaunchDashboard}
        onWatchVideo={() => setShowVideoModal(true)}
      />

      {/* Trusted By Logos Bar */}
      <TrustedBy />

      {/* 18 Features Section */}
      <FeaturesSection />

      {/* 4-Step Animated Timeline */}
      <HowItWorks />

      {/* SaaS Dashboard Preview Mockup */}
      <DashboardPreview />

      {/* Why Choose ResumeAI */}
      <WhyChooseUs />

      {/* Animated Testimonials Carousel */}
      <Testimonials />

      {/* Pricing Plans */}
      <PricingSection onSelectPlan={(plan) => setAuthModal('signup')} />

      {/* Animated FAQ Accordion */}
      <FAQSection />

      {/* Final Conversion CTA */}
      <FinalCTA
        onAnalyze={() => setShowAnalyzeModal(true)}
        onSignUp={() => setAuthModal('signup')}
      />

      {/* Multi-Column SaaS Footer */}
      <LandingFooter />

      {/* Auth Modal */}
      {authModal && (
        <AuthModal
          initialMode={authModal}
          onClose={() => setAuthModal(null)}
          onSuccess={onLaunchDashboard}
        />
      )}

      {/* Video Walkthrough Modal */}
      {showVideoModal && (
        <DemoVideoModal
          onClose={() => setShowVideoModal(false)}
          onAnalyze={() => setShowAnalyzeModal(true)}
        />
      )}

      {/* Live Resume Analyze Screening Modal */}
      {showAnalyzeModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-panel max-w-2xl w-full my-8 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 relative">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-500" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Live AI Resume Screening</h3>
              </div>
              <button
                onClick={() => setShowAnalyzeModal(false)}
                className="text-slate-400 hover:text-white font-bold p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <ResumeUploader
                onSuccess={(cand) => {
                  setShowAnalyzeModal(false);
                  setSelectedCandidate(cand);
                  onLaunchDashboard();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

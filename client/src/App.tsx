import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { RecruiterDashboard } from './pages/RecruiterDashboard';
import { CandidatePortal } from './pages/CandidatePortal';
import { JobManagement } from './pages/JobManagement';
import { CandidateRanking } from './pages/CandidateRanking';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AdminPanel } from './pages/AdminPanel';
import { InterviewSchedulerModal } from './components/InterviewSchedulerModal';
import { ResumeImprovementModal } from './components/ResumeImprovementModal';
import { QRCodeModal } from './components/QRCodeModal';
import { AIChatbot } from './components/AIChatbot';
import { AppProvider, useApp } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

import { LandingPage } from './landing/LandingPage';

const MainApp: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    toasts,
    removeToast,
    schedulerCandidate,
    setSchedulerCandidate,
    improverCandidate,
    setImproverCandidate,
    qrModalCandidate,
    setQrModalCandidate
  } = useApp();

  const [showChatbot, setShowChatbot] = useState(false);

  if (activeTab === 'landing') {
    return <LandingPage onLaunchDashboard={() => setActiveTab('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        <Sidebar onOpenChatbot={() => setShowChatbot(true)} />

        <main className="flex-1 min-w-0">
          {activeTab === 'dashboard' && <RecruiterDashboard />}
          {activeTab === 'candidates' && <RecruiterDashboard />}
          {activeTab === 'ranking' && <CandidateRanking />}
          {activeTab === 'jobs' && <JobManagement />}
          {activeTab === 'analytics' && <AnalyticsPage />}
          {activeTab === 'admin' && <AdminPanel />}
          {activeTab === 'candidate-portal' && <CandidatePortal />}
        </main>
      </div>

      {/* Global Modals */}
      {schedulerCandidate && (
        <InterviewSchedulerModal candidate={schedulerCandidate} onClose={() => setSchedulerCandidate(null)} />
      )}
      {improverCandidate && (
        <ResumeImprovementModal candidate={improverCandidate} onClose={() => setImproverCandidate(null)} />
      )}
      {qrModalCandidate && (
        <QRCodeModal candidate={qrModalCandidate} onClose={() => setQrModalCandidate(null)} />
      )}
      {showChatbot && (
        <AIChatbot onClose={() => setShowChatbot(false)} />
      )}

      {/* Toast Notification Container */}
      <div className="fixed bottom-6 left-6 z-50 space-y-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl shadow-xl border flex items-center justify-between gap-3 text-xs font-bold animate-in slide-in-from-left duration-200 ${
              toast.type === 'success'
                ? 'bg-emerald-600 text-white border-emerald-500'
                : toast.type === 'error'
                ? 'bg-rose-600 text-white border-rose-500'
                : 'bg-indigo-600 text-white border-indigo-500'
            }`}
          >
            <div className="flex items-center gap-2">
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
              <span>{toast.message}</span>
            </div>
            <button onClick={() => removeToast(toast.id)} className="p-1 hover:bg-white/20 rounded-lg">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <MainApp />
      </AppProvider>
    </AuthProvider>
  );
}

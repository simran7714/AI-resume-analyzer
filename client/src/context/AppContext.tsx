import React, { createContext, useContext, useState, useEffect } from 'react';
import { JobDescription, Candidate, AnalyticsData } from '../types';
import * as api from '../utils/api';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  jobs: JobDescription[];
  selectedJobId: string;
  setSelectedJobId: (id: string) => void;
  candidates: Candidate[];
  loadingCandidates: boolean;
  selectedCandidate: Candidate | null;
  setSelectedCandidate: (c: Candidate | null) => void;
  schedulerCandidate: Candidate | null;
  setSchedulerCandidate: (c: Candidate | null) => void;
  improverCandidate: Candidate | null;
  setImproverCandidate: (c: Candidate | null) => void;
  comparisonCandidate: Candidate | null;
  setComparisonCandidate: (c: Candidate | null) => void;
  qrModalCandidate: Candidate | null;
  setQrModalCandidate: (c: Candidate | null) => void;
  analytics: AnalyticsData | null;
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  refreshData: () => Promise<void>;
  updateCandidateState: (updated: Candidate) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('app_theme') as 'light' | 'dark') || 'dark';
  });
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [jobs, setJobs] = useState<JobDescription[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>('all');
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loadingCandidates, setLoadingCandidates] = useState<boolean>(true);
  
  // Modals
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [schedulerCandidate, setSchedulerCandidate] = useState<Candidate | null>(null);
  const [improverCandidate, setImproverCandidate] = useState<Candidate | null>(null);
  const [comparisonCandidate, setComparisonCandidate] = useState<Candidate | null>(null);
  const [qrModalCandidate, setQrModalCandidate] = useState<Candidate | null>(null);

  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('app_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `toast-${Date.now()}`;
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const refreshData = async () => {
    try {
      setLoadingCandidates(true);
      const [fetchedJobs, fetchedCandidates, fetchedAnalytics] = await Promise.all([
        api.fetchJobs(),
        api.fetchCandidates({ jobId: selectedJobId }),
        api.fetchAnalytics()
      ]);
      setJobs(fetchedJobs);
      setCandidates(fetchedCandidates);
      setAnalytics(fetchedAnalytics);
    } catch (err) {
      console.error('Error fetching data:', err);
      addToast('Failed to sync with backend API', 'error');
    } finally {
      setLoadingCandidates(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, [selectedJobId]);

  const updateCandidateState = (updated: Candidate) => {
    setCandidates(prev => prev.map(c => c.id === updated.id ? updated : c));
    if (selectedCandidate?.id === updated.id) setSelectedCandidate(updated);
    if (schedulerCandidate?.id === updated.id) setSchedulerCandidate(updated);
    refreshData();
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        activeTab,
        setActiveTab,
        jobs,
        selectedJobId,
        setSelectedJobId,
        candidates,
        loadingCandidates,
        selectedCandidate,
        setSelectedCandidate,
        schedulerCandidate,
        setSchedulerCandidate,
        improverCandidate,
        setImproverCandidate,
        comparisonCandidate,
        setComparisonCandidate,
        qrModalCandidate,
        setQrModalCandidate,
        analytics,
        toasts,
        addToast,
        removeToast,
        refreshData,
        updateCandidateState
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

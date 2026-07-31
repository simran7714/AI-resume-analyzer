import React, { createContext, useContext, useState } from 'react';
import { UserRole } from '../types';

interface AuthContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  user: { name: string; email: string; avatar: string };
  geminiApiKey: string;
  setGeminiApiKey: (key: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('recruiter');
  const [geminiApiKey, setGeminiApiKey] = useState<string>(localStorage.getItem('gemini_api_key') || '');

  const handleSetApiKey = (key: string) => {
    setGeminiApiKey(key);
    localStorage.setItem('gemini_api_key', key);
  };

  const user = {
    name: role === 'recruiter' ? 'Sarah Jenkins' : role === 'candidate' ? 'Alex Rivera' : 'System Admin',
    email: role === 'recruiter' ? 'sarah.jenkins@apex.com' : role === 'candidate' ? 'alex.rivera@dev.com' : 'admin@apex.com',
    avatar: role === 'recruiter'
      ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
      : role === 'candidate'
      ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  };

  return (
    <AuthContext.Provider value={{ role, setRole, user, geminiApiKey, setGeminiApiKey: handleSetApiKey }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

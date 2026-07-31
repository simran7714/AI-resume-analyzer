import React, { useState } from 'react';
import { X, Send, BotMessageSquare, Sparkles, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import * as api from '../utils/api';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

interface Props {
  onClose: () => void;
}

export const AIChatbot: React.FC<Props> = ({ onClose }) => {
  const { geminiApiKey } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hello! I am your AI Resume Coach. Ask me any question about improving your ATS score, keyword alignment, or interview preparation.'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = { id: `u-${Date.now()}`, sender: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const botAnswer = await api.askChatbot(currentInput, {}, geminiApiKey);
      const botMsg: Message = { id: `b-${Date.now()}`, sender: 'bot', text: botAnswer };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { id: `err-${Date.now()}`, sender: 'bot', text: 'Sorry, I hit an issue fetching response. Try again!' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 glass-panel rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-[500px] animate-in slide-in-from-bottom-5 duration-300">
      {/* Drawer Header */}
      <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-white/20">
            <BotMessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold flex items-center gap-1">
              AI Resume Assistant <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </h4>
            <p className="text-[10px] text-indigo-100">Live Resume Guidance & ATS Coach</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg font-bold">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Feed */}
      <div className="p-4 overflow-y-auto flex-1 space-y-3 text-xs bg-slate-50/50 dark:bg-slate-900/50">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                m.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none shadow-xs'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-500" /> Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

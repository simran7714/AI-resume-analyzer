import React, { useEffect, useState } from 'react';
import { ShieldCheck, AlertOctagon, FileText, CheckCircle2, RefreshCw } from 'lucide-react';
import { AuditLog } from '../types';
import * as api from '../utils/api';
import { useApp } from '../context/AppContext';

export const AdminPanel: React.FC = () => {
  const { candidates } = useApp();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  const loadLogs = async () => {
    try {
      setLoading(true);
      const data = await api.fetchAuditLogs();
      setLogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const duplicates = candidates.filter(c => c.duplicateDetected);
  const frauds = candidates.filter(c => c.fraudWarning);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-indigo-500" />
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Admin & Security Audit Center</h2>
          </div>
          <p className="text-xs text-slate-500">Monitor system audit logs, fraud flags, duplicate uploads, and compliance records.</p>
        </div>
        <button
          onClick={loadLogs}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Security Flags Row */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-amber-500/30">
          <h4 className="text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2">
            <AlertOctagon className="w-4 h-4" /> Duplicate Resume Uploads Detected ({duplicates.length})
          </h4>
          <div className="mt-2 space-y-1 text-xs text-slate-600 dark:text-slate-300">
            {duplicates.length > 0 ? (
              duplicates.map(d => (
                <div key={d.id} className="flex justify-between p-2 rounded-lg bg-amber-500/10">
                  <span>{d.name} ({d.email})</span>
                  <span className="font-bold">{d.jobTitle}</span>
                </div>
              ))
            ) : (
              <p className="text-slate-400">No duplicate uploads flagged.</p>
            )}
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-rose-500/30">
          <h4 className="text-sm font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
            <AlertOctagon className="w-4 h-4" /> Fraud & Keyword Stuffing Warnings ({frauds.length})
          </h4>
          <div className="mt-2 space-y-1 text-xs text-slate-600 dark:text-slate-300">
            {frauds.length > 0 ? (
              frauds.map(f => (
                <div key={f.id} className="flex justify-between p-2 rounded-lg bg-rose-500/10">
                  <span>{f.name}</span>
                  <span className="font-bold text-rose-500">{f.fraudWarning}</span>
                </div>
              ))
            ) : (
              <p className="text-slate-400">No fraud flags detected.</p>
            )}
          </div>
        </div>
      </div>

      {/* Audit Log Timeline */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">System Audit Log Trail</h3>
        <div className="space-y-2 text-xs">
          {logs.map((log) => (
            <div key={log.id} className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="font-bold text-slate-900 dark:text-white">{log.action}</span>
              </div>
              <div className="text-[11px] text-slate-400">
                User: <span className="font-semibold text-slate-700 dark:text-slate-300">{log.user}</span> • {new Date(log.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

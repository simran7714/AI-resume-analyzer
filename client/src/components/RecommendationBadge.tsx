import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { RecommendationDecision } from '../types';

interface Props {
  decision: RecommendationDecision;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const RecommendationBadge: React.FC<Props> = ({ decision, title, size = 'md' }) => {
  if (decision === 'APPROVE') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 ${
          size === 'sm' ? 'px-2.5 py-0.5 text-xs' : size === 'lg' ? 'px-4 py-2 text-base' : 'px-3 py-1 text-sm'
        }`}
      >
        <CheckCircle2 className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
        {title || 'Approved for Interview'}
      </span>
    );
  }

  if (decision === 'MANUAL_REVIEW') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 ${
          size === 'sm' ? 'px-2.5 py-0.5 text-xs' : size === 'lg' ? 'px-4 py-2 text-base' : 'px-3 py-1 text-sm'
        }`}
      >
        <AlertTriangle className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
        {title || 'Needs Manual Review'}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 ${
        size === 'sm' ? 'px-2.5 py-0.5 text-xs' : size === 'lg' ? 'px-4 py-2 text-base' : 'px-3 py-1 text-sm'
      }`}
    >
      <XCircle className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
      {title || 'Not Suitable'}
    </span>
  );
};

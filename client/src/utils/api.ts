import { Candidate, JobDescription, AnalyticsData, AuditLog, ImprovedResume } from '../types';

const API_BASE = '/api';

export async function fetchJobs(): Promise<JobDescription[]> {
  const res = await fetch(`${API_BASE}/jobs`);
  const data = await res.json();
  return data.jobs || [];
}

export async function createJob(jobData: Partial<JobDescription>): Promise<JobDescription> {
  const res = await fetch(`${API_BASE}/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jobData),
  });
  const data = await res.json();
  return data.job;
}

export async function fetchCandidates(filters: {
  jobId?: string;
  search?: string;
  decision?: string;
  minAts?: number;
  skill?: string;
} = {}): Promise<Candidate[]> {
  const query = new URLSearchParams();
  if (filters.jobId) query.set('jobId', filters.jobId);
  if (filters.search) query.set('search', filters.search);
  if (filters.decision) query.set('decision', filters.decision);
  if (filters.minAts) query.set('minAts', filters.minAts.toString());
  if (filters.skill) query.set('skill', filters.skill);

  const res = await fetch(`${API_BASE}/candidates?${query.toString()}`);
  const data = await res.json();
  return data.candidates || [];
}

export async function uploadResume(
  fileOrText: { file?: File; text?: string },
  jobId: string,
  apiKey?: string
): Promise<Candidate> {
  const formData = new FormData();
  formData.append('jobId', jobId);

  if (fileOrText.file) {
    formData.append('resume', fileOrText.file);
  } else if (fileOrText.text) {
    formData.append('text', fileOrText.text);
  }

  const headers: Record<string, string> = {};
  if (apiKey) {
    headers['x-gemini-api-key'] = apiKey;
  }

  const res = await fetch(`${API_BASE}/candidates/upload`, {
    method: 'POST',
    headers,
    body: formData,
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to upload and screen resume');
  }
  return data.candidate;
}

export async function updateCandidateDecision(
  id: string,
  decision: 'APPROVE' | 'MANUAL_REVIEW' | 'REJECT',
  note?: string,
  recruiterName?: string
): Promise<Candidate> {
  const res = await fetch(`${API_BASE}/candidates/${id}/decision`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ decision, note, recruiterName }),
  });
  const data = await res.json();
  return data.candidate;
}

export async function scheduleInterview(
  id: string,
  schedule: { date: string; time: string; meetUrl: string }
): Promise<{ candidate: Candidate; emailPreview: any }> {
  const res = await fetch(`${API_BASE}/candidates/${id}/schedule`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(schedule),
  });
  const data = await res.json();
  return data;
}

export async function fetchImprovedResume(id: string): Promise<ImprovedResume> {
  const res = await fetch(`${API_BASE}/candidates/${id}/improved-resume`, {
    method: 'POST',
  });
  const data = await res.json();
  return data.improvedResume;
}

export async function fetchAnalytics(): Promise<AnalyticsData> {
  const res = await fetch(`${API_BASE}/analytics`);
  const data = await res.json();
  return data.analytics;
}

export async function askChatbot(question: string, resumeContext?: any, apiKey?: string): Promise<string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (apiKey) headers['x-gemini-api-key'] = apiKey;

  const res = await fetch(`${API_BASE}/chatbot`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ question, resumeContext }),
  });
  const data = await res.json();
  return data.answer || 'No response generated.';
}

export async function fetchAuditLogs(): Promise<AuditLog[]> {
  const res = await fetch(`${API_BASE}/admin/audit-logs`);
  const data = await res.json();
  return data.logs || [];
}

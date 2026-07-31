export type UserRole = 'recruiter' | 'candidate' | 'admin';

export type RecommendationDecision = 'APPROVE' | 'MANUAL_REVIEW' | 'REJECT';

export interface EvaluationScores {
  atsScore: number;
  grammarScore: number;
  formattingScore: number;
  skillMatchPct: number;
  experienceMatchPct: number;
  educationMatchPct: number;
  certificationMatchPct: number;
  keywordMatchPct: number;
  projectRelevancePct: number;
  overallCandidateScore: number;
}

export interface RecommendationDetails {
  decision: RecommendationDecision;
  title: string;
  color: 'emerald' | 'amber' | 'rose';
  summary: string;
  rejectionReasons: string[];
  strengths: string[];
  weaknesses: string[];
  missingRequiredSkills: string[];
  missingPreferredSkills: string[];
  improvementSuggestions: string[];
}

export interface RecruiterNote {
  author: string;
  text: string;
  createdAt: string;
}

export interface InterviewSchedule {
  date: string;
  time: string;
  meetUrl: string;
  status: string;
}

export interface Candidate {
  id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  experienceYears: number;
  education: string;
  skills: string[];
  certifications: string[];
  rawText: string;
  scores: EvaluationScores;
  recommendation: RecommendationDetails;
  voiceSummaryText: string;
  fraudWarning: string | null;
  duplicateDetected: boolean;
  recruiterNotes: RecruiterNote[];
  status: 'Approved' | 'Manual Review' | 'Rejected';
  interviewScheduled: InterviewSchedule | null;
  createdAt: string;
}

export interface JobDescription {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  minExperience: number;
  minEducation: string;
  requiredSkills: string[];
  preferredSkills: string[];
  requiredCertifications: string[];
  description: string;
  status: string;
  createdAt: string;
}

export interface ImprovedResume {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  professionalSummary: string;
  coreSkills: string[];
  experience: {
    role: string;
    company: string;
    duration: string;
    bulletPoints: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  certifications: string[];
  improvementsApplied: string[];
}

export interface AnalyticsData {
  totalApplications: number;
  approvedCandidates: number;
  manualReviewCandidates: number;
  rejectedCandidates: number;
  approvalRatePct: number;
  rejectionRatePct: number;
  averageAtsScore: number;
  missingSkillsList: { skill: string; count: number }[];
  experienceDistribution: { range: string; count: number }[];
}

export interface AuditLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
}

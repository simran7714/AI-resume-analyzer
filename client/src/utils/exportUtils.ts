import * as XLSX from 'xlsx';
import { Candidate } from '../types';

export function exportCandidatesToExcel(candidates: Candidate[], filename = 'Candidate_Screening_Report.xlsx') {
  const data = candidates.map(c => ({
    'Candidate ID': c.id,
    'Candidate Name': c.name,
    'Job Role': c.jobTitle,
    'Status': c.status,
    'Recommendation': c.recommendation?.title || 'N/A',
    'Overall Score (%)': c.scores?.overallCandidateScore || 0,
    'ATS Score (%)': c.scores?.atsScore || 0,
    'Skill Match (%)': c.scores?.skillMatchPct || 0,
    'Experience Match (%)': c.scores?.experienceMatchPct || 0,
    'Education Match (%)': c.scores?.educationMatchPct || 0,
    'Grammar Score (%)': c.scores?.grammarScore || 0,
    'Formatting Score (%)': c.scores?.formattingScore || 0,
    'Email': c.email,
    'Phone': c.phone,
    'Experience (Years)': c.experienceYears,
    'Education': c.education,
    'Skills': (c.skills || []).join(', '),
    'Missing Required Skills': (c.recommendation?.missingRequiredSkills || []).join(', '),
    'Rejection Reasons': (c.recommendation?.rejectionReasons || []).join('; '),
    'Application Date': new Date(c.createdAt).toLocaleDateString()
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Candidates');
  XLSX.writeFile(workbook, filename);
}

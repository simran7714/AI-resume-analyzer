const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const { getDB, saveDB } = require('./db');
const { extractRawText, parseResumeText } = require('./parser');
const { evaluateResume, generateImprovedResume } = require('./aiEngine');
const { generateCandidateReportPDF, generateImprovedResumePDF } = require('./pdfGenerator');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Multer memory storage for resume uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Helper to log audit actions
function logAction(action, user = 'Recruiter') {
  const db = getDB();
  const log = {
    id: `log-${Date.now()}`,
    action,
    user,
    timestamp: new Date().toISOString()
  };
  db.auditLogs.unshift(log);
  saveDB(db);
}

// ----------------------------------------------------
// JOBS ENDPOINTS
// ----------------------------------------------------
app.get('/api/jobs', (req, res) => {
  const db = getDB();
  res.json({ success: true, jobs: db.jobs });
});

app.post('/api/jobs', (req, res) => {
  const db = getDB();
  const newJob = {
    id: `job-${Date.now()}`,
    title: req.body.title || 'Untitled Role',
    department: req.body.department || 'Engineering',
    location: req.body.location || 'Remote',
    type: req.body.type || 'Full-time',
    salary: req.body.salary || '$100,000 - $130,000',
    minExperience: Number(req.body.minExperience || 0),
    minEducation: req.body.minEducation || "Bachelor's Degree",
    requiredSkills: Array.isArray(req.body.requiredSkills) ? req.body.requiredSkills : (req.body.requiredSkills || '').split(',').map(s => s.trim()).filter(Boolean),
    preferredSkills: Array.isArray(req.body.preferredSkills) ? req.body.preferredSkills : (req.body.preferredSkills || '').split(',').map(s => s.trim()).filter(Boolean),
    requiredCertifications: Array.isArray(req.body.requiredCertifications) ? req.body.requiredCertifications : (req.body.requiredCertifications || '').split(',').map(s => s.trim()).filter(Boolean),
    description: req.body.description || '',
    status: 'Active',
    createdAt: new Date().toISOString()
  };

  db.jobs.unshift(newJob);
  saveDB(db);
  logAction(`Created new Job Role: ${newJob.title}`);
  res.json({ success: true, job: newJob });
});

app.put('/api/jobs/:id', (req, res) => {
  const db = getDB();
  const index = db.jobs.findIndex(j => j.id === req.params.id);
  if (index === -1) return res.status(404).json({ success: false, message: 'Job not found' });

  db.jobs[index] = { ...db.jobs[index], ...req.body };
  saveDB(db);
  logAction(`Updated Job Role: ${db.jobs[index].title}`);
  res.json({ success: true, job: db.jobs[index] });
});

app.delete('/api/jobs/:id', (req, res) => {
  const db = getDB();
  const job = db.jobs.find(j => j.id === req.params.id);
  db.jobs = db.jobs.filter(j => j.id !== req.params.id);
  saveDB(db);
  if (job) logAction(`Deleted Job Role: ${job.title}`);
  res.json({ success: true, message: 'Job deleted' });
});

// ----------------------------------------------------
// CANDIDATES ENDPOINTS
// ----------------------------------------------------
app.get('/api/candidates', (req, res) => {
  const db = getDB();
  let candidates = [...db.candidates];

  const { jobId, search, decision, minAts, skill } = req.query;

  if (jobId && jobId !== 'all') {
    candidates = candidates.filter(c => c.jobId === jobId);
  }
  if (decision && decision !== 'all') {
    candidates = candidates.filter(c => c.recommendation?.decision === decision);
  }
  if (minAts) {
    const atsLimit = Number(minAts);
    candidates = candidates.filter(c => (c.scores?.atsScore || 0) >= atsLimit);
  }
  if (skill) {
    const sLower = skill.toLowerCase();
    candidates = candidates.filter(c => (c.skills || []).some(s => s.toLowerCase().includes(sLower)));
  }
  if (search) {
    const q = search.toLowerCase();
    candidates = candidates.filter(c => 
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.jobTitle.toLowerCase().includes(q) ||
      (c.skills || []).some(s => s.toLowerCase().includes(q))
    );
  }

  res.json({ success: true, candidates });
});

app.get('/api/candidates/:id', (req, res) => {
  const db = getDB();
  const candidate = db.candidates.find(c => c.id === req.params.id);
  if (!candidate) return res.status(404).json({ success: false, message: 'Candidate not found' });
  res.json({ success: true, candidate });
});

app.post('/api/candidates/upload', upload.single('resume'), async (req, res) => {
  try {
    const db = getDB();
    const targetJobId = req.body.jobId || (db.jobs[0] ? db.jobs[0].id : 'job-1');
    const job = db.jobs.find(j => j.id === targetJobId) || db.jobs[0];

    let rawText = '';
    let originalFilename = 'uploaded_resume.pdf';

    if (req.file) {
      originalFilename = req.file.originalname;
      rawText = await extractRawText(req.file.buffer, originalFilename);
    } else if (req.body.text) {
      rawText = req.body.text;
    } else {
      return res.status(400).json({ success: false, message: 'No resume file or text provided' });
    }

    // Parse resume structured entities
    const parsedInfo = parseResumeText(rawText);

    // AI Resume Analysis & Evaluation against Job
    const apiKey = req.headers['x-gemini-api-key'] || process.env.GEMINI_API_KEY;
    const aiEvaluation = await evaluateResume(parsedInfo, job, apiKey);

    // Check for duplicate upload (same email or identical raw text hash)
    const duplicate = db.candidates.some(c => c.email && c.email.toLowerCase() === parsedInfo.email.toLowerCase() && c.email !== '');

    const newCandidate = {
      id: `cand-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      name: parsedInfo.name || 'Anonymous Candidate',
      email: parsedInfo.email || 'candidate@example.com',
      phone: parsedInfo.phone || '+1 (555) 000-0000',
      location: 'San Francisco, CA',
      linkedin: parsedInfo.linkedin || '',
      github: parsedInfo.github || '',
      portfolio: parsedInfo.portfolio || '',
      experienceYears: parsedInfo.experienceYears || 0,
      education: parsedInfo.education || "Bachelor's Degree",
      skills: parsedInfo.skills || [],
      certifications: parsedInfo.certifications || [],
      rawText: parsedInfo.rawText,
      scores: aiEvaluation.scores,
      recommendation: aiEvaluation.recommendation,
      voiceSummaryText: aiEvaluation.voiceSummaryText,
      fraudWarning: aiEvaluation.fraudWarning,
      duplicateDetected: duplicate,
      recruiterNotes: [],
      status: aiEvaluation.recommendation.decision === 'APPROVE' ? 'Approved' : aiEvaluation.recommendation.decision === 'MANUAL_REVIEW' ? 'Manual Review' : 'Rejected',
      interviewScheduled: null,
      createdAt: new Date().toISOString()
    };

    db.candidates.unshift(newCandidate);
    saveDB(db);
    logAction(`Uploaded & Screened Candidate Resume: ${newCandidate.name} (${newCandidate.recommendation.title})`);

    res.json({ success: true, candidate: newCandidate });
  } catch (err) {
    console.error('Upload & Screening Error:', err);
    res.status(500).json({ success: false, message: 'Failed to process resume upload', error: err.message });
  }
});

app.put('/api/candidates/:id/decision', (req, res) => {
  const db = getDB();
  const candidate = db.candidates.find(c => c.id === req.params.id);
  if (!candidate) return res.status(404).json({ success: false, message: 'Candidate not found' });

  const { decision, note, recruiterName } = req.body;
  if (decision) {
    candidate.recommendation.decision = decision;
    candidate.recommendation.title = decision === 'APPROVE' ? 'Recommended for Interview' : decision === 'MANUAL_REVIEW' ? 'Needs Manual Review' : 'Not Suitable';
    candidate.recommendation.color = decision === 'APPROVE' ? 'emerald' : decision === 'MANUAL_REVIEW' ? 'amber' : 'rose';
    candidate.status = decision === 'APPROVE' ? 'Approved' : decision === 'MANUAL_REVIEW' ? 'Manual Review' : 'Rejected';
  }

  if (note) {
    candidate.recruiterNotes.unshift({
      author: recruiterName || 'Recruiter',
      text: note,
      createdAt: new Date().toISOString()
    });
  }

  saveDB(db);
  logAction(`Updated Candidate Status: ${candidate.name} -> ${candidate.status}`);
  res.json({ success: true, candidate });
});

app.post('/api/candidates/:id/schedule', (req, res) => {
  const db = getDB();
  const candidate = db.candidates.find(c => c.id === req.params.id);
  if (!candidate) return res.status(404).json({ success: false, message: 'Candidate not found' });

  const { date, time, meetUrl } = req.body;
  candidate.interviewScheduled = {
    date: date || '2026-08-05',
    time: time || '14:00',
    meetUrl: meetUrl || 'https://meet.google.com/abc-defg-hij',
    status: 'Scheduled'
  };

  saveDB(db);
  logAction(`Scheduled Interview for Candidate: ${candidate.name} on ${date} ${time}`);
  res.json({
    success: true,
    candidate,
    emailPreview: {
      to: candidate.email,
      subject: `Interview Invitation: ${candidate.jobTitle} at Apex Technologies`,
      body: `Dear ${candidate.name},\n\nWe are pleased to invite you to an interview for the position of ${candidate.jobTitle}.\n\nDate: ${date}\nTime: ${time}\nVideo Meeting Link: ${meetUrl}\n\nPlease let us know if you need to reschedule.\n\nBest regards,\nRecruitment Team`
    }
  });
});

app.post('/api/candidates/:id/improved-resume', async (req, res) => {
  const db = getDB();
  const candidate = db.candidates.find(c => c.id === req.params.id);
  if (!candidate) return res.status(404).json({ success: false, message: 'Candidate not found' });

  const job = db.jobs.find(j => j.id === candidate.jobId) || db.jobs[0];
  const improved = await generateImprovedResume(candidate, job);
  res.json({ success: true, improvedResume: improved });
});

app.get('/api/candidates/:id/report-pdf', async (req, res) => {
  const db = getDB();
  const candidate = db.candidates.find(c => c.id === req.params.id);
  if (!candidate) return res.status(404).json({ success: false, message: 'Candidate not found' });

  try {
    const pdfBuffer = await generateCandidateReportPDF(candidate);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${candidate.name.replace(/\s+/g, '_')}_Report.pdf"`);
    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to generate PDF report' });
  }
});

app.get('/api/candidates/:id/improved-resume-pdf', async (req, res) => {
  const db = getDB();
  const candidate = db.candidates.find(c => c.id === req.params.id);
  if (!candidate) return res.status(404).json({ success: false, message: 'Candidate not found' });

  try {
    const job = db.jobs.find(j => j.id === candidate.jobId) || db.jobs[0];
    const improved = await generateImprovedResume(candidate, job);
    const pdfBuffer = await generateImprovedResumePDF(improved);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${candidate.name.replace(/\s+/g, '_')}_ATS_Resume.pdf"`);
    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to generate Improved Resume PDF' });
  }
});

// ----------------------------------------------------
// ANALYTICS & ADMIN ENDPOINTS
// ----------------------------------------------------
app.get('/api/analytics', (req, res) => {
  const db = getDB();
  const candidates = db.candidates;

  const total = candidates.length;
  const approved = candidates.filter(c => c.recommendation?.decision === 'APPROVE').length;
  const manualReview = candidates.filter(c => c.recommendation?.decision === 'MANUAL_REVIEW').length;
  const rejected = candidates.filter(c => c.recommendation?.decision === 'REJECT').length;

  const sumAts = candidates.reduce((acc, c) => acc + (c.scores?.atsScore || 0), 0);
  const avgAts = total > 0 ? Math.round(sumAts / total) : 0;

  // Missing skills frequency
  const missingSkillCounts = {};
  candidates.forEach(c => {
    (c.recommendation?.missingRequiredSkills || []).forEach(sk => {
      missingSkillCounts[sk] = (missingSkillCounts[sk] || 0) + 1;
    });
  });

  const missingSkillsList = Object.entries(missingSkillCounts)
    .map(([skill, count]) => ({ skill, count }))
    .sort((a, b) => b.count - a.count);

  res.json({
    success: true,
    analytics: {
      totalApplications: total,
      approvedCandidates: approved,
      manualReviewCandidates: manualReview,
      rejectedCandidates: rejected,
      approvalRatePct: total > 0 ? Math.round((approved / total) * 100) : 0,
      rejectionRatePct: total > 0 ? Math.round((rejected / total) * 100) : 0,
      averageAtsScore: avgAts,
      missingSkillsList,
      experienceDistribution: [
        { range: '0-2 Yrs', count: candidates.filter(c => c.experienceYears <= 2).length },
        { range: '3-5 Yrs', count: candidates.filter(c => c.experienceYears >= 3 && c.experienceYears <= 5).length },
        { range: '6-8 Yrs', count: candidates.filter(c => c.experienceYears >= 6 && c.experienceYears <= 8).length },
        { range: '9+ Yrs', count: candidates.filter(c => c.experienceYears >= 9).length }
      ]
    }
  });
});

app.post('/api/chatbot', async (req, res) => {
  const { question, resumeContext } = req.body;
  const apiKey = req.headers['x-gemini-api-key'] || process.env.GEMINI_API_KEY;

  if (apiKey && apiKey.trim().length > 5) {
    try {
      const { GoogleGenAI } = require('@google/genai');
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are an AI Resume Coach. Provide helpful, actionable advice for this question: "${question}". Context: ${JSON.stringify(resumeContext || {})}`
      });
      return res.json({ success: true, answer: response.text });
    } catch (err) {
      console.warn('Chatbot Gemini fallback:', err.message);
    }
  }

  // Fallback intelligent chatbot response
  let answer = "To improve your resume ATS score, focus on: 1) Aligning exact technical skill keywords with the job description, 2) Formatting with standard section titles, and 3) Using quantifiable STAR bullet points (e.g. 'Increased speed by 40%').";
  if (question.toLowerCase().includes('ats') || question.toLowerCase().includes('score')) {
    answer = "ATS (Applicant Tracking System) scores evaluate keyword alignment, formatting readability, and minimum job qualifications. Ensure you include relevant tech stack names and avoid complex multi-column graphic templates.";
  } else if (question.toLowerCase().includes('skill') || question.toLowerCase().includes('gap')) {
    answer = "To close a skill gap: 1) Highlight hands-on projects or certifications covering the missing skills, 2) Group core skills near the top of your resume, and 3) Connect skills directly to project outcomes.";
  }

  res.json({ success: true, answer });
});

app.get('/api/admin/audit-logs', (req, res) => {
  const db = getDB();
  res.json({ success: true, logs: db.auditLogs });
});

// Start Server
app.listen(PORT, () => {
  console.log(`AI Resume Screening Backend Server running on http://localhost:${PORT}`);
});

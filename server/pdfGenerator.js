const PDFDocument = require('pdfkit');

/**
 * Generate PDF Buffer for Candidate Analysis Report
 */
function generateCandidateReportPDF(candidate) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 40 });
      const buffers = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      // Header Banner
      doc.fillColor('#0f172a').fontSize(22).text('AI Resume Analysis & Candidate Report', { align: 'center' });
      doc.fontSize(10).fillColor('#64748b').text(`Generated on ${new Date().toLocaleDateString()} | Confidential`, { align: 'center' });
      doc.moveDown(1.5);

      // Candidate Summary Section
      doc.fillColor('#1e293b').fontSize(16).text(candidate.name || 'Candidate Report', { underline: true });
      doc.fontSize(10).fillColor('#475569');
      doc.text(`Applied Position: ${candidate.jobTitle || 'N/A'}`);
      doc.text(`Email: ${candidate.email || 'N/A'} | Phone: ${candidate.phone || 'N/A'}`);
      doc.text(`Location: ${candidate.location || 'N/A'}`);
      doc.text(`Experience: ${candidate.experienceYears || 0} years | Education: ${candidate.education || 'N/A'}`);
      doc.moveDown(1);

      // Decision Badge Box
      const decColor = candidate.recommendation?.decision === 'APPROVE' ? '#059669' : candidate.recommendation?.decision === 'MANUAL_REVIEW' ? '#d97706' : '#dc2626';
      doc.rect(40, doc.y, 530, 40).fillAndStroke('#f8fafc', decColor);
      doc.moveUp(2);
      doc.fillColor(decColor).fontSize(14).text(`RECOMMENDATION: ${candidate.recommendation?.title || 'Evaluated'}`, 55, doc.y + 12);
      doc.moveDown(2);

      // Scores Grid
      doc.fillColor('#0f172a').fontSize(14).text('Evaluation Metrics Breakdown', { underline: true });
      doc.moveDown(0.5);

      const scores = candidate.scores || {};
      doc.fontSize(10).fillColor('#334155');
      doc.text(`• Overall Candidate Score: ${scores.overallCandidateScore || 0}%`);
      doc.text(`• ATS Match Score: ${scores.atsScore || 0}%`);
      doc.text(`• Skill Match: ${scores.skillMatchPct || 0}%`);
      doc.text(`• Experience Match: ${scores.experienceMatchPct || 0}%`);
      doc.text(`• Education Match: ${scores.educationMatchPct || 0}%`);
      doc.text(`• Grammar Score: ${scores.grammarScore || 0}%`);
      doc.text(`• Resume Formatting: ${scores.formattingScore || 0}%`);
      doc.moveDown(1);

      // Strengths & Weaknesses
      doc.fillColor('#059669').fontSize(12).text('Key Strengths');
      doc.fontSize(9).fillColor('#334155');
      (candidate.recommendation?.strengths || ['Strong technical match']).forEach(s => doc.text(`+ ${s}`));
      doc.moveDown(0.8);

      if (candidate.recommendation?.rejectionReasons?.length > 0) {
        doc.fillColor('#dc2626').fontSize(12).text('Rejection / Missing Requirements');
        doc.fontSize(9).fillColor('#334155');
        candidate.recommendation.rejectionReasons.forEach(r => doc.text(`- ${r}`));
        doc.moveDown(0.8);
      }

      // Improvement Suggestions
      doc.fillColor('#2563eb').fontSize(12).text('AI Recommended Action Plan');
      doc.fontSize(9).fillColor('#334155');
      (candidate.recommendation?.improvementSuggestions || []).forEach(imp => doc.text(`-> ${imp}`));

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Generate Improved ATS Resume PDF Buffer
 */
function generateImprovedResumePDF(improvedResume) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 40 });
      const buffers = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      // Candidate Header
      doc.fillColor('#0f172a').fontSize(22).text(improvedResume.name, { align: 'center' });
      doc.fontSize(10).fillColor('#475569').text(`${improvedResume.email} | ${improvedResume.phone} | ${improvedResume.location}`, { align: 'center' });
      if (improvedResume.linkedin || improvedResume.github) {
        doc.text(`${improvedResume.linkedin || ''}  ${improvedResume.github || ''}`, { align: 'center' });
      }
      doc.moveDown(1);

      // Section Line
      doc.moveTo(40, doc.y).lineTo(570, doc.y).stroke('#cbd5e1');
      doc.moveDown(1);

      // Professional Summary
      doc.fillColor('#1e293b').fontSize(12).text('PROFESSIONAL SUMMARY', { bold: true });
      doc.fontSize(9.5).fillColor('#334155').text(improvedResume.professionalSummary, { align: 'justify' });
      doc.moveDown(1);

      // Core Skills
      doc.fillColor('#1e293b').fontSize(12).text('CORE SKILLS & TECHNOLOGIES');
      doc.fontSize(9.5).fillColor('#334155').text((improvedResume.coreSkills || []).join('  •  '));
      doc.moveDown(1);

      // Professional Experience
      doc.fillColor('#1e293b').fontSize(12).text('PROFESSIONAL EXPERIENCE');
      (improvedResume.experience || []).forEach(exp => {
        doc.moveDown(0.5);
        doc.fontSize(10).fillColor('#0f172a').text(`${exp.role} - ${exp.company}`, { bold: true });
        doc.fontSize(8.5).fillColor('#64748b').text(exp.duration);
        doc.moveDown(0.3);
        doc.fontSize(9).fillColor('#334155');
        (exp.bulletPoints || []).forEach(bp => doc.text(`• ${bp}`));
      });
      doc.moveDown(1);

      // Education & Certifications
      doc.fillColor('#1e293b').fontSize(12).text('EDUCATION & CERTIFICATIONS');
      (improvedResume.education || []).forEach(edu => {
        doc.fontSize(9.5).fillColor('#334155').text(`• ${edu.degree} - ${edu.institution} (${edu.year})`);
      });
      (improvedResume.certifications || []).forEach(cert => {
        doc.fontSize(9.5).fillColor('#334155').text(`• Certification: ${cert}`);
      });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  generateCandidateReportPDF,
  generateImprovedResumePDF
};

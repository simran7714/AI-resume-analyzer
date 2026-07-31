const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

/**
 * Extract raw text from buffer based on file mimetype or extension
 */
async function extractRawText(buffer, filename) {
  const ext = filename.toLowerCase().slice(filename.lastIndexOf('.'));
  if (ext === '.pdf') {
    try {
      const data = await pdfParse(buffer);
      return data.text || '';
    } catch (err) {
      console.error('PDF Parse Error:', err);
      return buffer.toString('utf-8');
    }
  } else if (ext === '.docx' || ext === '.doc') {
    try {
      const result = await mammoth.extractRawText({ buffer });
      return result.value || '';
    } catch (err) {
      console.error('Mammoth DOCX Parse Error:', err);
      return buffer.toString('utf-8');
    }
  } else {
    // Plain text or fallback
    return buffer.toString('utf-8');
  }
}

/**
 * Extract structured contact & resume info using robust Regex & Heuristics
 */
function parseResumeText(text) {
  const cleanText = text || '';
  
  // 1. Email extraction
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i;
  const emailMatch = cleanText.match(emailRegex);
  const email = emailMatch ? emailMatch[1] : '';

  // 2. Phone extraction
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  const phoneMatch = cleanText.match(phoneRegex);
  const phone = phoneMatch ? phoneMatch[0] : '';

  // 3. Links (LinkedIn, GitHub, Portfolio)
  const linkedinMatch = cleanText.match(/(linkedin\.com\/in\/[a-zA-Z0-9_-]+)/i);
  const linkedin = linkedinMatch ? linkedinMatch[1] : '';

  const githubMatch = cleanText.match(/(github\.com\/[a-zA-Z0-9_-]+)/i);
  const github = githubMatch ? githubMatch[1] : '';

  const portfolioMatch = cleanText.match(/((https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.(dev|io|com|me|ai|design|org))(?!\/in\/)/i);
  const portfolio = portfolioMatch && !portfolioMatch[1].includes('linkedin') && !portfolioMatch[1].includes('github') ? portfolioMatch[1] : '';

  // 4. Name extraction heuristic (First non-empty line or text near contact)
  const lines = cleanText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  let name = 'Candidate Name';
  for (let line of lines.slice(0, 5)) {
    if (!line.includes('@') && !line.match(/\d{5}/) && !line.toLowerCase().includes('resume') && line.length < 40) {
      name = line.replace(/[^a-zA-Z\s.-]/g, '').trim();
      if (name.length > 2) break;
    }
  }

  // 5. Experience years estimation
  let experienceYears = 0;
  const expMatch = cleanText.match(/(\d{1,2})\+?\s*(years?|yrs?)\s*(of)?\s*(experience|exp)?/i);
  if (expMatch) {
    experienceYears = parseInt(expMatch[1], 10);
  } else {
    // Estimate from year ranges e.g. 2018 - 2024
    const yearMatches = cleanText.match(/\b(20\d{2}|19\d{2})\b/g);
    if (yearMatches && yearMatches.length >= 2) {
      const years = yearMatches.map(y => parseInt(y, 10)).sort((a, b) => a - b);
      const diff = years[years.length - 1] - years[0];
      if (diff >= 0 && diff <= 40) {
        experienceYears = Math.max(1, diff);
      }
    }
  }

  // 6. Common Tech & Professional Skill Dictionary
  const skillDictionary = [
    'React', 'TypeScript', 'JavaScript', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'SQL',
    'Python', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'NLP', 'LLMs', 'MLOps', 'Pandas', 'NumPy',
    'AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux', 'Git', 'GraphQL', 'REST API',
    'Tailwind CSS', 'HTML', 'CSS', 'Redux', 'Jest', 'Redis', 'Figma', 'UI/UX Design', 'Design Systems',
    'User Research', 'Wireframing', 'Prototyping', 'C++', 'Java', 'Go', 'Rust', 'Spring Boot',
    'Microservices', 'Spark', 'Prometheus', 'Grafana', 'Ansible', 'Bash', 'Next.js', 'Vite'
  ];

  const foundSkills = [];
  const lowerText = cleanText.toLowerCase();
  for (const skill of skillDictionary) {
    const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (regex.test(cleanText)) {
      foundSkills.push(skill);
    }
  }

  // 7. Education extraction heuristic
  let education = 'Not specified';
  if (/ph\.?d|doctorate/i.test(cleanText)) {
    education = "Ph.D. / Doctorate Degree";
  } else if (/master|m\.?s|m\.?tech|mba/i.test(cleanText)) {
    education = "Master's Degree";
  } else if (/bachelor|b\.?s|b\.?tech|b\.?a/i.test(cleanText)) {
    education = "Bachelor's Degree";
  } else if (/associate|diploma/i.test(cleanText)) {
    education = "Associate Degree / Diploma";
  }

  // 8. Certification extraction
  const foundCerts = [];
  const certKeywords = [
    'AWS Certified', 'Meta Front-End Developer', 'TensorFlow Developer', 'Google UX Design',
    'CKA', 'Certified Kubernetes Administrator', 'PMP', 'Scrum Master', 'AZ-900', 'CISSP'
  ];
  for (const cert of certKeywords) {
    if (new RegExp(`\\b${cert}\\b`, 'i').test(cleanText)) {
      foundCerts.push(cert);
    }
  }

  return {
    name,
    email,
    phone,
    linkedin,
    github,
    portfolio,
    experienceYears,
    skills: [...new Set(foundSkills)],
    education,
    certifications: [...new Set(foundCerts)],
    rawText: cleanText
  };
}

module.exports = {
  extractRawText,
  parseResumeText
};

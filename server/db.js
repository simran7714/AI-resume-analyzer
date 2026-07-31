const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial Seed Data
const initialData = {
  jobs: [
    {
      id: 'job-1',
      title: 'Senior Full Stack Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA (Hybrid)',
      type: 'Full-time',
      salary: '$140,000 - $175,000',
      minExperience: 5,
      minEducation: "Bachelor's in Computer Science or related",
      requiredSkills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'REST API', 'Git'],
      preferredSkills: ['GraphQL', 'AWS', 'Docker', 'Tailwind CSS', 'Redis', 'CI/CD'],
      requiredCertifications: ['AWS Certified Developer (Optional)', 'Meta Front-End Developer'],
      description: 'We are seeking a high-performing Senior Full Stack Engineer to lead front-end architecture and backend services for our enterprise cloud platform.',
      status: 'Active',
      createdAt: '2026-07-20T10:00:00.000Z'
    },
    {
      id: 'job-2',
      title: 'Data Science & ML Lead',
      department: 'AI Research',
      location: 'New York, NY (Remote)',
      type: 'Full-time',
      salary: '$160,000 - $195,000',
      minExperience: 4,
      minEducation: "Master's or Ph.D. in CS, Data Science, or Math",
      requiredSkills: ['Python', 'PyTorch', 'SQL', 'Scikit-Learn', 'NLP', 'Data Visualization'],
      preferredSkills: ['TensorFlow', 'LLMs', 'MLOps', 'Docker', 'Spark', 'Kubernetes'],
      requiredCertifications: ['TensorFlow Developer Certificate'],
      description: 'Lead state-of-the-art NLP and recommendation model development. Build scalable data pipelines and deploy LLM applications.',
      status: 'Active',
      createdAt: '2026-07-22T14:30:00.000Z'
    },
    {
      id: 'job-3',
      title: 'Senior DevOps & Cloud Architect',
      department: 'Infrastructure',
      location: 'Austin, TX (On-site)',
      type: 'Full-time',
      salary: '$150,000 - $185,000',
      minExperience: 6,
      minEducation: "Bachelor's in IT, CS, or equivalent experience",
      requiredSkills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'Linux'],
      preferredSkills: ['Prometheus', 'Grafana', 'Python', 'Bash', 'Ansible', 'Security Compliance'],
      requiredCertifications: ['AWS Certified Solutions Architect Professional', 'CKA (Certified Kubernetes Administrator)'],
      description: 'Architect resilient multi-region infrastructure, automate deployment pipelines, and enforce zero-trust cloud security standards.',
      status: 'Active',
      createdAt: '2026-07-25T09:15:00.000Z'
    },
    {
      id: 'job-4',
      title: 'Lead Product Designer (UI/UX)',
      department: 'Design',
      location: 'Remote (US/Canada)',
      type: 'Full-time',
      salary: '$130,000 - $160,000',
      minExperience: 4,
      minEducation: "Bachelor's in Design, HCI, or equivalent",
      requiredSkills: ['Figma', 'UI/UX Design', 'Design Systems', 'User Research', 'Wireframing', 'Prototyping'],
      preferredSkills: ['HTML/CSS', 'Framer', 'Micro-interactions', 'Usability Testing', 'Accessibility (WCAG)'],
      requiredCertifications: ['Google UX Design Professional Certificate'],
      description: 'Craft beautiful, accessible, human-centric design systems and modern web application user interfaces.',
      status: 'Active',
      createdAt: '2026-07-28T11:00:00.000Z'
    }
  ],
  candidates: [
    {
      id: 'cand-101',
      jobId: 'job-1',
      jobTitle: 'Senior Full Stack Engineer',
      name: 'Alex Rivera',
      email: 'alex.rivera@techmail.dev',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/alexrivera-dev',
      github: 'github.com/alexrivera',
      portfolio: 'alexrivera.dev',
      experienceYears: 6,
      education: "Bachelor of Science in Computer Science, UC Berkeley (2020)",
      skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'GraphQL', 'AWS', 'Docker', 'REST API', 'Git', 'Tailwind CSS', 'Redis', 'Jest'],
      certifications: ['AWS Certified Developer Associate', 'Meta Front-End Developer'],
      rawText: 'Alex Rivera... Senior Software Engineer with 6 years experience building distributed web applications using React, TypeScript, Node.js, and PostgreSQL.',
      scores: {
        atsScore: 94,
        grammarScore: 96,
        formattingScore: 95,
        skillMatchPct: 95,
        experienceMatchPct: 100,
        educationMatchPct: 100,
        certificationMatchPct: 100,
        keywordMatchPct: 92,
        projectRelevancePct: 94,
        overallCandidateScore: 95
      },
      recommendation: {
        decision: 'APPROVE', // APPROVE | MANUAL_REVIEW | REJECT
        title: 'Recommended for Interview',
        color: 'emerald',
        summary: 'Exceptional candidate with 6 years of relevant full-stack experience, perfect skill match (95%), matching AWS certification, and flawless resume structure.',
        rejectionReasons: [],
        strengths: [
          'Mastery in core required stack: React, TypeScript, Node.js, PostgreSQL',
          'Holds preferred skills (GraphQL, AWS, Docker, Redis)',
          'Possesses required Meta Front-End Developer certification',
          '6 years experience exceeds 5-year requirement'
        ],
        weaknesses: [
          'Could highlight CI/CD deployment pipeline metrics further'
        ],
        missingRequiredSkills: [],
        missingPreferredSkills: ['CI/CD'],
        improvementSuggestions: [
          'Add quantifiable outcomes (e.g. % improvement in latency or throughput) to recent projects',
          'Include architectural diagrams link in online portfolio'
        ]
      },
      duplicateDetected: false,
      fraudWarning: null,
      voiceSummaryText: "Alex Rivera is a top-tier Senior Full Stack Engineer candidate with 6 years of industry experience. Alex excels in React, TypeScript, Node.js, and PostgreSQL, backed by AWS Associate and Meta Front-End certifications. Rated 95 out of 100 overall.",
      recruiterNotes: [
        { author: 'Sarah Tech Recruiter', text: 'Stellar resume match. Fast-track to technical screening.', createdAt: '2026-07-29T14:00:00Z' }
      ],
      status: 'Approved',
      interviewScheduled: {
        date: '2026-08-04',
        time: '14:00',
        meetUrl: 'https://meet.google.com/abc-defg-hij',
        status: 'Scheduled'
      },
      createdAt: '2026-07-29T10:15:00.000Z'
    },
    {
      id: 'cand-102',
      jobId: 'job-1',
      jobTitle: 'Senior Full Stack Engineer',
      name: 'Michael Chang',
      email: 'm.chang@codehub.io',
      phone: '+1 (555) 876-5432',
      location: 'San Jose, CA',
      linkedin: 'linkedin.com/in/michaelchang-dev',
      github: 'github.com/mchang-codes',
      portfolio: 'michaelchang.io',
      experienceYears: 4,
      education: "Bachelor of Science in Information Technology, San Jose State University",
      skills: ['React', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'REST API', 'Git', 'HTML/CSS'],
      certifications: [],
      rawText: 'Michael Chang... Software Engineer with 4 years experience working with JavaScript, React, Node.js, and MongoDB.',
      scores: {
        atsScore: 76,
        grammarScore: 88,
        formattingScore: 84,
        skillMatchPct: 78,
        experienceMatchPct: 80,
        educationMatchPct: 90,
        certificationMatchPct: 50,
        keywordMatchPct: 72,
        projectRelevancePct: 80,
        overallCandidateScore: 77
      },
      recommendation: {
        decision: 'MANUAL_REVIEW',
        title: 'Needs Manual Review',
        color: 'amber',
        summary: 'Solid foundational software engineer with React & Node experience, but missing TypeScript & PostgreSQL skills, and 4 years experience is slightly below the 5-year requirement.',
        rejectionReasons: [
          'Missing mandatory skill: TypeScript',
          'Missing mandatory database skill: PostgreSQL (experienced in MongoDB)',
          'Experience (4 years) is slightly under min required 5 years'
        ],
        strengths: [
          'Strong practical experience with React, Node.js, and REST APIs',
          'Active GitHub profile with full-stack projects'
        ],
        weaknesses: [
          'Lacks TypeScript experience',
          'No relational database background listed (No PostgreSQL/SQL)',
          'Missing preferred cloud/container tools (AWS, Docker)'
        ],
        missingRequiredSkills: ['TypeScript', 'PostgreSQL'],
        missingPreferredSkills: ['GraphQL', 'AWS', 'Docker', 'Tailwind CSS', 'Redis', 'CI/CD'],
        improvementSuggestions: [
          'Complete a TypeScript conversion for one of your core React/Node repositories',
          'Gain practical experience with PostgreSQL schema design and indexing'
        ]
      },
      duplicateDetected: false,
      fraudWarning: null,
      voiceSummaryText: "Michael Chang has 4 years experience with React, JavaScript, and Node.js. Missing TypeScript and PostgreSQL, making him a candidate for manual review before scheduling.",
      recruiterNotes: [
        { author: 'David Hiring Lead', text: 'Strong React developer, let us check if he is open to learning TypeScript on the job.', createdAt: '2026-07-30T09:30:00Z' }
      ],
      status: 'Manual Review',
      interviewScheduled: null,
      createdAt: '2026-07-29T11:45:00.000Z'
    },
    {
      id: 'cand-103',
      jobId: 'job-1',
      jobTitle: 'Senior Full Stack Engineer',
      name: 'Priya Sharma',
      email: 'priya.sharma@domain.org',
      phone: '+1 (555) 998-1122',
      location: 'Fremont, CA',
      linkedin: 'linkedin.com/in/priyasharma-eng',
      github: 'github.com/psharma-dev',
      portfolio: '',
      experienceYears: 2,
      education: "Associate Degree in Web Development",
      skills: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'PHP', 'MySQL'],
      certifications: [],
      rawText: 'Priya Sharma... Web Developer with 2 years experience building PHP and MySQL websites.',
      scores: {
        atsScore: 54,
        grammarScore: 78,
        formattingScore: 65,
        skillMatchPct: 35,
        experienceMatchPct: 40,
        educationMatchPct: 60,
        certificationMatchPct: 0,
        keywordMatchPct: 40,
        projectRelevancePct: 50,
        overallCandidateScore: 48
      },
      recommendation: {
        decision: 'REJECT',
        title: 'Not Suitable',
        color: 'rose',
        summary: 'Candidate does not meet the minimum requirements for Senior Full Stack Engineer. Significant skill gap in React, TypeScript, Node.js, and lacks required experience.',
        rejectionReasons: [
          'ATS score (54) below minimum threshold of 70',
          'Missing key required skills: React, TypeScript, Node.js, PostgreSQL',
          'Experience (2 years) far below minimum requirement of 5 years',
          'Missing mandatory certifications and higher education requirement'
        ],
        strengths: [
          'Has web development background in HTML/CSS/PHP'
        ],
        weaknesses: [
          'No modern JavaScript framework experience (React)',
          'No TypeScript or Node.js background',
          'Resume formatting score is low (65/100)'
        ],
        missingRequiredSkills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'REST API'],
        missingPreferredSkills: ['GraphQL', 'AWS', 'Docker', 'Tailwind CSS', 'Redis', 'CI/CD'],
        improvementSuggestions: [
          'Upskill in modern JavaScript ecosystem (ES6+, TypeScript, React)',
          'Re-structure resume with clear ATS headers, bullet points, and quantitative metrics'
        ]
      },
      duplicateDetected: false,
      fraudWarning: null,
      voiceSummaryText: "Priya Sharma has 2 years of PHP/MySQL web dev experience. Currently lacks modern React/TypeScript stack and required experience for this Senior role.",
      recruiterNotes: [],
      status: 'Rejected',
      interviewScheduled: null,
      createdAt: '2026-07-29T16:20:00.000Z'
    },
    {
      id: 'cand-104',
      jobId: 'job-2',
      jobTitle: 'Data Science & ML Lead',
      name: 'Dr. Elena Rostova',
      email: 'elena.rostova@ai-labs.org',
      phone: '+1 (555) 443-8899',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/elena-rostova-phd',
      github: 'github.com/erostova-ml',
      portfolio: 'elenarostova.ai',
      experienceYears: 7,
      education: "Ph.D. in Computer Science & Machine Learning, Columbia University",
      skills: ['Python', 'PyTorch', 'TensorFlow', 'SQL', 'Scikit-Learn', 'NLP', 'LLMs', 'MLOps', 'Docker', 'Data Visualization', 'Spark'],
      certifications: ['TensorFlow Developer Certificate', 'AWS Machine Learning Specialty'],
      rawText: 'Dr. Elena Rostova... Lead Data Scientist with 7 years post-PhD experience building NLP transformer models, sentiment analysis pipelines, and LLM applications.',
      scores: {
        atsScore: 97,
        grammarScore: 98,
        formattingScore: 96,
        skillMatchPct: 98,
        experienceMatchPct: 100,
        educationMatchPct: 100,
        certificationMatchPct: 100,
        keywordMatchPct: 96,
        projectRelevancePct: 98,
        overallCandidateScore: 98
      },
      recommendation: {
        decision: 'APPROVE',
        title: 'Recommended for Interview',
        color: 'emerald',
        summary: 'Outstanding candidate with Ph.D. in CS/ML, 7 years experience in LLMs and NLP, 100% certification match, and comprehensive MLOps expertise.',
        rejectionReasons: [],
        strengths: [
          'Ph.D. degree in CS/ML directly matches preferred academic background',
          'Extensive experience with PyTorch, NLP, LLMs, and Scikit-Learn',
          'Strong MLOps & production deployment expertise with Docker & AWS',
          'Exceeds 4 years minimum experience requirement (7 years)'
        ],
        weaknesses: [],
        missingRequiredSkills: [],
        missingPreferredSkills: ['Kubernetes'],
        improvementSuggestions: [
          'Highlight any custom model quantization or edge deployment benchmarks'
        ]
      },
      duplicateDetected: false,
      fraudWarning: null,
      voiceSummaryText: "Dr. Elena Rostova holds a PhD in CS and 7 years of ML experience specializing in PyTorch and NLP. Top candidate score of 98 with TensorFlow certification.",
      recruiterNotes: [
        { author: 'AI Practice Manager', text: 'Top pick for the ML Lead opening. Schedule interview immediately.', createdAt: '2026-07-30T10:15:00Z' }
      ],
      status: 'Approved',
      interviewScheduled: {
        date: '2026-08-05',
        time: '11:00',
        meetUrl: 'https://meet.google.com/xyz-uvwx-rst',
        status: 'Scheduled'
      },
      createdAt: '2026-07-30T08:00:00.000Z'
    },
    {
      id: 'cand-105',
      jobId: 'job-3',
      jobTitle: 'Senior DevOps & Cloud Architect',
      name: 'Marcus Vance',
      email: 'm.vance@cloudops.net',
      phone: '+1 (555) 776-3344',
      location: 'Austin, TX',
      linkedin: 'linkedin.com/in/marcusvance-cloud',
      github: 'github.com/mvance-infra',
      portfolio: 'vancecloud.io',
      experienceYears: 8,
      education: "Bachelor of Science in Computer Engineering, UT Austin",
      skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'Linux', 'Python', 'Prometheus', 'Grafana', 'Ansible', 'Bash'],
      certifications: ['AWS Certified Solutions Architect Professional', 'CKA (Certified Kubernetes Administrator)'],
      rawText: 'Marcus Vance... Senior Cloud Architect with 8 years designing multi-region Kubernetes clusters on AWS using Terraform and ArgoCD.',
      scores: {
        atsScore: 96,
        grammarScore: 95,
        formattingScore: 94,
        skillMatchPct: 96,
        experienceMatchPct: 100,
        educationMatchPct: 100,
        certificationMatchPct: 100,
        keywordMatchPct: 95,
        projectRelevancePct: 96,
        overallCandidateScore: 96
      },
      recommendation: {
        decision: 'APPROVE',
        title: 'Recommended for Interview',
        color: 'emerald',
        summary: 'Exceptional Cloud Architect holding both required top-tier certifications (AWS Pro Architect + CKA), with 8 years of hands-on Kubernetes and IaC experience.',
        rejectionReasons: [],
        strengths: [
          'Dual gold-standard certifications: AWS Solutions Architect Professional & CKA',
          '8 years of deep cloud automation and Kubernetes infrastructure',
          'Complete match across required and preferred tools (Terraform, Prometheus, Grafana, Ansible)'
        ],
        weaknesses: [],
        missingRequiredSkills: [],
        missingPreferredSkills: [],
        improvementSuggestions: [
          'Add details regarding cost optimization or FinOps savings achieved'
        ]
      },
      duplicateDetected: false,
      fraudWarning: null,
      voiceSummaryText: "Marcus Vance is a Senior DevOps Architect with 8 years experience, holding CKA and AWS Solutions Architect Professional certifications. Ideal fit for Austin on-site position.",
      recruiterNotes: [],
      status: 'Approved',
      interviewScheduled: null,
      createdAt: '2026-07-30T13:30:00.000Z'
    },
    {
      id: 'cand-106',
      jobId: 'job-2',
      jobTitle: 'Data Science & ML Lead',
      name: 'James K. Wright',
      email: 'jkwright@analytica.co',
      phone: '+1 (555) 321-6549',
      location: 'Boston, MA',
      linkedin: 'linkedin.com/in/jkwright-ds',
      github: 'github.com/jkwright',
      portfolio: '',
      experienceYears: 3,
      education: "Bachelor of Science in Statistics, Boston University",
      skills: ['Python', 'SQL', 'Scikit-Learn', 'Pandas', 'Data Visualization', 'Tableau', 'R'],
      certifications: [],
      rawText: 'James Wright... Data Analyst / Scientist with 3 years experience writing Python scripts, SQL queries, and building Tableau dashboards.',
      scores: {
        atsScore: 71,
        grammarScore: 89,
        formattingScore: 86,
        skillMatchPct: 72,
        experienceMatchPct: 70,
        educationMatchPct: 75,
        certificationMatchPct: 0,
        keywordMatchPct: 70,
        projectRelevancePct: 74,
        overallCandidateScore: 73
      },
      recommendation: {
        decision: 'MANUAL_REVIEW',
        title: 'Needs Manual Review',
        color: 'amber',
        summary: 'Solid Data Analyst looking to step up to ML Lead, but lacks PyTorch, NLP, and deep learning framework experience.',
        rejectionReasons: [
          'Missing key ML frameworks: PyTorch or TensorFlow',
          'Missing NLP experience',
          'Experience (3 years) below required 4+ years for Lead role'
        ],
        strengths: [
          'Strong Python & SQL analytical baseline',
          'Good data visualization capabilities'
        ],
        weaknesses: [
          'No deep learning or NLP model training mentioned',
          'No MLOps or containerization tools'
        ],
        missingRequiredSkills: ['PyTorch', 'NLP'],
        missingPreferredSkills: ['TensorFlow', 'LLMs', 'MLOps', 'Docker', 'Spark', 'Kubernetes'],
        improvementSuggestions: [
          'Build and document an end-to-end NLP or LLM fine-tuning project',
          'Obtain TensorFlow or PyTorch Developer certification'
        ]
      },
      duplicateDetected: false,
      fraudWarning: null,
      voiceSummaryText: "James Wright has 3 years experience in Python and SQL analytics. Lacks PyTorch and NLP, placed in manual review for potential mid-level roles.",
      recruiterNotes: [],
      status: 'Manual Review',
      interviewScheduled: null,
      createdAt: '2026-07-31T09:10:00.000Z'
    },
    {
      id: 'cand-107',
      jobId: 'job-4',
      jobTitle: 'Lead Product Designer (UI/UX)',
      name: 'Sofia Martinez',
      email: 'sofia.design@studio.co',
      phone: '+1 (555) 654-9870',
      location: 'Toronto, ON',
      linkedin: 'linkedin.com/in/sofia-martinez-design',
      github: '',
      portfolio: 'sofiamartinez.design',
      experienceYears: 5,
      education: "Bachelor of Fine Arts in Industrial & Graphic Design, OCAD University",
      skills: ['Figma', 'UI/UX Design', 'Design Systems', 'User Research', 'Wireframing', 'Prototyping', 'Usability Testing', 'HTML/CSS', 'Micro-interactions'],
      certifications: ['Google UX Design Professional Certificate'],
      rawText: 'Sofia Martinez... Lead Product Designer with 5 years experience creating multi-platform design systems in Figma and driving accessibility testing.',
      scores: {
        atsScore: 92,
        grammarScore: 96,
        formattingScore: 95,
        skillMatchPct: 94,
        experienceMatchPct: 100,
        educationMatchPct: 95,
        certificationMatchPct: 100,
        keywordMatchPct: 91,
        projectRelevancePct: 95,
        overallCandidateScore: 94
      },
      recommendation: {
        decision: 'APPROVE',
        title: 'Recommended for Interview',
        color: 'emerald',
        summary: 'Excellent Product Designer with comprehensive Figma design system experience, Google UX certification, and strong prototyping portfolio.',
        rejectionReasons: [],
        strengths: [
          'Possesses Google UX Design Professional Certificate',
          'Deep expertise in Figma, Design Systems, and Usability Testing',
          '5 years experience matches requirement',
          'Includes front-end code understanding (HTML/CSS)'
        ],
        weaknesses: [],
        missingRequiredSkills: [],
        missingPreferredSkills: ['Framer'],
        improvementSuggestions: [
          'Add interactive motion prototypes to design case studies'
        ]
      },
      duplicateDetected: false,
      fraudWarning: null,
      voiceSummaryText: "Sofia Martinez is a Lead Product Designer with 5 years experience, Google UX Certified, and expert in Figma design systems.",
      recruiterNotes: [],
      status: 'Approved',
      interviewScheduled: null,
      createdAt: '2026-07-31T11:00:00.000Z'
    },
    {
      id: 'cand-108',
      jobId: 'job-1',
      jobTitle: 'Senior Full Stack Engineer',
      name: 'Robert Taylor',
      email: 'robert.t@spamdev.net',
      phone: '+1 (555) 000-1111',
      location: 'Unknown',
      linkedin: '',
      github: '',
      portfolio: '',
      experienceYears: 1,
      education: "High School Diploma",
      skills: ['React', 'React', 'React', 'React', 'JavaScript', 'HTML', 'HTML', 'HTML'],
      certifications: [],
      rawText: 'Robert Taylor... React React React React Developer. Artificial text filler for ATS optimization keywords React React Node Node Node.',
      scores: {
        atsScore: 42,
        grammarScore: 60,
        formattingScore: 40,
        skillMatchPct: 25,
        experienceMatchPct: 20,
        educationMatchPct: 30,
        certificationMatchPct: 0,
        keywordMatchPct: 50,
        projectRelevancePct: 20,
        overallCandidateScore: 34
      },
      recommendation: {
        decision: 'REJECT',
        title: 'Not Suitable',
        color: 'rose',
        summary: 'Candidate rejected due to extremely low ATS score, missing mandatory requirements, and detected keyword stuffing / spam formatting tactics.',
        rejectionReasons: [
          'ATS score (42) far below minimum threshold of 70',
          'Keyword stuffing / ATS gaming detected (repeating React & Node excessively)',
          'Experience (1 year) insufficient for Senior role (5+ years)',
          'Missing key technical skills: TypeScript, PostgreSQL, REST API'
        ],
        strengths: [],
        weaknesses: [
          'Keyword stuffing warning triggered',
          'No verified work experience details',
          'No portfolio or code samples provided'
        ],
        missingRequiredSkills: ['TypeScript', 'Node.js', 'PostgreSQL', 'REST API'],
        missingPreferredSkills: ['GraphQL', 'AWS', 'Docker', 'Tailwind CSS', 'Redis', 'CI/CD'],
        improvementSuggestions: [
          'Remove repeated keyword blocks and describe genuine project accomplishments using STAR method'
        ]
      },
      duplicateDetected: false,
      fraudWarning: 'Keyword Stuffing / ATS Manipulation Flagged',
      voiceSummaryText: "Robert Taylor's resume was flagged for keyword manipulation and low overall suitability score of 34.",
      recruiterNotes: [],
      status: 'Rejected',
      interviewScheduled: null,
      createdAt: '2026-07-31T12:30:00.000Z'
    }
  ],
  auditLogs: [
    { id: 'log-1', action: 'System Initialized', user: 'System', timestamp: '2026-07-20T10:00:00.000Z' },
    { id: 'log-2', action: 'Resume Uploaded & Analyzed (Alex Rivera)', user: 'Recruiter', timestamp: '2026-07-29T10:15:00.000Z' },
    { id: 'log-3', action: 'Candidate Approved (Alex Rivera)', user: 'Recruiter', timestamp: '2026-07-29T14:00:00.000Z' }
  ]
};

// Initialize file if not existing
function getDB() {
  if (!fs.existsSync(DB_FILE)) {
    saveDB(initialData);
    return initialData;
  }
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading DB, re-initializing:', err);
    saveDB(initialData);
    return initialData;
  }
}

function saveDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = {
  getDB,
  saveDB
};

import React from 'react';

// 1. AI Brain & Neural Network Illustration
export const AIBrainIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-32' }) => (
  <svg className={className} viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="70" r="55" fill="url(#brain-grad)" fillOpacity="0.15" />
    <path d="M70 50C70 40 85 30 100 30C115 30 130 40 130 50C140 50 148 58 148 68C148 78 140 85 130 88C125 100 112 108 100 108C88 108 75 100 70 88C60 85 52 78 52 68C52 58 60 50 70 50Z" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Nodes & Synapses */}
    <circle cx="80" cy="55" r="4" fill="#10B981" />
    <circle cx="120" cy="55" r="4" fill="#0EA5E9" />
    <circle cx="100" cy="70" r="6" fill="#6366F1" />
    <circle cx="75" cy="78" r="4" fill="#3B82F6" />
    <circle cx="125" cy="78" r="4" fill="#10B981" />
    <path d="M80 55L100 70M120 55L100 70M75 78L100 70M125 78L100 70M80 55L75 78M120 55L125 78" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
    {/* Pulse Rings */}
    <circle cx="100" cy="70" r="22" stroke="#10B981" strokeWidth="1.5" opacity="0.4" />
    <defs>
      <linearGradient id="brain-grad" x1="50" y1="30" x2="150" y2="110" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981" />
        <stop offset="1" stopColor="#0EA5E9" />
      </linearGradient>
    </defs>
  </svg>
);

// 2. Document Parser Illustration
export const DocumentParserIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-32' }) => (
  <svg className={className} viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="50" y="20" width="100" height="100" rx="16" fill="url(#doc-grad)" fillOpacity="0.12" stroke="#3B82F6" strokeWidth="2" />
    <path d="M68 40H132M68 56H115M68 72H128M68 88H100" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
    {/* Scanning laser beam */}
    <line x1="40" y1="65" x2="160" y2="65" stroke="#10B981" strokeWidth="2.5" strokeDasharray="4 2" />
    <polygon points="40,65 30,60 30,70" fill="#10B981" />
    <polygon points="160,65 170,60 170,70" fill="#10B981" />
    {/* Extracted Entity Tags */}
    <rect x="110" y="80" width="35" height="16" rx="8" fill="#10B981" />
    <text x="127.5" y="91" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">SKILLS</text>
    <defs>
      <linearGradient id="doc-grad" x1="50" y1="20" x2="150" y2="120" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#10B981" />
      </linearGradient>
    </defs>
  </svg>
);

// 3. ATS Score Gauge Illustration
export const ATSScoreGaugeIllustration: React.FC<{ className?: string; score?: number }> = ({ className = 'w-full h-32', score = 92 }) => (
  <svg className={className} viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Arc Background */}
    <path d="M40 100 A 60 60 0 0 1 160 100" stroke="currentColor" strokeWidth="12" strokeLinecap="round" className="text-slate-200 dark:text-slate-800" />
    {/* Progress Arc */}
    <path d="M40 100 A 60 60 0 0 1 150 70" stroke="url(#gauge-grad)" strokeWidth="12" strokeLinecap="round" />
    {/* Needle */}
    <circle cx="100" cy="100" r="10" fill="#10B981" />
    <line x1="100" y1="100" x2="135" y2="65" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" />
    {/* Score Text */}
    <text x="100" y="88" fill="#10B981" fontSize="22" fontWeight="900" textAnchor="middle">{score}%</text>
    <text x="100" y="122" fill="currentColor" fontSize="10" fontWeight="700" textAnchor="middle" className="text-slate-500">EXCELLENT MATCH</text>
    <defs>
      <linearGradient id="gauge-grad" x1="40" y1="100" x2="160" y2="60" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981" />
        <stop offset="1" stopColor="#0EA5E9" />
      </linearGradient>
    </defs>
  </svg>
);

// 4. Job Match Connect Illustration
export const JobMatchConnectIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-32' }) => (
  <svg className={className} viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left Document */}
    <rect x="25" y="30" width="55" height="75" rx="10" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="2" />
    <path d="M35 45H65M35 57H60M35 69H65" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
    {/* Right Job Specs Document */}
    <rect x="120" y="30" width="55" height="75" rx="10" fill="#3B82F6" fillOpacity="0.15" stroke="#3B82F6" strokeWidth="2" />
    <path d="M130 45H160M130 57H155M130 69H160" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
    {/* Connecting Curved Vector Beam */}
    <path d="M80 67.5 C 95 40, 105 40, 120 67.5" stroke="url(#match-beam)" strokeWidth="3" strokeDasharray="4 2" />
    <path d="M80 67.5 C 95 95, 105 95, 120 67.5" stroke="url(#match-beam)" strokeWidth="3" strokeDasharray="4 2" />
    {/* Central Match Badge */}
    <circle cx="100" cy="67.5" r="16" fill="#10B981" />
    <path d="M93 67.5L98 72.5L108 62.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="match-beam" x1="80" y1="67" x2="120" y2="67" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981" />
        <stop offset="1" stopColor="#3B82F6" />
      </linearGradient>
    </defs>
  </svg>
);

// 5. Leaderboard Rank Graphic
export const LeaderboardRankIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-32' }) => (
  <svg className={className} viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Podium Base */}
    <rect x="35" y="75" width="40" height="45" rx="6" fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="1.5" />
    <text x="55" y="102" fill="#3B82F6" fontSize="14" fontWeight="800" textAnchor="middle">#2</text>
    
    <rect x="80" y="55" width="40" height="65" rx="6" fill="#10B981" fillOpacity="0.3" stroke="#10B981" strokeWidth="2" />
    <text x="100" y="88" fill="#10B981" fontSize="16" fontWeight="900" textAnchor="middle">#1</text>
    
    <rect x="125" y="85" width="40" height="35" rx="6" fill="#F59E0B" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="1.5" />
    <text x="145" y="108" fill="#F59E0B" fontSize="14" fontWeight="800" textAnchor="middle">#3</text>

    {/* Crown on #1 */}
    <path d="M92 42L95 48L100 40L105 48L108 42L108 51L92 51Z" fill="#F59E0B" />
  </svg>
);

// 6. Keyword Optimization Graphic
export const KeywordSearchIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-32' }) => (
  <svg className={className} viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="30" y="25" width="140" height="90" rx="16" fill="url(#kw-bg)" fillOpacity="0.1" stroke="#0EA5E9" strokeWidth="2" />
    {/* Search Input Bar */}
    <rect x="45" y="40" width="110" height="24" rx="12" fill="white" stroke="#0EA5E9" strokeWidth="1.5" />
    <circle cx="58" cy="52" r="5" stroke="#0EA5E9" strokeWidth="1.5" />
    <line x1="62" y1="56" x2="66" y2="60" stroke="#0EA5E9" strokeWidth="1.5" />
    <text x="73" y="55" fill="#0EA5E9" fontSize="9" fontWeight="700">TypeScript, React...</text>

    {/* Keyword Pills */}
    <rect x="45" y="74" width="45" height="18" rx="9" fill="#10B981" />
    <text x="67.5" y="86" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">+ React (98%)</text>

    <rect x="95" y="74" width="60" height="18" rx="9" fill="#0EA5E9" />
    <text x="125" y="86" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">+ Node.js (95%)</text>
    <defs>
      <linearGradient id="kw-bg" x1="30" y1="25" x2="170" y2="115" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0EA5E9" />
        <stop offset="1" stopColor="#10B981" />
      </linearGradient>
    </defs>
  </svg>
);

// 7. Security Shield Illustration
export const ShieldSecurityIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-32' }) => (
  <svg className={className} viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 25L145 42V72C145 100 100 118 100 118C100 118 55 100 55 72V42L100 25Z" fill="url(#shield-grad)" fillOpacity="0.2" stroke="#0EA5E9" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M90 70L97 77L112 62" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="100" cy="70" r="28" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 2" />
    <defs>
      <linearGradient id="shield-grad" x1="55" y1="25" x2="145" y2="118" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0EA5E9" />
        <stop offset="1" stopColor="#10B981" />
      </linearGradient>
    </defs>
  </svg>
);

// 8. Lightning Fast Illustration
export const FastLightningIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-32' }) => (
  <svg className={className} viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="70" r="50" fill="#F59E0B" fillOpacity="0.1" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 2" />
    <path d="M108 25L60 75H100L92 115L140 65H100L108 25Z" fill="url(#bolt-grad)" stroke="#F59E0B" strokeWidth="2" strokeLinejoin="round" />
    <defs>
      <linearGradient id="bolt-grad" x1="60" y1="25" x2="140" y2="115" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F59E0B" />
        <stop offset="1" stopColor="#10B981" />
      </linearGradient>
    </defs>
  </svg>
);

// 9. Career Growth Illustration
export const CareerGrowthIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-32' }) => (
  <svg className={className} viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Trending line chart */}
    <path d="M35 105 L 70 85 L 105 90 L 140 55 L 170 35" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M35 105 L 70 85 L 105 90 L 140 55 L 170 35 L 170 105 Z" fill="url(#growth-grad)" fillOpacity="0.2" />
    {/* Target dots */}
    <circle cx="70" cy="85" r="4" fill="#10B981" />
    <circle cx="105" cy="90" r="4" fill="#3B82F6" />
    <circle cx="140" cy="55" r="4" fill="#10B981" />
    <circle cx="170" cy="35" r="6" fill="#10B981" />
    {/* Arrowhead */}
    <path d="M155 35H170V50" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="growth-grad" x1="35" y1="35" x2="170" y2="105" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981" />
        <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

// 10. AI Assistant FAQ Illustration
export const FAQAssistantIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-48' }) => (
  <svg className={className} viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="30" y="30" width="180" height="120" rx="20" fill="url(#faq-bg)" fillOpacity="0.1" stroke="#6366F1" strokeWidth="2" />
    {/* Chat bubbles */}
    <rect x="50" y="45" width="110" height="30" rx="15" fill="#6366F1" />
    <text x="62" y="64" fill="white" fontSize="9" fontWeight="bold">How does ATS scoring work?</text>
    
    <rect x="80" y="85" width="110" height="30" rx="15" fill="#10B981" />
    <text x="92" y="104" fill="white" fontSize="9" fontWeight="bold">AI analyzes skills & experience!</text>

    {/* Sparkles */}
    <circle cx="45" cy="135" r="8" fill="#F59E0B" fillOpacity="0.3" />
    <path d="M45 130V140M40 135H50" stroke="#F59E0B" strokeWidth="2" />
    <defs>
      <linearGradient id="faq-bg" x1="30" y1="30" x2="210" y2="150" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6366F1" />
        <stop offset="1" stopColor="#10B981" />
      </linearGradient>
    </defs>
  </svg>
);

// 11. Company SVG Logos (Grayscale & Colored)
export const GoogleLogoSVG: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.24 10.285V13.4h6.887c-.275 1.775-2.025 5.2-6.887 5.2-4.14 0-7.513-3.435-7.513-7.68s3.373-7.68 7.513-7.68c2.36 0 3.935.995 4.84 1.855l2.455-2.375C17.96 1.415 15.375 0 12.24 0 5.48 0 0 5.38 0 12s5.48 12 12.24 12c7.06 0 11.755-4.88 11.755-11.74 0-.79-.08-1.39-.175-1.975H12.24z"/>
  </svg>
);

export const MicrosoftLogoSVG: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 0h11.379v11.379H0zM12.621 0H24v11.379H12.621zM0 12.621h11.379V24H0zM12.621 12.621H24V24H12.621z"/>
  </svg>
);

export const AmazonLogoSVG: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.435 15.35c-2.48 0-4.63-.9-6.3-2.61-.31-.32-.23-.62.15-.47 2.14.86 4.3 1.3 6.47 1.3 2.76 0 5.4-.73 7.82-2.15.36-.21.65.12.35.41-2.22 2.14-5.26 3.52-8.49 3.52zm8.93-1.63c-.34-.43-2.22-.2-3.05-.1-.26.03-.3-.21-.06-.37 1.54-1.04 3.25-.66 3.49-.37.24.29-.15 2.05-1.58 3.27-.22.19-.44.08-.34-.17.33-.78.88-1.83.54-2.26zM13.88 2C7.3 2 2 7.3 2 13.88S7.3 25.76 13.88 25.76c6.58 0 11.88-5.3 11.88-11.88S20.46 2 13.88 2z"/>
  </svg>
);

export const MetaLogoSVG: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.89 3.53C14.7 3.53 12.8 4.7 11.8 6.48 10.8 4.7 8.9 3.53 6.71 3.53 3.01 3.53 0 6.54 0 10.24c0 4.67 4.54 8.79 10.8 13.06l1 0.67 1-0.67C20.06 19.03 24 14.91 24 10.24c0-3.7-3.01-6.71-7.11-6.71z"/>
  </svg>
);

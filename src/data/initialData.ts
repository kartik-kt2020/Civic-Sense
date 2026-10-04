import { Locality, CivicReport, UserProgress, DomainConfig } from '../types';

// Helper SVG Data URL generators for real visual report previews
const createReportSvgUrl = (bgHex: string, label: string, accentHex: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <rect width="600" height="400" fill="${bgHex}" />
    <path d="M0 320 Q 150 280, 300 320 T 600 300 L 600 400 L 0 400 Z" fill="${accentHex}" opacity="0.4" />
    <rect x="40" y="40" width="520" height="320" rx="8" fill="none" stroke="${accentHex}" stroke-width="2" stroke-dasharray="8 8" opacity="0.3" />
    <circle cx="300" cy="180" r="48" fill="${accentHex}" opacity="0.2" />
    <text x="300" y="188" font-family="monospace, sans-serif" font-size="20" font-weight="bold" fill="#f8fafc" text-anchor="middle">${label}</text>
    <text x="300" y="240" font-family="sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">CIVICSENSE GEO-TAGGED EVIDENCE PHOTO</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const INITIAL_LOCALITIES: Locality[] = [
  {
    id: 'loc-1',
    name: 'Indirapuram',
    civicScore: 82,
    previousScore: 78,
    unresolvedCount: 3,
    resolutionRate: 91,
    reportsCount: 42,
    center: [28.6366, 77.3732],
    statusTrend: 'improving',
    hotspotScore: 18
  },
  {
    id: 'loc-2',
    name: 'Vaishali',
    civicScore: 67,
    previousScore: 64,
    unresolvedCount: 7,
    resolutionRate: 84,
    reportsCount: 58,
    center: [28.6469, 77.3392],
    statusTrend: 'stable',
    hotspotScore: 35
  },
  {
    id: 'loc-3',
    name: 'Raj Nagar',
    civicScore: 34,
    previousScore: 42,
    unresolvedCount: 18,
    resolutionRate: 38,
    reportsCount: 89,
    center: [28.6721, 77.4412],
    statusTrend: 'worsening',
    hotspotScore: 82
  },
  {
    id: 'loc-4',
    name: 'Connaught Place',
    civicScore: 54,
    previousScore: 58,
    unresolvedCount: 12,
    resolutionRate: 62,
    reportsCount: 67,
    center: [28.6315, 77.2167],
    statusTrend: 'worsening',
    hotspotScore: 56
  },
  {
    id: 'loc-5',
    name: 'Vasundhara',
    civicScore: 76,
    previousScore: 70,
    unresolvedCount: 4,
    resolutionRate: 88,
    reportsCount: 34,
    center: [28.6582, 77.3688],
    statusTrend: 'improving',
    hotspotScore: 24
  }
];

export const INITIAL_REPORTS: CivicReport[] = [
  {
    id: 'rep-101',
    title: 'Overflowing Garbage Bins near Main Market',
    category: 'waste',
    description: 'Garbage spilling onto the pedestrian footpath. Bins have not been emptied for 48 hours.',
    location: {
      lat: 28.6725,
      lng: 77.4415,
      address: 'Plot 14, Main Market Road, Raj Nagar',
      localityId: 'loc-3',
      localityName: 'Raj Nagar'
    },
    severity: 'critical',
    status: 'reported',
    timestamp: '2026-10-04 09:15',
    imageUrl: createReportSvgUrl('#1e1b4b', 'GARBAGE OVERFLOW EVIDENCE', '#ef4444'),
    aiConfidence: 96,
    duplicateFlag: false,
    communityVerificationsCount: 4,
    reporterId: 'usr-901',
    reporterName: 'Aarav Sharma'
  },
  {
    id: 'rep-102',
    title: 'Water Leakage from Main Feeder Pipe',
    category: 'water',
    description: 'High pressure drinking water pipe burst causing continuous water accumulation on street.',
    location: {
      lat: 28.6318,
      lng: 77.2170,
      address: 'Block C, Inner Circle, Connaught Place',
      localityId: 'loc-4',
      localityName: 'Connaught Place'
    },
    severity: 'serious',
    status: 'assigned',
    timestamp: '2026-10-04 07:30',
    imageUrl: createReportSvgUrl('#0f172a', 'WATER PIPE BURST EVIDENCE', '#3b82f6'),
    aiConfidence: 92,
    duplicateFlag: false,
    assignedTeam: 'Central Water Board Crew B',
    slaHoursRemaining: 4,
    communityVerificationsCount: 7,
    reporterId: 'usr-882',
    reporterName: 'Meera Patel'
  },
  {
    id: 'rep-103',
    title: 'Open Sewage Drain Overflowing near School',
    category: 'drainage',
    description: 'Blocked stormwater drain causing foul odor and health hazard for school children.',
    location: {
      lat: 28.6710,
      lng: 77.4400,
      address: 'School Lane Sector 3, Raj Nagar',
      localityId: 'loc-3',
      localityName: 'Raj Nagar'
    },
    severity: 'critical',
    status: 'in_progress',
    timestamp: '2026-10-03 16:45',
    imageUrl: createReportSvgUrl('#171717', 'DRAIN BLOCKAGE EVIDENCE', '#f97316'),
    aiConfidence: 94,
    duplicateFlag: false,
    assignedTeam: 'Sanitation Rapid Response Unit 4',
    slaHoursRemaining: 2,
    communityVerificationsCount: 12,
    reporterId: 'usr-743',
    reporterName: 'Rohan Verma'
  },
  {
    id: 'rep-104',
    title: 'Deep Pothole at Expressway Offramp',
    category: 'roads',
    description: 'Deep road damage creating vehicle hazard during night hours.',
    location: {
      lat: 28.6368,
      lng: 77.3738,
      address: 'Ahinsa Khand 2, Indirapuram',
      localityId: 'loc-1',
      localityName: 'Indirapuram'
    },
    severity: 'moderate',
    status: 'resolved',
    timestamp: '2026-10-02 11:20',
    imageUrl: createReportSvgUrl('#18181b', 'POTHOLE BEFORE RESOLUTION', '#eab308'),
    afterImageUrl: createReportSvgUrl('#064e3b', 'REPAIRED ROAD AFTER RESOLUTION', '#10b981'),
    aiConfidence: 89,
    duplicateFlag: false,
    assignedTeam: 'Public Works Dept Road Division',
    communityVerificationsCount: 9,
    reporterId: 'usr-604',
    reporterName: 'Karthik Rao'
  },
  {
    id: 'rep-105',
    title: 'Public Sanitation and Wall Hygiene Violation',
    category: 'hygiene',
    description: 'Persistent spitting stains and uncleaned public wall space requiring pressure cleaning.',
    location: {
      lat: 28.6472,
      lng: 77.3395,
      address: 'Metro Station Gate 1, Vaishali',
      localityId: 'loc-2',
      localityName: 'Vaishali'
    },
    severity: 'minor',
    status: 'verified',
    timestamp: '2026-10-04 10:05',
    imageUrl: createReportSvgUrl('#1e293b', 'PUBLIC HYGIENE EVIDENCE', '#eab308'),
    aiConfidence: 87,
    duplicateFlag: false,
    communityVerificationsCount: 3,
    reporterId: 'usr-512',
    reporterName: 'Ananya Gupta'
  },
  {
    id: 'rep-106',
    title: 'Broken Park Fencing and Exposed Wiring',
    category: 'infrastructure',
    description: 'Electrical junction box open with loose wiring near children play area.',
    location: {
      lat: 28.6585,
      lng: 77.3692,
      address: 'Central Park Sector 15, Vasundhara',
      localityId: 'loc-5',
      localityName: 'Vasundhara'
    },
    severity: 'serious',
    status: 'citizen_verified',
    timestamp: '2026-10-01 14:10',
    imageUrl: createReportSvgUrl('#27272a', 'EXPOSED WIRING BEFORE REPAIR', '#ef4444'),
    afterImageUrl: createReportSvgUrl('#064e3b', 'ENCLOSED BOX AFTER REPAIR', '#10b981'),
    aiConfidence: 95,
    duplicateFlag: false,
    assignedTeam: 'Municipal Power Maintenance',
    communityVerificationsCount: 15,
    reporterId: 'usr-120',
    reporterName: 'Karthik Rao'
  }
];

export const INITIAL_USER_PROGRESS: UserProgress = {
  points: 1240,
  currentStreak: 17,
  bestStreak: 24,
  streakWeeklyMap: [
    { day: 'Mon', active: true, activity: 'Reported Garbage Issue' },
    { day: 'Tue', active: true, activity: 'Verified Community Report' },
    { day: 'Wed', active: true, activity: 'Verified Resolved Drain Case' },
    { day: 'Thu', active: true, activity: 'Reported Pothole Location' },
    { day: 'Fri', active: true, activity: 'Completed Civic Sanitation Challenge' },
    { day: 'Sat', active: true, activity: 'Verified Street Light Repair' },
    { day: 'Sun', active: true, activity: 'Community Verification Vote' }
  ],
  league: 'Civic Champion',
  trustScore: 96,
  verifiedReportsSubmitted: 38,
  communityVerificationsDone: 21,
  resolutionsConfirmed: 14,
  achievements: [
    {
      id: 'ach-1',
      name: 'Waste Warrior',
      description: 'Submit 25 verified waste related civic reports',
      requiredCount: 25,
      currentCount: 25,
      unlocked: true,
      category: 'waste'
    },
    {
      id: 'ach-2',
      name: 'Water Watcher',
      description: 'Submit 10 verified water leakage reports',
      requiredCount: 10,
      currentCount: 8,
      unlocked: false,
      category: 'water'
    },
    {
      id: 'ach-3',
      name: 'Road Guardian',
      description: 'Identify and report 20 road hazard issues',
      requiredCount: 20,
      currentCount: 12,
      unlocked: false,
      category: 'roads'
    },
    {
      id: 'ach-4',
      name: 'Community Verifier',
      description: 'Perform 20 accurate community verifications',
      requiredCount: 20,
      currentCount: 21,
      unlocked: true,
      category: 'general'
    },
    {
      id: 'ach-5',
      name: 'Unstoppable Streak',
      description: 'Maintain a 14 day consecutive active civic streak',
      requiredCount: 14,
      currentCount: 17,
      unlocked: true,
      category: 'general'
    }
  ]
};

export const INITIAL_DOMAIN_CONFIG: DomainConfig = {
  domain: 'civicsense.org',
  sslActive: true,
  dnsConnected: true,
  aRecord: '76.76.21.21',
  cnameRecord: 'cname.civicsense.org',
  faviconVerified: true,
  aiTagRemoved: true,
  privacyPolicyConnected: true,
  termsConditionConnected: true
};

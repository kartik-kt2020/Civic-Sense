export type CivicCategory = 
  | 'waste' 
  | 'hygiene' 
  | 'water' 
  | 'drainage' 
  | 'roads' 
  | 'infrastructure';

export type SeverityLevel = 'minor' | 'moderate' | 'serious' | 'critical';

export type ReportStatus = 
  | 'reported' 
  | 'verified' 
  | 'assigned' 
  | 'in_progress' 
  | 'resolved' 
  | 'citizen_verified';

export interface Locality {
  id: string;
  name: string;
  civicScore: number; // 0 to 100
  previousScore: number;
  unresolvedCount: number;
  resolutionRate: number; // percentage
  reportsCount: number;
  center: [number, number];
  statusTrend: 'improving' | 'worsening' | 'stable';
  hotspotScore: number; // 0 to 100
}

export interface CivicReport {
  id: string;
  title: string;
  category: CivicCategory;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    localityId: string;
    localityName: string;
  };
  severity: SeverityLevel;
  status: ReportStatus;
  timestamp: string;
  imageUrl: string;
  afterImageUrl?: string;
  aiConfidence: number;
  duplicateFlag: boolean;
  duplicateOfId?: string;
  communityVerificationsCount: number;
  assignedTeam?: string;
  slaHoursRemaining?: number;
  reporterId: string;
  reporterName: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  requiredCount: number;
  currentCount: number;
  unlocked: boolean;
  category: CivicCategory | 'general';
}

export interface UserProgress {
  points: number;
  currentStreak: number;
  bestStreak: number;
  streakWeeklyMap: { day: string; active: boolean; activity: string }[];
  league: 'Civic Starter' | 'Civic Supporter' | 'Civic Champion' | 'Civic Leader' | 'Civic Guardian';
  trustScore: number;
  verifiedReportsSubmitted: number;
  communityVerificationsDone: number;
  resolutionsConfirmed: number;
  achievements: Achievement[];
}

export interface DomainConfig {
  domain: string;
  sslActive: boolean;
  dnsConnected: boolean;
  aRecord: string;
  cnameRecord: string;
  faviconVerified: boolean;
  aiTagRemoved: boolean;
  privacyPolicyConnected: boolean;
  termsConditionConnected: boolean;
}

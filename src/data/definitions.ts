import { DirectoryPerson, DirectoryGroup, DirectoryGroupKind } from './directory';

export interface ClosingReason {
  id: string;
  label: string;
  description?: string;
  context: 'resolve' | 'close';
  requiresComment: boolean;
  status: 'Active' | 'Inactive';
}

export interface QuickReply {
  id: string;
  title: string;
  content: string;
  category: string;
  shortcut: string;
  status: 'Active' | 'Inactive';
}

export interface SlaHoursSettings {
  timezone: string;
  businessHoursStart: string;
  businessHoursEnd: string;
  workingDays: string[];
  holidayCalendar: string;
  pauseSlaOnWeekends: boolean;
}

export interface GeneralHelpdeskSettings {
  defaultFallbackTeam: string;
  autoCloseDaysAfterResolve: number;
  reopenWindowDays: number;
  ticketIdPrefix: string;
  allowCustomerReopen: boolean;
}

export const CLOSING_REASONS_UPDATED_EVENT = 'sixtifi-closing-reasons-updated';
const CLOSING_STORAGE_KEY = 'sixtifi-helpdesk-closing-reasons';

export const DEFAULT_CLOSING_REASONS: ClosingReason[] = [
  {
    id: 'cr-resolve-fixed',
    label: 'Fixed / Issue corrected',
    description: 'Issue was corrected in production and verified.',
    context: 'resolve',
    requiresComment: true,
    status: 'Active'
  },
  {
    id: 'cr-resolve-info',
    label: 'Information provided',
    description: 'Customer question answered with sufficient detail.',
    context: 'resolve',
    requiresComment: true,
    status: 'Active'
  },
  {
    id: 'cr-resolve-policy',
    label: 'Policy clarified',
    description: 'Workforce policy or process was explained.',
    context: 'resolve',
    requiresComment: false,
    status: 'Active'
  },
  {
    id: 'cr-resolve-completed',
    label: 'Request completed',
    description: 'Requested configuration or change completed.',
    context: 'resolve',
    requiresComment: true,
    status: 'Active'
  },
  {
    id: 'cr-close-no-action',
    label: 'Closed — no action required',
    description: 'Ticket closed without further work needed.',
    context: 'close',
    requiresComment: false,
    status: 'Active'
  },
  {
    id: 'cr-close-cancelled',
    label: 'Cancelled by requester',
    description: 'Customer withdrew or cancelled the request.',
    context: 'close',
    requiresComment: false,
    status: 'Active'
  },
  {
    id: 'cr-close-no-response',
    label: 'No response from customer',
    description: 'Closed after waiting for customer reply.',
    context: 'close',
    requiresComment: true,
    status: 'Active'
  }
];

export const DEFAULT_QUICK_REPLIES: QuickReply[] = [
  {
    id: 'qr-info-req',
    title: 'Request Info / Report',
    content: 'Hi Sarah, to help us investigate this issue further, could you please provide your latest payroll calculation export or screenshots of the variance?',
    category: 'Payroll',
    shortcut: '/request-info',
    status: 'Active'
  },
  {
    id: 'qr-eng-escalate',
    title: 'Escalated to Engineering',
    content: 'We have identified a calculation engine variance and escalated ticket #HD-10482 to our L3 Engineering Core team for immediate review.',
    category: 'Payroll',
    shortcut: '/escalate-eng',
    status: 'Active'
  },
  {
    id: 'qr-resolved-fix',
    title: 'Hotfix Deployed & Resolved',
    content: 'Good news! Our engineering team deployed a hotfix (v4.8.2) addressing the tax slab calculation variance. Please verify your September panel.',
    category: 'Payroll',
    shortcut: '/resolved-fix',
    status: 'Active'
  },
  {
    id: 'qr-bio-sync',
    title: 'Biometric Hardware Reset',
    content: 'Please ensure machine IP 192.168.1.104 is whitelisted in your attendance gateway. We have triggered an automatic log sync for shift punches.',
    category: 'Attendance',
    shortcut: '/bio-sync',
    status: 'Active'
  }
];

export const DEFAULT_SLA_HOURS: SlaHoursSettings = {
  timezone: 'Asia/Kolkata (IST +5:30)',
  businessHoursStart: '09:00 AM',
  businessHoursEnd: '06:00 PM',
  workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  holidayCalendar: 'India Corporate Calendar 2026',
  pauseSlaOnWeekends: true
};

export const DEFAULT_GENERAL_SETTINGS: GeneralHelpdeskSettings = {
  defaultFallbackTeam: 'Payroll Support Squad',
  autoCloseDaysAfterResolve: 3,
  reopenWindowDays: 7,
  ticketIdPrefix: 'HD-',
  allowCustomerReopen: true
};

export function getClosingReasons(): ClosingReason[] {
  try {
    const raw = localStorage.getItem(CLOSING_STORAGE_KEY);
    if (!raw) return DEFAULT_CLOSING_REASONS;
    const parsed = JSON.parse(raw) as ClosingReason[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_CLOSING_REASONS;
  } catch {
    return DEFAULT_CLOSING_REASONS;
  }
}

export function saveClosingReasons(reasons: ClosingReason[]): void {
  localStorage.setItem(CLOSING_STORAGE_KEY, JSON.stringify(reasons));
  window.dispatchEvent(new CustomEvent(CLOSING_REASONS_UPDATED_EVENT));
}

export const HANDLING_TEAMS_BY_COMPANY: Record<string, string[]> = {
  'co-acme': [
    'Payroll Support Squad',
    'Attendance & Leave Squad',
    'HR Operations Squad',
    'IT Service Desk',
    'Payroll Engineering Core'
  ],
  'co-northwind': ['Northwind Ops Desk', 'Northwind Fleet Desk'],
  'co-contoso': ['Contoso People Ops', 'Contoso Retail HR']
};

export const handlingTeamsForCompany = (companyId: string): string[] =>
  HANDLING_TEAMS_BY_COMPANY[companyId] || HANDLING_TEAMS_BY_COMPANY['co-acme'];

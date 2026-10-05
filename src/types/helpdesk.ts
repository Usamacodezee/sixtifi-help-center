export type UserRole = 'customer' | 'agent' | 'manager' | 'engineering';

export type TicketStatus = 'New' | 'Open' | 'In Progress' | 'Waiting for You' | 'Resolved' | 'Closed';

export type InternalTicketStatus = TicketStatus | 'Reopened' | 'Escalated' | 'Pending Engineering';

export type PriorityLevel = 'Critical' | 'High' | 'Normal' | 'Low';

export type ModuleCategory = 
  | 'Payroll' 
  | 'Attendance' 
  | 'Leave' 
  | 'Employee Management' 
  | 'Performance' 
  | 'Recruitment' 
  | 'Reports' 
  | 'Integrations' 
  | 'API' 
  | 'Other';

export type EngineeringStatus = 'Investigating' | 'Bug Confirmed' | 'Fix in Progress' | 'Fixed' | 'Cannot Reproduce';

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface TicketComment {
  id: string;
  authorName: string;
  authorRole: 'Customer' | 'Support Agent' | 'Support Manager' | 'Engineering' | 'System';
  avatar?: string;
  content: string;
  timestamp: string;
  isInternal: boolean;
  attachments?: Attachment[];
}

export interface TicketActivity {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  details?: string;
}

export interface RequestContext {
  company: string;
  requester: string;
  module: string;
  page: string;
  employee: string;
  payrollPeriod: string;
  browser: string;
  environment: string;
}

export interface EscalationInfo {
  isEscalated: boolean;
  escalatedTo: 'L2 Product Support' | 'Payroll Specialist' | 'Engineering';
  reason: string;
  escalatedAt?: string;
  escalatedBy?: string;
  note?: string;
}

export interface EngineeringInfo {
  status: EngineeringStatus;
  expectedValue: string;
  actualValue: string;
  affectedEmployeesCount: number;
  reproductionSteps: string[];
  assignedDev: string;
  fixedAt?: string;
}

export interface ResolutionInfo {
  type: 'Solved' | 'Configuration Updated' | 'Product Bug Fixed' | 'Information Provided' | 'Duplicate' | 'Not Reproducible';
  summary: string;
  resolvedAt: string;
  resolvedBy: string;
}

export interface CSATFeedback {
  rating: number; // 1-5
  comment: string;
  submittedAt: string;
}

export interface Ticket {
  id: string; // e.g. HD-10482
  subject: string;
  description: string;
  category: ModuleCategory;
  issueType: string;
  priority: PriorityLevel;
  status: TicketStatus;
  customerName: string; // e.g. ABC Technologies Pvt. Ltd.
  customerId: string; // CUS-1042
  customerPlan: 'Standard' | 'Business' | 'Enterprise';
  customerSupportLevel: 'Standard Support' | 'Priority Support' | 'Dedicated TAM';
  requesterName: string; // Sarah Mehta
  requesterRole: string; // HR Administrator
  employeeName?: string; // John Doe — EMP-1042
  employeeId?: string;
  payrollPeriod?: string; // September 2026
  assignedTeam: string; // Payroll Support
  assigneeName: string; // Rahul Shah
  createdAt: string;
  updatedAt: string;
  slaFirstResponseMet: boolean;
  slaResolutionRemaining: string;
  attachments: Attachment[];
  conversation: TicketComment[];
  activities: TicketActivity[];
  context: RequestContext;
  escalation?: EscalationInfo;
  engineering?: EngineeringInfo;
  resolution?: ResolutionInfo;
  feedback?: CSATFeedback;
  requiresInformation?: boolean; // Controls "Waiting for You" prompt
  infoRequestMessage?: string;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  category: ModuleCategory;
  summary: string;
  content: string;
  readTime: string;
  helpfulCount: number;
  views: number;
  lastUpdated: string;
  tags: string[];
}

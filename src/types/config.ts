import { UserRole } from './helpdesk';
import { CategoryAudienceConfig, CategoryBusinessHoursMode, CategoryNotificationRules } from './categoryTypes';
import { CategorySlaSettings } from '../data/categoryConfig';
import { ClosingReason, QuickReply, SlaHoursSettings, GeneralHelpdeskSettings } from '../data/definitions';

export type PermissionKey =
  | 'tickets.view_own'
  | 'tickets.view_team'
  | 'tickets.view_all'
  | 'tickets.create'
  | 'tickets.reply_public'
  | 'tickets.reply_internal'
  | 'tickets.assign'
  | 'tickets.reassign'
  | 'tickets.change_priority'
  | 'tickets.change_status'
  | 'tickets.request_info'
  | 'tickets.escalate'
  | 'tickets.resolve'
  | 'tickets.close'
  | 'tickets.reopen'
  | 'admin.view'
  | 'admin.manage_roles'
  | 'admin.manage_teams'
  | 'admin.manage_employees'
  | 'admin.manage_modules'
  | 'admin.manage_statuses'
  | 'admin.manage_priorities'
  | 'admin.manage_sla'
  | 'admin.manage_escalation'
  | 'admin.manage_routing'
  | 'admin.manage_automation';

export interface RoleConfig {
  id: UserRole;
  name: string;
  description: string;
  permissions: Record<PermissionKey, boolean>;
}

export type RoutingStrategy = 'round-robin' | 'load-balanced' | 'manual';

export interface SupportTeam {
  id: string;
  name: string;
  description: string;
  routingStrategy?: RoutingStrategy;
  leadIds: string[];         // Selected Team Lead Employee IDs
  leadNames: string[];       // Team Lead Names
  specialistIds: string[];   // Selected Specialist Employee IDs
  specialistNames: string[]; // Specialist Names
  memberIds: string[];       // Selected Agent/Member Employee IDs
  memberNames: string[];     // Member Names
  assignedCategoryIds: string[]; // Array of assigned Category IDs
  assignedCategoryNames: string[]; // Category Names
  active: boolean;
  slaAtRiskCount?: number;
  slaBreachedCount?: number;
}

export interface SupportEmployee {
  id: string;
  name: string;
  email: string;
  role: UserRole; // 'agent' | 'manager' | 'engineering'
  employeeType: 'Team Lead' | 'Specialist' | 'Agent' | 'Engineering Dev';
  teamId: string;
  teamName: string;
  skills: string[];
  supportedModules: string[];
  availability: 'Available' | 'Busy' | 'Offline';
  active: boolean;
}

export interface CategorySlaTarget {
  priority: 'Critical' | 'High' | 'Normal';
  firstResponseMinutes: number;
  resolutionMinutes: number;
}

export interface CategoryEscalationPolicy {
  escalateToType: 'Engineering' | 'Specialist' | 'Team' | 'Manager';
  targetId: string;
  targetName: string;
  triggerMinutes: number;
  reason: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
  moduleId: string;
  moduleName: string;
  assignedTeamId: string;
  assignedTeamName: string;
  audience?: CategoryAudienceConfig;
  businessHours?: CategoryBusinessHoursMode;
  notifications?: CategoryNotificationRules;
  fullSlaSettings?: CategorySlaSettings;
  slaTargets: {
    critical: CategorySlaTarget;
    high: CategorySlaTarget;
    normal: CategorySlaTarget;
    pauseOnWaitingForCustomer: boolean;
  };
  escalationPolicy: CategoryEscalationPolicy;
  active: boolean;
}

export interface ProductModule {
  id: string;
  name: string;
  description: string;
  iconName: string;
  categories: ProductCategory[];
  active: boolean;
}

export interface StatusConfig {
  id: string;
  name: string;
  description: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  customerVisible: boolean;
  allowedNextStatuses: string[];
  pausesSLA: boolean;
}

export interface PriorityConfig {
  id: string;
  name: string;
  description: string;
  color: string;
  responseSlaMinutes: number;
  resolutionSlaMinutes: number;
  escalationThresholdMinutes: number;
}

export interface SystemConfig {
  roles: Record<UserRole, RoleConfig>;
  teams: SupportTeam[];
  employees: SupportEmployee[];
  modules: ProductModule[];
  categories: ProductCategory[];
  statuses: StatusConfig[];
  priorities: PriorityConfig[];
  closingReasons?: ClosingReason[];
  quickReplies?: QuickReply[];
  slaHours?: SlaHoursSettings;
  generalSettings?: GeneralHelpdeskSettings;
}

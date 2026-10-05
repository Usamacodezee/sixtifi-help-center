import { SystemConfig, RoleConfig, ProductCategory } from '../types/config';
import { UserRole } from '../types/helpdesk';

export const DEFAULT_ROLES: Record<UserRole, RoleConfig> = {
  customer: {
    id: 'customer',
    name: 'Customer / HR Admin',
    description: 'Self-service portal user. Can submit tickets, search KB, reply, upload attachments, and CSAT.',
    permissions: {
      'tickets.view_own': true,
      'tickets.view_team': false,
      'tickets.view_all': false,
      'tickets.create': true,
      'tickets.reply_public': true,
      'tickets.reply_internal': false,
      'tickets.assign': false,
      'tickets.reassign': false,
      'tickets.change_priority': false,
      'tickets.change_status': false,
      'tickets.request_info': false,
      'tickets.escalate': false,
      'tickets.resolve': false,
      'tickets.close': true,
      'tickets.reopen': true,
      'admin.view': false,
      'admin.manage_roles': false,
      'admin.manage_teams': false,
      'admin.manage_employees': false,
      'admin.manage_modules': false,
      'admin.manage_statuses': false,
      'admin.manage_priorities': false,
      'admin.manage_sla': false,
      'admin.manage_escalation': false,
      'admin.manage_routing': false,
      'admin.manage_automation': false,
    }
  },
  agent: {
    id: 'agent',
    name: 'L1 Support Agent',
    description: 'Frontline agent handling customer communications, triage, and basic resolution.',
    permissions: {
      'tickets.view_own': true,
      'tickets.view_team': true,
      'tickets.view_all': true,
      'tickets.create': true,
      'tickets.reply_public': true,
      'tickets.reply_internal': true,
      'tickets.assign': true,
      'tickets.reassign': true,
      'tickets.change_priority': true,
      'tickets.change_status': true,
      'tickets.request_info': true,
      'tickets.escalate': true,
      'tickets.resolve': true,
      'tickets.close': false,
      'tickets.reopen': false,
      'admin.view': false,
      'admin.manage_roles': false,
      'admin.manage_teams': false,
      'admin.manage_employees': false,
      'admin.manage_modules': false,
      'admin.manage_statuses': false,
      'admin.manage_priorities': false,
      'admin.manage_sla': false,
      'admin.manage_escalation': false,
      'admin.manage_routing': false,
      'admin.manage_automation': false,
    }
  },
  manager: {
    id: 'manager',
    name: 'Support Manager',
    description: 'Operations manager over all tickets, SLA overrides, team rosters, and routing rules.',
    permissions: {
      'tickets.view_own': true,
      'tickets.view_team': true,
      'tickets.view_all': true,
      'tickets.create': true,
      'tickets.reply_public': true,
      'tickets.reply_internal': true,
      'tickets.assign': true,
      'tickets.reassign': true,
      'tickets.change_priority': true,
      'tickets.change_status': true,
      'tickets.request_info': true,
      'tickets.escalate': true,
      'tickets.resolve': true,
      'tickets.close': true,
      'tickets.reopen': true,
      'admin.view': true,
      'admin.manage_roles': true,
      'admin.manage_teams': true,
      'admin.manage_employees': true,
      'admin.manage_modules': true,
      'admin.manage_statuses': true,
      'admin.manage_priorities': true,
      'admin.manage_sla': true,
      'admin.manage_escalation': true,
      'admin.manage_routing': true,
      'admin.manage_automation': true,
    }
  },
  engineering: {
    id: 'engineering',
    name: 'Engineering Specialist',
    description: 'Core developer assigned to deep technical bugs and hotfixes escalated from support.',
    permissions: {
      'tickets.view_own': true,
      'tickets.view_team': true,
      'tickets.view_all': true,
      'tickets.create': false,
      'tickets.reply_public': false,
      'tickets.reply_internal': true,
      'tickets.assign': false,
      'tickets.reassign': true,
      'tickets.change_priority': false,
      'tickets.change_status': true,
      'tickets.request_info': false,
      'tickets.escalate': false,
      'tickets.resolve': true,
      'tickets.close': false,
      'tickets.reopen': false,
      'admin.view': false,
      'admin.manage_roles': false,
      'admin.manage_teams': false,
      'admin.manage_employees': false,
      'admin.manage_modules': false,
      'admin.manage_statuses': false,
      'admin.manage_priorities': false,
      'admin.manage_sla': false,
      'admin.manage_escalation': false,
      'admin.manage_routing': false,
      'admin.manage_automation': false,
    }
  }
};

export const DEFAULT_CATEGORIES: ProductCategory[] = [
  {
    id: 'cat-sal-calc',
    name: 'Salary Calculation',
    description: 'Salary gross-to-net processing, Professional Tax, PF, TDS calculations.',
    moduleId: 'mod-payroll',
    moduleName: 'Payroll',
    assignedTeamId: 'team-payroll',
    assignedTeamName: 'Payroll Support Squad',
    slaTargets: {
      critical: { priority: 'Critical', firstResponseMinutes: 30, resolutionMinutes: 240 },
      high: { priority: 'High', firstResponseMinutes: 60, resolutionMinutes: 480 },
      normal: { priority: 'Normal', firstResponseMinutes: 240, resolutionMinutes: 1440 },
      pauseOnWaitingForCustomer: true
    },
    escalationPolicy: {
      escalateToType: 'Engineering',
      targetId: 'emp-ananya',
      targetName: 'Ananya Verma (Lead Dev)',
      triggerMinutes: 120,
      reason: 'Payroll calculation variance requires backend L3 engineering engine review.'
    },
    active: true
  },
  {
    id: 'cat-tax',
    name: 'Tax / Deduction',
    description: 'Statutory tax deduction slabs, Form 16, and TDS exemptions.',
    moduleId: 'mod-payroll',
    moduleName: 'Payroll',
    assignedTeamId: 'team-payroll',
    assignedTeamName: 'Payroll Support Squad',
    slaTargets: {
      critical: { priority: 'Critical', firstResponseMinutes: 30, resolutionMinutes: 240 },
      high: { priority: 'High', firstResponseMinutes: 60, resolutionMinutes: 480 },
      normal: { priority: 'Normal', firstResponseMinutes: 240, resolutionMinutes: 1440 },
      pauseOnWaitingForCustomer: true
    },
    escalationPolicy: {
      escalateToType: 'Specialist',
      targetId: 'emp-priya',
      targetName: 'Priya Mehta (Tax Specialist)',
      triggerMinutes: 180,
      reason: 'Tax slab mismatch escalated to Senior Tax Specialist.'
    },
    active: true
  },
  {
    id: 'cat-payslip',
    name: 'Salary Slip',
    description: 'Payslip generation, PDF download formatting, and email delivery.',
    moduleId: 'mod-payroll',
    moduleName: 'Payroll',
    assignedTeamId: 'team-payroll',
    assignedTeamName: 'Payroll Support Squad',
    slaTargets: {
      critical: { priority: 'Critical', firstResponseMinutes: 45, resolutionMinutes: 360 },
      high: { priority: 'High', firstResponseMinutes: 120, resolutionMinutes: 720 },
      normal: { priority: 'Normal', firstResponseMinutes: 480, resolutionMinutes: 2880 },
      pauseOnWaitingForCustomer: true
    },
    escalationPolicy: {
      escalateToType: 'Team',
      targetId: 'team-payroll',
      targetName: 'Payroll Support Squad',
      triggerMinutes: 360,
      reason: 'Unresolved payslip issue escalated to Team Lead.'
    },
    active: true
  },
  {
    id: 'cat-biometric',
    name: 'Biometric Sync',
    description: 'Attendance hardware device integration, punch logs, and real-time sync.',
    moduleId: 'mod-attendance',
    moduleName: 'Attendance',
    assignedTeamId: 'team-attendance',
    assignedTeamName: 'Attendance & Leave Squad',
    slaTargets: {
      critical: { priority: 'Critical', firstResponseMinutes: 30, resolutionMinutes: 240 },
      high: { priority: 'High', firstResponseMinutes: 90, resolutionMinutes: 600 },
      normal: { priority: 'Normal', firstResponseMinutes: 360, resolutionMinutes: 2160 },
      pauseOnWaitingForCustomer: true
    },
    escalationPolicy: {
      escalateToType: 'Specialist',
      targetId: 'emp-vikram',
      targetName: 'Vikram Sharma (Biometric Specialist)',
      triggerMinutes: 180,
      reason: 'Biometric machine API sync error escalated to Specialist.'
    },
    active: true
  },
  {
    id: 'cat-quota',
    name: 'Leave Balance',
    description: 'Leave quota credit, lapse rules, encashment, and carry forward.',
    moduleId: 'mod-leave',
    moduleName: 'Leave',
    assignedTeamId: 'team-attendance',
    assignedTeamName: 'Attendance & Leave Squad',
    slaTargets: {
      critical: { priority: 'Critical', firstResponseMinutes: 60, resolutionMinutes: 480 },
      high: { priority: 'High', firstResponseMinutes: 180, resolutionMinutes: 1440 },
      normal: { priority: 'Normal', firstResponseMinutes: 480, resolutionMinutes: 2880 },
      pauseOnWaitingForCustomer: true
    },
    escalationPolicy: {
      escalateToType: 'Manager',
      targetId: 'emp-manager',
      targetName: 'Sunil Kumar (Manager)',
      triggerMinutes: 360,
      reason: 'Leave balance encashment dispute escalated to Manager.'
    },
    active: true
  }
];

export const DEFAULT_CONFIG: SystemConfig = {
  roles: DEFAULT_ROLES,
  teams: [
    {
      id: 'team-payroll',
      name: 'Payroll Support Squad',
      description: 'Dedicated squad for salary calculations, PF/PT/TDS deductions, and bank payouts.',
      leadIds: ['emp-rahul', 'emp-priya'],
      leadNames: ['Rahul Shah', 'Priya Mehta'],
      specialistIds: ['emp-priya'],
      specialistNames: ['Priya Mehta (Tax Specialist)'],
      memberIds: ['emp-rahul', 'emp-priya', 'emp-amit'],
      memberNames: ['Rahul Shah', 'Priya Mehta', 'Amit Patel'],
      assignedCategoryIds: ['cat-sal-calc', 'cat-tax', 'cat-payslip'],
      assignedCategoryNames: ['Salary Calculation', 'Tax / Deduction', 'Salary Slip'],
      active: true
    },
    {
      id: 'team-attendance',
      name: 'Attendance & Leave Squad',
      description: 'Handles biometric machine sync, shift rosters, overtime, and leave encashment.',
      leadIds: ['emp-vikram'],
      leadNames: ['Vikram Sharma'],
      specialistIds: ['emp-vikram'],
      specialistNames: ['Vikram Sharma (Biometric Specialist)'],
      memberIds: ['emp-vikram', 'emp-sneha'],
      memberNames: ['Vikram Sharma', 'Sneha Kapoor'],
      assignedCategoryIds: ['cat-biometric', 'cat-quota'],
      assignedCategoryNames: ['Biometric Sync', 'Leave Balance'],
      active: true
    },
    {
      id: 'team-eng',
      name: 'Payroll Engineering Core',
      description: 'L3 core developers responsible for backend engines, tax formulas, and hotfixes.',
      leadIds: ['emp-ananya'],
      leadNames: ['Ananya Verma (Lead Dev)'],
      specialistIds: ['emp-ananya', 'emp-amit-eng'],
      specialistNames: ['Ananya Verma', 'Amit Patel (Dev)'],
      memberIds: ['emp-ananya', 'emp-amit-eng'],
      memberNames: ['Ananya Verma', 'Amit Patel (Dev)'],
      assignedCategoryIds: ['cat-sal-calc'],
      assignedCategoryNames: ['Salary Calculation Engine'],
      active: true
    }
  ],
  employees: [
    {
      id: 'emp-rahul',
      name: 'Rahul Shah',
      email: 'rahul.shah@sixtify.io',
      role: 'agent',
      employeeType: 'Team Lead',
      teamId: 'team-payroll',
      teamName: 'Payroll Support Squad',
      skills: ['Payroll Engine', 'Tax Compliance', 'Salary Slips'],
      supportedModules: ['Payroll'],
      availability: 'Available',
      active: true
    },
    {
      id: 'emp-priya',
      name: 'Priya Mehta',
      email: 'priya.m@sixtify.io',
      role: 'agent',
      employeeType: 'Specialist',
      teamId: 'team-payroll',
      teamName: 'Payroll Support Squad',
      skills: ['Statutory Audit', 'TDS Slabs', 'Form 16'],
      supportedModules: ['Payroll', 'Employee Management'],
      availability: 'Available',
      active: true
    },
    {
      id: 'emp-vikram',
      name: 'Vikram Sharma',
      email: 'vikram.s@sixtify.io',
      role: 'agent',
      employeeType: 'Team Lead',
      teamId: 'team-attendance',
      teamName: 'Attendance & Leave Squad',
      skills: ['Biometric Integration', 'Shift Roster API'],
      supportedModules: ['Attendance', 'Leave'],
      availability: 'Available',
      active: true
    },
    {
      id: 'emp-ananya',
      name: 'Ananya Verma',
      email: 'ananya.v@sixtify.io',
      role: 'engineering',
      employeeType: 'Engineering Dev',
      teamId: 'team-eng',
      teamName: 'Payroll Engineering Core',
      skills: ['Node.js', 'Tax Calculation Formula', 'PostgreSQL'],
      supportedModules: ['Payroll', 'API'],
      availability: 'Available',
      active: true
    },
    {
      id: 'emp-manager',
      name: 'Sunil Kumar (Manager)',
      email: 'sunil.k@sixtify.io',
      role: 'manager',
      employeeType: 'Team Lead',
      teamId: 'team-payroll',
      teamName: 'Payroll Support Squad',
      skills: ['Support Ops', 'SLA Escalations', 'Routing'],
      supportedModules: ['Payroll', 'Attendance', 'Leave', 'Employee Management'],
      availability: 'Available',
      active: true
    }
  ],
  modules: [
    {
      id: 'mod-payroll',
      name: 'Payroll',
      description: 'Salary processing, statutory deductions, tax slabs, and payslips.',
      iconName: 'DollarSign',
      active: true,
      categories: DEFAULT_CATEGORIES.filter(c => c.moduleId === 'mod-payroll')
    },
    {
      id: 'mod-attendance',
      name: 'Attendance',
      description: 'Biometric device sync, shift rosters, overtime, and punch logs.',
      iconName: 'Clock',
      active: true,
      categories: DEFAULT_CATEGORIES.filter(c => c.moduleId === 'mod-attendance')
    },
    {
      id: 'mod-leave',
      name: 'Leave',
      description: 'Paid leave quotas, leave encashment, approval workflows, and holiday calendar.',
      iconName: 'Calendar',
      active: true,
      categories: DEFAULT_CATEGORIES.filter(c => c.moduleId === 'mod-leave')
    }
  ],
  categories: DEFAULT_CATEGORIES,
  statuses: [
    {
      id: 'status-new',
      name: 'New',
      description: 'Newly created ticket awaiting initial review.',
      color: '#2E90FA',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      badgeText: 'text-blue-700',
      customerVisible: true,
      allowedNextStatuses: ['Open', 'In Progress', 'Waiting for Customer'],
      pausesSLA: false
    },
    {
      id: 'status-open',
      name: 'Open',
      description: 'Acknowledged and in active queue.',
      color: '#5925DC',
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
      badgeText: 'text-purple-700',
      customerVisible: true,
      allowedNextStatuses: ['In Progress', 'Waiting for Customer', 'Resolved'],
      pausesSLA: false
    },
    {
      id: 'status-in-progress',
      name: 'In Progress',
      description: 'Agent or specialist actively investigating.',
      color: '#B54708',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
      badgeText: 'text-amber-700',
      customerVisible: true,
      allowedNextStatuses: ['Waiting for Customer', 'Pending Engineering', 'Resolved'],
      pausesSLA: false
    },
    {
      id: 'status-waiting-customer',
      name: 'Waiting for Customer',
      description: 'Awaiting requested information or files from customer.',
      color: '#E11D48',
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
      badgeText: 'text-rose-700',
      customerVisible: true,
      allowedNextStatuses: ['In Progress', 'Resolved', 'Closed'],
      pausesSLA: true
    },
    {
      id: 'status-resolved',
      name: 'Resolved',
      description: 'Fix or solution provided. Customer verification required.',
      color: '#027A48',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      badgeText: 'text-emerald-700',
      customerVisible: true,
      allowedNextStatuses: ['In Progress', 'Closed'],
      pausesSLA: true
    },
    {
      id: 'status-closed',
      name: 'Closed',
      description: 'Resolution confirmed by customer or auto-closed.',
      color: '#64748B',
      badgeBg: 'bg-slate-100 text-slate-700 border-slate-200',
      badgeText: 'text-slate-700',
      customerVisible: true,
      allowedNextStatuses: ['In Progress'],
      pausesSLA: true
    }
  ],
  priorities: [
    {
      id: 'prio-critical',
      name: 'Critical',
      description: 'Severe impact on payroll run or statutory filing deadline.',
      color: '#B42318',
      responseSlaMinutes: 30,
      resolutionSlaMinutes: 240,
      escalationThresholdMinutes: 120
    },
    {
      id: 'prio-high',
      name: 'High',
      description: 'Calculation discrepancy or block affecting specific employees.',
      color: '#B54708',
      responseSlaMinutes: 60,
      resolutionSlaMinutes: 480,
      escalationThresholdMinutes: 240
    },
    {
      id: 'prio-normal',
      name: 'Normal',
      description: 'General support inquiry or configuration question.',
      color: '#475569',
      responseSlaMinutes: 240,
      resolutionSlaMinutes: 1440,
      escalationThresholdMinutes: 720
    }
  ]
};

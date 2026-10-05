import { Ticket, KnowledgeArticle } from '../types/helpdesk';

export const INITIAL_ARTICLES: KnowledgeArticle[] = [
  {
    id: 'kb-101',
    title: 'How are salary deductions calculated?',
    category: 'Payroll',
    summary: 'Learn about statutory deductions, income tax slabs, professional tax bands, and custom voluntary deductions in Sixtify Payroll.',
    content: `
# Understanding Salary Deductions in Sixtify Payroll

Salary deductions in Sixtify consist of two major components:
1. **Statutory Deductions**: Provident Fund (PF), Employee State Insurance (ESI), Professional Tax (PT), and Tax Deducted at Source (TDS).
2. **Voluntary / Custom Deductions**: Loan repayments, advance salary recoveries, component adjustments.

### Professional Tax Calculation Rule
Professional Tax is calculated based on the employee's gross monthly earnings state slab rules defined in **Payroll Settings → Tax Templates → Professional Tax**.

> Note: Deductions are recalculated during final payroll execution based on active employee attendance and loss-of-pay (LOP) days.

If you observe an unexpected deduction variance, verify if any retroactive pay adjustment or tax slab update was published during the current payroll lock period.
    `,
    readTime: '4 min read',
    helpfulCount: 342,
    views: 2890,
    lastUpdated: 'Sep 15, 2026',
    tags: ['payroll', 'tax', 'professional tax', 'deduction', 'calculation']
  },
  {
    id: 'kb-102',
    title: 'How to configure professional tax',
    category: 'Payroll',
    summary: 'Step-by-step guide to configuring state-wise Professional Tax slabs and exemption rules.',
    content: `
# Configuring Professional Tax Slabs

To configure PT in Sixtify:
1. Go to **Settings → Payroll Configuration → Statutory Taxes**.
2. Select **Professional Tax (PT)**.
3. Choose state branch jurisdiction.
4. Input monthly slab thresholds and fixed rate amounts.
5. Save and apply rule to payroll cycle.
    `,
    readTime: '3 min read',
    helpfulCount: 198,
    views: 1420,
    lastUpdated: 'Aug 20, 2026',
    tags: ['professional tax', 'statutory', 'configuration', 'slabs']
  },
  {
    id: 'kb-103',
    title: 'Troubleshooting Salary Calculation Issues',
    category: 'Payroll',
    summary: 'Common causes for salary calculation mismatches and steps to audit formulas before locking payroll.',
    content: `
# Troubleshooting Salary Calculation Mismatches

If an employee salary deduction or net pay seems incorrect:
1. Check **Loss of Pay (LOP)** count for the month.
2. Review **Tax Declaration Status** (Old vs. New Regime).
3. Verify **Arrears Adjustment** logs in the Payroll Processing ledger.
4. If PT deduction exceeds state slab limits, check if dual-state location tax rules were accidentally mapped.
    `,
    readTime: '5 min read',
    helpfulCount: 512,
    views: 4100,
    lastUpdated: 'Sep 28, 2026',
    tags: ['troubleshooting', 'salary deduction', 'mismatch', 'payroll engine']
  },
  {
    id: 'kb-104',
    title: 'How to process monthly payroll',
    category: 'Payroll',
    summary: 'Complete lifecycle guide for processing monthly payroll from attendance lock to bank transfer file generation.',
    content: 'Comprehensive guide to monthly payroll execution in Sixtify.',
    readTime: '6 min read',
    helpfulCount: 620,
    views: 5800,
    lastUpdated: 'Sep 01, 2026',
    tags: ['payroll', 'process', 'monthly']
  },
  {
    id: 'kb-105',
    title: 'How to generate salary slips',
    category: 'Payroll',
    summary: 'How to publish, download, and email monthly payslips to employees in bulk.',
    content: 'Guide to generating signed PDF payslips.',
    readTime: '2 min read',
    helpfulCount: 280,
    views: 2100,
    lastUpdated: 'Sep 10, 2026',
    tags: ['payslip', 'salary slip', 'pdf']
  },
  {
    id: 'kb-106',
    title: 'How to add a new employee',
    category: 'Employee Management',
    summary: 'Adding single employees or bulk uploading staff profiles with role and department assignments.',
    content: 'Guide to onboarding new employees in Sixtify HRMS.',
    readTime: '4 min read',
    helpfulCount: 410,
    views: 3900,
    lastUpdated: 'Jul 12, 2026',
    tags: ['employee', 'onboarding', 'profile']
  },
  {
    id: 'kb-107',
    title: 'How to configure attendance policies',
    category: 'Attendance',
    summary: 'Setting up shift timings, grace periods, shift rotations, and biometric sync.',
    content: 'Attendance configuration guide.',
    readTime: '5 min read',
    helpfulCount: 175,
    views: 1800,
    lastUpdated: 'Aug 05, 2026',
    tags: ['attendance', 'shift', 'biometric']
  }
];

export const INITIAL_TICKETS: Ticket[] = [
  {
    id: 'HD-10482',
    subject: 'Incorrect salary deduction for September payroll',
    description: 'Professional tax deduction appears incorrect for employee John Doe in the September 2026 payroll. The expected deduction is ₹2,500 but the system is showing ₹3,100.',
    category: 'Payroll',
    issueType: 'Salary Calculation',
    priority: 'High',
    status: 'In Progress',
    customerName: 'ABC Technologies Pvt. Ltd.',
    customerId: 'CUS-1042',
    customerPlan: 'Enterprise',
    customerSupportLevel: 'Priority Support',
    requesterName: 'Sarah Mehta',
    requesterRole: 'HR Administrator',
    employeeName: 'John Doe — EMP-1042',
    employeeId: 'EMP-1042',
    payrollPeriod: 'September 2026',
    assignedTeam: 'Payroll Support',
    assigneeName: 'Rahul Shah',
    createdAt: 'Oct 5, 2026 • 09:42 AM',
    updatedAt: 'Oct 5, 2026 • 11:20 AM',
    slaFirstResponseMet: true,
    slaResolutionRemaining: '1h 42m',
    attachments: [
      {
        id: 'att-1',
        name: 'salary-slip-september.pdf',
        size: '1.2 MB',
        type: 'application/pdf',
        uploadedAt: 'Oct 5, 09:42 AM',
        uploadedBy: 'Sarah Mehta'
      }
    ],
    conversation: [
      {
        id: 'msg-1',
        authorName: 'Sarah Mehta',
        authorRole: 'Customer',
        content: 'Professional tax deduction appears incorrect for employee John Doe in the September 2026 payroll. The expected deduction is ₹2,500 but the system is showing ₹3,100.',
        timestamp: 'Oct 5, 09:42 AM',
        isInternal: false,
        attachments: [
          {
            id: 'att-1',
            name: 'salary-slip-september.pdf',
            size: '1.2 MB',
            type: 'application/pdf',
            uploadedAt: 'Oct 5, 09:42 AM',
            uploadedBy: 'Sarah Mehta'
          }
        ]
      },
      {
        id: 'msg-2',
        authorName: 'Rahul Shah',
        authorRole: 'Support Agent',
        content: "Hi Sarah, we're checking the salary calculation. Could you please confirm whether the issue is affecting any other employees?",
        timestamp: 'Oct 5, 10:12 AM',
        isInternal: false
      },
      {
        id: 'msg-3',
        authorName: 'Sarah Mehta',
        authorRole: 'Customer',
        content: 'We have checked two other employees and they appear correct.',
        timestamp: 'Oct 5, 10:24 AM',
        isInternal: false
      }
    ],
    activities: [
      {
        id: 'act-1',
        timestamp: 'Oct 5 — 09:42',
        actor: 'Sarah Mehta',
        action: 'Ticket created',
        details: 'Submitted via Help Center (Category: Payroll)'
      },
      {
        id: 'act-2',
        timestamp: 'Oct 5 — 09:43',
        actor: 'System Auto-Router',
        action: 'Assigned to Payroll Support Team',
        details: 'Category match rule #102 applied'
      },
      {
        id: 'act-3',
        timestamp: 'Oct 5 — 09:45',
        actor: 'Rahul Shah',
        action: 'Ticket assigned',
        details: 'Assignee set to Rahul Shah'
      },
      {
        id: 'act-4',
        timestamp: 'Oct 5 — 10:12',
        actor: 'Rahul Shah',
        action: 'Status changed: Open → In Progress',
        details: 'First response sent to customer'
      }
    ],
    context: {
      company: 'ABC Technologies Pvt. Ltd.',
      requester: 'Sarah Mehta',
      module: 'Payroll',
      page: 'Salary Processing',
      employee: 'John Doe',
      payrollPeriod: 'September 2026',
      browser: 'Chrome 129.0 (macOS)',
      environment: 'Production'
    }
  },
  {
    id: 'HD-10491',
    subject: 'Payroll processing failure during batch calculation',
    description: 'Encountered 500 error when clicking "Run Payroll" for 450 employees in Bangalore office.',
    category: 'Payroll',
    issueType: 'Payroll Processing',
    priority: 'Critical',
    status: 'Open',
    customerName: 'XYZ Corp India',
    customerId: 'CUS-2088',
    customerPlan: 'Enterprise',
    customerSupportLevel: 'Priority Support',
    requesterName: 'Vikram Singh',
    requesterRole: 'Payroll Manager',
    assignedTeam: 'Payroll Support',
    assigneeName: 'Priya Sharma',
    createdAt: 'Oct 5, 2026 • 10:05 AM',
    updatedAt: 'Oct 5, 2026 • 10:05 AM',
    slaFirstResponseMet: false,
    slaResolutionRemaining: '38 minutes',
    attachments: [],
    conversation: [
      {
        id: 'msg-491-1',
        authorName: 'Vikram Singh',
        authorRole: 'Customer',
        content: 'Encountered 500 error when clicking "Run Payroll" for 450 employees in Bangalore office.',
        timestamp: 'Oct 5, 10:05 AM',
        isInternal: false
      }
    ],
    activities: [
      {
        id: 'act-491-1',
        timestamp: 'Oct 5 — 10:05',
        actor: 'Vikram Singh',
        action: 'Ticket created',
        details: 'Submitted via Support Center'
      }
    ],
    context: {
      company: 'XYZ Corp India',
      requester: 'Vikram Singh',
      module: 'Payroll',
      page: 'Batch Run',
      employee: 'N/A (Batch)',
      payrollPeriod: 'September 2026',
      browser: 'Chrome 129.0',
      environment: 'Production'
    }
  },
  {
    id: 'HD-10476',
    subject: 'Attendance report issue — missing biometric logs',
    description: 'Biometric sync for Mumbai location hasn\'t reflected in daily attendance logs since yesterday.',
    category: 'Attendance',
    issueType: 'Biometric Sync',
    priority: 'Normal',
    status: 'Waiting for You',
    customerName: 'ABC Technologies Pvt. Ltd.',
    customerId: 'CUS-1042',
    customerPlan: 'Enterprise',
    customerSupportLevel: 'Priority Support',
    requesterName: 'Sarah Mehta',
    requesterRole: 'HR Administrator',
    assignedTeam: 'Attendance Support',
    assigneeName: 'Amit Patel',
    createdAt: 'Oct 4, 2026 • 04:15 PM',
    updatedAt: 'Oct 4, 2026 • 06:30 PM',
    slaFirstResponseMet: true,
    slaResolutionRemaining: '18h 10m',
    attachments: [],
    conversation: [
      {
        id: 'msg-476-1',
        authorName: 'Sarah Mehta',
        authorRole: 'Customer',
        content: 'Biometric sync for Mumbai location hasn\'t reflected in daily attendance logs since yesterday.',
        timestamp: 'Oct 4, 04:15 PM',
        isInternal: false
      },
      {
        id: 'msg-476-2',
        authorName: 'Amit Patel',
        authorRole: 'Support Agent',
        content: 'Hi Sarah, please share the IP address and device status code from your biometric device gateway settings page.',
        timestamp: 'Oct 4, 06:30 PM',
        isInternal: false
      }
    ],
    activities: [
      {
        id: 'act-476-1',
        timestamp: 'Oct 4 — 04:15',
        actor: 'Sarah Mehta',
        action: 'Ticket created'
      },
      {
        id: 'act-476-2',
        timestamp: 'Oct 4 — 06:30',
        actor: 'Amit Patel',
        action: 'Status changed: Open → Waiting for Customer'
      }
    ],
    context: {
      company: 'ABC Technologies Pvt. Ltd.',
      requester: 'Sarah Mehta',
      module: 'Attendance',
      page: 'Device Logs',
      employee: 'N/A',
      payrollPeriod: 'N/A',
      browser: 'Firefox 128',
      environment: 'Production'
    }
  },
  {
    id: 'HD-10451',
    subject: 'API access request for custom ERP webhook integration',
    description: 'We need OAuth client credentials for integrating employee master data with our SAP system.',
    category: 'API',
    issueType: 'API Key Request',
    priority: 'Normal',
    status: 'Resolved',
    customerName: 'GlobalTech Solutions',
    customerId: 'CUS-3011',
    customerPlan: 'Enterprise',
    customerSupportLevel: 'Standard Support',
    requesterName: 'Rohan Sharma',
    requesterRole: 'IT Director',
    assignedTeam: 'Technical Support',
    assigneeName: 'Deepak Kumar',
    createdAt: 'Oct 2, 2026 • 11:00 AM',
    updatedAt: 'Oct 3, 2026 • 02:40 PM',
    slaFirstResponseMet: true,
    slaResolutionRemaining: 'Completed',
    attachments: [],
    conversation: [
      {
        id: 'msg-451-1',
        authorName: 'Rohan Sharma',
        authorRole: 'Customer',
        content: 'We need OAuth client credentials for integrating employee master data with our SAP system.',
        timestamp: 'Oct 2, 11:00 AM',
        isInternal: false
      },
      {
        id: 'msg-451-2',
        authorName: 'Deepak Kumar',
        authorRole: 'Support Agent',
        content: 'OAuth2 Client ID and secret generated and provisioned under Settings → Developer API Settings.',
        timestamp: 'Oct 3, 02:40 PM',
        isInternal: false
      }
    ],
    activities: [
      {
        id: 'act-451-1',
        timestamp: 'Oct 2 — 11:00',
        actor: 'Rohan Sharma',
        action: 'Ticket created'
      },
      {
        id: 'act-451-2',
        timestamp: 'Oct 3 — 02:40',
        actor: 'Deepak Kumar',
        action: 'Ticket marked Resolved (Information Provided)'
      }
    ],
    context: {
      company: 'GlobalTech Solutions',
      requester: 'Rohan Sharma',
      module: 'API',
      page: 'API Settings',
      employee: 'N/A',
      payrollPeriod: 'N/A',
      browser: 'Chrome 129',
      environment: 'Production'
    }
  },
  {
    id: 'HD-10392',
    subject: 'Leave balance mismatch after annual reset',
    description: 'Privilege Leave balance for 15 employees didn\'t roll over properly on Sep 1st.',
    category: 'Leave',
    issueType: 'Leave Reset',
    priority: 'High',
    status: 'Closed',
    customerName: 'ABC Technologies Pvt. Ltd.',
    customerId: 'CUS-1042',
    customerPlan: 'Enterprise',
    customerSupportLevel: 'Priority Support',
    requesterName: 'Sarah Mehta',
    requesterRole: 'HR Administrator',
    assignedTeam: 'Payroll Support',
    assigneeName: 'Rahul Shah',
    createdAt: 'Sep 28, 2026 • 02:30 PM',
    updatedAt: 'Sep 30, 2026 • 11:00 AM',
    slaFirstResponseMet: true,
    slaResolutionRemaining: 'Completed',
    attachments: [],
    conversation: [
      {
        id: 'msg-392-1',
        authorName: 'Sarah Mehta',
        authorRole: 'Customer',
        content: 'Privilege Leave balance for 15 employees didn\'t roll over properly on Sep 1st.',
        timestamp: 'Sep 28, 02:30 PM',
        isInternal: false
      }
    ],
    activities: [
      {
        id: 'act-392-1',
        timestamp: 'Sep 28 — 02:30',
        actor: 'Sarah Mehta',
        action: 'Ticket created'
      },
      {
        id: 'act-392-2',
        timestamp: 'Sep 30 — 11:00',
        actor: 'Sarah Mehta',
        action: 'Ticket closed with 5-star rating'
      }
    ],
    context: {
      company: 'ABC Technologies Pvt. Ltd.',
      requester: 'Sarah Mehta',
      module: 'Leave',
      page: 'Leave Balance',
      employee: 'Multiple',
      payrollPeriod: 'N/A',
      browser: 'Chrome 129',
      environment: 'Production'
    }
  }
];

export const SUPPORT_TEAMS = [
  { id: 'team-1', name: 'General Support', lead: 'Neha Gupta', membersCount: 8, activeTickets: 14, avgResponse: '28m' },
  { id: 'team-2', name: 'Payroll Support', lead: 'Rahul Shah', membersCount: 6, activeTickets: 24, avgResponse: '18m' },
  { id: 'team-3', name: 'Attendance Support', lead: 'Amit Patel', membersCount: 5, activeTickets: 12, avgResponse: '35m' },
  { id: 'team-4', name: 'Product Support', lead: 'Siddharth Rao', membersCount: 7, activeTickets: 11, avgResponse: '40m' },
  { id: 'team-5', name: 'Technical Support', lead: 'Deepak Kumar', membersCount: 4, activeTickets: 7, avgResponse: '22m' },
  { id: 'team-6', name: 'Engineering', lead: 'Ananya Verma', membersCount: 12, activeTickets: 3, avgResponse: '1h 10m' }
];

export const SLA_POLICIES = [
  { priority: 'Critical', firstResponse: '30 minutes', resolution: '4 hours', target: '99.5%' },
  { priority: 'High', firstResponse: '2 hours', resolution: '8 hours', target: '98.0%' },
  { priority: 'Normal', firstResponse: '4 hours', resolution: '2 business days', target: '95.0%' },
  { priority: 'Low', firstResponse: '8 hours', resolution: '5 business days', target: '90.0%' }
];

export const ROUTING_RULES = [
  { category: 'Payroll', routedTo: 'Payroll Support', priority: 'High (Auto-calculated)' },
  { category: 'Attendance', routedTo: 'Attendance Support', priority: 'Normal' },
  { category: 'Leave', routedTo: 'Payroll Support', priority: 'Normal' },
  { category: 'API / Webhook', routedTo: 'Technical Support', priority: 'Normal' },
  { category: 'Software Bug (Escalated)', routedTo: 'Engineering', priority: 'High / Critical' }
];

import React, { createContext, useContext, useState } from 'react';
import { 
  UserRole, 
  Ticket, 
  TicketStatus, 
  EngineeringStatus, 
  TicketComment, 
  Attachment,
  CSATFeedback,
  ModuleCategory
} from '../types/helpdesk';
import { INITIAL_TICKETS } from '../data/mockData';

export interface GuidedStep {
  id: number;
  title: string;
  role: UserRole;
  description: string;
  actionText: string;
  viewId: string;
}

export const GUIDED_STEPS: GuidedStep[] = [
  {
    id: 0,
    title: 'Customer Search KB',
    role: 'customer',
    description: 'Sarah Mehta (HR Admin) searches Help Center for "salary deduction is incorrect".',
    actionText: 'Search KB & View Articles',
    viewId: 'help-center'
  },
  {
    id: 1,
    title: 'Raise Support Ticket',
    role: 'customer',
    description: 'Self-service articles don\'t solve issue. Sarah fills out support request form.',
    actionText: 'Open Ticket Form',
    viewId: 'raise-ticket'
  },
  {
    id: 2,
    title: 'Ticket Created (HD-10482)',
    role: 'customer',
    description: 'HD-10482 generated with High priority, auto-routed to Payroll Support Team.',
    actionText: 'View Created Ticket',
    viewId: 'customer-ticket-detail'
  },
  {
    id: 3,
    title: 'Support Agent Inspects',
    role: 'agent',
    description: 'Switch to Support Agent console. Agent Rahul Shah opens HD-10482 queue.',
    actionText: 'Switch to Agent Console',
    viewId: 'provider-ticket-detail'
  },
  {
    id: 4,
    title: 'Agent Requests Info',
    role: 'agent',
    description: 'Rahul requests "payroll-calculation-report.xlsx" from customer.',
    actionText: 'Request Info from Customer',
    viewId: 'provider-ticket-detail'
  },
  {
    id: 5,
    title: 'Customer Uploads Report',
    role: 'customer',
    description: 'Sarah Mehta sees "Waiting for You" alert and uploads payroll calculation report.',
    actionText: 'Upload File (Customer)',
    viewId: 'customer-ticket-detail'
  },
  {
    id: 6,
    title: 'Escalate to Engineering',
    role: 'agent',
    description: 'Rahul investigates report, confirms product engine variance, and escalates to Engineering.',
    actionText: 'Escalate to Engineering',
    viewId: 'provider-ticket-detail'
  },
  {
    id: 7,
    title: 'Engineering Fixes Bug',
    role: 'engineering',
    description: 'Switch to Engineering Console. Dev team confirms bug and deploys fix.',
    actionText: 'Engineering Fixes Bug',
    viewId: 'engineering-queue'
  },
  {
    id: 8,
    title: 'Agent Resolves Ticket',
    role: 'agent',
    description: 'Agent Rahul verifies fix, adds internal note, and marks ticket Resolved.',
    actionText: 'Mark Ticket Resolved',
    viewId: 'provider-ticket-detail'
  },
  {
    id: 9,
    title: 'Customer Confirms & Closes',
    role: 'customer',
    description: 'Sarah verifies fixed calculation, confirms resolution, and closes ticket.',
    actionText: 'Confirm & Close Ticket',
    viewId: 'customer-ticket-detail'
  },
  {
    id: 10,
    title: '5-Star CSAT Feedback',
    role: 'customer',
    description: 'Sarah submits 5-star rating and positive feedback.',
    actionText: 'Submit 5-Star Rating',
    viewId: 'customer-ticket-detail'
  }
];

export interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
}

interface DemoStateContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeView: string;
  setActiveView: (viewId: string) => void;
  currentGuidedStep: number;
  setCurrentGuidedStep: (step: number) => void;
  advanceGuidedStep: () => void;
  tickets: Ticket[];
  activeTicketId: string;
  setActiveTicketId: (id: string) => void;
  selectedArticleId: string | null;
  setSelectedArticleId: (id: string | null) => void;
  prefilledCategory: ModuleCategory;
  setPrefilledCategory: (category: ModuleCategory) => void;
  toasts: Toast[];
  addToast: (type: 'success' | 'info' | 'warning' | 'error', title: string, message?: string) => void;
  removeToast: (id: string) => void;

  // Lifecycle state modifiers for HD-10482
  createNewTicket: (ticketData: Partial<Ticket>) => string;
  addPublicReply: (ticketId: string, content: string, attachments?: Attachment[]) => void;
  addInternalNote: (ticketId: string, content: string) => void;
  requestInformation: (ticketId: string, message: string) => void;
  uploadCustomerInformation: (ticketId: string, fileName: string, fileSize: string) => void;
  escalateTicketToEngineering: (ticketId: string, reason: string, note: string) => void;
  updateEngineeringStatus: (ticketId: string, status: EngineeringStatus) => void;
  resolveTicket: (ticketId: string, resolutionType: any, summary: string) => void;
  reopenTicket: (ticketId: string, reason: string) => void;
  confirmAndCloseTicket: (ticketId: string) => void;
  submitCSATFeedback: (ticketId: string, rating: number, comment: string) => void;
  resetDemoData: () => void;
}

const DemoStateContext = createContext<DemoStateContextType | undefined>(undefined);

export const DemoStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('customer');
  const [activeView, setActiveView] = useState<string>('help-center');
  const [currentGuidedStep, setCurrentGuidedStep] = useState<number>(0);
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [activeTicketId, setActiveTicketId] = useState<string>('HD-10482');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>('kb-101');
  const [prefilledCategory, setPrefilledCategory] = useState<ModuleCategory>('Payroll');
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: 'success' | 'info' | 'warning' | 'error', title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    // Adjust view according to role switch
    if (newRole === 'customer') {
      if (activeView.startsWith('provider') || activeView === 'engineering-queue') {
        setActiveView('help-center');
      }
    } else if (newRole === 'agent' || newRole === 'manager') {
      if (activeView.startsWith('help-center') || activeView === 'raise-ticket' || activeView === 'my-tickets') {
        setActiveView('provider-dashboard');
      }
    } else if (newRole === 'engineering') {
      setActiveView('engineering-queue');
    }
  };

  const createNewTicket = (ticketData: Partial<Ticket>): string => {
    const newId = `HD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newTicket: Ticket = {
      id: newId,
      subject: ticketData.subject || 'Support Request',
      description: ticketData.description || '',
      category: ticketData.category || 'Payroll',
      issueType: ticketData.issueType || 'Salary Calculation',
      priority: ticketData.priority || 'High',
      status: 'New',
      customerName: 'ABC Technologies Pvt. Ltd.',
      customerId: 'CUS-1042',
      customerPlan: 'Enterprise',
      customerSupportLevel: 'Priority Support',
      requesterName: 'Sarah Mehta',
      requesterRole: 'HR Administrator',
      employeeName: ticketData.employeeName || 'John Doe — EMP-1042',
      employeeId: 'EMP-1042',
      payrollPeriod: ticketData.payrollPeriod || 'September 2026',
      assignedTeam: 'Payroll Support',
      assigneeName: 'Rahul Shah',
      createdAt: 'Just now',
      updatedAt: 'Just now',
      slaFirstResponseMet: false,
      slaResolutionRemaining: '2h 00m',
      attachments: ticketData.attachments || [
        {
          id: `att-${Date.now()}`,
          name: 'salary-slip-september.pdf',
          size: '1.2 MB',
          type: 'application/pdf',
          uploadedAt: 'Just now',
          uploadedBy: 'Sarah Mehta'
        }
      ],
      conversation: [
        {
          id: `msg-${Date.now()}`,
          authorName: 'Sarah Mehta',
          authorRole: 'Customer',
          content: ticketData.description || '',
          timestamp: 'Just now',
          isInternal: false,
          attachments: ticketData.attachments
        }
      ],
      activities: [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          actor: 'Sarah Mehta',
          action: 'Ticket created',
          details: `Category: ${ticketData.category || 'Payroll'}, Priority: ${ticketData.priority || 'High'}`
        },
        {
          id: `act-${Date.now() + 1}`,
          timestamp: 'Just now',
          actor: 'System Auto-Router',
          action: 'Assigned to Payroll Support Team',
          details: 'Automatic rule: Module=Payroll -> Payroll Support'
        }
      ],
      context: {
        company: 'ABC Technologies Pvt. Ltd.',
        requester: 'Sarah Mehta',
        module: ticketData.category || 'Payroll',
        page: 'Salary Processing',
        employee: ticketData.employeeName || 'John Doe',
        payrollPeriod: ticketData.payrollPeriod || 'September 2026',
        browser: 'Chrome 129.0',
        environment: 'Production'
      }
    };

    setTickets(prev => [newTicket, ...prev]);
    setActiveTicketId(newId);
    addToast('success', 'Ticket Created Successfully', `Ticket ${newId} has been auto-routed to Payroll Support Team.`);
    return newId;
  };

  const addPublicReply = (ticketId: string, content: string, attachments?: Attachment[]) => {
    const isCustomer = role === 'customer';
    const authorName = isCustomer ? 'Sarah Mehta' : 'Rahul Shah';
    const authorRole = isCustomer ? 'Customer' : 'Support Agent';

    setTickets(prev => prev.map(ticket => {
      if (ticket.id !== ticketId) return ticket;

      const newMsg: TicketComment = {
        id: `msg-${Date.now()}`,
        authorName,
        authorRole,
        content,
        timestamp: 'Just now',
        isInternal: false,
        attachments
      };

      const updatedConversation = [...ticket.conversation, newMsg];
      let newStatus: TicketStatus = ticket.status;

      // If agent responds, set to In Progress or keep current
      if (!isCustomer && ticket.status === 'Open') {
        newStatus = 'In Progress';
      }

      return {
        ...ticket,
        status: newStatus,
        updatedAt: 'Just now',
        conversation: updatedConversation,
        activities: [
          ...ticket.activities,
          {
            id: `act-${Date.now()}`,
            timestamp: 'Just now',
            actor: authorName,
            action: `Public reply added by ${authorName}`
          }
        ]
      };
    }));

    addToast('info', 'Reply Sent', `Your message was delivered on ${ticketId}.`);
  };

  const addInternalNote = (ticketId: string, content: string) => {
    setTickets(prev => prev.map(ticket => {
      if (ticket.id !== ticketId) return ticket;

      const noteMsg: TicketComment = {
        id: `msg-int-${Date.now()}`,
        authorName: role === 'engineering' ? 'Payroll Eng Team' : 'Rahul Shah',
        authorRole: role === 'engineering' ? 'Engineering' : 'Support Agent',
        content,
        timestamp: 'Just now',
        isInternal: true
      };

      return {
        ...ticket,
        updatedAt: 'Just now',
        conversation: [...ticket.conversation, noteMsg],
        activities: [
          ...ticket.activities,
          {
            id: `act-${Date.now()}`,
            timestamp: 'Just now',
            actor: role === 'engineering' ? 'Engineering Team' : 'Rahul Shah',
            action: 'Internal note added (Staff Only)',
            details: content.substring(0, 50) + '...'
          }
        ]
      };
    }));

    addToast('success', 'Internal Note Saved', 'Internal notes are strictly hidden from customer view.');
  };

  const requestInformation = (ticketId: string, message: string) => {
    setTickets(prev => prev.map(ticket => {
      if (ticket.id !== ticketId) return ticket;

      const agentMsg: TicketComment = {
        id: `msg-${Date.now()}`,
        authorName: 'Rahul Shah',
        authorRole: 'Support Agent',
        content: message,
        timestamp: 'Just now',
        isInternal: false
      };

      return {
        ...ticket,
        status: 'Waiting for You', // Waiting for customer
        requiresInformation: true,
        infoRequestMessage: message,
        updatedAt: 'Just now',
        conversation: [...ticket.conversation, agentMsg],
        activities: [
          ...ticket.activities,
          {
            id: `act-${Date.now()}`,
            timestamp: 'Just now',
            actor: 'Rahul Shah',
            action: 'Status changed: In Progress → Waiting for Customer',
            details: 'Requested calculation report from Sarah Mehta'
          }
        ]
      };
    }));

    addToast('warning', 'Information Requested', `Ticket status updated to "Waiting for Customer".`);
  };

  const uploadCustomerInformation = (ticketId: string, fileName: string, fileSize: string) => {
    setTickets(prev => prev.map(ticket => {
      if (ticket.id !== ticketId) return ticket;

      const newAttachment: Attachment = {
        id: `att-${Date.now()}`,
        name: fileName,
        size: fileSize,
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        uploadedAt: 'Just now',
        uploadedBy: 'Sarah Mehta'
      };

      const customerMsg: TicketComment = {
        id: `msg-${Date.now()}`,
        authorName: 'Sarah Mehta',
        authorRole: 'Customer',
        content: `Uploaded required file: ${fileName}`,
        timestamp: 'Just now',
        isInternal: false,
        attachments: [newAttachment]
      };

      return {
        ...ticket,
        status: 'In Progress',
        requiresInformation: false,
        infoRequestMessage: undefined,
        attachments: [...ticket.attachments, newAttachment],
        conversation: [...ticket.conversation, customerMsg],
        activities: [
          ...ticket.activities,
          {
            id: `act-${Date.now()}`,
            timestamp: 'Just now',
            actor: 'Sarah Mehta',
            action: `Uploaded ${fileName}`,
            details: 'Status automatically changed: Waiting for Customer → In Progress'
          }
        ]
      };
    }));

    addToast('success', 'File Uploaded', `${fileName} attached. Ticket state changed back to "In Progress".`);
  };

  const escalateTicketToEngineering = (ticketId: string, reason: string, note: string) => {
    setTickets(prev => prev.map(ticket => {
      if (ticket.id !== ticketId) return ticket;

      const internalNote: TicketComment = {
        id: `msg-${Date.now()}`,
        authorName: 'Rahul Shah',
        authorRole: 'Support Agent',
        content: `[Escalation Note to Engineering]\nReason: ${reason}\n\nDetails: ${note}`,
        timestamp: 'Just now',
        isInternal: true
      };

      return {
        ...ticket,
        status: 'In Progress', // Customer still sees In Progress
        updatedAt: 'Just now',
        escalation: {
          isEscalated: true,
          escalatedTo: 'Engineering',
          reason,
          escalatedAt: 'Just now',
          escalatedBy: 'Rahul Shah',
          note
        },
        engineering: {
          status: 'Investigating',
          expectedValue: '₹2,500',
          actualValue: '₹3,100',
          affectedEmployeesCount: 12,
          reproductionSteps: [
            'Open Payroll Module → Select September 2026 cycle.',
            'Navigate to Employee Payroll → Open EMP-1042 (John Doe).',
            'Trigger salary calculation engine.',
            'Observe Professional Tax deduction component showing ₹3,100 instead of ₹2,500 state slab limit.'
          ],
          assignedDev: 'Payroll Core Engine Team'
        },
        conversation: [...ticket.conversation, internalNote],
        activities: [
          ...ticket.activities,
          {
            id: `act-${Date.now()}`,
            timestamp: 'Just now',
            actor: 'Rahul Shah',
            action: 'Escalated to Product / Engineering',
            details: `Reason: ${reason} (Tier: Payroll Support → L2 Product Support → Engineering)`
          }
        ]
      };
    }));

    addToast('warning', 'Escalated to Engineering', 'Ticket HD-10482 routed to Engineering Queue with context & reproduction steps.');
  };

  const updateEngineeringStatus = (ticketId: string, newEngStatus: EngineeringStatus) => {
    setTickets(prev => prev.map(ticket => {
      if (ticket.id !== ticketId) return ticket;

      const isFixed = newEngStatus === 'Fixed';
      const engNote: TicketComment = {
        id: `msg-${Date.now()}`,
        authorName: 'Ananya Verma (Engineering)',
        authorRole: 'Engineering',
        content: isFixed 
          ? 'BUG FIXED: Hotfix deployed to Production (Build v4.8.2). Professional Tax deduction formula corrected for multi-slab state tiers.'
          : `Engineering Status Update: Changed state to ${newEngStatus}.`,
        timestamp: 'Just now',
        isInternal: true
      };

      return {
        ...ticket,
        updatedAt: 'Just now',
        engineering: ticket.engineering ? {
          ...ticket.engineering,
          status: newEngStatus,
          fixedAt: isFixed ? 'Just now' : undefined
        } : undefined,
        conversation: [...ticket.conversation, engNote],
        activities: [
          ...ticket.activities,
          {
            id: `act-${Date.now()}`,
            timestamp: 'Just now',
            actor: 'Engineering Team',
            action: `Engineering status updated: ${newEngStatus}`,
            details: isFixed ? 'Fix verified in production hotfix deployment.' : undefined
          }
        ]
      };
    }));

    addToast(
      newEngStatus === 'Fixed' ? 'success' : 'info',
      `Engineering: ${newEngStatus}`,
      newEngStatus === 'Fixed' ? 'Notification sent to Support Agent to verify and resolve ticket.' : `Issue status set to ${newEngStatus}.`
    );
  };

  const resolveTicket = (ticketId: string, resolutionType: any, summary: string) => {
    setTickets(prev => prev.map(ticket => {
      if (ticket.id !== ticketId) return ticket;

      const publicResolutionMsg: TicketComment = {
        id: `msg-${Date.now()}`,
        authorName: 'Rahul Shah',
        authorRole: 'Support Agent',
        content: `Hi Sarah, we have resolved your payroll calculation issue.\n\nResolution (${resolutionType}): ${summary}\n\nPlease verify your September salary calculation in your HRMS panel.`,
        timestamp: 'Just now',
        isInternal: false
      };

      return {
        ...ticket,
        status: 'Resolved',
        updatedAt: 'Just now',
        resolution: {
          type: resolutionType,
          summary,
          resolvedAt: 'Just now',
          resolvedBy: 'Rahul Shah'
        },
        conversation: [...ticket.conversation, publicResolutionMsg],
        activities: [
          ...ticket.activities,
          {
            id: `act-${Date.now()}`,
            timestamp: 'Just now',
            actor: 'Rahul Shah',
            action: 'Ticket marked Resolved',
            details: `Resolution Type: ${resolutionType}`
          }
        ]
      };
    }));

    addToast('success', 'Ticket Resolved', `Resolution message sent to Sarah Mehta. Ticket status is now "Resolved".`);
  };

  const reopenTicket = (ticketId: string, reason: string) => {
    setTickets(prev => prev.map(ticket => {
      if (ticket.id !== ticketId) return ticket;

      const customerMsg: TicketComment = {
        id: `msg-${Date.now()}`,
        authorName: 'Sarah Mehta',
        authorRole: 'Customer',
        content: `Issue Still Exists: ${reason}`,
        timestamp: 'Just now',
        isInternal: false
      };

      return {
        ...ticket,
        status: 'In Progress', // Resolved -> Reopened -> In Progress
        updatedAt: 'Just now',
        conversation: [...ticket.conversation, customerMsg],
        activities: [
          ...ticket.activities,
          {
            id: `act-${Date.now()}`,
            timestamp: 'Just now',
            actor: 'Sarah Mehta',
            action: 'Ticket reopened: Resolved → Reopened → In Progress',
            details: `Customer indicated issue still exists: ${reason}`
          }
        ]
      };
    }));

    addToast('warning', 'Ticket Reopened', 'Ticket status transitioned: Resolved → Reopened → In Progress.');
  };

  const confirmAndCloseTicket = (ticketId: string) => {
    setTickets(prev => prev.map(ticket => {
      if (ticket.id !== ticketId) return ticket;

      const customerMsg: TicketComment = {
        id: `msg-${Date.now()}`,
        authorName: 'Sarah Mehta',
        authorRole: 'Customer',
        content: 'Confirmed resolution. The deduction for John Doe now accurately reflects ₹2,500. Closing ticket.',
        timestamp: 'Just now',
        isInternal: false
      };

      return {
        ...ticket,
        status: 'Closed',
        updatedAt: 'Just now',
        conversation: [...ticket.conversation, customerMsg],
        activities: [
          ...ticket.activities,
          {
            id: `act-${Date.now()}`,
            timestamp: 'Just now',
            actor: 'Sarah Mehta',
            action: 'Resolution confirmed by customer',
            details: 'Ticket status transitioned: Resolved → Closed'
          }
        ]
      };
    }));

    addToast('success', 'Ticket Closed', 'Resolution confirmed! Please rate your support experience.');
  };

  const submitCSATFeedback = (ticketId: string, rating: number, comment: string) => {
    setTickets(prev => prev.map(ticket => {
      if (ticket.id !== ticketId) return ticket;

      return {
        ...ticket,
        feedback: {
          rating,
          comment,
          submittedAt: 'Just now'
        },
        activities: [
          ...ticket.activities,
          {
            id: `act-${Date.now()}`,
            timestamp: 'Just now',
            actor: 'Sarah Mehta',
            action: `CSAT Feedback submitted: ${rating}/5 Stars ⭐`,
            details: comment
          }
        ]
      };
    }));

    addToast('success', 'Thank You!', `Your ${rating}-star feedback has been submitted successfully.`);
  };

  const advanceGuidedStep = () => {
    const nextIndex = (currentGuidedStep + 1) % GUIDED_STEPS.length;
    const nextStep = GUIDED_STEPS[nextIndex];
    setCurrentGuidedStep(nextIndex);

    // Switch role & view as required by step
    setRole(nextStep.role);
    setActiveView(nextStep.viewId);

    // Execute automated actions corresponding to step transitions for a slick demo!
    if (nextIndex === 4) {
      // Step 4: Agent requests info
      requestInformation('HD-10482', 'Please upload the September payroll calculation report so our team can continue investigating this issue.');
    } else if (nextIndex === 5) {
      // Step 5: Customer uploads file
      uploadCustomerInformation('HD-10482', 'payroll-calculation-report.xlsx', '2.4 MB');
    } else if (nextIndex === 6) {
      // Step 6: Agent escalates to Engineering
      escalateTicketToEngineering('HD-10482', 'Software bug', 'Payroll calculation engine applied incorrect state PT slab for EMP-1042.');
    } else if (nextIndex === 7) {
      // Step 7: Engineering fixes bug
      updateEngineeringStatus('HD-10482', 'Fixed');
    } else if (nextIndex === 8) {
      // Step 8: Agent resolves ticket
      resolveTicket('HD-10482', 'Product Bug Fixed', 'The payroll calculation issue was caused by an incorrect professional tax calculation in the payroll engine. The issue has been fixed and verified.');
    } else if (nextIndex === 9) {
      // Step 9: Customer confirms & closes
      confirmAndCloseTicket('HD-10482');
    } else if (nextIndex === 10) {
      // Step 10: 5-star rating
      submitCSATFeedback('HD-10482', 5, 'Outstanding support! The team escalated and fixed the payroll engine bug very quickly.');
    }
  };

  const resetDemoData = () => {
    setTickets(INITIAL_TICKETS);
    setCurrentGuidedStep(0);
    setRole('customer');
    setActiveView('help-center');
    setActiveTicketId('HD-10482');
    addToast('info', 'Demo Reset', 'All tickets and states reset to initial demo values.');
  };

  return (
    <DemoStateContext.Provider value={{
      role,
      setRole,
      activeView,
      setActiveView,
      currentGuidedStep,
      setCurrentGuidedStep,
      advanceGuidedStep,
      tickets,
      activeTicketId,
      setActiveTicketId,
      selectedArticleId,
      setSelectedArticleId,
      prefilledCategory,
      setPrefilledCategory,
      toasts,
      addToast,
      removeToast,
      createNewTicket,
      addPublicReply,
      addInternalNote,
      requestInformation,
      uploadCustomerInformation,
      escalateTicketToEngineering,
      updateEngineeringStatus,
      resolveTicket,
      reopenTicket,
      confirmAndCloseTicket,
      submitCSATFeedback,
      resetDemoData
    }}>
      {children}
    </DemoStateContext.Provider>
  );
};

export const useDemoState = () => {
  const context = useContext(DemoStateContext);
  if (!context) {
    throw new Error('useDemoState must be used within a DemoStateProvider');
  }
  return context;
};

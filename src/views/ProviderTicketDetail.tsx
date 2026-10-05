import React, { useState } from 'react';
import { useDemoState } from '../context/DemoStateContext';
import { 
  EscalateTicketModal, 
  RequestInfoModal, 
  ResolveTicketModal 
} from '../components/Modals';
import { 
  ArrowLeft, 
  Send, 
  Lock, 
  UserCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Building2, 
  User, 
  FileText, 
  ShieldCheck, 
  Layers, 
  History, 
  Paperclip,
  Cpu,
  HelpCircle
} from 'lucide-react';

export const ProviderTicketDetail: React.FC = () => {
  const { 
    activeTicketId, 
    tickets, 
    setActiveView, 
    addPublicReply, 
    addInternalNote 
  } = useDemoState();

  const [composerMode, setComposerMode] = useState<'reply' | 'internal'>('reply');
  const [composerText, setComposerText] = useState('');
  
  // Modals state
  const [isEscalateOpen, setIsEscalateOpen] = useState(false);
  const [isRequestInfoOpen, setIsRequestInfoOpen] = useState(false);
  const [isResolveOpen, setIsResolveOpen] = useState(false);

  const ticket = tickets.find(t => t.id === activeTicketId) || tickets[0];

  const handleComposerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composerText.trim()) return;

    if (composerMode === 'reply') {
      addPublicReply(ticket.id, composerText);
    } else {
      addInternalNote(ticket.id, composerText);
    }
    setComposerText('');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Navigation */}
        <button
          onClick={() => setActiveView('provider-queue')}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Ticket Queue
        </button>

        {/* Main Console Card Header (Section 15 in prompt) */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-base bg-blue-600/30 text-blue-300 font-extrabold px-3 py-1 rounded-md border border-blue-500/40">
                {ticket.id}
              </span>
              <span className={`badge ${
                ticket.status === 'Resolved' ? 'badge-resolved' :
                ticket.status === 'Waiting for You' ? 'badge-waiting' :
                ticket.status === 'Closed' ? 'badge-closed' : 'badge-in-progress'
              }`}>
                {ticket.status === 'Waiting for You' ? 'Waiting for Customer' : ticket.status}
              </span>
              <span className="badge badge-priority-high">{ticket.priority} Priority</span>
            </div>

            {/* Header Action Buttons (Assign, Request Info, Escalate, Resolve) */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsRequestInfoOpen(true)}
                className="btn btn-secondary btn-sm text-xs bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
                id="agent-request-info-btn"
              >
                <HelpCircle size={14} className="text-amber-400" />
                <span>Request Info</span>
              </button>

              <button
                onClick={() => setIsEscalateOpen(true)}
                className="btn btn-secondary btn-sm text-xs bg-amber-900/60 border-amber-700 text-amber-200 hover:bg-amber-800"
                id="agent-escalate-btn"
              >
                <AlertTriangle size={14} className="text-amber-400" />
                <span>Escalate Ticket</span>
              </button>

              <button
                onClick={() => setIsResolveOpen(true)}
                className="btn btn-success btn-sm text-xs"
                id="agent-resolve-btn"
              >
                <CheckCircle2 size={14} />
                <span>Resolve Ticket</span>
              </button>
            </div>
          </div>

          <h1 className="text-xl md:text-2xl font-extrabold tracking-tight">
            {ticket.subject}
          </h1>
        </div>

        {/* Engineering Fix Alert Banner */}
        {ticket.engineering?.status === 'Fixed' && ticket.status !== 'Resolved' && ticket.status !== 'Closed' && (
          <div className="bg-emerald-50 border-2 border-emerald-500 p-4 rounded-2xl flex items-center justify-between shadow-sm animate-fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={24} className="text-emerald-600 shrink-0" />
              <div>
                <h4 className="font-bold text-emerald-950 text-sm">Notification: Engineering has marked HD-10482 as fixed!</h4>
                <p className="text-xs text-emerald-800">
                  Hotfix deployed to Production (Build v4.8.2). Verified PT calculation for EMP-1042 matches ₹2,500 limit.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsResolveOpen(true)}
              className="btn btn-success btn-sm text-xs font-bold shrink-0"
            >
              Verify & Resolve Ticket
            </button>
          </div>
        )}

        {/* Main Grid: Left Main Section + Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT / MAIN SECTION (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Conversation Feed */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                Customer Communication & Conversation History
              </h3>

              <div className="space-y-4">
                {ticket.conversation.map((msg) => {
                  const isInternal = msg.isInternal;
                  const isCustomer = msg.authorRole === 'Customer';

                  return (
                    <div
                      key={msg.id}
                      className={`p-4 rounded-2xl border text-sm space-y-2 ${
                        isInternal 
                          ? 'bg-amber-50/90 border-amber-300 text-amber-950 shadow-xs' 
                          : isCustomer 
                          ? 'bg-blue-50/50 border-blue-200 text-slate-900' 
                          : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between border-b border-black/5 pb-2">
                        <div className="flex items-center gap-2">
                          {isInternal ? (
                            <span className="bg-amber-200 text-amber-900 text-[10px] font-bold uppercase px-2 py-0.5 rounded flex items-center gap-1">
                              <Lock size={10} /> Internal Note (Staff Only)
                            </span>
                          ) : (
                            <span className={`text-xs font-bold ${isCustomer ? 'text-blue-700' : 'text-slate-800'}`}>
                              {msg.authorName} ({msg.authorRole})
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500">{msg.timestamp}</span>
                      </div>

                      <p className="whitespace-pre-line leading-relaxed text-xs md:text-sm">
                        {msg.content}
                      </p>

                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="pt-2 border-t border-black/5 space-y-1">
                          {msg.attachments.map(att => (
                            <div key={att.id} className="flex items-center gap-2 text-xs bg-white/80 p-2 rounded-lg border border-slate-200">
                              <Paperclip size={13} className="text-blue-600" />
                              <span className="font-mono font-bold text-slate-800">{att.name}</span>
                              <span className="text-slate-500">({att.size})</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Composer Box with Tabs (Reply | Internal Note) Section 15 in prompt */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setComposerMode('reply')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      composerMode === 'reply'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                    id="composer-reply-tab"
                  >
                    Public Reply to Customer
                  </button>

                  <button
                    type="button"
                    onClick={() => setComposerMode('internal')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      composerMode === 'internal'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                    id="composer-internal-tab"
                  >
                    <Lock size={12} />
                    Internal Note (Staff Only)
                  </button>
                </div>

                <form onSubmit={handleComposerSubmit} className="space-y-3">
                  <textarea
                    rows={4}
                    value={composerText}
                    onChange={(e) => setComposerText(e.target.value)}
                    placeholder={
                      composerMode === 'reply'
                        ? 'Write a public response to Sarah Mehta (ABC Technologies)...'
                        : 'Add an internal note visible only to support agents and engineering...'
                    }
                    className={`form-textarea text-xs md:text-sm ${
                      composerMode === 'internal' ? 'bg-amber-50/50 border-amber-300 focus:border-amber-500' : ''
                    }`}
                    id="agent-composer-textarea"
                  />

                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-slate-400">
                      {composerMode === 'internal' ? '🔒 Note will NOT be visible to customer' : 'Public response sent to Sarah Mehta'}
                    </span>

                    <button
                      type="submit"
                      className={`btn btn-sm ${
                        composerMode === 'internal' ? 'bg-amber-600 hover:bg-amber-700 text-white border-none' : 'btn-primary'
                      }`}
                      id="agent-send-composer-btn"
                    >
                      <Send size={14} />
                      <span>{composerMode === 'reply' ? 'Send Customer Reply' : 'Save Internal Note'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Activity Timeline (Section 17 in prompt) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <History size={18} className="text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Ticket Activity Timeline
                </h3>
              </div>

              <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 pl-8">
                {ticket.activities.map((act) => (
                  <div key={act.id} className="relative text-xs space-y-0.5">
                    <div className="absolute -left-7 top-0.5 w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white"></div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-400 text-[11px]">{act.timestamp}</span>
                      <strong className="text-slate-900">{act.action}</strong>
                    </div>
                    <p className="text-slate-500">By <strong>{act.actor}</strong> {act.details && `• ${act.details}`}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR (1 Col - Section 16 in prompt) */}
          <div className="space-y-6">
            
            {/* Customer Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
                <Building2 size={16} className="text-blue-600" /> Customer Information
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Company Name:</span>
                  <strong className="text-slate-900 text-sm">{ticket.customerName}</strong>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Customer ID:</span>
                    <strong className="text-slate-800 font-mono">{ticket.customerId}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Plan Tier:</span>
                    <span className="bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded">
                      {ticket.customerPlan}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px]">Support Level:</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck size={14} /> {ticket.customerSupportLevel}
                  </span>
                </div>
              </div>
            </div>

            {/* Requester Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
                <User size={16} className="text-indigo-600" /> Requester Profile
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Name:</span>
                  <strong className="text-slate-900 text-sm">{ticket.requesterName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Role:</span>
                  <strong className="text-slate-800">{ticket.requesterRole}</strong>
                </div>
              </div>
            </div>

            {/* Ticket Information Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
                <FileText size={16} className="text-purple-600" /> Ticket Metadata
              </div>

              <div className="space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Category:</span>
                    <strong className="text-slate-900">{ticket.category}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Issue Type:</span>
                    <strong className="text-slate-900">{ticket.issueType}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Priority:</span>
                    <span className="badge badge-priority-high">{ticket.priority}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Created:</span>
                    <span className="text-slate-700 font-mono text-[11px]">{ticket.createdAt}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Assignment Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
                <UserCheck size={16} className="text-emerald-600" /> Team & Assignee
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Support Team:</span>
                  <strong className="text-slate-900">{ticket.assignedTeam}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Primary Agent:</span>
                  <strong className="text-blue-700 text-sm flex items-center gap-1">
                    {ticket.assigneeName}
                  </strong>
                </div>
              </div>
            </div>

            {/* SLA Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
                <Clock size={16} className="text-rose-600" /> SLA Tracker
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">First Response SLA:</span>
                  <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    ✓ Met (18 min)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Resolution SLA:</span>
                  <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    {ticket.slaResolutionRemaining} remaining
                  </span>
                </div>
              </div>
            </div>

            {/* Context Box */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider border-b border-slate-800 pb-2">
                <Cpu size={15} /> Technical Environment
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between"><span className="text-slate-400">Employee:</span><span>John Doe (EMP-1042)</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Payroll Period:</span><span>September 2026</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Browser:</span><span>Chrome 129.0</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Env:</span><span className="text-emerald-400 font-bold">Production</span></div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Modals */}
      <EscalateTicketModal
        isOpen={isEscalateOpen}
        onClose={() => setIsEscalateOpen(false)}
        ticketId={ticket.id}
      />
      <RequestInfoModal
        isOpen={isRequestInfoOpen}
        onClose={() => setIsRequestInfoOpen(false)}
        ticketId={ticket.id}
      />
      <ResolveTicketModal
        isOpen={isResolveOpen}
        onClose={() => setIsResolveOpen(false)}
        ticketId={ticket.id}
      />
    </div>
  );
};

import React, { useState } from 'react';
import { useDemoState } from '../context/DemoStateContext';
import { CSATModal } from '../components/Modals';
import { 
  ArrowLeft, 
  Send, 
  Paperclip, 
  UploadCloud, 
  AlertCircle, 
  CheckCircle2, 
  RotateCcw, 
  Clock, 
  FileSpreadsheet,
  FileText,
  User,
  ShieldCheck,
  Star
} from 'lucide-react';

export const CustomerTicketDetail: React.FC = () => {
  const { 
    activeTicketId, 
    tickets, 
    setActiveView, 
    addPublicReply, 
    uploadCustomerInformation, 
    reopenTicket, 
    confirmAndCloseTicket 
  } = useDemoState();

  const [replyText, setReplyText] = useState('');
  const [isCSATOpen, setIsCSATOpen] = useState(false);
  const [reopenReason, setReopenReason] = useState('');
  const [showReopenInput, setShowReopenInput] = useState(false);

  const ticket = tickets.find(t => t.id === activeTicketId) || tickets[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    addPublicReply(ticket.id, replyText);
    setReplyText('');
  };

  const handleFileUpload = () => {
    uploadCustomerInformation(ticket.id, 'payroll-calculation-report.xlsx', '2.4 MB');
  };

  const handleConfirmClose = () => {
    confirmAndCloseTicket(ticket.id);
    setIsCSATOpen(true);
  };

  const handleReopen = () => {
    if (!reopenReason.trim()) {
      setShowReopenInput(true);
      return;
    }
    reopenTicket(ticket.id, reopenReason);
    setShowReopenInput(false);
    setReopenReason('');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Navigation */}
        <button
          onClick={() => setActiveView('my-tickets')}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to My Support Requests
        </button>

        {/* Ticket Detail Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Header Bar */}
          <div className="bg-slate-900 text-white p-6 md:p-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm bg-blue-600/30 text-blue-300 px-3 py-1 rounded-md font-bold border border-blue-500/30">
                  {ticket.id}
                </span>
                <span className={`badge ${
                  ticket.status === 'Resolved' ? 'badge-resolved' : 
                  ticket.status === 'Waiting for You' ? 'badge-waiting' : 
                  ticket.status === 'Closed' ? 'badge-closed' : 'badge-in-progress'
                }`}>
                  {ticket.status}
                </span>
                <span className="badge badge-priority-high">{ticket.priority} Priority</span>
              </div>
              <span className="text-xs text-slate-400">Created: {ticket.createdAt}</span>
            </div>

            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight">
              {ticket.subject}
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              <div>
                <span className="text-slate-400 block text-[10px]">Category:</span>
                <strong className="text-white">{ticket.category}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Issue Type:</span>
                <strong className="text-white">{ticket.issueType}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Assigned Team:</span>
                <strong className="text-white">{ticket.assignedTeam}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Payroll Period:</span>
                <strong className="text-white">{ticket.payrollPeriod || 'September 2026'}</strong>
              </div>
            </div>
          </div>

          {/* Special State Banners */}

          {/* 1. WAITING FOR YOU STATE CALLOUT (Section 11 in prompt) */}
          {ticket.status === 'Waiting for You' && (
            <div className="bg-rose-50 border-b border-rose-200 p-6 animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-rose-100 text-rose-600 rounded-xl shrink-0">
                  <AlertCircle size={24} />
                </div>
                <div className="space-y-2 flex-1">
                  <span className="text-xs font-bold text-rose-700 uppercase tracking-wider block">
                    Additional Information Required
                  </span>
                  <p className="text-sm font-medium text-rose-900 leading-relaxed">
                    {ticket.infoRequestMessage || 'Please upload the September payroll calculation report so our team can continue investigating this issue.'}
                  </p>
                  
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={handleFileUpload}
                      className="btn btn-primary bg-rose-600 hover:bg-rose-700 border-none text-xs flex items-center gap-2 shadow-sm"
                      id="upload-payroll-report-btn"
                    >
                      <UploadCloud size={16} />
                      <span>Upload File (payroll-calculation-report.xlsx)</span>
                    </button>
                    <span className="text-xs text-rose-600 font-medium">Clicking uploads sample Excel report</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. RESOLVED STATE CALLOUT (Section 22 & 23 in prompt) */}
          {ticket.status === 'Resolved' && (
            <div className="bg-emerald-50 border-b border-emerald-200 p-6 animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl shrink-0">
                  <CheckCircle2 size={24} />
                </div>
                <div className="space-y-2 flex-1">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                    Ticket Resolved
                  </span>
                  <h4 className="font-bold text-emerald-950 text-base">We have resolved your payroll calculation issue.</h4>
                  <p className="text-xs text-emerald-800 leading-relaxed bg-white/80 p-3 rounded-xl border border-emerald-200">
                    <strong>Resolution Summary:</strong> {ticket.resolution?.summary || 'The professional tax calculation issue has been fixed. Please verify the September salary calculation.'}
                  </p>

                  {/* Buttons */}
                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleConfirmClose}
                      className="btn btn-success text-xs flex items-center gap-1.5 shadow-sm"
                      id="customer-confirm-close-btn"
                    >
                      <CheckCircle2 size={16} />
                      <span>Confirm & Close</span>
                    </button>

                    <button
                      onClick={() => setShowReopenInput(!showReopenInput)}
                      className="btn btn-secondary text-xs flex items-center gap-1.5"
                      id="customer-issue-still-exists-btn"
                    >
                      <RotateCcw size={15} />
                      <span>Issue Still Exists</span>
                    </button>
                  </div>

                  {/* Reopen Reason Input */}
                  {showReopenInput && (
                    <div className="mt-3 p-3 bg-white rounded-xl border border-emerald-300 space-y-2">
                      <label className="text-xs font-semibold text-slate-700">Reason for reopening:</label>
                      <input
                        type="text"
                        value={reopenReason}
                        onChange={(e) => setReopenReason(e.target.value)}
                        placeholder="Describe why the issue is not fully resolved..."
                        className="form-input text-xs"
                      />
                      <button
                        onClick={handleReopen}
                        className="btn btn-danger btn-sm text-xs"
                      >
                        Reopen Ticket (Resolved → Reopened → In Progress)
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 3. CLOSED & CSAT STATE (Section 24 in prompt) */}
          {ticket.status === 'Closed' && (
            <div className="bg-slate-100 border-b border-slate-200 p-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-600" size={24} />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Ticket Closed</h4>
                  <p className="text-xs text-slate-500">This support ticket has been confirmed resolved and closed.</p>
                </div>
              </div>
              <button
                onClick={() => setIsCSATOpen(true)}
                className="btn btn-secondary text-xs flex items-center gap-1 bg-white"
              >
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span>Rate Support Experience</span>
              </button>
            </div>
          )}

          {/* Main Conversation Feed */}
          <div className="p-6 md:p-8 space-y-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
              Conversation Thread
            </h3>

            <div className="space-y-4">
              {ticket.conversation
                .filter(msg => !msg.isInternal) // Strictly filter out internal notes from customer view!
                .map((msg) => {
                  const isCustomer = msg.authorRole === 'Customer';

                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-3 text-sm ${isCustomer ? 'flex-row-reverse' : ''}`}
                    >
                      {/* Avatar */}
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        isCustomer ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-100'
                      }`}>
                        {isCustomer ? 'SM' : 'RS'}
                      </div>

                      {/* Message Bubble */}
                      <div className={`max-w-2xl rounded-2xl p-4 space-y-2 ${
                        isCustomer 
                          ? 'bg-blue-600 text-white rounded-tr-none' 
                          : 'bg-slate-100 text-slate-900 rounded-tl-none border border-slate-200'
                      }`}>
                        <div className="flex items-center justify-between gap-4 text-xs">
                          <span className={`font-bold ${isCustomer ? 'text-blue-100' : 'text-slate-700'}`}>
                            {msg.authorName} ({msg.authorRole})
                          </span>
                          <span className={isCustomer ? 'text-blue-200' : 'text-slate-400'}>
                            {msg.timestamp}
                          </span>
                        </div>

                        <p className="whitespace-pre-line leading-relaxed text-xs md:text-sm">
                          {msg.content}
                        </p>

                        {/* Message Attachments */}
                        {msg.attachments && msg.attachments.length > 0 && (
                          <div className="pt-2 border-t border-white/20 space-y-1">
                            {msg.attachments.map(att => (
                              <div key={att.id} className="flex items-center gap-2 text-xs bg-black/10 px-2.5 py-1 rounded-lg">
                                <Paperclip size={13} />
                                <span className="font-mono font-medium">{att.name}</span>
                                <span className="text-[10px] opacity-75">({att.size})</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Attachments Section */}
            <div className="pt-6 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Ticket Attachments ({ticket.attachments.length})
              </h4>
              <div className="flex flex-wrap gap-3">
                {ticket.attachments.map(att => (
                  <div key={att.id} className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs">
                    {att.name.endsWith('.xlsx') ? (
                      <FileSpreadsheet className="text-emerald-600" size={20} />
                    ) : (
                      <FileText className="text-rose-600" size={20} />
                    )}
                    <div>
                      <strong className="text-slate-900 block font-mono">{att.name}</strong>
                      <span className="text-slate-400 text-[11px]">{att.size} • Uploaded by {att.uploadedBy}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Reply Box */}
            {ticket.status !== 'Closed' && (
              <form onSubmit={handleSendReply} className="pt-4 border-t border-slate-100 space-y-3">
                <label className="form-label">Write a reply...</label>
                <textarea
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your response to support..."
                  className="form-textarea text-xs md:text-sm"
                  id="customer-reply-textarea"
                />

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleFileUpload}
                    className="btn btn-secondary btn-sm text-xs flex items-center gap-1.5"
                  >
                    <Paperclip size={14} />
                    <span>Attach Report File</span>
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary btn-sm bg-blue-600 hover:bg-blue-700 border-none flex items-center gap-1.5"
                    id="customer-send-reply-btn"
                  >
                    <Send size={14} />
                    <span>Send Reply</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>

      {/* CSAT Modal */}
      <CSATModal
        isOpen={isCSATOpen}
        onClose={() => setIsCSATOpen(false)}
        ticketId={ticket.id}
      />
    </div>
  );
};

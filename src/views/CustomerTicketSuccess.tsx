import React from 'react';
import { useDemoState } from '../context/DemoStateContext';
import { CheckCircle2, Clock, Ticket, ArrowRight, ShieldCheck } from 'lucide-react';

export const CustomerTicketSuccess: React.FC = () => {
  const { activeTicketId, tickets, setActiveView } = useDemoState();

  const ticket = tickets.find(t => t.id === activeTicketId) || tickets[0];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-xl w-full overflow-hidden text-center animate-fade-in">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-b from-blue-900 to-indigo-900 text-white p-8">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-400/30">
            <CheckCircle2 size={36} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Your support request has been created successfully.</h1>
          <p className="text-blue-200 text-xs mt-1">Our engineering support team has received your ticket and begun routing.</p>
        </div>

        {/* Ticket Summary Card */}
        <div className="p-8 space-y-6">
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs text-slate-400 block font-mono">Ticket Reference</span>
                <strong className="text-xl font-extrabold text-blue-700">{ticket.id}</strong>
              </div>
              <span className="badge badge-new text-xs px-3 py-1 font-semibold">{ticket.status}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div>
                <span className="text-slate-500 block">Category:</span>
                <strong className="text-slate-900">{ticket.category}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Priority:</span>
                <span className="badge badge-priority-high">{ticket.priority}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Assigned Support Team:</span>
                <strong className="text-slate-900">{ticket.assignedTeam}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Expected First Response:</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <Clock size={12} /> Within 2 hours
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 bg-blue-50/50 p-3 rounded-xl border border-blue-100">
            <ShieldCheck size={16} className="text-blue-600 shrink-0" />
            <span>Updates will be sent to <strong>sarah.mehta@abctech.com</strong></span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setActiveView('customer-ticket-detail')}
              className="btn btn-primary flex-1 bg-blue-600 hover:bg-blue-700 border-none py-3"
              id="success-view-ticket-btn"
            >
              <Ticket size={16} />
              <span>View Ticket</span>
            </button>
            <button
              onClick={() => setActiveView('help-center')}
              className="btn btn-secondary flex-1 py-3"
            >
              <span>Back to Help Center</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

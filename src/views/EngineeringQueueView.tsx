import React from 'react';
import { useDemoState } from '../context/DemoStateContext';
import { EngineeringStatus } from '../types/helpdesk';
import { Wrench, CheckCircle2, AlertTriangle, Bug, Code, Cpu, Play, Check } from 'lucide-react';

export const EngineeringQueueView: React.FC = () => {
  const { tickets, updateEngineeringStatus, setActiveTicketId, setActiveView } = useDemoState();

  // Find escalated tickets
  const escalatedTickets = tickets.filter(t => t.escalation?.isEscalated || t.id === 'HD-10482');

  const handleStatusChange = (ticketId: string, status: EngineeringStatus) => {
    updateEngineeringStatus(ticketId, status);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Wrench size={16} /> Tier-3 Product Engineering Console
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight mt-1">Engineering Queue</h1>
            <p className="text-xs text-slate-400">Escalated product bugs & calculation engine issues requiring code hotfixes</p>
          </div>

          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold px-3 py-1.5 rounded-xl">
            {escalatedTickets.length} Escalated Bug Tickets
          </span>
        </div>

        {/* Escalated Tickets Cards */}
        <div className="space-y-6">
          {escalatedTickets.map((ticket) => {
            const engStatus = ticket.engineering?.status || 'Bug Confirmed';

            return (
              <div key={ticket.id} className="bg-slate-950 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
                
                {/* Header Strip */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-base bg-amber-500/20 text-amber-300 font-extrabold px-3 py-1 rounded-md border border-amber-500/40">
                      {ticket.id}
                    </span>
                    <span className="text-lg font-bold text-white">{ticket.subject}</span>
                  </div>

                  {/* Engineering Status Dropdown (Section 19 in prompt) */}
                  <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-xl">
                    <span className="text-xs text-slate-400 font-semibold">Engineering Status:</span>
                    <select
                      value={engStatus}
                      onChange={(e) => handleStatusChange(ticket.id, e.target.value as EngineeringStatus)}
                      className="bg-transparent text-amber-400 font-bold text-xs md:text-sm focus:outline-none cursor-pointer"
                      id="engineering-status-select"
                    >
                      <option value="Investigating">Investigating</option>
                      <option value="Bug Confirmed">Bug Confirmed</option>
                      <option value="Fix in Progress">Fix in Progress</option>
                      <option value="Fixed">Fixed (Deploys Hotfix)</option>
                      <option value="Cannot Reproduce">Cannot Reproduce</option>
                    </select>
                  </div>
                </div>

                {/* Metadata Row */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Module:</span>
                    <strong className="text-white">{ticket.category}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Environment:</span>
                    <strong className="text-emerald-400 font-bold">Production</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Customer:</span>
                    <strong className="text-white">{ticket.customerName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Priority:</span>
                    <span className="badge badge-priority-high">{ticket.priority}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Escalated By:</span>
                    <strong className="text-blue-400">{ticket.escalation?.escalatedBy || 'Rahul Shah (Support)'}</strong>
                  </div>
                </div>

                {/* Technical Issue Details Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Expected Calculation</span>
                    <div className="text-xl font-extrabold text-emerald-400">
                      ₹2,500
                    </div>
                    <p className="text-[11px] text-slate-500">Standard Karnataka State PT monthly deduction slab limit.</p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Actual Calculation (Bug)</span>
                    <div className="text-xl font-extrabold text-rose-400">
                      ₹3,100
                    </div>
                    <p className="text-[11px] text-slate-500">System engine applied double-slab override without cap.</p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Affected Scope</span>
                    <div className="text-xl font-extrabold text-amber-400">
                      12 Employees
                    </div>
                    <p className="text-[11px] text-slate-500">September 2026 payroll batch for ABC Technologies.</p>
                  </div>

                </div>

                {/* Steps to Reproduce (Section 19 in prompt) */}
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                    <Code size={16} /> Steps to Reproduce Bug
                  </div>

                  <ol className="list-decimal pl-5 space-y-1 text-xs text-slate-300">
                    <li>Open Sixtify Payroll Module → Navigate to September 2026 batch.</li>
                    <li>Select employee <strong>John Doe (EMP-1042)</strong> payroll record.</li>
                    <li>Open employee salary breakdown detail view.</li>
                    <li>Click <strong>"Generate Salary / Recalculate Statutory Taxes"</strong>.</li>
                    <li>Observe Professional Tax deduction component showing ₹3,100 instead of ₹2,500 limit.</li>
                  </ol>
                </div>

                {/* Hotfix Action Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <span className="text-xs text-slate-500 font-mono">
                    Bug Status: <strong className="text-amber-400">{engStatus}</strong>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setActiveTicketId(ticket.id);
                        setActiveView('provider-ticket-detail');
                      }}
                      className="btn btn-secondary text-xs bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                    >
                      View Full Ticket Detail
                    </button>

                    <button
                      onClick={() => handleStatusChange(ticket.id, 'Fixed')}
                      className="btn btn-success text-xs font-bold flex items-center gap-1.5"
                      id="engineering-deploy-fix-btn"
                    >
                      <Check size={16} />
                      <span>Deploy Code Hotfix (Mark Fixed)</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

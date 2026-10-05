import React, { useState } from 'react';
import { useDemoState } from '../context/DemoStateContext';
import { TicketStatus, PriorityLevel, ModuleCategory } from '../types/helpdesk';
import { Search, Filter, ArrowUpRight, Clock, ShieldCheck, UserCheck } from 'lucide-react';

export const ProviderTicketQueue: React.FC = () => {
  const { tickets, setActiveTicketId, setActiveView } = useDemoState();
  
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTickets = tickets.filter(t => {
    if (statusFilter !== 'All' && t.status !== statusFilter) return false;
    if (categoryFilter !== 'All' && t.category !== categoryFilter) return false;
    if (priorityFilter !== 'All' && t.priority !== priorityFilter) return false;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        t.id.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q) ||
        t.customerName.toLowerCase().includes(q) ||
        t.assigneeName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleTicketClick = (id: string) => {
    setActiveTicketId(id);
    setActiveView('provider-ticket-detail');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Provider Support Console</span>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">All Support Tickets Queue</h1>
            <p className="text-xs text-slate-500">Global queue of inbound customer tickets across all SaaS HRMS modules</p>
          </div>
        </div>

        {/* Filters Toolbar (Section 14 in prompt) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <Filter size={14} /> Filter Queue
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {/* Search */}
            <div className="form-group mb-0">
              <label className="text-[11px] font-semibold text-slate-500">Search</label>
              <input
                type="text"
                placeholder="ID, subject, customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input text-xs py-1.5"
              />
            </div>

            {/* Status */}
            <div className="form-group mb-0">
              <label className="text-[11px] font-semibold text-slate-500">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-select text-xs py-1.5"
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Waiting for You">Waiting for Customer</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            {/* Category */}
            <div className="form-group mb-0">
              <label className="text-[11px] font-semibold text-slate-500">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="form-select text-xs py-1.5"
              >
                <option value="All">All Categories</option>
                <option value="Payroll">Payroll</option>
                <option value="Attendance">Attendance</option>
                <option value="Leave">Leave</option>
                <option value="API">API</option>
                <option value="Employee Management">Employee Management</option>
                <option value="Reports">Reports</option>
              </select>
            </div>

            {/* Priority */}
            <div className="form-group mb-0">
              <label className="text-[11px] font-semibold text-slate-500">Priority</label>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="form-select text-xs py-1.5"
              >
                <option value="All">All Priorities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Normal">Normal</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Subject</th>
                <th>Customer</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Assignee</th>
                <th>Status</th>
                <th>Resolution SLA</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map(ticket => (
                <tr
                  key={ticket.id}
                  onClick={() => handleTicketClick(ticket.id)}
                  className={ticket.id === 'HD-10482' ? 'bg-blue-50/60 font-medium hover:bg-blue-50' : ''}
                >
                  <td className="font-mono font-bold text-blue-700">{ticket.id}</td>
                  <td>
                    <span className="font-semibold text-slate-900 block">{ticket.subject}</span>
                    <span className="text-[11px] text-slate-400">Requester: {ticket.requesterName}</span>
                  </td>
                  <td>
                    <span className="text-xs font-medium text-slate-800 block">{ticket.customerName}</span>
                    <span className="text-[10px] text-blue-600 font-semibold">{ticket.customerPlan}</span>
                  </td>
                  <td>
                    <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {ticket.category}
                    </span>
                  </td>
                  <td>
                    {ticket.priority === 'Critical' ? (
                      <span className="badge badge-priority-critical">Critical</span>
                    ) : ticket.priority === 'High' ? (
                      <span className="badge badge-priority-high">High</span>
                    ) : (
                      <span className="badge badge-priority-normal">Normal</span>
                    )}
                  </td>
                  <td>
                    <span className="text-xs text-slate-700 font-medium flex items-center gap-1">
                      <UserCheck size={13} className="text-blue-600" />
                      {ticket.assigneeName}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${
                      ticket.status === 'Resolved' ? 'badge-resolved' :
                      ticket.status === 'Waiting for You' ? 'badge-waiting' :
                      ticket.status === 'Closed' ? 'badge-closed' : 'badge-in-progress'
                    }`}>
                      {ticket.status === 'Waiting for You' ? 'Waiting for Customer' : ticket.status}
                    </span>
                  </td>
                  <td>
                    <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                      <Clock size={12} className="text-slate-400" />
                      {ticket.slaResolutionRemaining}
                    </span>
                  </td>
                  <td>
                    <button className="text-blue-600 font-semibold text-xs flex items-center gap-1 hover:underline">
                      Open Console <ArrowUpRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

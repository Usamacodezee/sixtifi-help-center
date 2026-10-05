import React, { useState } from 'react';
import { useDemoState } from '../context/DemoStateContext';
import { TicketStatus } from '../types/helpdesk';
import { Ticket, PlusCircle, Search, Filter, ArrowUpRight, Clock, AlertCircle } from 'lucide-react';

export const CustomerMyTickets: React.FC = () => {
  const { tickets, setActiveTicketId, setActiveView } = useDemoState();
  const [activeTab, setActiveTab] = useState<'All' | 'Open' | 'Waiting for Me' | 'Resolved' | 'Closed'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter tickets for current customer (ABC Technologies)
  const customerTickets = tickets.filter(t => t.customerId === 'CUS-1042');

  const filteredTickets = customerTickets.filter(t => {
    if (activeTab === 'Open') {
      if (t.status === 'Closed' || t.status === 'Resolved') return false;
    } else if (activeTab === 'Waiting for Me') {
      if (t.status !== 'Waiting for You') return false;
    } else if (activeTab === 'Resolved') {
      if (t.status !== 'Resolved') return false;
    } else if (activeTab === 'Closed') {
      if (t.status !== 'Closed') return false;
    }

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return t.id.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q) || t.category.toLowerCase().includes(q);
    }
    return true;
  });

  const getStatusBadge = (status: TicketStatus) => {
    switch (status) {
      case 'New': return <span className="badge badge-new">New</span>;
      case 'Open': return <span className="badge badge-open">Open</span>;
      case 'In Progress': return <span className="badge badge-in-progress">In Progress</span>;
      case 'Waiting for You': return <span className="badge badge-waiting">Waiting for You</span>;
      case 'Resolved': return <span className="badge badge-resolved">Resolved</span>;
      case 'Closed': return <span className="badge badge-closed">Closed</span>;
      default: return <span className="badge badge-closed">{status}</span>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    if (priority === 'Critical') return <span className="badge badge-priority-critical">Critical</span>;
    if (priority === 'High') return <span className="badge badge-priority-high">High</span>;
    return <span className="badge badge-priority-normal">Normal</span>;
  };

  const handleRowClick = (ticketId: string) => {
    setActiveTicketId(ticketId);
    setActiveView('customer-ticket-detail');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">ABC Technologies Pvt. Ltd.</span>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">My Support Requests</h1>
            <p className="text-xs text-slate-500">Track, update, and manage your organization's support requests</p>
          </div>

          <button
            onClick={() => setActiveView('raise-ticket')}
            className="btn btn-primary bg-blue-600 hover:bg-blue-700 border-none shadow-sm flex items-center gap-2"
          >
            <PlusCircle size={16} />
            <span>Raise Support Request</span>
          </button>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
            {(['All', 'Open', 'Waiting for Me', 'Resolved', 'Closed'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
                {tab === 'Waiting for Me' && (
                  <span className="ml-1 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {customerTickets.filter(t => t.status === 'Waiting for You').length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input text-xs pl-9 py-1.5"
            />
          </div>
        </div>

        {/* Tickets Table */}
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Ticket Reference</th>
                <th>Subject</th>
                <th>Category</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Last Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map(ticket => (
                <tr
                  key={ticket.id}
                  onClick={() => handleRowClick(ticket.id)}
                  className={ticket.id === 'HD-10482' ? 'bg-blue-50/40 hover:bg-blue-50/80 font-medium' : ''}
                >
                  <td className="font-mono font-bold text-blue-700">{ticket.id}</td>
                  <td>
                    <div>
                      <span className="font-semibold text-slate-900 block">{ticket.subject}</span>
                      <span className="text-[11px] text-slate-400">Requester: {ticket.requesterName}</span>
                    </div>
                  </td>
                  <td>
                    <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                      {ticket.category}
                    </span>
                  </td>
                  <td>{getStatusBadge(ticket.status)}</td>
                  <td>{getPriorityBadge(ticket.priority)}</td>
                  <td className="text-xs text-slate-500">{ticket.updatedAt}</td>
                  <td>
                    <button className="text-blue-600 hover:text-blue-800 text-xs font-semibold flex items-center gap-1">
                      View <ArrowUpRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredTickets.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    No tickets found matching current tab criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

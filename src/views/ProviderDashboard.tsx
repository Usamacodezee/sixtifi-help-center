import React from 'react';
import { useDemoState } from '../context/DemoStateContext';
import { 
  Ticket, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  ShieldAlert, 
  ArrowUpRight,
  PieChart,
  BarChart3
} from 'lucide-react';

export const ProviderDashboard: React.FC = () => {
  const { tickets, setActiveTicketId, setActiveView } = useDemoState();

  const metrics = [
    { label: 'New Tickets', value: '24', change: '+3 this hour', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { label: 'Open Tickets', value: '68', change: 'Across all teams', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { label: 'Waiting for Customer', value: '17', change: 'Pending upload', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { label: 'SLA At Risk', value: '6', change: '< 1 hour remaining', color: 'bg-rose-50 text-rose-700 border-rose-200 font-bold' },
    { label: 'Resolved Today', value: '32', change: '98.2% CSAT score', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { label: 'Avg First Response', value: '42 min', change: 'Target < 2 hours', color: 'bg-slate-50 text-slate-700 border-slate-200' },
    { label: 'Avg Resolution Time', value: '7h 18m', change: 'Target < 8 hours', color: 'bg-slate-50 text-slate-700 border-slate-200' }
  ];

  const slaAtRiskTickets = [
    { id: 'HD-10491', subject: 'Payroll processing failure during batch calculation', customer: 'XYZ Corp India', priority: 'Critical', slaRemaining: '38 minutes' },
    { id: 'HD-10482', subject: 'Incorrect salary deduction for September payroll', customer: 'ABC Technologies Pvt. Ltd.', priority: 'High', slaRemaining: '1h 42m' },
    { id: 'HD-10489', subject: 'Biometric Gateway API connection timeout', customer: 'Nexus Innovations', priority: 'High', slaRemaining: '52 minutes' }
  ];

  const categoryDistribution = [
    { category: 'Payroll', count: 28, percentage: '41%' },
    { category: 'Attendance', count: 14, percentage: '20%' },
    { category: 'Leave', count: 10, percentage: '15%' },
    { category: 'API & Integrations', count: 8, percentage: '12%' },
    { category: 'Employee Mgmt', count: 5, percentage: '7%' },
    { category: 'Reports', count: 3, percentage: '5%' }
  ];

  const handleTicketClick = (id: string) => {
    setActiveTicketId(id);
    setActiveView('provider-ticket-detail');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Sixtify Customer Support Operations</span>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Support Operations Dashboard</h1>
            <p className="text-xs text-slate-500">Live operational metrics, SLA health tracking, and ticket volume distribution</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView('provider-queue')}
              className="btn btn-primary bg-blue-600 hover:bg-blue-700 border-none shadow-sm flex items-center gap-2 text-xs"
            >
              <Ticket size={16} />
              <span>View All Provider Tickets</span>
            </button>
          </div>
        </div>

        {/* Top Operational Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {metrics.map((m, idx) => (
            <div key={idx} className={`p-4 rounded-2xl border shadow-xs ${m.color}`}>
              <span className="text-[11px] font-semibold opacity-75 block">{m.label}</span>
              <strong className="text-2xl font-extrabold tracking-tight mt-1 block">{m.value}</strong>
              <span className="text-[10px] opacity-80 mt-1 block">{m.change}</span>
            </div>
          ))}
        </div>

        {/* SLA At Risk Section (Section 13 in prompt) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-rose-600" size={20} />
              <h2 className="text-base font-bold text-slate-900">SLA At Risk (Action Required)</h2>
            </div>
            <span className="text-xs text-rose-600 font-semibold bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
              6 Tickets Near Resolution Deadline
            </span>
          </div>

          <div className="data-table-container border border-rose-100">
            <table className="data-table">
              <thead>
                <tr className="bg-rose-50/50">
                  <th>Ticket ID</th>
                  <th>Subject</th>
                  <th>Customer</th>
                  <th>Priority</th>
                  <th>SLA Time Remaining</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {slaAtRiskTickets.map(t => (
                  <tr key={t.id} onClick={() => handleTicketClick(t.id)} className="hover:bg-rose-50/30">
                    <td className="font-mono font-bold text-rose-700">{t.id}</td>
                    <td className="font-semibold text-slate-900">{t.subject}</td>
                    <td className="text-xs text-slate-600">{t.customer}</td>
                    <td>
                      <span className={t.priority === 'Critical' ? 'badge badge-priority-critical' : 'badge badge-priority-high'}>
                        {t.priority}
                      </span>
                    </td>
                    <td>
                      <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 flex items-center gap-1 w-max">
                        <Clock size={12} /> {t.slaRemaining}
                      </span>
                    </td>
                    <td>
                      <button className="text-blue-600 font-semibold text-xs flex items-center gap-1">
                        Investigate <ArrowUpRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Analytics Distribution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Ticket Volume by Category */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="text-blue-600" size={18} />
                <h3 className="font-bold text-slate-900 text-sm">Ticket Volume by Category</h3>
              </div>
              <span className="text-xs text-slate-400">This Month</span>
            </div>

            <div className="space-y-3">
              {categoryDistribution.map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700">{item.category}</span>
                    <span className="text-slate-500">{item.count} tickets ({item.percentage})</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: item.percentage }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Distribution & Team Workload */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <PieChart className="text-purple-600" size={18} />
                <h3 className="font-bold text-slate-900 text-sm">Priority Breakdown</h3>
              </div>
              <span className="text-xs text-slate-400">Live Active Load</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-center">
                <span className="text-xs font-bold text-rose-700 block">Critical</span>
                <strong className="text-2xl font-extrabold text-rose-900">4</strong>
                <span className="text-[10px] text-rose-600">SLA: 30m response</span>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-center">
                <span className="text-xs font-bold text-amber-700 block">High</span>
                <strong className="text-2xl font-extrabold text-amber-900">18</strong>
                <span className="text-[10px] text-amber-600">SLA: 2h response</span>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
                <span className="text-xs font-semibold text-slate-700 block">Normal</span>
                <strong className="text-2xl font-extrabold text-slate-900">36</strong>
                <span className="text-[10px] text-slate-500">SLA: 4h response</span>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
                <span className="text-xs font-semibold text-slate-700 block">Low</span>
                <strong className="text-2xl font-extrabold text-slate-900">10</strong>
                <span className="text-[10px] text-slate-500">SLA: 8h response</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

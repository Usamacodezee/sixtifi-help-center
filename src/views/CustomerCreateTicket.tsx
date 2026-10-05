import React, { useState, useEffect } from 'react';
import { useDemoState } from '../context/DemoStateContext';
import { ModuleCategory, PriorityLevel } from '../types/helpdesk';
import { Paperclip, Monitor, CheckCircle, ShieldAlert, ArrowLeft, Info, Cpu } from 'lucide-react';

export const CustomerCreateTicket: React.FC = () => {
  const { setActiveView, createNewTicket, prefilledCategory } = useDemoState();

  const [category, setCategory] = useState<ModuleCategory>(prefilledCategory || 'Payroll');

  useEffect(() => {
    if (prefilledCategory) {
      setCategory(prefilledCategory);
    }
  }, [prefilledCategory]);
  const [issueType, setIssueType] = useState('Salary Calculation');
  const [subject, setSubject] = useState('Incorrect salary deduction for September payroll');
  const [description, setDescription] = useState(
    'Professional tax deduction appears incorrect for employee John Doe in the September 2026 payroll. The expected deduction is ₹2,500 but the system is showing ₹3,100.'
  );
  const [employeeName, setEmployeeName] = useState('John Doe — EMP-1042');
  const [payrollPeriod, setPayrollPeriod] = useState('September 2026');
  const [attachmentName] = useState('salary-slip-september.pdf');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = createNewTicket({
      subject,
      description,
      category,
      issueType,
      priority: 'High',
      employeeName,
      payrollPeriod
    });

    setActiveView('ticket-success');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Navigation */}
        <button
          onClick={() => setActiveView('help-center')}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Help Center
        </button>

        {/* Card Header */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-900 text-white p-6 md:p-8">
            <span className="bg-blue-600 text-white text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded tracking-wider">
              Sixtify Provider Support Ticket
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-2">
              Raise a Support Request
            </h1>
            <p className="text-slate-300 text-xs md:text-sm mt-1">
              Submit an issue directly to the Sixtify software engineering & support teams for technical investigation.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category */}
              <div className="form-group">
                <label className="form-label">Module / Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ModuleCategory)}
                  className="form-select"
                  required
                  id="ticket-category-select"
                >
                  <option value="Payroll">Payroll</option>
                  <option value="Attendance">Attendance</option>
                  <option value="Leave">Leave</option>
                  <option value="Employee Management">Employee Management</option>
                  <option value="Performance">Performance</option>
                  <option value="Recruitment">Recruitment</option>
                  <option value="Reports">Reports</option>
                  <option value="Integrations">Integrations</option>
                  <option value="API">API</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Issue Type */}
              <div className="form-group">
                <label className="form-label">Issue Type *</label>
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  className="form-select"
                  required
                  id="ticket-issue-type-select"
                >
                  <option value="Salary Calculation">Salary Calculation</option>
                  <option value="Salary Slip">Salary Slip</option>
                  <option value="Payroll Processing">Payroll Processing</option>
                  <option value="Tax / Deduction">Tax / Deduction</option>
                  <option value="Payroll Configuration">Payroll Configuration</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Subject */}
            <div className="form-group">
              <label className="form-label">Subject *</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="form-input"
                required
                id="ticket-subject-input"
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">Detailed Description *</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-textarea"
                required
                id="ticket-description-input"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Employee Selection */}
              <div className="form-group">
                <label className="form-label">Affected Employee</label>
                <select
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  className="form-select"
                >
                  <option value="John Doe — EMP-1042">John Doe — EMP-1042</option>
                  <option value="Jane Smith — EMP-1088">Jane Smith — EMP-1088</option>
                  <option value="Alex Johnson — EMP-1102">Alex Johnson — EMP-1102</option>
                  <option value="All Employees">All Employees (Batch)</option>
                </select>
              </div>

              {/* Payroll Period */}
              <div className="form-group">
                <label className="form-label">Payroll Period</label>
                <input
                  type="text"
                  value={payrollPeriod}
                  onChange={(e) => setPayrollPeriod(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Attachment Preset */}
            <div className="form-group">
              <label className="form-label">Attachments</label>
              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Paperclip size={16} className="text-blue-600" />
                  <span className="text-xs font-semibold text-slate-800">{attachmentName}</span>
                  <span className="text-xs text-slate-400">(1.2 MB)</span>
                </div>
                <span className="text-[11px] bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded">
                  Attached ✓
                </span>
              </div>
            </div>

            {/* Auto Priority Determination Display */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 block">Priority Routing</span>
                <p className="text-xs text-slate-700">Priority is automatically determined based on issue category & financial impact.</p>
              </div>
              <div className="bg-amber-100 text-amber-800 border border-amber-300 px-3 py-1 rounded-lg text-xs font-bold shrink-0">
                Suggested Priority: High
              </div>
            </div>

            {/* Automatically Captured Context Box (Section 7 in prompt) */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                <Cpu size={15} />
                <span>Automatically Captured Context</span>
              </div>
              <p className="text-xs text-slate-400">
                This diagnostic telemetry is automatically attached to your support ticket for instant engineering context:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
                <div>
                  <span className="text-slate-400 block text-[10px]">Company:</span>
                  <strong className="text-white text-xs">ABC Technologies Pvt. Ltd.</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Requester:</span>
                  <strong className="text-white text-xs">Sarah Mehta</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Module:</span>
                  <strong className="text-white text-xs">Payroll</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Page:</span>
                  <strong className="text-white text-xs">Salary Processing</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Employee:</span>
                  <strong className="text-white text-xs">John Doe</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Payroll Period:</span>
                  <strong className="text-white text-xs">September 2026</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Browser:</span>
                  <strong className="text-white text-xs">Chrome 129.0</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Environment:</span>
                  <strong className="text-emerald-400 font-bold text-xs">Production</strong>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveView('help-center')}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary bg-blue-600 hover:bg-blue-700 border-none px-6"
                id="submit-ticket-form-btn"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

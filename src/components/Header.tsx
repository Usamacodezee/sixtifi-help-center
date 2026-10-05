import React from 'react';
import { useDemoState } from '../context/DemoStateContext';
import { RoleSwitcher } from './RoleSwitcher';
import { 
  LifeBuoy, 
  Search, 
  PlusCircle, 
  Ticket, 
  BookOpen, 
  Megaphone,
  LayoutDashboard,
  Users,
  ShieldCheck,
  FileCode,
  Bell,
  Building2
} from 'lucide-react';

export const Header: React.FC = () => {
  const { role, activeView, setActiveView, tickets } = useDemoState();

  const customerOpenCount = tickets.filter(t => t.status !== 'Closed').length;
  const isCustomer = role === 'customer';

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Banner Context Strip */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 border-b border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-semibold text-white">Sixtify HRMS Platform</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300">
            {isCustomer ? (
              <span className="flex items-center gap-1">
                <Building2 size={13} className="text-blue-400 inline" />
                Customer: <strong>ABC Technologies Pvt. Ltd.</strong> (Sarah Mehta — HR Admin)
              </span>
            ) : role === 'engineering' ? (
              <span>Internal Console: <strong>Payroll Engineering Core Team</strong></span>
            ) : (
              <span>Internal Console: <strong>Sixtify Provider Support Team</strong> (Rahul Shah — Lead)</span>
            )}
          </span>
        </div>
        <RoleSwitcher />
      </div>

      {/* Primary Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo Branding */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveView(isCustomer ? 'help-center' : 'provider-dashboard')}>
          <div className="bg-gradient-to-tr from-blue-700 to-indigo-600 text-white p-2 rounded-xl shadow-md flex items-center justify-center font-bold">
            <LifeBuoy size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-slate-900">Sixtify</span>
              <span className="bg-blue-100 text-blue-700 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded">
                {isCustomer ? 'Help Center' : 'Provider Console'}
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              {isCustomer ? 'Self-Service & Support Operations' : 'Enterprise Customer Success Platform'}
            </p>
          </div>
        </div>

        {/* Customer Nav Links */}
        {isCustomer ? (
          <nav className="flex items-center gap-1 md:gap-2">
            <button
              onClick={() => setActiveView('help-center')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'help-center' || activeView === 'article-detail'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Search size={16} />
              <span>Help Center</span>
            </button>

            <button
              onClick={() => setActiveView('my-tickets')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                activeView === 'my-tickets' || activeView === 'customer-ticket-detail'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Ticket size={16} />
              <span>My Tickets</span>
              {customerOpenCount > 0 && (
                <span className="bg-blue-600 text-white text-xs font-bold px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
                  {customerOpenCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveView('help-center')}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              <BookOpen size={16} />
              <span>Knowledge Base</span>
            </button>

            <button
              onClick={() => setActiveView('raise-ticket')}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3.5 py-2 rounded-lg shadow-sm transition-all ml-2"
            >
              <PlusCircle size={16} />
              <span className="hidden sm:inline">Raise Ticket</span>
            </button>
          </nav>
        ) : (
          /* Provider Nav Links */
          <nav className="flex items-center gap-1 md:gap-2">
            {role !== 'engineering' ? (
              <>
                <button
                  onClick={() => setActiveView('provider-dashboard')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeView === 'provider-dashboard'
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <LayoutDashboard size={16} />
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={() => setActiveView('provider-queue')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeView === 'provider-queue' || activeView === 'provider-ticket-detail'
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Ticket size={16} />
                  <span>Ticket Queue</span>
                </button>

                <button
                  onClick={() => setActiveView('provider-admin')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeView === 'provider-admin'
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <ShieldCheck size={16} />
                  <span>SLA & Routing</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setActiveView('engineering-queue')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeView === 'engineering-queue'
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <FileCode size={16} />
                <span>Engineering Queue</span>
              </button>
            )}

            <div className="flex items-center gap-2 pl-3 border-l border-slate-200 ml-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center text-xs">
                {role === 'engineering' ? 'ENG' : role === 'manager' ? 'MGR' : 'RS'}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

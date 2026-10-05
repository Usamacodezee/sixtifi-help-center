import React, { useState } from 'react';
import { useDemoState } from '../context/DemoStateContext';
import { useConfig } from '../context/ConfigContext';
import { UserRole } from '../types/helpdesk';
import {
  LifeBuoy,
  Search,
  PlusCircle,
  Ticket,
  BookOpen,
  LayoutDashboard,
  ShieldCheck,
  FileCode,
  ChevronLeft,
  ChevronRight,
  User,
  UserCheck,
  Shield,
  Wrench,
  Sliders,
  Layers,
  CheckCircle2,
  Users,
  Activity,
  Clock
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { role, setRole, activeView, setActiveView, tickets } = useDemoState();
  const { config } = useConfig();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const customerOpenCount = tickets.filter(t => t.status !== 'Closed').length;
  const criticalCount = tickets.filter(t => t.priority === 'Critical' && t.status !== 'Closed').length;

  // Derive modules supported by non-customer teams
  const activeModules = config.modules.filter(m => m.active);

  const handleNavClick = (viewId: string) => {
    setActiveView(viewId);
  };

  const getRoleBadgeColor = () => {
    switch (role) {
      case 'customer':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'agent':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'manager':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'engineering':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    }
  };

  const getRoleName = () => {
    switch (role) {
      case 'customer':
        return 'Customer / HR Admin';
      case 'agent':
        return 'Support Agent';
      case 'manager':
        return 'Support Manager';
      case 'engineering':
        return 'Engineering Lead';
    }
  };

  return (
    <aside
      className={`bg-slate-900 text-slate-300 border-r border-slate-800 transition-all duration-300 flex flex-col justify-between z-30 ${isCollapsed ? 'w-20' : 'w-64'
        }`}
    >
      <div>
        {/* Sidebar Brand Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div
            onClick={() => setActiveView(role === 'customer' ? 'help-center' : 'provider-dashboard')}
            className="flex items-center gap-3 cursor-pointer overflow-hidden"
          >
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white p-2 rounded-xl shadow-md shrink-0 flex items-center justify-center font-bold">
              <LifeBuoy size={20} />
            </div>
            {!isCollapsed && (
              <div>
                <span className="font-extrabold text-white text-base tracking-tight block">Sixtify</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block -mt-0.5">
                  Help Desk Console
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Current Active Role Indicator */}
        <div className="p-3 border-b border-slate-800/80">
          {!isCollapsed ? (
            <div className={`p-2.5 rounded-xl border flex items-center justify-between text-xs font-semibold ${getRoleBadgeColor()}`}>
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                <span className="truncate">{getRoleName()}</span>
              </div>
              <span className="text-[10px] bg-slate-900/60 px-1.5 py-0.5 rounded text-slate-300">Active</span>
            </div>
          ) : (
            <div className={`p-2 rounded-xl border flex justify-center text-xs ${getRoleBadgeColor()}`} title={getRoleName()}>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
          )}
        </div>

        {/* Navigation Sections */}
        <nav className="p-3 space-y-6">
          {/* Section: Main Menu */}
          <div>
            {!isCollapsed && (
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
                {role === 'customer' ? 'Customer Self-Service' : role === 'engineering' ? 'Engineering Queue' : 'Support Operations'}
              </div>
            )}

            <div className="space-y-1">
              {role === 'customer' && (
                <>
                  <button
                    onClick={() => handleNavClick('help-center')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${activeView === 'help-center' || activeView === 'article-detail'
                      ? 'bg-blue-600 text-white font-bold shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                  >
                    <Search size={18} className="shrink-0" />
                    {!isCollapsed && <span>Help Center</span>}
                  </button>

                  <button
                    onClick={() => handleNavClick('raise-ticket')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${activeView === 'raise-ticket'
                      ? 'bg-blue-600 text-white font-bold shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                  >
                    <PlusCircle size={18} className="shrink-0 text-blue-400" />
                    {!isCollapsed && <span>Raise Ticket</span>}
                  </button>

                  <button
                    onClick={() => handleNavClick('my-tickets')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${activeView === 'my-tickets' || activeView === 'customer-ticket-detail'
                      ? 'bg-blue-600 text-white font-bold shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <Ticket size={18} className="shrink-0" />
                      {!isCollapsed && <span>My Tickets</span>}
                    </div>
                    {customerOpenCount > 0 && (
                      <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {customerOpenCount}
                      </span>
                    )}
                  </button>
                </>
              )}

              {(role === 'agent' || role === 'manager') && (
                <>
                  <button
                    onClick={() => handleNavClick('provider-dashboard')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${activeView === 'provider-dashboard'
                      ? 'bg-blue-600 text-white font-bold shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                  >
                    <LayoutDashboard size={18} className="shrink-0" />
                    {!isCollapsed && <span>Dashboard</span>}
                  </button>

                  <button
                    onClick={() => handleNavClick('provider-queue')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${activeView === 'provider-queue' || activeView === 'provider-ticket-detail'
                      ? 'bg-blue-600 text-white font-bold shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <Ticket size={18} className="shrink-0" />
                      {!isCollapsed && <span>Ticket Queue</span>}
                    </div>
                    {criticalCount > 0 && (
                      <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {criticalCount} Crit
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => handleNavClick('provider-admin')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${activeView === 'provider-admin'
                      ? 'bg-blue-600 text-white font-bold shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                  >
                    <ShieldCheck size={18} className="shrink-0 text-indigo-400" />
                    {!isCollapsed && <span>SLA & Team Config</span>}
                  </button>
                </>
              )}

              {role === 'engineering' && (
                <button
                  onClick={() => handleNavClick('engineering-queue')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${activeView === 'engineering-queue'
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <FileCode size={18} className="shrink-0 text-amber-400" />
                    {!isCollapsed && <span>Engineering Bug Queue</span>}
                  </div>
                  <span className="bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Hotfix
                  </span>
                </button>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* Sidebar Footer System Telemetry */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 text-[11px] space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span>SLA Health</span>
            <strong className="text-emerald-400 font-bold">99.4% Met</strong>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>Platform</span>
            <strong className="text-slate-200 font-medium">Sixtify HRMS v4.8</strong>
          </div>
        </div>
      )}
    </aside>
  );
};

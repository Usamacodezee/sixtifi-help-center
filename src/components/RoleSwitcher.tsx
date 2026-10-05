import React from 'react';
import { useDemoState } from '../context/DemoStateContext';
import { UserRole } from '../types/helpdesk';
import { UserCheck, Shield, Wrench, User } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { role, setRole } = useDemoState();

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value as UserRole);
  };

  const getRoleIcon = () => {
    switch (role) {
      case 'customer':
        return <User size={16} className="text-primary-600" />;
      case 'agent':
        return <UserCheck size={16} className="text-blue-600" />;
      case 'manager':
        return <Shield size={16} className="text-purple-600" />;
      case 'engineering':
        return <Wrench size={16} className="text-amber-600" />;
    }
  };

  return (
    <div className="flex items-center gap-1.5 bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 rounded-lg px-2.5 py-1 text-slate-200 transition-all shadow-xs">
      {getRoleIcon()}
      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider hidden md:inline">Role:</span>
      <select
        value={role}
        onChange={handleRoleChange}
        className="bg-slate-900 text-white font-medium text-xs focus:outline-none cursor-pointer px-1 py-0.5 rounded border border-slate-700"
        id="role-switcher-dropdown"
      >
        <option value="customer" className="bg-slate-900 text-white">Customer / HR Admin (Sarah Mehta)</option>
        <option value="agent" className="bg-slate-900 text-white">Support Agent (Rahul Shah)</option>
        <option value="manager" className="bg-slate-900 text-white">Support Manager (Admin Console)</option>
        <option value="engineering" className="bg-slate-900 text-white">Engineering (Payroll Dev Team)</option>
      </select>
    </div>
  );
};

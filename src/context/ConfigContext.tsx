import React, { createContext, useContext, useState, useEffect } from 'react';
import { SystemConfig, SupportTeam, SupportEmployee, ProductModule, ProductCategory, RoleConfig } from '../types/config';
import { DEFAULT_CONFIG } from '../data/defaultConfig';
import { UserRole } from '../types/helpdesk';
import { 
  ClosingReason, 
  QuickReply, 
  SlaHoursSettings, 
  GeneralHelpdeskSettings,
  DEFAULT_CLOSING_REASONS,
  DEFAULT_QUICK_REPLIES,
  DEFAULT_SLA_HOURS,
  DEFAULT_GENERAL_SETTINGS
} from '../data/definitions';

const STORAGE_KEY = 'sixtifi_support_system_config_v3';

interface ConfigContextType {
  config: SystemConfig;
  updateConfig: (newConfig: SystemConfig) => void;
  resetConfigToDefault: () => void;
  
  // Helpers
  hasPermission: (role: UserRole, permissionKey: string) => boolean;
  getRoleConfig: (role: UserRole) => RoleConfig;
  
  // Teams CRUD
  addTeam: (team: Omit<SupportTeam, 'id'>) => void;
  updateTeam: (id: string, team: Partial<SupportTeam>) => void;
  deleteTeam: (id: string) => void;
  
  // Employees CRUD
  addEmployee: (emp: Omit<SupportEmployee, 'id'>) => void;
  updateEmployee: (id: string, emp: Partial<SupportEmployee>) => void;
  deleteEmployee: (id: string) => void;

  // Category CRUD
  addCategory: (cat: Omit<ProductCategory, 'id'>) => void;
  updateCategory: (id: string, cat: Partial<ProductCategory>) => void;
  deleteCategory: (id: string) => void;

  // Modules CRUD
  addModule: (mod: Omit<ProductModule, 'id'>) => void;
  updateModule: (id: string, mod: Partial<ProductModule>) => void;

  // Definitions CRUD
  addClosingReason: (reason: Omit<ClosingReason, 'id'>) => void;
  updateClosingReason: (id: string, reason: Partial<ClosingReason>) => void;
  deleteClosingReason: (id: string) => void;

  addQuickReply: (reply: Omit<QuickReply, 'id'>) => void;
  updateQuickReply: (id: string, reply: Partial<QuickReply>) => void;
  deleteQuickReply: (id: string) => void;

  updateSlaHours: (hours: SlaHoursSettings) => void;
  updateGeneralSettings: (settings: GeneralHelpdeskSettings) => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SystemConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.categories && parsed.teams && parsed.roles) {
          return {
            ...DEFAULT_CONFIG,
            ...parsed,
            closingReasons: parsed.closingReasons || DEFAULT_CLOSING_REASONS,
            quickReplies: parsed.quickReplies || DEFAULT_QUICK_REPLIES,
            slaHours: parsed.slaHours || DEFAULT_SLA_HOURS,
            generalSettings: parsed.generalSettings || DEFAULT_GENERAL_SETTINGS
          };
        }
      }
    } catch (e) {
      console.warn('Failed to parse config from localStorage, reverting to defaults', e);
      localStorage.removeItem(STORAGE_KEY);
    }
    return {
      ...DEFAULT_CONFIG,
      closingReasons: DEFAULT_CLOSING_REASONS,
      quickReplies: DEFAULT_QUICK_REPLIES,
      slaHours: DEFAULT_SLA_HOURS,
      generalSettings: DEFAULT_GENERAL_SETTINGS
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.error('Failed to persist config to localStorage', e);
    }
  }, [config]);

  const updateConfig = (newConfig: SystemConfig) => {
    setConfig(newConfig);
  };

  const resetConfigToDefault = () => {
    localStorage.removeItem(STORAGE_KEY);
    setConfig({
      ...DEFAULT_CONFIG,
      closingReasons: DEFAULT_CLOSING_REASONS,
      quickReplies: DEFAULT_QUICK_REPLIES,
      slaHours: DEFAULT_SLA_HOURS,
      generalSettings: DEFAULT_GENERAL_SETTINGS
    });
  };

  const hasPermission = (role: UserRole, permissionKey: string): boolean => {
    const roleConf = config.roles[role];
    if (!roleConf) return false;
    return !!(roleConf.permissions as any)[permissionKey];
  };

  const getRoleConfig = (role: UserRole): RoleConfig => {
    return config.roles[role] || DEFAULT_CONFIG.roles[role];
  };

  // Teams CRUD
  const addTeam = (teamData: Omit<SupportTeam, 'id'>) => {
    const id = `team-${Date.now()}`;
    setConfig(prev => ({
      ...prev,
      teams: [...prev.teams, { ...teamData, id }]
    }));
  };

  const updateTeam = (id: string, teamData: Partial<SupportTeam>) => {
    setConfig(prev => ({
      ...prev,
      teams: prev.teams.map(t => (t.id === id ? { ...t, ...teamData } : t))
    }));
  };

  const deleteTeam = (id: string) => {
    setConfig(prev => ({
      ...prev,
      teams: prev.teams.filter(t => t.id !== id)
    }));
  };

  // Employees CRUD
  const addEmployee = (empData: Omit<SupportEmployee, 'id'>) => {
    const id = `emp-${Date.now()}`;
    setConfig(prev => ({
      ...prev,
      employees: [...prev.employees, { ...empData, id }]
    }));
  };

  const updateEmployee = (id: string, empData: Partial<SupportEmployee>) => {
    setConfig(prev => ({
      ...prev,
      employees: prev.employees.map(e => (e.id === id ? { ...e, ...empData } : e))
    }));
  };

  const deleteEmployee = (id: string) => {
    setConfig(prev => ({
      ...prev,
      employees: prev.employees.filter(e => e.id !== id)
    }));
  };

  // Category CRUD
  const addCategory = (catData: Omit<ProductCategory, 'id'>) => {
    const id = `cat-${Date.now()}`;
    const newCategory: ProductCategory = { ...catData, id };
    setConfig(prev => ({
      ...prev,
      categories: [...(prev.categories || []), newCategory]
    }));
  };

  const updateCategory = (id: string, catData: Partial<ProductCategory>) => {
    setConfig(prev => ({
      ...prev,
      categories: (prev.categories || []).map(c => (c.id === id ? { ...c, ...catData } : c))
    }));
  };

  const deleteCategory = (id: string) => {
    setConfig(prev => ({
      ...prev,
      categories: (prev.categories || []).filter(c => c.id !== id)
    }));
  };

  // Modules CRUD
  const addModule = (modData: Omit<ProductModule, 'id'>) => {
    const id = `mod-${Date.now()}`;
    setConfig(prev => ({
      ...prev,
      modules: [...prev.modules, { ...modData, id }]
    }));
  };

  const updateModule = (id: string, modData: Partial<ProductModule>) => {
    setConfig(prev => ({
      ...prev,
      modules: prev.modules.map(m => (m.id === id ? { ...m, ...modData } : m))
    }));
  };

  // Definitions CRUD
  const addClosingReason = (reasonData: Omit<ClosingReason, 'id'>) => {
    const id = `cr-${Date.now()}`;
    setConfig(prev => ({
      ...prev,
      closingReasons: [...(prev.closingReasons || DEFAULT_CLOSING_REASONS), { ...reasonData, id }]
    }));
  };

  const updateClosingReason = (id: string, reasonData: Partial<ClosingReason>) => {
    setConfig(prev => ({
      ...prev,
      closingReasons: (prev.closingReasons || DEFAULT_CLOSING_REASONS).map(cr =>
        cr.id === id ? { ...cr, ...reasonData } : cr
      )
    }));
  };

  const deleteClosingReason = (id: string) => {
    setConfig(prev => ({
      ...prev,
      closingReasons: (prev.closingReasons || DEFAULT_CLOSING_REASONS).filter(cr => cr.id !== id)
    }));
  };

  const addQuickReply = (replyData: Omit<QuickReply, 'id'>) => {
    const id = `qr-${Date.now()}`;
    setConfig(prev => ({
      ...prev,
      quickReplies: [...(prev.quickReplies || DEFAULT_QUICK_REPLIES), { ...replyData, id }]
    }));
  };

  const updateQuickReply = (id: string, replyData: Partial<QuickReply>) => {
    setConfig(prev => ({
      ...prev,
      quickReplies: (prev.quickReplies || DEFAULT_QUICK_REPLIES).map(qr =>
        qr.id === id ? { ...qr, ...replyData } : qr
      )
    }));
  };

  const deleteQuickReply = (id: string) => {
    setConfig(prev => ({
      ...prev,
      quickReplies: (prev.quickReplies || DEFAULT_QUICK_REPLIES).filter(qr => qr.id !== id)
    }));
  };

  const updateSlaHours = (hours: SlaHoursSettings) => {
    setConfig(prev => ({
      ...prev,
      slaHours: hours
    }));
  };

  const updateGeneralSettings = (settings: GeneralHelpdeskSettings) => {
    setConfig(prev => ({
      ...prev,
      generalSettings: settings
    }));
  };

  return (
    <ConfigContext.Provider
      value={{
        config,
        updateConfig,
        resetConfigToDefault,
        hasPermission,
        getRoleConfig,
        addTeam,
        updateTeam,
        deleteTeam,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        addCategory,
        updateCategory,
        deleteCategory,
        addModule,
        updateModule,
        addClosingReason,
        updateClosingReason,
        deleteClosingReason,
        addQuickReply,
        updateQuickReply,
        deleteQuickReply,
        updateSlaHours,
        updateGeneralSettings
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};

import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Clock, 
  ShieldAlert, 
  Plus, 
  CheckCircle2, 
  Edit3, 
  SlidersHorizontal,
  User,
  Shield,
  Layers,
  Trash2,
  AlertTriangle,
  History,
  Building2,
  UserRound,
  Bell,
  MessageSquare,
  FileText,
  Settings,
  GitBranch,
  Search,
  BookOpen,
  Check,
  X,
  Sparkles,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { useDemoState } from '../context/DemoStateContext';
import { useConfig } from '../context/ConfigContext';
import { ProductCategory, SupportTeam, SupportEmployee, RoutingStrategy } from '../types/config';
import { 
  CategoryAudienceConfig, 
  CategoryBusinessHoursMode, 
  CategoryNotificationRules,
  TicketPriorityLevel,
  PRIORITY_LEVELS,
  audienceLabel,
  businessHoursLabel,
  notificationChannelLabel
} from '../types/categoryTypes';
import { 
  CategoryConfigSnapshot, 
  CategorySlaSettings,
  EscalationLevel,
  SlaPolicyRule,
  SlaTimeUnit,
  EscalationNotifyKind,
  EscalationChannel,
  THRESHOLD_OPTIONS,
  getCriticalThresholdOptions,
  pickValidCriticalThreshold,
  syncEscalationTriggers,
  defaultEscalationLevels,
  defaultSlaRules,
  defaultSlaSettings,
  defaultCategorySnapshot,
  getCategoryConfigState,
  getActiveCategoryVersion,
  publishCategoryVersion,
  saveCategoryDraft,
  getSlaSummaryLabel,
  snapshotsEqual
} from '../data/categoryConfig';
import { 
  ClosingReason, 
  QuickReply, 
  SlaHoursSettings, 
  GeneralHelpdeskSettings,
  handlingTeamsForCompany
} from '../data/definitions';
import { DIRECTORY_EMPLOYEES, DIRECTORY_GROUPS, DirectoryGroupKind } from '../data/directory';

export const ProviderAdminView: React.FC = () => {
  const { addToast } = useDemoState();
  const { 
    config, 
    addTeam, 
    updateTeam, 
    deleteTeam, 
    addCategory, 
    updateCategory, 
    deleteCategory,
    addClosingReason,
    updateClosingReason,
    deleteClosingReason,
    addQuickReply,
    updateQuickReply,
    deleteQuickReply,
    updateSlaHours,
    updateGeneralSettings
  } = useConfig();

  const [activeTab, setActiveTab] = useState<'categories' | 'teams' | 'definitions' | 'employees'>('categories');

  // --- CATEGORIES & VERSIONING STATE ---
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('cat-sal-calc');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [versionChangeNote, setVersionChangeNote] = useState('');
  const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null);

  // Form Fields for Category Config
  const [catName, setCatName] = useState('');
  const [catDescription, setCatDescription] = useState('');
  const [catModuleName, setCatModuleName] = useState('Payroll');
  const [catAssignedTeam, setCatAssignedTeam] = useState('Payroll Support Squad');
  const [catAudience, setCatAudience] = useState<CategoryAudienceConfig>({ type: 'all', employeeIds: [], groupIds: [] });
  const [catBusinessHours, setCatBusinessHours] = useState<CategoryBusinessHoursMode>('shift-hours');
  const [catAllowReopen, setCatAllowReopen] = useState(true);
  const [catNotifications, setCatNotifications] = useState<CategoryNotificationRules>({
    enabled: true,
    channel: 'both',
    notifyEmpOnCreate: true,
    notifyEmpOnReply: true,
    notifyEmpOnResolve: true,
    notifyAgentOnAssign: true
  });
  const [catSlaSettings, setCatSlaSettings] = useState<CategorySlaSettings>(() => defaultSlaSettings());

  // --- TEAMS CONFIG STATE ---
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [editingTeam, setEditingTeam] = useState<SupportTeam | null>(null);
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [teamRouting, setTeamRouting] = useState<RoutingStrategy>('round-robin');
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [selectedSpecialistIds, setSelectedSpecialistIds] = useState<string[]>([]);
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

  // --- DEFINITIONS & SETTINGS STATE ---
  const [defTab, setDefTab] = useState<'quick-replies' | 'sla-hours' | 'general'>('quick-replies');

  const [showQuickReplyModal, setShowQuickReplyModal] = useState(false);
  const [editingQuickReply, setEditingQuickReply] = useState<QuickReply | null>(null);
  const [qrTitle, setQrTitle] = useState('');
  const [qrContent, setQrContent] = useState('');
  const [qrCategory, setQrCategory] = useState('Payroll');
  const [qrShortcut, setQrShortcut] = useState('');

  // Get active Category version state
  const currentCategoryState = useMemo(() => {
    return getCategoryConfigState(selectedCategoryId, 'co-acme');
  }, [selectedCategoryId]);

  const activeCategoryVersion = useMemo(() => {
    return getActiveCategoryVersion(selectedCategoryId);
  }, [selectedCategoryId]);

  // Open Edit Category Modal
  const handleOpenEditCategory = (cat: ProductCategory) => {
    setSelectedCategoryId(cat.id);
    setEditingCategory(cat);
    const catState = getCategoryConfigState(cat.id, 'co-acme');
    const draft = catState.draft;

    setCatName(draft.name);
    setCatDescription(draft.description);
    setCatModuleName(cat.moduleName || 'Payroll');
    setCatAssignedTeam(draft.assignedTeam || cat.assignedTeamName || 'Payroll Support Squad');
    setCatAudience(draft.audience || { type: 'all', employeeIds: [], groupIds: [] });
    setCatBusinessHours(draft.businessHours || 'shift-hours');
    setCatAllowReopen(draft.allowEmployeeReopen ?? true);
    setCatNotifications(draft.notifications || {
      enabled: true,
      channel: 'both',
      notifyEmpOnCreate: true,
      notifyEmpOnReply: true,
      notifyEmpOnResolve: true,
      notifyAgentOnAssign: true
    });
    setCatSlaSettings(draft.sla || defaultSlaSettings());
    setShowCategoryModal(true);
  };

  // Priority SLA Rules & Escalation Updaters
  const handleUpdateSlaRule = (
    priority: TicketPriorityLevel,
    field: 'firstReplyValue' | 'firstReplyUnit' | 'resolveValue' | 'resolveUnit',
    value: any
  ) => {
    setCatSlaSettings(prev => {
      const currentRules = prev.slaRules && prev.slaRules.length > 0 ? prev.slaRules : defaultSlaRules();
      const updatedRules = currentRules.map(rule => {
        if (rule.priority === priority) {
          return { ...rule, [field]: field.endsWith('Value') ? Math.max(1, Number(value) || 1) : value };
        }
        return rule;
      });
      return { ...prev, slaRules: updatedRules };
    });
  };

  const handleUpdateEscalationLevel = (
    levelNumber: 1 | 2 | 3,
    field: keyof EscalationLevel,
    value: any
  ) => {
    setCatSlaSettings(prev => {
      const currentLevels = prev.escalationLevels && prev.escalationLevels.length > 0 ? prev.escalationLevels : defaultEscalationLevels();
      const updatedLevels = currentLevels.map(esc => {
        if (esc.level === levelNumber) {
          const updated = { ...esc, [field]: value };
          if (field === 'notifyKind') {
            if (value === 'assignee') {
              updated.notifyPersonId = '';
              updated.notifyPersonName = 'Assigned Agent';
            } else if (value === 'team-lead') {
              updated.notifyPersonId = '';
              updated.notifyPersonName = 'Rahul Shah (Team Lead)';
            } else if (value === 'employee') {
              const firstEmp = config.employees[0];
              updated.notifyPersonId = firstEmp?.id || '';
              updated.notifyPersonName = firstEmp?.name || 'Selected Specialist';
            }
          }
          if (field === 'notifyPersonId') {
            const found = config.employees.find(e => e.id === value);
            if (found) {
              updated.notifyPersonName = found.name;
            }
          }
          return updated;
        }
        return esc;
      });
      return { ...prev, escalationLevels: updatedLevels };
    });
  };

  const handleWarningThresholdChange = (val: string) => {
    const crit = pickValidCriticalThreshold(val, catSlaSettings.criticalThreshold);
    setCatSlaSettings(prev => ({
      ...prev,
      warningThreshold: val,
      criticalThreshold: crit,
      escalationLevels: syncEscalationTriggers(prev.escalationLevels, val, crit)
    }));
  };

  const handleCriticalThresholdChange = (val: string) => {
    setCatSlaSettings(prev => ({
      ...prev,
      criticalThreshold: val,
      escalationLevels: syncEscalationTriggers(prev.escalationLevels, prev.warningThreshold, val)
    }));
  };

  // Save Category Draft
  const handleSaveCategoryForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;

    const allAudience: CategoryAudienceConfig = { type: 'all', employeeIds: [], groupIds: [] };

    const snapshot: CategoryConfigSnapshot = {
      name: catName,
      description: catDescription,
      assignedTeam: catAssignedTeam,
      audience: allAudience,
      businessHours: catBusinessHours,
      allowEmployeeReopen: catAllowReopen,
      priorityChangeBy: { assignee: true, employee: false },
      notifications: catNotifications,
      sla: catSlaSettings
    };

    const catId = editingCategory ? editingCategory.id : `cat-${Date.now()}`;
    saveCategoryDraft(catId, snapshot);

    const categoryData: Omit<ProductCategory, 'id'> = {
      name: catName,
      description: catDescription,
      moduleId: 'mod-payroll',
      moduleName: catModuleName,
      assignedTeamId: 'team-payroll',
      assignedTeamName: catAssignedTeam,
      audience: allAudience,
      businessHours: catBusinessHours,
      notifications: catNotifications,
      fullSlaSettings: catSlaSettings,
      slaTargets: {
        critical: { priority: 'Critical', firstResponseMinutes: catSlaSettings.slaRules.find(r => r.priority === 'Urgent')?.firstReplyValue || 30, resolutionMinutes: 240 },
        high: { priority: 'High', firstResponseMinutes: catSlaSettings.slaRules.find(r => r.priority === 'High')?.firstReplyValue || 60, resolutionMinutes: 480 },
        normal: { priority: 'Normal', firstResponseMinutes: 240, resolutionMinutes: 1440 },
        pauseOnWaitingForCustomer: catSlaSettings.slaExempt ? false : true
      },
      escalationPolicy: {
        escalateToType: 'Engineering',
        targetId: 'emp-ananya',
        targetName: catSlaSettings.escalationLevels[2]?.notifyPersonName || 'Ananya Verma (Engineering)',
        triggerMinutes: 120,
        reason: 'SLA Escalation Policy triggered'
      },
      active: true
    };

    if (editingCategory) {
      updateCategory(editingCategory.id, categoryData);
      addToast('success', 'Category Draft Saved', `"${catName}" draft configuration saved. Publish a version to apply.`);
    } else {
      addCategory(categoryData);
      publishCategoryVersion(catId, 'Sixtifi Admin', 'Initial version');
      addToast('success', 'New Category Created', `"${catName}" created and v1 published.`);
    }

    setShowCategoryModal(false);
    setEditingCategory(null);
  };

  // Publish New Version Modal Trigger
  const handlePublishVersion = () => {
    if (!selectedCategoryId) return;
    const newVer = publishCategoryVersion(selectedCategoryId, 'Sixtifi Admin', versionChangeNote || 'Updated SLA & Escalation policy');
    addToast('success', 'Version Published!', `Published Version ${newVer.label} for category.`);
    setShowVersionModal(false);
    setVersionChangeNote('');
  };

  // Open Edit Team Modal
  const handleOpenEditTeam = (team?: SupportTeam) => {
    if (team) {
      setEditingTeam(team);
      setTeamName(team.name);
      setTeamDescription(team.description);
      setTeamRouting(team.routingStrategy || 'round-robin');
      setSelectedLeadIds(team.leadIds || []);
      setSelectedSpecialistIds(team.specialistIds || []);
      setSelectedMemberIds(team.memberIds || []);
      setSelectedCategoryIds(team.assignedCategoryIds || []);
    } else {
      setEditingTeam(null);
      setTeamName('');
      setTeamDescription('');
      setTeamRouting('round-robin');
      setSelectedLeadIds([]);
      setSelectedSpecialistIds([]);
      setSelectedMemberIds([]);
      setSelectedCategoryIds([]);
    }
    setShowTeamModal(true);
  };

  // Save Support Team Form
  const handleSaveTeamForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName) return;

    const leads = config.employees.filter(e => selectedLeadIds.includes(e.id));
    const specialists = config.employees.filter(e => selectedSpecialistIds.includes(e.id));
    const members = config.employees.filter(e => selectedMemberIds.includes(e.id));
    const categories = (config.categories || []).filter(c => selectedCategoryIds.includes(c.id));

    const teamData: Omit<SupportTeam, 'id'> = {
      name: teamName,
      description: teamDescription || 'Specialized Support Squad',
      routingStrategy: teamRouting,
      leadIds: selectedLeadIds,
      leadNames: leads.map(l => l.name),
      specialistIds: selectedSpecialistIds,
      specialistNames: specialists.map(s => s.name),
      memberIds: selectedMemberIds,
      memberNames: members.map(m => m.name),
      assignedCategoryIds: selectedCategoryIds,
      assignedCategoryNames: categories.map(c => c.name),
      active: true
    };

    if (editingTeam) {
      updateTeam(editingTeam.id, teamData);
      addToast('success', 'Team Configuration Saved', `Support Squad "${teamName}" updated.`);
    } else {
      addTeam(teamData);
      addToast('success', 'New Team Created', `Support Squad "${teamName}" created successfully.`);
    }

    setShowTeamModal(false);
    setEditingTeam(null);
  };

  const toggleSelection = (id: string, list: string[], setList: (vals: string[]) => void) => {
    if (list.includes(id)) {
      setList(list.filter(item => item !== id));
    } else {
      setList([...list, id]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-blue-600 text-white text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded tracking-wider">
                Sixtifi Helpdesk Admin
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold px-2 py-0.5 rounded">
                Versioned Engine
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-2">
              Helpdesk Internal Working & Settings
            </h1>
            <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-2xl">
              Configure Category SLAs, Version History, Audience Target Groups, Handling Team Rosters, Ticket Closing Reasons, Business Working Hours, and Quick Replies.
            </p>
          </div>

          {/* Navigation Tabs Header */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-800 p-1.5 rounded-2xl border border-slate-700">
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'categories' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers size={15} />
              <span>Categories & Versioning ({config.categories?.length || 0})</span>
            </button>
            <button
              onClick={() => setActiveTab('teams')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'teams' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users size={15} />
              <span>Support Teams ({config.teams.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('definitions')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'definitions' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Settings size={15} />
              <span>Definitions & Settings</span>
            </button>
            <button
              onClick={() => setActiveTab('employees')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'employees' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserRound size={15} />
              <span>Support Staff ({config.employees.length})</span>
            </button>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* TAB 1: CATEGORIES & VERSIONING & SLA ENGINE                          */}
        {/* ==================================================================== */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-3 overflow-x-auto pb-1 sm:pb-0">
                {(config.categories || []).map((cat) => {
                  const isSel = cat.id === selectedCategoryId;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategoryId(cat.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                        isSel 
                          ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-xs' 
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowVersionModal(true)}
                  className="btn btn-secondary text-xs px-3.5 py-2 flex items-center gap-1.5"
                >
                  <GitBranch size={15} className="text-blue-600" />
                  <span>Publish New Version</span>
                </button>
                <button
                  onClick={() => {
                    setEditingCategory(null);
                    setCatName('');
                    setCatDescription('');
                    setShowCategoryModal(true);
                  }}
                  className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-xs px-4 py-2 border-none flex items-center gap-1.5"
                >
                  <Plus size={16} />
                  <span>Add New Category</span>
                </button>
              </div>
            </div>

            {/* Selected Category Detail & Config Engine */}
            {(() => {
              const selCat = (config.categories || []).find(c => c.id === selectedCategoryId) || config.categories[0];
              if (!selCat) return null;

              const catState = getCategoryConfigState(selCat.id, 'co-acme');
              const activeVer = getActiveCategoryVersion(selCat.id);
              const snapshot = activeVer?.snapshot || catState.draft;

              return (
                <div className="space-y-6">
                  {/* Category Banner Card */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
                            {selCat.moduleName || 'Payroll'}
                          </span>
                          <h2 className="text-xl font-extrabold text-slate-900">{selCat.name}</h2>
                          <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            {activeVer ? activeVer.label : 'v1 — Active'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{selCat.description}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200 font-semibold">
                          Assigned Team: <strong className="text-blue-700">{snapshot.assignedTeam || selCat.assignedTeamName}</strong>
                        </span>
                        <button
                          onClick={() => handleOpenEditCategory(selCat)}
                          className="btn btn-secondary text-xs px-3.5 py-2 flex items-center gap-1.5"
                        >
                          <Edit3 size={14} />
                          <span>Edit Config Draft</span>
                        </button>
                      </div>
                    </div>

                    {/* Quick Config Summary Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1">
                        <span className="text-slate-400 font-bold uppercase text-[10px] block">Audience Target</span>
                        <strong className="text-slate-800 text-xs block">{audienceLabel(snapshot.audience)}</strong>
                      </div>
                      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1">
                        <span className="text-slate-400 font-bold uppercase text-[10px] block">Business Hours Mode</span>
                        <strong className="text-slate-800 text-xs block">{businessHoursLabel(snapshot.businessHours)}</strong>
                      </div>
                      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1">
                        <span className="text-slate-400 font-bold uppercase text-[10px] block">Notifications Rule</span>
                        <strong className="text-slate-800 text-xs block">{notificationChannelLabel(snapshot.notifications?.channel || 'both')}</strong>
                      </div>
                      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1">
                        <span className="text-slate-400 font-bold uppercase text-[10px] block">SLA Target Summary</span>
                        <strong className="text-blue-700 text-xs block">{getSlaSummaryLabel(snapshot.sla)}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Config Panels Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Left 2 Cols: Detailed SLA Policy Rules & Escalation Levels */}
                    <div className="lg:col-span-2 space-y-6">
                      
                      {/* Priority SLA Rules Card */}
                      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                          <div className="flex items-center gap-2">
                            <Clock size={18} className="text-rose-600" />
                            <h3 className="font-extrabold text-slate-900 text-sm">Priority Response & Resolution Targets</h3>
                          </div>
                          <span className="text-[11px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                            {snapshot.sla?.slaExempt ? '⚠️ SLA Exempt (Tracking Only)' : '✓ Active SLA Commitments'}
                          </span>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs">
                            <thead>
                              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-500 font-bold uppercase text-[10px]">
                                <th className="p-2.5">Priority Level</th>
                                <th className="p-2.5">1st Response Target</th>
                                <th className="p-2.5">Resolution Target</th>
                                <th className="p-2.5">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {(snapshot.sla?.slaRules || defaultSlaSettings().slaRules).map((rule) => (
                                <tr key={rule.id} className="hover:bg-slate-50/60">
                                  <td className="p-2.5 font-extrabold text-slate-900 flex items-center gap-1.5">
                                    <span className={`w-2 h-2 rounded-full ${
                                      rule.priority === 'Urgent' ? 'bg-rose-600' :
                                      rule.priority === 'High' ? 'bg-amber-500' :
                                      rule.priority === 'Medium' ? 'bg-blue-500' : 'bg-slate-400'
                                    }`}></span>
                                    {rule.priority}
                                  </td>
                                  <td className="p-2.5 font-bold text-slate-700">{rule.firstReplyValue} {rule.firstReplyUnit}</td>
                                  <td className="p-2.5 font-bold text-slate-700">{rule.resolveValue} {rule.resolveUnit}</td>
                                  <td className="p-2.5 text-emerald-600 font-semibold">Active Target</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* 3-Level Escalation Policy Card */}
                      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                          <div className="flex items-center gap-2">
                            <ShieldAlert size={18} className="text-amber-600" />
                            <h3 className="font-extrabold text-slate-900 text-sm">Configured 3-Tier Escalation Levels</h3>
                          </div>
                          <span className="text-[11px] text-slate-500">Warning: {snapshot.sla?.warningThreshold || '80%'} · Critical: {snapshot.sla?.criticalThreshold || '90%'}</span>
                        </div>

                        <div className="space-y-3">
                          {(snapshot.sla?.escalationLevels || defaultSlaSettings().escalationLevels).map((esc) => (
                            <div key={esc.id} className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                              <div className="flex items-center gap-3">
                                <span className={`w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-xs text-white shrink-0 ${
                                  esc.level === 1 ? 'bg-amber-500' : esc.level === 2 ? 'bg-rose-600' : 'bg-purple-700'
                                }`}>
                                  L{esc.level}
                                </span>
                                <div>
                                  <strong className="text-slate-900 font-bold block">{esc.trigger}</strong>
                                  <span className="text-slate-500 text-[11px]">Notify Target: <strong className="text-slate-800">{esc.notifyPersonName || esc.notifyKind}</strong></span>
                                </div>
                              </div>

                              <span className="bg-white px-3 py-1 rounded-lg border border-slate-200 font-semibold text-slate-700 shrink-0">
                                Channel: <strong>{esc.channel}</strong>
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Right Col: Version History & Audit Log */}
                    <div className="space-y-6">
                      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                          <History size={18} className="text-blue-600" />
                          <h3 className="font-extrabold text-slate-900 text-sm">Version History & Audit</h3>
                        </div>

                        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                          {(catState.versions || []).map((ver) => (
                            <div key={ver.id} className={`p-3 rounded-xl border text-xs space-y-1 ${
                              ver.status === 'active' ? 'bg-blue-50/60 border-blue-200' : 'bg-slate-50 border-slate-200 opacity-75'
                            }`}>
                              <div className="flex justify-between items-center font-bold">
                                <span className="text-slate-900">{ver.label}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded font-extrabold uppercase ${
                                  ver.status === 'active' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                                }`}>
                                  {ver.status}
                                </span>
                              </div>
                              <p className="text-slate-600 text-[11px]">{ver.changeNote || 'Configuration updated.'}</p>
                              <div className="text-[10px] text-slate-400 pt-1 flex justify-between">
                                <span>Published: {ver.publishedAt}</span>
                                <span>By: {ver.publishedBy}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })()}

          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 2: SUPPORT TEAMS & ROUTING ROSTER                                 */}
        {/* ==================================================================== */}
        {activeTab === 'teams' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Users className="text-blue-600" size={20} />
                  <span>Support Teams & Ticket Routing Roster</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Configure specialized support squads, multi-role agent rosters, auto-routing strategies, and category mappings.
                </p>
              </div>

              <button
                onClick={() => handleOpenEditTeam()}
                className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-xs px-4 py-2 border-none flex items-center gap-1.5 shrink-0"
              >
                <Plus size={16} />
                <span>Create Support Team</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {config.teams.map((team) => (
                <div key={team.id} className="border border-slate-200 rounded-2xl p-6 bg-slate-50/80 hover:bg-white hover:shadow-md transition-all space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-200/60 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-slate-900 text-base">{team.name}</h3>
                        <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded capitalize">
                          {team.routingStrategy || 'Round Robin'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{team.description}</p>
                    </div>
                    <button
                      onClick={() => handleOpenEditTeam(team)}
                      className="btn btn-secondary text-xs px-3 py-1.5 shrink-0 flex items-center gap-1"
                    >
                      <Edit3 size={14} />
                      <span>Edit Squad</span>
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    {/* Team Leads */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">👑 Team Leads ({team.leadNames?.length || 0}):</span>
                      <div className="flex flex-wrap gap-1.5">
                        {(team.leadNames || []).map((lead, idx) => (
                          <span key={idx} className="bg-blue-100 text-blue-800 font-bold px-2.5 py-0.5 rounded-full text-xs">
                            {lead}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Specialists */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">⚡ Senior Specialists ({team.specialistNames?.length || 0}):</span>
                      <div className="flex flex-wrap gap-1.5">
                        {(team.specialistNames || []).map((spec, idx) => (
                          <span key={idx} className="bg-purple-100 text-purple-800 font-semibold px-2.5 py-0.5 rounded-full text-xs">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Squad Members */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">👥 Squad Members ({team.memberNames?.length || 0}):</span>
                      <div className="flex flex-wrap gap-1.5">
                        {(team.memberNames || []).map((mem, idx) => (
                          <span key={idx} className="bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-full text-xs">
                            {mem}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Assigned Categories */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">📂 Assigned Categories ({team.assignedCategoryNames?.length || 0}):</span>
                      <div className="flex flex-wrap gap-1.5">
                        {(team.assignedCategoryNames || []).map((cat, idx) => (
                          <span key={idx} className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-xs">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 3: DEFINITIONS & SETTINGS (Closing Reasons, SLA Hours, Quick Replies) */}
        {/* ==================================================================== */}
        {activeTab === 'definitions' && (
          <div className="space-y-6">
            
            {/* Sub Nav Bar */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200 flex flex-wrap gap-2 shadow-xs">
              <button
                onClick={() => setDefTab('quick-replies')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  defTab === 'quick-replies' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <MessageSquare size={15} />
                <span>Quick Replies Library ({config.quickReplies?.length || 0})</span>
              </button>

              <button
                onClick={() => setDefTab('sla-hours')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  defTab === 'sla-hours' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Clock size={15} />
                <span>SLA Working Hours Schedule</span>
              </button>

              <button
                onClick={() => setDefTab('general')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  defTab === 'general' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Settings size={15} />
                <span>General Settings</span>
              </button>
            </div>

            {/* Sub Tab 2: Quick Replies Library */}
            {defTab === 'quick-replies' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">Canned Responses & Quick Replies</h3>
                    <p className="text-xs text-slate-500">Reusable message templates for support agents to insert during ticket replies.</p>
                  </div>

                  <button
                    onClick={() => {
                      setEditingQuickReply(null);
                      setQrTitle('');
                      setQrContent('');
                      setQrShortcut('');
                      setShowQuickReplyModal(true);
                    }}
                    className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-xs px-3.5 py-2 border-none flex items-center gap-1.5"
                  >
                    <Plus size={16} />
                    <span>Create Template</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(config.quickReplies || []).map((qr) => (
                    <div key={qr.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/70 hover:bg-white hover:shadow-xs transition-all space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
                            {qr.category}
                          </span>
                          <h4 className="font-bold text-slate-900 text-sm mt-1">{qr.title}</h4>
                        </div>
                        <span className="bg-slate-900 text-white font-mono text-[10px] px-2 py-0.5 rounded">
                          {qr.shortcut}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 bg-white p-2.5 rounded border border-slate-200/60 italic">
                        "{qr.content}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub Tab 3: SLA Working Hours */}
            {defTab === 'sla-hours' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
                <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">SLA Business Working Hours Schedule</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  <div className="space-y-3">
                    <div>
                      <label className="form-label font-bold text-slate-800">Timezone</label>
                      <input type="text" readOnly value={config.slaHours?.timezone} className="form-input bg-slate-50" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="form-label font-bold text-slate-800">Shift Start</label>
                        <input type="text" readOnly value={config.slaHours?.businessHoursStart} className="form-input bg-slate-50" />
                      </div>
                      <div>
                        <label className="form-label font-bold text-slate-800">Shift End</label>
                        <input type="text" readOnly value={config.slaHours?.businessHoursEnd} className="form-input bg-slate-50" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <span className="font-bold text-slate-900 block">Working Days & Pause Rules</span>
                    <div className="flex flex-wrap gap-2">
                      {config.slaHours?.workingDays.map(d => (
                        <span key={d} className="bg-blue-100 text-blue-800 font-bold px-2.5 py-1 rounded">
                          {d}
                        </span>
                      ))}
                    </div>
                    <div className="text-slate-600 text-xs pt-2">
                      Weekend SLA Pause: <strong>{config.slaHours?.pauseSlaOnWeekends ? 'Enabled (Clock Pauses)' : 'Disabled'}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sub Tab 4: General Settings */}
            {defTab === 'general' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs">
                <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">General Helpdesk System Settings</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Fallback Support Team</span>
                    <strong className="text-slate-900 text-sm block mt-1">{config.generalSettings?.defaultFallbackTeam}</strong>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Auto-Close Resolved Tickets</span>
                    <strong className="text-slate-900 text-sm block mt-1">{config.generalSettings?.autoCloseDaysAfterResolve} Days of Inactivity</strong>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Ticket ID Prefix Format</span>
                    <strong className="text-blue-700 text-sm block mt-1">{config.generalSettings?.ticketIdPrefix}10001</strong>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 4: SUPPORT STAFF & PERMISSIONS MATRIX                            */}
        {/* ==================================================================== */}
        {activeTab === 'employees' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <UserRound className="text-blue-600" size={20} />
                <span>Support Staff Roster & Skill Matrix</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Manage agents, specialists, team leads, and engineering contacts.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {config.employees.map((emp) => (
                <div key={emp.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/80 hover:bg-white hover:shadow-xs transition-all space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">{emp.name}</h4>
                      <p className="text-xs text-slate-500">{emp.email}</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      {emp.employeeType}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="text-slate-600">Team: <strong className="text-slate-900">{emp.teamName}</strong></div>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {emp.skills.map((skill, i) => (
                        <span key={i} className="bg-slate-200 text-slate-800 text-[10px] px-2 py-0.5 rounded-full font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODAL: CATEGORY EDIT & DRAFT */}
        {showCategoryModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in overflow-y-auto">
            <div className="bg-white rounded-3xl p-6 md:p-8 max-w-4xl w-full shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                {editingCategory ? `Configure Category: ${editingCategory.name}` : 'Configure New Category'}
              </h3>

              <form onSubmit={handleSaveCategoryForm} className="space-y-6 text-xs">
                {/* 1. Basic Details */}
                <div className="space-y-4">
                  <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
                    <SlidersHorizontal size={16} className="text-blue-600" />
                    Category Overview & Routing
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label font-bold text-slate-800">Category Name *</label>
                      <input
                        type="text"
                        value={catName}
                        onChange={(e) => setCatName(e.target.value)}
                        placeholder="e.g. Salary Calculation"
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label font-bold text-slate-800">Parent Module</label>
                      <select
                        value={catModuleName}
                        onChange={(e) => setCatModuleName(e.target.value)}
                        className="form-select"
                      >
                        <option value="Payroll">Payroll</option>
                        <option value="Attendance">Attendance</option>
                        <option value="Leave">Leave</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label font-bold text-slate-800">Assigned Handling Support Team *</label>
                      <select
                        value={catAssignedTeam}
                        onChange={(e) => setCatAssignedTeam(e.target.value)}
                        className="form-select"
                        required
                      >
                        {config.teams.map(t => (
                          <option key={t.id} value={t.name}>{t.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="form-label font-bold text-slate-800">SLA Business Hours Mode</label>
                      <select
                        value={catBusinessHours}
                        onChange={(e) => setCatBusinessHours(e.target.value as CategoryBusinessHoursMode)}
                        className="form-select"
                      >
                        <option value="shift-hours">Working Hours Only (9 AM – 6 PM)</option>
                        <option value="24-hour">Full Day (24 Hour Continuous)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="form-label font-bold text-slate-800">Category Description</label>
                    <input
                      type="text"
                      value={catDescription}
                      onChange={(e) => setCatDescription(e.target.value)}
                      placeholder="Brief scope of request category..."
                      className="form-input"
                    />
                  </div>
                </div>

                {/* 2. Priority Response & Resolution Targets Edit Section */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-200/80 pb-3">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                        <Clock size={16} className="text-rose-600" />
                        Priority Response & Resolution Targets
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Set SLA targets for 1st response and resolution for each priority level.
                      </p>
                    </div>
                    
                    <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={catSlaSettings.slaExempt}
                        onChange={(e) => setCatSlaSettings({ ...catSlaSettings, slaExempt: e.target.checked })}
                      />
                      <span>SLA Exempt (Tracking Only)</span>
                    </label>
                  </div>

                  <div className="space-y-3">
                    {PRIORITY_LEVELS.map((prio) => {
                      const rule = catSlaSettings.slaRules?.find(r => r.priority === prio) || {
                        id: `sla-${prio.toLowerCase()}`,
                        priority: prio,
                        firstReplyValue: prio === 'Urgent' ? 1 : prio === 'High' ? 4 : prio === 'Medium' ? 8 : 12,
                        firstReplyUnit: 'Hours' as SlaTimeUnit,
                        resolveValue: prio === 'Urgent' ? 4 : prio === 'High' ? 1 : prio === 'Medium' ? 2 : 4,
                        resolveUnit: prio === 'Urgent' ? ('Hours' as SlaTimeUnit) : ('Days' as SlaTimeUnit)
                      };

                      return (
                        <div key={prio} className="bg-white p-3 rounded-xl border border-slate-200/80 grid grid-cols-1 sm:grid-cols-7 items-center gap-3">
                          <div className="sm:col-span-2 flex items-center gap-2 font-bold text-slate-900">
                            <span className={`w-2.5 h-2.5 rounded-full ${
                              prio === 'Urgent' ? 'bg-rose-600' :
                              prio === 'High' ? 'bg-amber-500' :
                              prio === 'Medium' ? 'bg-blue-500' : 'bg-slate-400'
                            }`}></span>
                            <span>{prio} Priority</span>
                          </div>

                          {/* 1st Response Target */}
                          <div className="sm:col-span-2 flex items-center gap-1.5">
                            <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0">1st Response:</span>
                            <input
                              type="number"
                              min={1}
                              value={rule.firstReplyValue}
                              onChange={(e) => handleUpdateSlaRule(prio, 'firstReplyValue', e.target.value)}
                              className="form-input text-xs w-16 p-1.5 text-center font-bold"
                            />
                            <select
                              value={rule.firstReplyUnit}
                              onChange={(e) => handleUpdateSlaRule(prio, 'firstReplyUnit', e.target.value as SlaTimeUnit)}
                              className="form-select text-xs p-1.5 font-medium"
                            >
                              <option value="Minutes">Mins</option>
                              <option value="Hours">Hours</option>
                              <option value="Days">Days</option>
                            </select>
                          </div>

                          {/* Resolution Target */}
                          <div className="sm:col-span-3 flex items-center gap-1.5">
                            <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0">Resolution:</span>
                            <input
                              type="number"
                              min={1}
                              value={rule.resolveValue}
                              onChange={(e) => handleUpdateSlaRule(prio, 'resolveValue', e.target.value)}
                              className="form-input text-xs w-16 p-1.5 text-center font-bold"
                            />
                            <select
                              value={rule.resolveUnit}
                              onChange={(e) => handleUpdateSlaRule(prio, 'resolveUnit', e.target.value as SlaTimeUnit)}
                              className="form-select text-xs p-1.5 font-medium"
                            >
                              <option value="Minutes">Mins</option>
                              <option value="Hours">Hours</option>
                              <option value="Days">Days</option>
                            </select>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Escalation Level Edit Section */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                        <ShieldAlert size={16} className="text-amber-600" />
                        Configure 3-Tier Escalation Levels
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Set automated warning/critical breach thresholds and notify targets.
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase text-slate-500">Warning:</span>
                        <select
                          value={catSlaSettings.warningThreshold}
                          onChange={(e) => handleWarningThresholdChange(e.target.value)}
                          className="form-select text-xs p-1 font-bold"
                        >
                          {THRESHOLD_OPTIONS.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase text-slate-500">Critical:</span>
                        <select
                          value={catSlaSettings.criticalThreshold}
                          onChange={(e) => handleCriticalThresholdChange(e.target.value)}
                          className="form-select text-xs p-1 font-bold"
                        >
                          {getCriticalThresholdOptions(catSlaSettings.warningThreshold).map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {([1, 2, 3] as const).map((levelNum) => {
                      const esc = catSlaSettings.escalationLevels?.find(l => l.level === levelNum) || {
                        id: `esc-${levelNum}`,
                        level: levelNum,
                        trigger: levelNum === 1 ? `${catSlaSettings.warningThreshold} SLA At Risk` : levelNum === 2 ? `${catSlaSettings.criticalThreshold} SLA Critical` : 'SLA Breached (100%)',
                        notifyKind: levelNum === 1 ? 'assignee' : levelNum === 2 ? 'team-lead' : 'employee',
                        notifyPersonId: '',
                        notifyPersonName: levelNum === 1 ? 'Assigned Agent' : levelNum === 2 ? 'Rahul Shah (Team Lead)' : 'Ananya Verma (Engineering)',
                        channel: 'In-app + Email' as EscalationChannel
                      };

                      return (
                        <div key={levelNum} className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                            <div className="flex items-center gap-2">
                              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-extrabold text-xs text-white ${
                                levelNum === 1 ? 'bg-amber-500' : levelNum === 2 ? 'bg-rose-600' : 'bg-purple-700'
                              }`}>
                                L{levelNum}
                              </span>
                              <strong className="text-slate-900 font-bold">{esc.trigger}</strong>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-[10px] uppercase font-bold text-slate-400">Channel:</span>
                              <select
                                value={esc.channel}
                                onChange={(e) => handleUpdateEscalationLevel(levelNum, 'channel', e.target.value as EscalationChannel)}
                                className="form-select text-xs p-1 font-semibold"
                              >
                                <option value="In-app + Email">In-app + Email</option>
                                <option value="In-app">In-app Only</option>
                                <option value="Email">Email Only</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            <div>
                              <label className="form-label font-bold text-slate-700 text-[11px]">Notify Recipient Type</label>
                              <select
                                value={esc.notifyKind}
                                onChange={(e) => handleUpdateEscalationLevel(levelNum, 'notifyKind', e.target.value as EscalationNotifyKind)}
                                className="form-select text-xs p-1.5"
                              >
                                <option value="assignee">Assigned Agent</option>
                                <option value="team-lead">Team Lead / Squad Lead</option>
                                <option value="employee">Specific Specialist / Contact Person</option>
                              </select>
                            </div>

                            {esc.notifyKind === 'employee' ? (
                              <div>
                                <label className="form-label font-bold text-slate-700 text-[11px]">Select Specialist / Contact Person</label>
                                <select
                                  value={esc.notifyPersonId}
                                  onChange={(e) => handleUpdateEscalationLevel(levelNum, 'notifyPersonId', e.target.value)}
                                  className="form-select text-xs p-1.5"
                                >
                                  {config.employees.map(emp => (
                                    <option key={emp.id} value={emp.id}>
                                      {emp.name} ({emp.teamName || emp.employeeType})
                                    </option>
                                  ))}
                                </select>
                              </div>
                            ) : (
                              <div>
                                <label className="form-label font-bold text-slate-400 text-[11px]">Designated Recipient Name</label>
                                <input
                                  type="text"
                                  readOnly
                                  value={esc.notifyPersonName}
                                  className="form-input text-xs p-1.5 bg-slate-50 text-slate-600 font-semibold"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-slate-100">
                  <button type="button" onClick={() => setShowCategoryModal(false)} className="btn btn-secondary text-xs px-4">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-xs px-5 border-none">
                    Save Category Draft
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: PUBLISH CATEGORY VERSION */}
        {showVersionModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Publish New Category Version
              </h3>

              <div className="space-y-4 text-xs">
                <p className="text-slate-600">
                  Publishing a new version will freeze the current draft and apply SLA, escalation, and routing rules to all new tickets raised under this category.
                </p>

                <div>
                  <label className="form-label font-bold text-slate-800">Release / Change Note</label>
                  <textarea
                    value={versionChangeNote}
                    onChange={(e) => setVersionChangeNote(e.target.value)}
                    placeholder="Describe what changed in SLA target or escalation rules..."
                    className="form-textarea text-xs"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowVersionModal(false)} className="btn btn-secondary text-xs">
                  Cancel
                </button>
                <button type="button" onClick={handlePublishVersion} className="btn btn-primary bg-blue-600 text-xs border-none">
                  Publish Version
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: SUPPORT TEAM CONFIG */}
        {showTeamModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in overflow-y-auto">
            <div className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl space-y-6 my-8">
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                {editingTeam ? `Configure Support Team: ${editingTeam.name}` : 'Configure New Support Squad'}
              </h3>

              <form onSubmit={handleSaveTeamForm} className="space-y-5 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label font-bold text-slate-800">Squad Name *</label>
                    <input
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="e.g. Payroll Support Squad"
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label font-bold text-slate-800">Auto-Routing Strategy</label>
                    <select
                      value={teamRouting}
                      onChange={(e) => setTeamRouting(e.target.value as RoutingStrategy)}
                      className="form-select"
                    >
                      <option value="round-robin">Round Robin (Sequential)</option>
                      <option value="load-balanced">Load Balanced (Active Tickets)</option>
                      <option value="manual">Manual Assignment Only</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="form-label font-bold text-slate-800">Description</label>
                  <input
                    type="text"
                    value={teamDescription}
                    onChange={(e) => setTeamDescription(e.target.value)}
                    placeholder="Team responsibilities..."
                    className="form-input"
                  />
                </div>

                {/* Team Leads Multi-Selection */}
                <div>
                  <label className="form-label font-bold text-blue-900">👑 Select Team Leads (Multiple)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 max-h-32 overflow-y-auto">
                    {config.employees.map(emp => (
                      <label key={emp.id} className="flex items-center gap-2 text-xs cursor-pointer p-1 hover:bg-slate-100 rounded">
                        <input
                          type="checkbox"
                          checked={selectedLeadIds.includes(emp.id)}
                          onChange={() => toggleSelection(emp.id, selectedLeadIds, setSelectedLeadIds)}
                        />
                        <span className="font-medium text-slate-800">{emp.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Senior Specialists Multi-Selection */}
                <div>
                  <label className="form-label font-bold text-purple-900">⚡ Select Senior Specialists Support (Multiple)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 max-h-32 overflow-y-auto">
                    {config.employees.map(emp => (
                      <label key={emp.id} className="flex items-center gap-2 text-xs cursor-pointer p-1 hover:bg-slate-100 rounded">
                        <input
                          type="checkbox"
                          checked={selectedSpecialistIds.includes(emp.id)}
                          onChange={() => toggleSelection(emp.id, selectedSpecialistIds, setSelectedSpecialistIds)}
                        />
                        <span className="font-medium text-slate-800">{emp.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Squad Members Multi-Selection */}
                <div>
                  <label className="form-label font-bold text-slate-900">👥 Select Squad Members (Multiple)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 max-h-32 overflow-y-auto">
                    {config.employees.map(emp => (
                      <label key={emp.id} className="flex items-center gap-2 text-xs cursor-pointer p-1 hover:bg-slate-100 rounded">
                        <input
                          type="checkbox"
                          checked={selectedMemberIds.includes(emp.id)}
                          onChange={() => toggleSelection(emp.id, selectedMemberIds, setSelectedMemberIds)}
                        />
                        <span className="font-medium text-slate-800">{emp.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button type="button" onClick={() => setShowTeamModal(false)} className="btn btn-secondary text-xs">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-xs border-none">
                    Save Squad Definition
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

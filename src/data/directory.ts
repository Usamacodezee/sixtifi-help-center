export interface DirectoryPerson {
  id: string;
  name: string;
  initials: string;
  department: string;
  companyId: string;
}

/** Org units selectable as audience "groups" */
export type DirectoryGroupKind = 'department' | 'sub-department' | 'business-unit' | 'location';

export interface DirectoryGroup {
  id: string;
  name: string;
  kind: DirectoryGroupKind;
  description: string;
  memberCount: number;
  companyId: string;
}

export const DIRECTORY_GROUP_KIND_LABEL: Record<DirectoryGroupKind, string> = {
  department: 'Department',
  'sub-department': 'Sub-department',
  'business-unit': 'Business unit',
  location: 'Location'
};

export const DIRECTORY_GROUP_KIND_SHORT: Record<DirectoryGroupKind, string> = {
  department: 'D',
  'sub-department': 'SD',
  'business-unit': 'BU',
  location: 'L'
};

export const DIRECTORY_EMPLOYEES: DirectoryPerson[] = [
  { id: 'emp-rahul', name: 'Rahul Shah', initials: 'RS', department: 'Payroll', companyId: 'co-acme' },
  { id: 'emp-priya', name: 'Priya Mehta', initials: 'PM', department: 'Tax & Compliance', companyId: 'co-acme' },
  { id: 'emp-vikram', name: 'Vikram Sharma', initials: 'VS', department: 'Attendance & Operations', companyId: 'co-acme' },
  { id: 'emp-ananya', name: 'Ananya Verma', initials: 'AV', department: 'Engineering Core', companyId: 'co-acme' },
  { id: 'emp-sunil', name: 'Sunil Kumar', initials: 'SK', department: 'HR Management', companyId: 'co-acme' },
  { id: 'emp-sarah', name: 'Sarah Mehta', initials: 'SM', department: 'HR Administrator (Customer)', companyId: 'co-acme' }
];

export const DIRECTORY_GROUPS: DirectoryGroup[] = [
  // Acme — departments
  {
    id: 'grp-hr',
    name: 'HR & People Ops',
    kind: 'department',
    description: 'Human Resources and People Operations',
    memberCount: 48,
    companyId: 'co-acme'
  },
  {
    id: 'grp-payroll',
    name: 'Payroll & Finance',
    kind: 'department',
    description: 'Payroll processing and financial auditing',
    memberCount: 22,
    companyId: 'co-acme'
  },
  {
    id: 'grp-it',
    name: 'IT & Infrastructure',
    kind: 'department',
    description: 'Information Technology and Access Systems',
    memberCount: 36,
    companyId: 'co-acme'
  },
  {
    id: 'grp-ops',
    name: 'Workforce Operations',
    kind: 'department',
    description: 'Attendance and shift management',
    memberCount: 61,
    companyId: 'co-acme'
  },
  // Sub-departments
  {
    id: 'grp-hr-ta',
    name: 'Talent Acquisition',
    kind: 'sub-department',
    description: 'HR · Recruiting & Onboarding',
    memberCount: 12,
    companyId: 'co-acme'
  },
  {
    id: 'grp-payroll-tax',
    name: 'Tax & Statutory Audit',
    kind: 'sub-department',
    description: 'Payroll · Statutory Tax & TDS',
    memberCount: 8,
    companyId: 'co-acme'
  },
  // Business Units
  {
    id: 'grp-bu-corp',
    name: 'Corporate Services',
    kind: 'business-unit',
    description: 'Central corporate business unit',
    memberCount: 210,
    companyId: 'co-acme'
  },
  {
    id: 'grp-bu-retail',
    name: 'Retail & Store Operations',
    kind: 'business-unit',
    description: 'Frontline store employees',
    memberCount: 145,
    companyId: 'co-acme'
  },
  // Locations
  {
    id: 'grp-loc-mumbai',
    name: 'Mumbai HQ',
    kind: 'location',
    description: 'Headquarters office',
    memberCount: 320,
    companyId: 'co-acme'
  },
  {
    id: 'grp-loc-blr',
    name: 'Bangalore Tech Center',
    kind: 'location',
    description: 'Karnataka R&D office',
    memberCount: 142,
    companyId: 'co-acme'
  }
];

export const employeesForCompany = (companyId: string) =>
  DIRECTORY_EMPLOYEES.filter(e => e.companyId === companyId || companyId === 'co-acme');

export const groupsForCompany = (companyId: string) =>
  DIRECTORY_GROUPS.filter(g => g.companyId === companyId || companyId === 'co-acme');

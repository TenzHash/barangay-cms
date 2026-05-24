export interface BarangayInfo {
  name: string;
  municipality: string;
  province: string;
  contactNumber: string;
  email: string;
  vision: string;
  mission: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  datePublished: string;
  status: 'Published' | 'Draft' | 'Archived';
  priority: 'High' | 'Normal' | 'Low';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
}

export interface Official {
  id: string;
  name: string;
  position: string;
  termStart: string;
  termEnd: string;
  status: 'Active' | 'Inactive';
}

export interface BarangayService {
  id: string;
  name: string;
  description: string;
  requirements: string[];
  processingTime: string;
  fees: string;
}

// Append this to your existing types/index.ts file
export type UserRole = 'Admin' | 'Secretary' | 'SK_Chair';

export interface UserSessionProfile {
  id: string;
  email: string;
  role: UserRole;
}
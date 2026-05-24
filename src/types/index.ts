export type UserRole = 'Admin' | 'Secretary' | 'SK_Chair';

export interface BarangayInfo {
  id?: string;
  name: string;
  municipality: string;
  province: string;
  contact_number: string;
  email: string;
  vision: string;
  mission: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: 'High' | 'Normal' | 'Low';
  status: 'Published' | 'Draft' | 'Archived';
  date_published: string;
  created_at?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  event_time: string;
  venue: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
}

export interface Official {
  id: string;
  name: string;
  position: string;
  term_start: string;
  term_end: string;
  status: 'Active' | 'Inactive';
}

export interface BarangayService {
  id: string;
  name: string;
  description: string;
  requirements: string[];
  processing_time: string;
  fees: string;
}
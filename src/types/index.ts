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

export type RequestStatus = 'Pending' | 'Approved' | 'Ready for Pickup' | 'Rejected' | 'Claimed';

export interface DocumentRequest {
  id: string;
  service_id: string;
  resident_first_name: string;
  resident_last_name: string;
  contact_number: string;
  purpose: string;
  status: RequestStatus;
  requirements_url?: string;
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
  // Optional join helper payload mapping
  barangay_services?: {
    name: string;
    fees: string;
  };
}
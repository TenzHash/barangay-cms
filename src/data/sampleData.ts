import type { BarangayInfo, Announcement, Event, Official, BarangayService } from '../types';

export const initialBarangayInfo: BarangayInfo = {
  name: "Barangay San Juan",
  municipality: "Malolos",
  province: "Bulacan",
  contactNumber: "(044) 791-2345",
  email: "info@barangaysanjuan.gov.ph",
  vision: "A progressive, peaceful, and self-reliant community of empowered citizens working towards sustainable development under transparent and integrity-driven local governance.",
  mission: "To deliver accessible public services, maintain public order, implement sustainable socio-economic frameworks, and safeguard environmental resources for all residents."
};

export const initialAnnouncements: Announcement[] = [
  {
    id: "ann-1",
    title: "Sangguniang Barangay Regular Session & Town Hall Meeting",
    content: "All residents are invited to attend our monthly open assembly this coming Saturday. Agenda items include infrastructure project allocations, local drainage cleanups, and peace and order updates.",
    datePublished: "2026-05-20",
    status: "Published",
    priority: "High"
  },
  {
    id: "ann-2",
    title: "La Niña Emergency Preparedness & Drainage De-clogging Schedule",
    content: "In preparation for continuous heavy rains, the engineering department will conduct manual de-clogging operations across Zones 1 to 4. Residents are requested to clear vehicles along primary drainage areas.",
    datePublished: "2026-05-18",
    status: "Published",
    priority: "High"
  },
  {
    id: "ann-3",
    title: "Draft Framework: Proposed Solid Waste Management Resolution",
    content: "Reviewing the updated community guidelines for non-biodegradable segregation. Public feedback counters remain open until the end of the month.",
    datePublished: "2026-05-15",
    status: "Draft",
    priority: "Normal"
  }
];

export const initialEvents: Event[] = [
  {
    id: "evt-1",
    title: "Annual Community Health & Wellness Caravan",
    description: "Free medical checkups, pediatric vitamins distribution, senior citizen cardiovascular screening, and anti-rabies vaccination drives.",
    date: "2026-06-05",
    time: "08:00 AM - 04:00 PM",
    venue: "Barangay Covered Court",
    status: "Upcoming"
  },
  {
    id: "evt-2",
    title: "Basic UI Design & Technical Literacies Workshop",
    description: "A free introductory technical bootcamp for out-of-school youth focused on building modern vector graphics layout and wireframes.",
    date: "2026-05-28",
    time: "01:00 PM - 05:00 PM",
    venue: "Sangguniang Kabataan Multipurpose Hall",
    status: "Upcoming"
  },
  {
    id: "evt-3",
    title: "Inter-Zone Clean-Up Drive & Vector Control",
    description: "Community cleanup targeting breeding grounds of mosquitoes to eliminate local risks of Dengue transmission ahead of heavy downpours.",
    date: "2026-05-23",
    time: "06:00 AM - 10:00 AM",
    venue: "All Zones (Assembly at Barangay Hall)",
    status: "Ongoing"
  }
];

export const initialOfficials: Official[] = [
  { id: "off-1", name: "Hon. Roberto C. Santos", position: "Punong Barangay (Captain)", termStart: "2023", termEnd: "2026", status: "Active" },
  { id: "off-2", name: "Hon. Maria Elena V. Cruz", position: "Barangay Kagawad (Infrastructure)", termStart: "2023", termEnd: "2026", status: "Active" },
  { id: "off-3", name: "Hon. Juanito M. Aquino", position: "Barangay Kagawad (Peace & Order)", termStart: "2023", termEnd: "2026", status: "Active" },
  { id: "off-4", name: "Hon. Divina P. Almeda", position: "Barangay Kagawad (Health & Sanitation)", termStart: "2023", termEnd: "2026", status: "Active" },
  { id: "off-5", name: "Hon. Antonio G. Reyes", position: "Barangay Kagawad (Finance & Appropriations)", termStart: "2023", termEnd: "2026", status: "Active" },
  { id: "off-6", name: "Hon. Carlos J. Mendoza", position: "SK Chairperson", termStart: "2023", termEnd: "2026", status: "Active" },
  { id: "off-7", name: "Sra. Clara B. Ramos", position: "Barangay Secretary", termStart: "2023", termEnd: "2026", status: "Active" }
];

export const initialServices: BarangayService[] = [
  {
    id: "srv-1",
    name: "Barangay Clearance",
    description: "Primary identification document proving local community residency, required for employment, business licensing, and banking setups.",
    requirements: ["Valid Government Issued ID", "Recent Community Tax Certificate (Cedula)", "Proof of Residency Cert"],
    processingTime: "5 - 10 Minutes",
    fees: "₱50.00"
  },
  {
    id: "srv-2",
    name: "Certificate of Indigency",
    description: "Issued to low-income residents requesting financial assistance, medical subsidies, or educational tuition grants.",
    requirements: ["Affidavit of Low Income", "Voter Registration Record"],
    processingTime: "10 - 15 Minutes",
    fees: "Free"
  },
  {
    id: "srv-3",
    name: "Barangay Business Permit",
    description: "Mandatory authorization documentation required prior to securing a municipal business license inside the jurisdiction.",
    requirements: ["DTI or SEC Registration Papers", "Contract of Lease or Land Title Documentation"],
    processingTime: "1 Working Day",
    fees: "₱500.00"
  },
  {
    id: "srv-4",
    name: "First-Time Job Seeker Certification",
    description: "Document issued pursuant to RA 11261, exempting first-time job seekers from document fees.",
    requirements: ["Oath of Undertaking signed by applicant", "Barangay Residency Verification Form"],
    processingTime: "10 Minutes",
    fees: "Free"
  },
  {
    id: "srv-5",
    name: "Certificate of Residency",
    description: "Official confirmation of an individual's duration of habitation within the territory.",
    requirements: ["Landlord Certification or House Title", "Any utility bill displaying address"],
    processingTime: "5 Minutes",
    fees: "₱30.00"
  }
];
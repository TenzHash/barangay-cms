import type { BarangayInfo, Announcement, Event, Official, BarangayService } from '../types';

export const sampleBarangayInfo: BarangayInfo = {
  name: "Barangay 17 - Rizal Street (Ilawod)",
  municipality: "Legazpi City",
  province: "Albay",
  contact_number: "(052) 742-1717",
  email: "bgy17.ilawod@legazpi.gov.ph",
  vision: "Isang maunlad at luntian na pamayanan sa ilalim ng tapat na pamamahala.",
  mission: "Ihatid ang mabilis at de-kalidad na serbisyo publiko para sa pamilyang Bicolano."
};

export const sampleAnnouncements: Announcement[] = [
  {
    id: "ann-1",
    title: "Mayon Volcanic Activity Precautionary Advisory",
    content: "Pinapaalalahanan ang lahat ng residente na manatiling mapagmatyag sa mga anunsyo mula sa PHILVOLCS hinggil sa aktibidad ng Bulkang Mayon.",
    priority: "High",
    status: "Published",
    date_published: "2026-05-24"
  }
];

export const sampleEvents: Event[] = [
  {
    id: "evt-1",
    title: "Libreng Konsulta at Medical Caravan",
    description: "Libreng checkup at pamamahagi ng bitamina para sa mga Senior Citizens at kabataan.",
    event_date: "2026-06-02",
    event_time: "08:00 AM",
    venue: "Barangay 17 Covered Court",
    status: "Upcoming"
  }
];

export const sampleOfficials: Official[] = [
  { id: "off-1", name: "Hon. Lina Areola Chan", position: "Punong Barangay (Captain)", term_start: "2023", term_end: "2026", status: "Active" }
];

export const sampleServices: BarangayService[] = [
  {
    id: "srv-1",
    name: "Barangay Clearance",
    description: "Pangunahing pagkakakilanlan na kinakailangan para sa trabaho.",
    requirements: ["Valid ID", "Cedula"],
    processing_time: "5 - 10 Minutes",
    fees: "₱50.00"
  }
];
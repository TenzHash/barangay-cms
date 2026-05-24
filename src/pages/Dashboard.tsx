import React from "react";
import { PageHeader } from "../components/shared/PageHeader";
import { StatCard } from "../components/shared/StatCard";
// Replace the old import on line 5 with this:
import type {
  Announcement,
  Event,
  Official,
  BarangayService,
  BarangayInfo,
} from "../types";

interface DashboardProps {
  info: BarangayInfo;
  announcements: Announcement[];
  events: Event[];
  officials: Official[];
  services: BarangayService[];
  setActiveTab: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  info,
  announcements,
  events,
  officials,
  services,
  setActiveTab,
}) => {
  const publishedCount = announcements.filter(
    (a) => a.status === "Published",
  ).length;
  const upcomingEvents = events.filter(
    (e) => e.status === "Upcoming" || e.status === "Ongoing",
  ).length;
  const activeOfficials = officials.filter((o) => o.status === "Active").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Administrative Overview Dashboard"
        description={`${info.name}, ${info.municipality}, ${info.province} — Central Control Hub`}
        action={
          <button
            onClick={() => setActiveTab("preview")}
            className="px-4 py-2 text-xs font-semibold text-white bg-gov-blue hover:bg-gov-navy rounded-lg shadow-sm"
          >
            Launch Mobile Simulation
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Announcements"
          value={publishedCount}
          description={`Out of ${announcements.length} records total`}
        />
        <StatCard
          title="Scheduled Events"
          value={upcomingEvents}
          description="Active calendar nodes"
        />
        <StatCard
          title="Enlisted Officials"
          value={activeOfficials}
          description="On active mandate duty"
        />
        <StatCard
          title="Document Services"
          value={services.length}
          description="Citizen request matrices"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gov-navy">
              Recent Feed Manifest
            </h3>
            <button
              onClick={() => setActiveTab("announcements")}
              className="text-xs font-semibold text-gov-blue hover:underline"
            >
              Manage All
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {announcements.slice(0, 3).map((ann) => (
              <div
                key={ann.id}
                className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between gap-4"
              >
                <div className="truncate">
                  <h4 className="text-xs font-semibold text-gov-darkText truncate">
                    {ann.title}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {ann.datePublished} — {ann.priority} Priority
                  </p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {ann.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gov-navy border-b pb-2">
              Core Mandate
            </h3>
            <div>
              <h4 className="text-[10px] uppercase font-bold text-slate-400">
                Vision
              </h4>
              <p className="text-xs italic text-slate-600 mt-1 line-clamp-3">
                "{info.vision}"
              </p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase font-bold text-slate-400">
                Mission
              </h4>
              <p className="text-xs italic text-slate-600 mt-1 line-clamp-3">
                "{info.mission}"
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab("settings")}
            className="w-full text-center mt-4 text-[11px] font-semibold text-gov-blue bg-slate-50 py-2 rounded-lg border hover:bg-slate-100"
          >
            Edit Configurations
          </button>
        </div>
      </div>
    </div>
  );
};

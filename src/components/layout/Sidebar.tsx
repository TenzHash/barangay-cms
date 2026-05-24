import React from "react";
import type { UserRole } from "../../types";

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  brgyName: string;
  userRole: UserRole;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  brgyName,
  userRole,
}) => {
  const allMenuItems = [
    { id: "dashboard", label: "Overview Dashboard" },
    { id: "announcements", label: "Announcements Feed" },
    { id: "events", label: "Events & Schedules" },
    {
      id: "officials",
      label: "Officials Directory",
      allowedRoles: ["Admin", "Secretary"],
    },
    {
      id: "services",
      label: "Barangay Services",
      allowedRoles: ["Admin", "Secretary"],
    },
    { id: "preview", label: "Live Site Preview" },
    { id: "settings", label: "Portal Settings", allowedRoles: ["Admin"] },
  ];

  const visibleMenuItems = allMenuItems.filter(
    (item) => !item.allowedRoles || item.allowedRoles.includes(userRole),
  );

  return (
    <aside className="w-64 bg-gov-navy text-white flex flex-col fixed inset-y-0 left-0 z-20 shadow-[4px_0_24px_-8px_rgba(0,0,0,0.15)] border-r border-slate-800/40 hidden lg:flex">
      {/* Premium Institutional Banner */}
      <div className="p-6 bg-slate-950/20 border-b border-white/5 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-white to-slate-200 text-gov-navy font-black text-sm flex items-center justify-center shadow-lg transform hover:scale-105 transition-all">
            RP
          </div>
          <div className="truncate">
            <h2 className="font-extrabold text-sm tracking-tight text-white truncate">
              {brgyName}
            </h2>
            <p className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mt-0.5">
              Management Suite
            </p>
          </div>
        </div>

        <div>
          <span className="text-[9px] font-bold tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md uppercase inline-block">
            ● {userRole} Mode
          </span>
        </div>
      </div>

      {/* Elegant Nav Links */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto pt-6">
        {visibleMenuItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-xl text-xs font-medium tracking-wide text-left transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-white/10 text-white font-semibold shadow-inner border-l-4 border-slate-300 pl-3.5"
                  : "text-slate-400 hover:bg-white/[0.03] hover:text-slate-100"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Structural Footnotes */}
      <div className="p-4 border-t border-white/5 bg-slate-950/10 text-[10px] font-mono text-slate-500 flex justify-between items-center">
        <span>v2.4.0 Live</span>
        <span className="text-slate-600">Secure LGU</span>
      </div>
    </aside>
  );
};

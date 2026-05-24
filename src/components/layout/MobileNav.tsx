import React from "react";

interface MobileNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  brgyName: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentTab,
  setCurrentTab,
  brgyName,
  isOpen,
  setIsOpen,
}) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "announcements", label: "Announcements" },
    { id: "events", label: "Events & Schedules" },
    { id: "officials", label: "Officials Directory" },
    { id: "services", label: "Barangay Services" },
    { id: "preview", label: "Mobile Site Preview" },
    { id: "settings", label: "Portal Settings" },
  ];

  return (
    <header className="bg-gov-navy text-white lg:hidden fixed top-0 inset-x-0 h-16 z-30 flex items-center justify-between px-4 shadow-md">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded bg-white text-gov-navy font-bold flex items-center justify-center text-xs">
          RP
        </div>
        <span className="font-bold text-sm tracking-tight truncate max-w-[180px]">
          {brgyName}
        </span>
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-200 hover:text-white rounded-lg focus:outline-none"
      >
        M
      </button>

      {isOpen && (
        <div className="absolute top-16 inset-x-0 bg-gov-navy border-b border-gov-blue/40 shadow-xl flex flex-col p-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentTab(item.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg text-xs font-medium tracking-wide transition-colors ${
                currentTab === item.id
                  ? "bg-white/10 text-white font-semibold"
                  : "text-slate-300 hover:bg-white/5"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

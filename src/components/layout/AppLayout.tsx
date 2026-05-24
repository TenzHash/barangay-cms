import React from "react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import type { UserRole } from "../../types";

interface AppLayoutProps {
  children: React.ReactNode;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  brgyName: string;
  userRole: UserRole; // Make sure this is registered!
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  currentTab,
  setCurrentTab,
  brgyName,
  userRole,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Critical: Pass the role down to the Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        brgyName={brgyName}
        userRole={userRole}
      />

      <MobileNav
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        brgyName={brgyName}
        isOpen={mobileMenuOpen}
        setIsOpen={setMobileMenuOpen}
      />

      <main className="flex-1 lg:pl-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
};

import { useState, useEffect } from "react";
import { Dashboard } from "./pages/Dashboard";
import { Announcements } from "./pages/Announcements";
import { Events } from "./pages/Events";
import { Officials } from "./pages/Officials";
import { Services } from "./pages/Services";
import { MobilePreview } from "./pages/MobilePreview";
import { Settings } from "./pages/Settings";
import { Login } from "./pages/Login";
import { supabase } from "./lib/supabaseClient";

import type {
  BarangayInfo,
  Announcement,
  Event as BarangayEvent,
  Official,
  BarangayService,
  UserRole,
} from "./types";

// Explicit custom interface for the experimental PWA installation banner tracking to keep ESLint green
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

// Strict mapping for allowed menu navigation keys
type TabId =
  | "dashboard"
  | "announcements"
  | "events"
  | "officials"
  | "services"
  | "preview"
  | "settings";

interface MenuItem {
  id: TabId;
  label: string;
  allowedRoles?: UserRole[];
}

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [userRole, setUserRole] = useState<UserRole>("SK_Chair");
  const [currentTab, setCurrentTab] = useState<TabId>("dashboard");
  const [loading, setLoading] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // PWA Native Installation Engine States
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBtn, setShowInstallBtn] = useState<boolean>(false);

  const [barangayInfo, setBarangayInfo] = useState<BarangayInfo | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<BarangayEvent[]>([]);
  const [officials, setOfficials] = useState<Official[]>([]);
  const [services, setServices] = useState<BarangayService[]>([]);

  async function fetchCmsData() {
    try {
      const [infoRes, annRes, evtRes, offRes, srvRes] = await Promise.all([
        supabase.from("barangay_info").select("*").maybeSingle(),
        supabase
          .from("announcements")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("events")
          .select("*")
          .order("event_date", { ascending: true }),
        supabase
          .from("officials")
          .select("*")
          .order("created_at", { ascending: true }),
        supabase
          .from("barangay_services")
          .select("*")
          .order("name", { ascending: true }),
      ]);

      if (infoRes.data) setBarangayInfo(infoRes.data);
      if (annRes.data) setAnnouncements(annRes.data);
      if (evtRes.data) setEvents(evtRes.data);
      if (offRes.data) setOfficials(offRes.data);
      if (srvRes.data) setServices(srvRes.data);
    } catch (err) {
      console.error("CMS load data failure:", err);
    }
  }

  const extractUserRoleToken = (sessionObject: any) => {
    const rawRole =
      sessionObject?.user?.user_metadata?.role ||
      sessionObject?.user?.app_metadata?.role;
    if (rawRole) {
      const cleanRole = rawRole.trim();
      if (["Admin", "Secretary", "SK_Chair"].includes(cleanRole)) {
        setUserRole(cleanRole as UserRole);
        return;
      }
    }
    setUserRole("SK_Chair");
  };

  useEffect(() => {
    // 1. Supabase Session Tracker Hooks
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        extractUserRoleToken(session);
        fetchCmsData().then(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        extractUserRoleToken(session);
        fetchCmsData();
      }
    });

    // 2. Capture Browser Installation Token Prompts
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallBtn(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    window.addEventListener("appinstalled", () => {
      setDeferredPrompt(null);
      setShowInstallBtn(false);
      console.log(
        "CMS App module compiled and installed successfully onto system environment.",
      );
    });

    return () => {
      subscription.unsubscribe();
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstallAppClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setShowInstallBtn(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-[10px] font-bold font-mono text-slate-500 tracking-widest uppercase">
        Initializing Installed Environment Node...
      </div>
    );
  }

  if (!session) {
    return <Login onSessionSuccess={() => fetchCmsData()} />;
  }

  const activeInfo: BarangayInfo = barangayInfo || {
    name: "Barangay 17 Portal",
    municipality: "LGU",
    province: "Region",
    contact_number: "Not Set",
    email: "admin@lgu.gov.ph",
    vision: "Define via Settings",
    mission: "Define via Settings",
  };

  const menuItems: MenuItem[] = [
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
  ].filter(
    (item) => !item.allowedRoles || item.allowedRoles.includes(userRole),
  ) as MenuItem[]; // <-- ADD "as MenuItem[]" HERE

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col relative select-none antialiased">
      {/* SECURED APPLICATION STATUS BAR HEADER */}
      <header className="bg-slate-900 text-white px-4 h-16 sticky top-0 z-40 flex items-center justify-between border-b border-white/5 shadow-md shrink-0 w-full">
        <div className="flex items-center gap-2.5 truncate">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-xl border border-white/5 text-white active:scale-90 transition-all cursor-pointer outline-none font-bold z-50"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
          <div className="truncate">
            <h1 className="text-xs font-black tracking-tight truncate w-36">
              {activeInfo.name}
            </h1>
            <span className="text-[8px] font-bold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 px-1.5 rounded border border-emerald-500/20 block w-max mt-0.5">
              ● {userRole} Port
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Native App Installation Trigger Badge Toggle */}
          {showInstallBtn && (
            <button
              onClick={handleInstallAppClick}
              className="text-[9px] font-black uppercase tracking-wider bg-emerald-500 text-white px-3 py-2 rounded-xl active:scale-95 transition-all cursor-pointer shadow-md border-none outline-none"
            >
              Install CMS
            </button>
          )}
          <button
            onClick={async () => {
              if (confirm("Sign out of management terminal session?"))
                await supabase.auth.signOut();
            }}
            className="text-[9px] font-bold uppercase tracking-wider bg-white/10 text-slate-300 border border-white/5 px-3 py-2 rounded-xl active:scale-95 transition-all cursor-pointer outline-none"
          >
            Exit
          </button>
        </div>
      </header>

      {/* DROPDOWN SYSTEM DRAWER PANEL INTERACTION ROW (Forced over absolute page maximums via z-[9998] and z-[9999]) */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 bg-slate-950/60 backdrop-blur-xs z-[9998] transition-all"
          onClick={() => setMobileMenuOpen(false)}
        >
          <nav
            className="bg-slate-900 text-white w-64 h-full p-4 space-y-1 shadow-2xl border-r border-white/5 flex flex-col justify-between pb-8 z-[9999]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-1">
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest block px-3 mb-2">
                Workspace Navigation
              </span>
              {menuItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 rounded-xl text-xs font-bold text-left transition-all cursor-pointer border-none outline-none ${
                      isActive
                        ? "bg-white/10 text-white border-l-4 border-slate-200 pl-3 shadow-inner"
                        : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            <div className="text-[9px] font-mono text-slate-600 px-3 flex justify-between">
              <span>Node v2.4-PWA</span>
              <span>Standalone</span>
            </div>
          </nav>
        </div>
      )}

      {/* COMPONENT DESK GRID SURFACE */}
      <main className="flex-1 p-4 space-y-5 min-h-0 z-10 w-full">
        {(() => {
          switch (currentTab) {
            case "dashboard":
              return (
                <Dashboard
                  info={activeInfo}
                  announcements={announcements}
                  events={events}
                  officials={officials}
                  services={services}
                  setActiveTab={setCurrentTab}
                />
              );
            case "announcements":
              return (
                <Announcements items={announcements} onRefresh={fetchCmsData} />
              );
            case "events":
              return <Events items={events} onRefresh={fetchCmsData} />;
            case "officials":
              return <Officials items={officials} onRefresh={fetchCmsData} />;
            case "services":
              return <Services items={services} onRefresh={fetchCmsData} />;
            case "preview":
              return (
                <MobilePreview
                  info={activeInfo}
                  announcements={announcements}
                  events={events}
                  officials={officials}
                  services={services}
                />
              );
            case "settings":
              if (userRole !== "Admin")
                return (
                  <div className="text-xs p-4 bg-rose-50 text-rose-700 font-semibold rounded-xl border">
                    Restricted.
                  </div>
                );
              return <Settings info={activeInfo} onRefresh={fetchCmsData} />;
            default:
              return (
                <div className="text-xs text-slate-400 font-mono">
                  Section resolution failure.
                </div>
              );
          }
        })()}
      </main>
    </div>
  );
}

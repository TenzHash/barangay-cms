import React, { useState } from "react";
import { PageHeader } from "../components/shared/PageHeader";
import { DeviceFrame } from "../components/preview/DeviceFrame";
import type {
  BarangayInfo,
  Announcement,
  Event,
  Official,
  BarangayService,
} from "../types";

interface MobilePreviewProps {
  info: BarangayInfo;
  announcements: Announcement[];
  events: Event[];
  officials: Official[];
  services: BarangayService[];
}

export const MobilePreview: React.FC<MobilePreviewProps> = ({
  info,
  announcements,
  events,
  officials,
  services,
}) => {
  const [screen, setScreen] = useState<
    "news" | "events" | "services" | "about"
  >("news");

  // Defensive filtering: Checks both snake_case and camelCase column states smoothly
  const pubAnns = announcements.filter((a) => {
    const status = (a as any).status;
    return status === "Published" || !status; // Auto-displays if state is unassigned
  });

  const upEvts = events.filter((e) => {
    const status = (e as any).status;
    return status === "Upcoming" || status === "Ongoing" || !status;
  });

  const activeOfficials = officials.filter((o) => {
    const status = (o as any).status;
    return status === "Active" || !status;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Citizen Portal View Emulator"
        description="Live sandbox mapping system changes directly onto responsive client layouts."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Left Side Controller Box */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <h4 className="font-bold uppercase text-gov-navy text-[10px] tracking-wider">
            Viewport Engine Hub
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Toggle screen layers to check public layouts dynamically.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {(["news", "events", "services", "about"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setScreen(s)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                  screen === s
                    ? "bg-gov-blue text-white border-gov-navy font-bold"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200"
                }`}
              >
                {s === "news"
                  ? "Balita Feed"
                  : s === "events"
                    ? "Schedules"
                    : s === "services"
                      ? "Serbisyo"
                      : "Tungkol sa Amin"}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side Simulated Device Holder */}
        <div className="md:col-span-2 flex justify-center pt-4 md:pt-0">
          <DeviceFrame>
            {/* Header Area */}
            <header className="bg-gov-navy text-white pt-7 pb-3 px-4 text-center border-b shrink-0 border-gov-blue/20">
              <h2 className="text-xs font-bold truncate">
                {info?.name || "Barangay San Juan"}
              </h2>
              <p className="text-[8px] uppercase tracking-wider text-gov-accent font-semibold mt-0.5">
                Citizen Digital Link
              </p>
            </header>

            {/* Inner Content Area */}
            <div className="flex-1 overflow-y-auto bg-slate-50 p-3.5 space-y-3 pb-16 text-[11px]">
              {/* TAB 1: ANNOUNCEMENTS SCREEN */}
              {screen === "news" && (
                <div className="space-y-2">
                  <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                    Mga Balita at Anunsyo
                  </div>
                  {pubAnns.length === 0 ? (
                    /* Fallback Mock Elements display instantly if Supabase has zero items */
                    <div className="space-y-2">
                      <div className="bg-white rounded-lg p-3 border shadow-sm space-y-1">
                        <h4 className="font-bold text-gov-darkText leading-tight">
                          Sample Notice: Town Hall Assembly
                        </h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed">
                          This layout is a preview template. Add real notices
                          inside the CMS panel to populate this screen over the
                          network stream.
                        </p>
                      </div>
                    </div>
                  ) : (
                    pubAnns.map((a) => (
                      <div
                        key={a.id}
                        className="bg-white rounded-lg p-3 border shadow-sm space-y-1"
                      >
                        <h4 className="font-bold text-gov-darkText leading-tight">
                          {a.title}
                        </h4>
                        <p className="text-[10px] text-slate-600 leading-relaxed">
                          {a.content}
                        </p>
                        <div className="text-[8px] font-mono text-slate-400 pt-1 border-t border-slate-100">
                          {a.date_published || (a as any).datePublished}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 2: EVENTS SCREEN */}
              {screen === "events" && (
                <div className="space-y-2">
                  <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                    Iskedyul ng Barangay
                  </div>
                  {upEvts.length === 0 ? (
                    <div className="bg-white rounded-lg p-3 border border-l-4 border-l-gov-blue shadow-sm space-y-1">
                      <h4 className="font-bold text-gov-darkText">
                        Sample Calendar Item
                      </h4>
                      <p className="text-[10px] text-slate-500">
                        Scheduled events will populate here securely.
                      </p>
                    </div>
                  ) : (
                    upEvts.map((e) => (
                      <div
                        key={e.id}
                        className="bg-white rounded-lg p-3 border border-l-4 border-l-gov-blue shadow-sm space-y-1"
                      >
                        <h4 className="font-bold text-gov-darkText leading-tight">
                          {e.title}
                        </h4>
                        {e.description && (
                          <p className="text-[10px] text-slate-500 line-clamp-2">
                            {e.description}
                          </p>
                        )}
                        <div className="text-[8px] text-gov-blue font-mono pt-1">
                          Saan: {e.venue}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 3: SERVICES CATALOG SCREEN */}
              {screen === "services" && (
                <div className="space-y-2">
                  <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                    Gabay sa mga Serbisyo
                  </div>
                  {services.length === 0 ? (
                    <div className="bg-white rounded-lg p-3 border shadow-sm text-center py-6 text-slate-400 text-[10px]">
                      Walang active services structure setup sa backend table.
                    </div>
                  ) : (
                    services.map((s) => (
                      <div
                        key={s.id}
                        className="bg-white rounded-lg p-3 border shadow-sm space-y-1"
                      >
                        <h4 className="font-bold text-gov-darkText leading-tight">
                          {s.name}
                        </h4>
                        {s.description && (
                          <p className="text-[10px] text-slate-500 line-clamp-1">
                            {s.description}
                          </p>
                        )}
                        <div className="text-[8px] font-semibold text-gov-blue pt-1">
                          Bayad: {s.fees} | Tagal:{" "}
                          {s.processing_time || (s as any).processingTime}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 4: SYSTEM VISION / CONCEIL ABOUT SCREEN */}
              {screen === "about" && (
                <div className="space-y-3">
                  <div>
                    <span className="text-[9px] font-bold uppercase text-slate-400 block border-b mb-1">
                      Pananaw (Vision)
                    </span>
                    <p className="italic text-slate-600 bg-white p-2.5 rounded-lg border shadow-sm leading-relaxed">
                      "
                      {info?.vision ||
                        "A progressive and unified digital community built around modern service protocols."}
                      "
                    </p>
                  </div>

                  <div>
                    <span className="text-[9px] font-bold uppercase text-slate-400 block border-b mb-1">
                      Opisyal na Konseho
                    </span>
                    <div className="bg-white rounded-lg border divide-y overflow-hidden shadow-sm">
                      {activeOfficials.length === 0 ? (
                        <div className="p-2 text-center text-slate-400 text-[9px]">
                          No administrative list configured.
                        </div>
                      ) : (
                        activeOfficials.map((o) => (
                          <div
                            key={o.id}
                            className="p-2 flex justify-between items-center text-[10px]"
                          >
                            <span className="font-bold text-gov-darkText">
                              {o.name}
                            </span>
                            <span className="text-slate-400 text-[9px] font-medium">
                              {o.position}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="text-center pt-2 text-[9px] text-slate-400 border-t space-y-0.5">
                    <div>
                      Hotline:{" "}
                      <span className="font-mono text-slate-600 font-bold">
                        {info?.contact_number ||
                          info?.contact_number ||
                          "(044) 123-4567"}
                      </span>
                    </div>
                    <div className="truncate font-light">
                      {info?.email || "help@barangay.gov.ph"}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Nav Tab Bar */}
            <nav className="absolute bottom-2 inset-x-2 bg-white border border-slate-200 rounded-xl shadow-lg h-11 flex items-center justify-around px-1 text-[9px] uppercase tracking-wider font-semibold z-40">
              {(["news", "events", "services", "about"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setScreen(s)}
                  className={`flex-1 h-full py-2 text-center transition-all cursor-pointer ${
                    screen === s
                      ? "text-gov-blue font-bold scale-105"
                      : "text-slate-400 font-medium hover:text-slate-600"
                  }`}
                >
                  {s}
                </button>
              ))}
            </nav>
          </DeviceFrame>
        </div>
      </div>
    </div>
  );
};

import React from "react";

interface DeviceFrameProps {
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  return (
    /* CRITICAL: Explicitly specify max-w, h-[640px], and shrink-0 to prevent vertical distortion */
    <div className="relative mx-auto w-[320px] h-[640px] bg-slate-900 rounded-[40px] p-3 shadow-2xl border-[4px] border-slate-800 flex flex-col overflow-hidden shrink-0">
      {/* Ear Speaker Notch */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 h-3.5 w-24 bg-slate-900 rounded-full z-50 flex items-center justify-center">
        <div className="w-8 h-1 bg-slate-700 rounded-full"></div>
      </div>

      {/* Simulated Screen Body Viewport */}
      <div className="w-full h-full bg-white rounded-[28px] overflow-hidden flex flex-col border border-slate-950/20 relative">
        {children}
      </div>

      {/* Screen Bottom bar */}
      <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-slate-700 rounded-full z-50"></div>
    </div>
  );
};

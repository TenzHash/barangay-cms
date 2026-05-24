import React, { useState } from "react";
import { PageHeader } from "../components/shared/PageHeader";
import { supabase } from "../lib/supabaseClient";
import type { BarangayInfo } from "../types";

interface SettingsProps {
  info: BarangayInfo;
  onRefresh: () => Promise<void>;
}

export const Settings: React.FC<SettingsProps> = ({ info, onRefresh }) => {
  const [name, setName] = useState(info.name);
  const [municipality, setMunicipality] = useState(info.municipality);
  const [province, setProvince] = useState(info.province);
  const [contactNumber, setContactNumber] = useState(
    info.contact_number || info.contactNumber || "",
  );
  const [email, setEmail] = useState(info.email);
  const [vision, setVision] = useState(info.vision);
  const [mission, setMission] = useState(info.mission);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const settingsPayload = {
      name,
      municipality,
      province,
      contact_number: contactNumber,
      email,
      vision,
      mission,
    };

    if (info.id) {
      // Row exists -> Update record values
      await supabase
        .from("barangay_info")
        .update(settingsPayload)
        .eq("id", info.id);
    } else {
      // Base table configuration is empty -> Insert original record boundary
      await supabase.from("barangay_info").insert([settingsPayload]);
    }

    await onRefresh();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="LGU Identity Settings"
        description="Configure localized geographic parameters, official hotlines, and long-term organizational declarations."
      />
      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-xl p-6 shadow-sm space-y-6 text-xs"
      >
        {saved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg font-medium">
            Local workspace parameters updated successfully. Network tables
            synchronized.
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gov-navy border-b pb-2">
            Geographical Hierarchy Nodes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                Barangay Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:border-gov-blue font-semibold"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                Municipality
              </label>
              <input
                type="text"
                value={municipality}
                onChange={(e) => setMunicipality(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:border-gov-blue"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                Territory Province
              </label>
              <input
                type="text"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:border-gov-blue"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gov-navy border-b pb-2">
            Public Channels Ingress
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                Emergency Hotline Number
              </label>
              <input
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:border-gov-blue font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                Institutional Contact Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:border-gov-blue"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gov-navy border-b pb-2">
            System Declarations
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                Vision Charter
              </label>
              <textarea
                rows={2}
                value={vision}
                onChange={(e) => setVision(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:border-gov-blue resize-none leading-relaxed"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                Mission Strategy Blueprint
              </label>
              <textarea
                rows={2}
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:border-gov-blue resize-none leading-relaxed"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t">
          <button
            type="submit"
            className="px-5 py-2.5 font-semibold text-white bg-gov-blue hover:bg-gov-navy rounded-lg shadow-sm"
          >
            Commit System Variables
          </button>
        </div>
      </form>
    </div>
  );
};

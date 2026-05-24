import { useState } from "react";
import { PageHeader } from "../components/shared/PageHeader";
import { supabase } from "../lib/supabaseClient";
import type { BarangayInfo } from "../types";

interface SettingsProps {
  info: BarangayInfo;
  onRefresh: () => Promise<void>;
}

export const Settings: React.FC<SettingsProps> = ({ info, onRefresh }) => {
  const [name, setName] = useState(info?.name || "");
  const [municipality, setMunicipality] = useState(info?.municipality || "");
  const [province, setProvince] = useState(info?.province || "");
  const [contact_number, setContactNumber] = useState(
    info?.contact_number || "",
  );
  const [email, setEmail] = useState(info?.email || "");
  const [vision, setVision] = useState(info?.vision || "");
  const [mission, setMission] = useState(info?.mission || "");
  const [saving, setSaving] = useState(false);

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const payload = {
        name,
        municipality,
        province,
        contact_number,
        email,
        vision,
        mission,
      };

      if (info?.id) {
        const { error } = await supabase
          .from("barangay_info")
          .update(payload)
          .eq("id", info.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("barangay_info")
          .insert([payload]);
        if (error) throw error;
      }

      await onRefresh();
      alert("System primary parameters initialized successfully.");
    } catch (err: any) {
      alert(`Configuration update blocked: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl text-xs font-semibold text-slate-500">
      <PageHeader
        title="Portal Settings"
        description="Configure core structural properties, geographical naming, hotlines, and mandates."
      />

      <form
        onSubmit={handleUpdateSettings}
        className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-5 shadow-sm"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block mb-1.5 uppercase text-[10px] font-black tracking-wide">
              Barangay Name Assignment
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border rounded-xl text-gov-darkText focus:outline-none focus:bg-white"
              required
            />
          </div>
          <div>
            <label className="block mb-1.5 uppercase text-[10px] font-black tracking-wide">
              Hotline Terminal
            </label>
            <input
              type="text"
              value={contact_number}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border rounded-xl text-gov-darkText focus:outline-none focus:bg-white font-mono"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1.5 uppercase text-[10px] font-black tracking-wide">
              City / Municipality
            </label>
            <input
              type="text"
              value={municipality}
              onChange={(e) => setMunicipality(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border rounded-xl text-gov-darkText focus:outline-none focus:bg-white"
              required
            />
          </div>
          <div>
            <label className="block mb-1.5 uppercase text-[10px] font-black tracking-wide">
              Province State
            </label>
            <input
              type="text"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border rounded-xl text-gov-darkText focus:outline-none focus:bg-white"
              required
            />
          </div>
          <div>
            <label className="block mb-1.5 uppercase text-[10px] font-black tracking-wide">
              Official Contact Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border rounded-xl text-gov-darkText focus:outline-none focus:bg-white"
              required
            />
          </div>
        </div>

        <div className="space-y-4 pt-2 border-t">
          <div>
            <label className="block mb-1.5 uppercase text-[10px] font-black tracking-wide">
              Community Vision Framework Statement
            </label>
            <textarea
              rows={3}
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border rounded-xl text-gov-darkText focus:outline-none focus:bg-white resize-none italic font-light"
              required
            />
          </div>
          <div>
            <label className="block mb-1.5 uppercase text-[10px] font-black tracking-wide">
              Community Mission Statement
            </label>
            <textarea
              rows={3}
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border rounded-xl text-gov-darkText focus:outline-none focus:bg-white resize-none italic font-light"
              required
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-3 text-xs font-bold text-white bg-gov-blue hover:bg-gov-navy rounded-xl shadow-md cursor-pointer disabled:bg-slate-300"
          >
            {saving ? "Syncing Tables..." : "Save Configuration Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

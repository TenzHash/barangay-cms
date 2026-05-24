import React, { useState } from "react";
import type { Official } from "../../types";

interface OfficialFormProps {
  official?: Official;
  onSave: (data: Omit<Official, "id">) => void;
  onCancel: () => void;
}

export const OfficialForm: React.FC<OfficialFormProps> = ({
  official,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState(official?.name || "");
  const [position, setPosition] = useState(official?.position || "");
  const [termStart, setTermStart] = useState(official?.termStart || "2023");
  const [termEnd, setTermEnd] = useState(official?.termEnd || "2026");
  const [status, setStatus] = useState<Official["status"]>(
    official?.status || "Active",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !position.trim()) return;
    onSave({ name, position, termStart, termEnd, status });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5"
    >
      <h3 className="text-sm font-bold uppercase tracking-wider text-gov-navy border-b pb-3">
        {official
          ? "Modify Official Records Node"
          : "Enlist Appointed Civil Leader"}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">
            Legal Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full text-xs px-3.5 py-2.5 border rounded-lg focus:outline-none focus:border-gov-blue"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">
            Portfolio Assignment
          </label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="e.g., Barangay Kagawad"
            className="w-full text-xs px-3.5 py-2.5 border rounded-lg focus:outline-none focus:border-gov-blue"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">
            Term Start Year
          </label>
          <input
            type="text"
            value={termStart}
            onChange={(e) => setTermStart(e.target.value)}
            className="w-full text-xs px-3.5 py-2.5 border rounded-lg focus:outline-none focus:border-gov-blue"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">
            Term End Year
          </label>
          <input
            type="text"
            value={termEnd}
            onChange={(e) => setTermEnd(e.target.value)}
            className="w-full text-xs px-3.5 py-2.5 border rounded-lg focus:outline-none focus:border-gov-blue"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">
            Duty Framework
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Official["status"])}
            className="w-full text-xs px-3.5 py-2.5 border bg-white rounded-lg focus:outline-none focus:border-gov-blue"
          >
            <option value="Active">Active Duty</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-3 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-xs font-medium text-slate-500 hover:bg-slate-50 rounded-lg border"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-xs font-medium text-white bg-gov-blue hover:bg-gov-navy rounded-lg shadow-sm"
        >
          Save Official
        </button>
      </div>
    </form>
  );
};

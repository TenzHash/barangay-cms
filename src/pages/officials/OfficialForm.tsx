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
  const [term_start, setTermStart] = useState(official?.term_start || "2023");
  const [term_end, setTermEnd] = useState(official?.term_end || "2026");
  const [status, setStatus] = useState<Official["status"]>(
    official?.status || "Active",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !position.trim()) return;
    onSave({ name, position, term_start, term_end, status });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border p-6 space-y-4 max-w-xl text-xs font-semibold text-slate-500"
    >
      <h3 className="text-sm font-bold text-gov-darkText">
        Configure Council Registry Node
      </h3>

      <div>
        <label className="block mb-1">Official Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none text-gov-darkText"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Position Assignment</label>
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none text-gov-darkText"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Term Start Year</label>
          <input
            type="text"
            value={term_start}
            onChange={(e) => setTermStart(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none text-gov-darkText"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Term End Year</label>
          <input
            type="text"
            value={term_end}
            onChange={(e) => setTermEnd(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none text-gov-darkText"
            required
          />
        </div>
      </div>

      <div>
        <label className="block mb-1">Status State</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none text-gov-darkText"
        >
          <option value="Active">Active Duty</option>
          <option value="Inactive">Inactive/Term Lapsed</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded-xl text-slate-500 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-gov-blue text-white rounded-xl font-bold cursor-pointer"
        >
          Save Official
        </button>
      </div>
    </form>
  );
};

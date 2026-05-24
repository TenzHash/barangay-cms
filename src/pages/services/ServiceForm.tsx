import React, { useState } from "react";
import type { BarangayService } from "../../types";

interface ServiceFormProps {
  service?: BarangayService;
  onSave: (data: Omit<BarangayService, "id">) => void;
  onCancel: () => void;
}

export const ServiceForm: React.FC<ServiceFormProps> = ({
  service,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState(service?.name || "");
  const [description, setDescription] = useState(service?.description || "");
  const [fees, setFees] = useState(service?.fees || "Free");
  const [processing_time, setProcessingTime] = useState(
    service?.processing_time || "",
  );
  const [requirementsInput, setRequirementsInput] = useState(
    service?.requirements?.join(", ") || "",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const requirements = requirementsInput
      .split(",")
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    onSave({ name, description, requirements, processing_time, fees });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border p-6 space-y-4 max-w-xl text-xs font-semibold text-slate-500"
    >
      <h3 className="text-sm font-bold text-gov-darkText">
        Configure Clearance Service Protocol
      </h3>

      <div>
        <label className="block mb-1">Service Document Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none text-gov-darkText"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Description Guide</label>
        <textarea
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none text-gov-darkText resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Processing Duration Metric</label>
          <input
            type="text"
            value={processing_time}
            onChange={(e) => setProcessingTime(e.target.value)}
            placeholder="e.g., 10 Minutes"
            className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none text-gov-darkText"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Standard Fees (₱)</label>
          <input
            type="text"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none text-gov-darkText"
            required
          />
        </div>
      </div>

      <div>
        <label className="block mb-1">
          Prerequisite Requirements (Comma Separated)
        </label>
        <input
          type="text"
          value={requirementsInput}
          onChange={(e) => setRequirementsInput(e.target.value)}
          placeholder="e.g., Cedula, Valid ID, Proof of Residency"
          className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none text-gov-darkText"
        />
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
          Save Service
        </button>
      </div>
    </form>
  );
};

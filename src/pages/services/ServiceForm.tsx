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
  const [reqs, setReqs] = useState(service?.requirements.join("\n") || "");
  const [processingTime, setProcessingTime] = useState(
    service?.processingTime || "",
  );
  const [fees, setFees] = useState(service?.fees || "Free");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !processingTime.trim()) return;
    const requirements = reqs
      .split("\n")
      .map((r) => r.trim())
      .filter((r) => r.length > 0);
    onSave({ name, description, requirements, processingTime, fees });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5"
    >
      <h3 className="text-sm font-bold uppercase tracking-wider text-gov-navy border-b pb-3">
        {service
          ? "Configure Document Parameters"
          : "Deploy Civil Service Template"}
      </h3>
      <div>
        <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">
          Service/Document Title
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
          Operational Scope Context
        </label>
        <textarea
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full text-xs px-3.5 py-2.5 border rounded-lg focus:outline-none focus:border-gov-blue resize-none"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">
          Prerequisite Documents (One line per item)
        </label>
        <textarea
          rows={4}
          value={reqs}
          onChange={(e) => setReqs(e.target.value)}
          placeholder="e.g., Valid Government Issued ID"
          className="w-full text-xs font-mono px-3.5 py-2.5 border rounded-lg focus:outline-none focus:border-gov-blue leading-relaxed"
          required
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">
            Pipeline Processing Duration
          </label>
          <input
            type="text"
            value={processingTime}
            onChange={(e) => setProcessingTime(e.target.value)}
            placeholder="5 - 10 Minutes"
            className="w-full text-xs px-3.5 py-2.5 border rounded-lg focus:outline-none focus:border-gov-blue"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">
            Assessed Statutory Fees
          </label>
          <input
            type="text"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
            className="w-full text-xs px-3.5 py-2.5 border rounded-lg focus:outline-none focus:border-gov-blue"
            required
          />
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
          Deploy Service Node
        </button>
      </div>
    </form>
  );
};

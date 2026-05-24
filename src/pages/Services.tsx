import { useState } from "react";
import { PageHeader } from "../components/shared/PageHeader";
import { EmptyState } from "../components/shared/EmptyState";
import { ServiceForm } from "./services/ServiceForm";
import { supabase } from "../lib/supabaseClient";
import type { BarangayService } from "../types";

interface ServicesProps {
  items: BarangayService[];
  onRefresh: () => Promise<void>;
}

export const Services: React.FC<ServicesProps> = ({ items, onRefresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const selectedItem = items.find((i) => i.id === currentId);

  const handleSave = async (formData: any) => {
    try {
      if (currentId) {
        const { error } = await supabase
          .from("barangay_services")
          .update(formData)
          .eq("id", currentId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("barangay_services")
          .insert([formData]);
        if (error) throw error;
      }
      await onRefresh();
      closeForm();
    } catch (err: any) {
      alert(`Database Error: ${err.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      confirm(
        "Delete this document service profile from the live registry window?",
      )
    ) {
      await supabase.from("barangay_services").delete().eq("id", id);
      await onRefresh();
    }
  };

  const closeForm = () => {
    setIsEditing(false);
    setCurrentId(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {!isEditing ? (
        <>
          <PageHeader
            title="Barangay Services"
            description="Configure documentation options, statutory issuance fees, and processing speeds."
            action={
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2.5 text-xs font-semibold text-white bg-gov-blue hover:bg-gov-navy rounded-xl shadow-sm cursor-pointer transition-all"
              >
                Add Service Config
              </button>
            }
          />

          {items.length === 0 ? (
            <EmptyState
              title="No Issuances Mapped"
              description="Setup standard documentation nodes (Clearance, Permits) to guide citizen clients."
              actionLabel="Add Service Node"
              onAction={() => setIsEditing(true)}
            />
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.03)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-200/80 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <th className="px-6 py-4">
                        Document / Permit Classification
                      </th>
                      <th className="px-6 py-4">Required Prerequisites</th>
                      <th className="px-6 py-4">Processing Metric & Fees</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {items.map((srv) => (
                      <tr
                        key={srv.id}
                        className="hover:bg-slate-50/40 transition-colors duration-150"
                      >
                        <td className="px-6 py-4.5 max-w-xs">
                          <div className="font-bold text-gov-darkText text-xs">
                            {srv.name}
                          </div>
                          <div className="text-[11px] text-slate-400 font-normal mt-0.5 truncate">
                            {srv.description || "No breakdown set."}
                          </div>
                        </td>
                        <td className="px-6 py-4.5 max-w-xs">
                          <div className="flex flex-wrap gap-1 text-[10px] max-w-xs">
                            {srv.requirements?.map((req, index) => (
                              <span
                                key={index}
                                className="bg-slate-50 border px-2 py-0.5 rounded-md font-medium text-slate-600 truncate"
                              >
                                {req}
                              </span>
                            )) || (
                              <span className="text-slate-400">
                                No prerequisites.
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4.5 whitespace-nowrap">
                          <div className="font-bold text-gov-blue">
                            {srv.fees}
                          </div>
                          <div className="text-[10px] font-mono font-bold text-slate-400 mt-0.5 uppercase tracking-wider">
                            {srv.processing_time}
                          </div>
                        </td>
                        <td className="px-6 py-4.5 text-right font-semibold space-x-4 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setCurrentId(srv.id);
                              setIsEditing(true);
                            }}
                            className="text-gov-blue hover:text-gov-navy transition-colors cursor-pointer hover:underline"
                          >
                            Configure
                          </button>
                          <button
                            onClick={() => handleDelete(srv.id)}
                            className="text-rose-600 hover:text-rose-800 transition-colors cursor-pointer hover:underline"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      ) : (
        <ServiceForm
          service={
            selectedItem
              ? {
                  id: selectedItem.id,
                  name: selectedItem.name,
                  description: selectedItem.description,
                  requirements: selectedItem.requirements,
                  processing_time: selectedItem.processing_time,
                  fees: selectedItem.fees,
                }
              : undefined
          }
          onSave={handleSave}
          onCancel={closeForm}
        />
      )}
    </div>
  );
};

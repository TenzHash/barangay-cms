import { useState } from "react";
import { PageHeader } from "../components/shared/PageHeader";
import { EmptyState } from "../components/shared/EmptyState";
import { OfficialForm } from "./officials/OfficialForm";
import { supabase } from "../lib/supabaseClient";
import type { Official } from "../types";

interface OfficialsProps {
  items: Official[];
  onRefresh: () => Promise<void>;
}

export const Officials: React.FC<OfficialsProps> = ({ items, onRefresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const selectedItem = items.find((i) => i.id === currentId);

  const handleSave = async (formData: any) => {
    try {
      if (currentId) {
        const { error } = await supabase
          .from("officials")
          .update(formData)
          .eq("id", currentId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("officials").insert([formData]);
        if (error) throw error;
      }
      await onRefresh();
      closeForm();
    } catch (err: any) {
      alert(`Database Error: ${err.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Remove this official from active records permanently?")) {
      await supabase.from("officials").delete().eq("id", id);
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
            title="Officials Directory"
            description="Maintain active civil listings, portfolios, and terms of service for the council."
            action={
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2.5 text-xs font-semibold text-white bg-gov-blue hover:bg-gov-navy rounded-xl shadow-sm cursor-pointer transition-all"
              >
                Register Official
              </button>
            }
          />

          {items.length === 0 ? (
            <EmptyState
              title="Roster Record Empty"
              description="Register council personnel to build accountability across public displays."
              actionLabel="Add Member Node"
              onAction={() => setIsEditing(true)}
            />
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.03)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-200/80 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <th className="px-6 py-4">Full Legal Name</th>
                      <th className="px-6 py-4">Portfolio / Position</th>
                      <th className="px-6 py-4">Term Mandate</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {items.map((off) => (
                      <tr
                        key={off.id}
                        className="hover:bg-slate-50/40 transition-colors duration-150"
                      >
                        <td className="px-6 py-4.5 font-bold text-gov-darkText">
                          {off.name}
                        </td>
                        <td className="px-6 py-4.5">
                          <span className="bg-slate-100 text-gov-blue text-[10px] font-bold px-2.5 py-1 rounded-lg border border-slate-200">
                            {off.position}
                          </span>
                        </td>
                        <td className="px-6 py-4.5 font-mono text-slate-500">
                          {off.term_start} — {off.term_end}
                        </td>
                        <td className="px-6 py-4.5 text-right font-semibold space-x-4 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setCurrentId(off.id);
                              setIsEditing(true);
                            }}
                            className="text-gov-blue hover:text-gov-navy transition-colors cursor-pointer hover:underline"
                          >
                            Configure
                          </button>
                          <button
                            onClick={() => handleDelete(off.id)}
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
        <OfficialForm
          official={
            selectedItem
              ? {
                  id: selectedItem.id,
                  name: selectedItem.name,
                  position: selectedItem.position,
                  term_start: selectedItem.term_start,
                  term_end: selectedItem.term_end,
                  status: selectedItem.status,
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

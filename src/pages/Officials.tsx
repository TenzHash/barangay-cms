import React, { useState } from "react";
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
    const databasePayload = {
      name: formData.name,
      position: formData.position,
      term_start: formData.termStart,
      term_end: formData.termEnd,
      status: formData.status,
    };

    if (currentId) {
      await supabase
        .from("officials")
        .update(databasePayload)
        .eq("id", currentId);
    } else {
      await supabase.from("officials").insert([databasePayload]);
    }
    await onRefresh();
    closeForm();
  };

  const handleDelete = async (id: string) => {
    if (
      confirm(
        "Eradicate official administration profile entry from your public registry?",
      )
    ) {
      await supabase.from("officials").delete().eq("id", id);
      await onRefresh();
    }
  };

  const closeForm = () => {
    setIsEditing(false);
    setCurrentId(null);
  };

  return (
    <div className="space-y-6">
      {!isEditing ? (
        <>
          <PageHeader
            title="Sangguniang Barangay Registry Directory"
            description="Configure details of local officials, portfolios, mandates, and active execution status ranges."
            action={
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-xs font-semibold text-white bg-gov-blue hover:bg-gov-navy rounded-lg shadow-sm"
              >
                Enlist Official Asset
              </button>
            }
          />
          {items.length === 0 ? (
            <EmptyState
              title="Official Ledger Empty"
              description="Populate official entity nodes to structure standard civic organizational hierarchies."
              actionLabel="Enlist Official"
              onAction={() => setIsEditing(true)}
            />
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/70 border-b text-[10px] font-bold text-slate-500 uppercase">
                    <th className="px-6 py-3">Official Legal Identity</th>
                    <th className="px-6 py-3">Position Category</th>
                    <th className="px-6 py-3">Mandated Term Scope</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((off) => (
                    <tr key={off.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-semibold text-gov-darkText">
                        {off.name}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {off.position}
                      </td>
                      <td className="px-6 py-4 text-slate-400 font-mono">
                        {off.term_start} - {off.term_end}
                      </td>
                      <td className="px-6 py-4 text-right space-x-3">
                        <button
                          onClick={() => {
                            setCurrentId(off.id);
                            setIsEditing(true);
                          }}
                          className="text-gov-blue hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(off.id)}
                          className="text-rose-600 hover:underline"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <OfficialForm
          official={
            selectedItem
              ? {
                  ...selectedItem,
                  termStart: selectedItem.term_start,
                  termEnd: selectedItem.term_end,
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

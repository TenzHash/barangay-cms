import React, { useState } from "react";
import { PageHeader } from "../components/shared/PageHeader";
import { EmptyState } from "../components/shared/EmptyState";
import { AnnouncementForm } from "./announcements/AnnouncementForm";
import { supabase } from "../lib/supabaseClient";
import type { Announcement } from "../types";

interface AnnouncementsProps {
  items: Announcement[];
  onRefresh: () => Promise<void>;
}

export const Announcements: React.FC<AnnouncementsProps> = ({
  items,
  onRefresh,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const selectedItem = items.find((i) => i.id === currentId);

  const handleSave = async (formData: any) => {
    try {
      if (currentId) {
        const { error } = await supabase
          .from("announcements")
          .update(formData)
          .eq("id", currentId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("announcements")
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
        "Delete this announcement permanently from the cloud infrastructure?",
      )
    ) {
      await supabase.from("announcements").delete().eq("id", id);
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
            title="Announcements Feed"
            description="Manage public-facing notices, structural circulars, and emergency declarations."
            action={
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2.5 text-xs font-semibold text-white bg-gov-blue hover:bg-gov-navy rounded-xl shadow-sm cursor-pointer transition-all"
              >
                Draft Announcement
              </button>
            }
          />

          {items.length === 0 ? (
            <EmptyState
              title="No Announcements Logged"
              description="Create an operational notice to keep your residential registry updated."
              actionLabel="Draft First Notice"
              onAction={() => setIsEditing(true)}
            />
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.03)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-200/80 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <th className="px-6 py-4">Announcement Context</th>
                      <th className="px-6 py-4">Priority</th>
                      <th className="px-6 py-4">Public Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {items.map((ann) => (
                      <tr
                        key={ann.id}
                        className="hover:bg-slate-50/40 transition-colors duration-150"
                      >
                        <td className="px-6 py-4.5 max-w-md truncate">
                          <div className="font-semibold text-gov-darkText truncate">
                            {ann.title}
                          </div>
                          <div className="text-[11px] text-slate-400 font-normal mt-0.5 truncate">
                            {ann.content}
                          </div>
                        </td>
                        <td className="px-6 py-4.5">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider ${ann.priority === "High" ? "text-rose-600" : "text-slate-500"}`}
                          >
                            {ann.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4.5">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                              ann.status === "Published"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                : "bg-amber-50 text-amber-700 border-amber-100"
                            }`}
                          >
                            {ann.status}
                          </span>
                        </td>
                        <td className="px-6 py-4.5 text-right font-semibold space-x-4 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setCurrentId(ann.id);
                              setIsEditing(true);
                            }}
                            className="text-gov-blue hover:text-gov-navy transition-colors cursor-pointer hover:underline"
                          >
                            Configure
                          </button>
                          <button
                            onClick={() => handleDelete(ann.id)}
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
        <AnnouncementForm
          announcement={selectedItem}
          onSave={handleSave}
          onCancel={closeForm}
        />
      )}
    </div>
  );
};

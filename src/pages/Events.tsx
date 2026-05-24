import { useState } from "react";
import { PageHeader } from "../components/shared/PageHeader";
import { EmptyState } from "../components/shared/EmptyState";
import { EventForm } from "./events/EventForm";
import { supabase } from "../lib/supabaseClient";
import type { Event } from "../types";

interface EventsProps {
  items: Event[];
  onRefresh: () => Promise<void>;
}

export const Events: React.FC<EventsProps> = ({ items, onRefresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const selectedItem = items.find((i) => i.id === currentId);

  const handleSave = async (formData: any) => {
    try {
      if (currentId) {
        const { error } = await supabase
          .from("events")
          .update(formData)
          .eq("id", currentId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("events").insert([formData]);
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
        "Delete this scheduled event node permanently from the cloud registry?",
      )
    ) {
      await supabase.from("events").delete().eq("id", id);
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
            title="Events & Schedules"
            description="Manage community assemblies, health caravans, and cultural programs."
            action={
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2.5 text-xs font-semibold text-white bg-gov-blue hover:bg-gov-navy rounded-xl shadow-sm cursor-pointer transition-all"
              >
                Schedule Event
              </button>
            }
          />

          {items.length === 0 ? (
            <EmptyState
              title="No Events Scheduled"
              description="Log an upcoming activity node to populate citizen portal calendar layers."
              actionLabel="Schedule First Event"
              onAction={() => setIsEditing(true)}
            />
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.03)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-200/80 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <th className="px-6 py-4">Event Context</th>
                      <th className="px-6 py-4">Schedules & Venues</th>
                      <th className="px-6 py-4">Lifecycle State</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {items.map((evt) => (
                      <tr
                        key={evt.id}
                        className="hover:bg-slate-50/40 transition-colors duration-150"
                      >
                        <td className="px-6 py-4.5 max-w-xs truncate">
                          <div className="font-semibold text-gov-darkText truncate">
                            {evt.title}
                          </div>
                          <div className="text-[11px] text-slate-400 font-normal mt-0.5 truncate">
                            {evt.description || "No descriptive summary."}
                          </div>
                        </td>
                        <td className="px-6 py-4.5">
                          <div className="font-mono text-slate-700 font-bold">
                            {evt.event_date}
                          </div>
                          <div className="text-[11px] text-slate-400 font-normal mt-0.5">
                            {evt.venue} @ {evt.event_time}
                          </div>
                        </td>
                        <td className="px-6 py-4.5">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                              evt.status === "Upcoming"
                                ? "bg-blue-50 text-blue-700 border-blue-100"
                                : "bg-emerald-50 text-emerald-700 border-emerald-100"
                            }`}
                          >
                            {evt.status}
                          </span>
                        </td>
                        <td className="px-6 py-4.5 text-right font-semibold space-x-4 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setCurrentId(evt.id);
                              setIsEditing(true);
                            }}
                            className="text-gov-blue hover:text-gov-navy transition-colors cursor-pointer hover:underline"
                          >
                            Configure
                          </button>
                          <button
                            onClick={() => handleDelete(evt.id)}
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
        <EventForm
          event={
            selectedItem
              ? {
                  id: selectedItem.id,
                  title: selectedItem.title,
                  description: selectedItem.description,
                  event_date: selectedItem.event_date,
                  event_time: selectedItem.event_time,
                  venue: selectedItem.venue,
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

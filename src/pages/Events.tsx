import React, { useState } from "react";
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
    // Map internal variable naming convention cleanly to your SQL database snake_case columns
    const databasePayload = {
      title: formData.title,
      description: formData.description,
      event_date: formData.date,
      event_time: formData.time,
      venue: formData.venue,
      status: formData.status,
    };

    if (currentId) {
      await supabase.from("events").update(databasePayload).eq("id", currentId);
    } else {
      await supabase.from("events").insert([databasePayload]);
    }
    await onRefresh();
    closeForm();
  };

  const handleDelete = async (id: string) => {
    if (
      confirm("Delete this event node permanently from the public calendar?")
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
    <div className="space-y-6">
      {!isEditing ? (
        <>
          <PageHeader
            title="Operational Calendars & Events Matrix"
            description="Organize healthcare caravans, youth bootcamps, and zone-specific operations."
            action={
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-xs font-semibold text-white bg-gov-blue hover:bg-gov-navy rounded-lg shadow-sm"
              >
                Schedule Event Object
              </button>
            }
          />
          {items.length === 0 ? (
            <EmptyState
              title="Calendar Framework Empty"
              description="Deploy an upcoming event entry to activate citizen viewports."
              actionLabel="Schedule Event"
              onAction={() => setIsEditing(true)}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border">
                        {evt.status}
                      </span>
                      <div className="text-[10px] font-mono text-slate-400">
                        {evt.event_date}
                      </div>
                    </div>
                    <h4 className="text-xs font-bold text-gov-darkText leading-tight">
                      {evt.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2">
                      {evt.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t text-[11px] text-slate-500 space-y-0.5">
                    <div>
                      Venue:{" "}
                      <span className="font-semibold text-gov-darkText">
                        {evt.venue}
                      </span>
                    </div>
                    {evt.event_time && (
                      <div>
                        Time:{" "}
                        <span className="font-mono">{evt.event_time}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end gap-3 text-xs font-medium pt-1">
                    <button
                      onClick={() => {
                        setCurrentId(evt.id);
                        setIsEditing(true);
                      }}
                      className="text-gov-blue hover:underline"
                    >
                      Modify
                    </button>
                    <button
                      onClick={() => handleDelete(evt.id)}
                      className="text-rose-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <EventForm
          event={
            selectedItem
              ? {
                  ...selectedItem,
                  date: selectedItem.event_date,
                  time: selectedItem.event_time,
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

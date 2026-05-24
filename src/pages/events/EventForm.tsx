import React, { useState } from "react";
import type { Event } from "../../types";

interface EventFormProps {
  event?: Event;
  onSave: (data: Omit<Event, "id">) => void;
  onCancel: () => void;
}

export const EventForm: React.FC<EventFormProps> = ({
  event,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(event?.title || "");
  const [description, setDescription] = useState(event?.description || "");
  const [date, setDate] = useState(event?.date || "");
  const [time, setTime] = useState(event?.time || "");
  const [venue, setVenue] = useState(event?.venue || "");
  const [status, setStatus] = useState<Event["status"]>(
    event?.status || "Upcoming",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date || !venue.trim()) return;
    onSave({ title, description, date, time, venue, status });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5"
    >
      <h3 className="text-sm font-bold uppercase tracking-wider text-gov-navy border-b pb-3">
        {event ? "Modify Calendar Schema" : "Schedule Community Event Element"}
      </h3>
      <div>
        <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">
          Event Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-xs px-3.5 py-2.5 border rounded-lg focus:outline-none focus:border-gov-blue"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">
          Scope Description
        </label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full text-xs px-3.5 py-2.5 border rounded-lg focus:outline-none focus:border-gov-blue resize-none"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">
            Target Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full text-xs px-3.5 py-2.5 border rounded-lg focus:outline-none focus:border-gov-blue"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">
            Time Frame
          </label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="09:00 AM - 12:00 PM"
            className="w-full text-xs px-3.5 py-2.5 border rounded-lg focus:outline-none focus:border-gov-blue"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">
            Assigned Venue Location
          </label>
          <input
            type="text"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="w-full text-xs px-3.5 py-2.5 border rounded-lg focus:outline-none focus:border-gov-blue"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">
            Lifecycle Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Event["status"])}
            className="w-full text-xs px-3.5 py-2.5 border bg-white rounded-lg focus:outline-none focus:border-gov-blue"
          >
            <option value="Upcoming">Upcoming</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end items-center gap-3 pt-3 border-t">
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
          Commit Event
        </button>
      </div>
    </form>
  );
};

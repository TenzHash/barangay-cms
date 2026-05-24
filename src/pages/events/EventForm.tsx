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
  const [event_date, setEventDate] = useState(event?.event_date || "");
  const [event_time, setEventTime] = useState(event?.event_time || "");
  const [venue, setVenue] = useState(event?.venue || "");
  const [status, setStatus] = useState<Event["status"]>(
    event?.status || "Upcoming",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ title, description, event_date, event_time, venue, status });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 max-w-2xl text-xs font-semibold text-slate-500"
    >
      <h3 className="text-sm font-bold text-gov-darkText mb-2">
        Configure Event Node
      </h3>

      <div>
        <label className="block mb-1">Event Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:bg-white text-gov-darkText"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Description</label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:bg-white text-gov-darkText resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Event Date</label>
          <input
            type="date"
            value={event_date}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:bg-white text-gov-darkText"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Event Time</label>
          <input
            type="text"
            value={event_time}
            onChange={(e) => setEventTime(e.target.value)}
            placeholder="e.g., 8:00 AM"
            className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:bg-white text-gov-darkText"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Venue</label>
          <input
            type="text"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:bg-white text-gov-darkText"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Lifecycle Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl focus:outline-none focus:bg-white text-gov-darkText"
          >
            <option value="Upcoming">Upcoming</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
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
          Save Event
        </button>
      </div>
    </form>
  );
};

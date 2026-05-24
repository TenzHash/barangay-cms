import React, { useState } from "react";
import type { Announcement } from "../../types";

interface AnnouncementFormProps {
  announcement?: Announcement;
  onSave: (data: Omit<Announcement, "id" | "date_published">) => void;
  onCancel: () => void;
}

export const AnnouncementForm: React.FC<AnnouncementFormProps> = ({
  announcement,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(announcement?.title || "");
  const [content, setContent] = useState(announcement?.content || "");
  const [status, setStatus] = useState<Announcement["status"]>(
    announcement?.status || "Draft",
  );
  const [priority, setPriority] = useState<Announcement["priority"]>(
    announcement?.priority || "Normal",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSave({ title, content, status, priority });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-5 max-w-3xl"
    >
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-sm font-bold text-gov-darkText tracking-tight">
          {announcement
            ? "Modify Announcement Blueprint"
            : "Draft New Advisory Notice"}
        </h3>
        <p className="text-xs text-slate-400 font-normal mt-0.5">
          Fill out parameters to broadcast data across regional client
          endpoints.
        </p>
      </div>

      <div className="space-y-4 text-xs font-semibold text-slate-500">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wide mb-1.5">
            Announcement Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Scheduled Road Rehabilitation Advisory"
            className="w-full text-xs px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-gov-blue focus:ring-4 focus:ring-gov-blue/5 transition-all duration-200 font-medium placeholder-slate-400"
            required
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wide mb-1.5">
            Content Copy Body
          </label>
          <textarea
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Provide detailed information regarding schedules, zones affected, and instructions..."
            className="w-full text-xs px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-gov-blue focus:ring-4 focus:ring-gov-blue/5 transition-all duration-200 font-medium placeholder-slate-400 resize-none"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wide mb-1.5">
              Priority Classification
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="w-full text-xs px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-gov-blue focus:ring-4 focus:ring-gov-blue/5 transition-all duration-200 font-medium appearance-none"
            >
              <option value="Low">Low Priority</option>
              <option value="Normal">Normal Priority</option>
              <option value="High">High Priority</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wide mb-1.5">
              Publish Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full text-xs px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-gov-blue focus:ring-4 focus:ring-gov-blue/5 transition-all duration-200 font-medium appearance-none"
            >
              <option value="Draft">Draft (Internal System Only)</option>
              <option value="Published">Published (Live to Public Site)</option>
              <option value="Archived">Archived (Stored Records)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center gap-3 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 text-xs font-semibold text-slate-500 hover:bg-slate-50 rounded-xl border border-slate-200 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 text-xs font-semibold text-white bg-gov-blue hover:bg-gov-navy rounded-xl shadow-sm transition-all cursor-pointer"
        >
          Save Configuration
        </button>
      </div>
    </form>
  );
};

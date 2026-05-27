import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { DocumentRequest, RequestStatus } from "../types";

interface DocumentRequestsManagerProps {
  items: DocumentRequest[];
  onRefresh: () => Promise<void>;
}

export function DocumentRequestsManager({
  items,
  onRefresh,
}: DocumentRequestsManagerProps) {
  const [filterStatus, setFilterStatus] = useState<RequestStatus | "All">(
    "All",
  );
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>("");

  // Filter incoming requests dataset safely
  const filteredRequests = items.filter((req) => {
    if (filterStatus === "All") return true;
    return req.status === filterStatus;
  });

  // Database mutation dispatcher to transition states and invoke the SMS Webhook automatically
  const handleUpdateStatus = async (
    id: string,
    nextStatus: RequestStatus,
    reason?: string,
  ) => {
    try {
      setProcessingId(id);

      const updatePayload: Partial<DocumentRequest> = { status: nextStatus };
      if (reason) {
        updatePayload.rejection_reason = reason;
      }

      const { error } = await supabase
        .from("document_requests")
        .update(updatePayload)
        .eq("id", id);

      if (error) throw error;

      // Reset local modal toggles and refresh the core context stream
      setRejectingId(null);
      setRejectionReason("");
      await onRefresh();
    } catch (err) {
      console.error("Failed to mutate record transaction status:", err);
      alert("Error updating transaction state. Please check network logs.");
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusBadgeStyle = (status: RequestStatus) => {
    switch (status) {
      case "Pending":
        return "bg-amber-500/10 border-amber-500/20 text-amber-400";
      case "Approved":
        return "bg-blue-500/10 border-blue-500/20 text-blue-400";
      case "Ready for Pickup":
        return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
      case "Claimed":
        return "bg-slate-500/10 border-slate-500/20 text-slate-400";
      case "Rejected":
        return "bg-rose-500/10 border-rose-500/20 text-rose-400";
      default:
        return "bg-slate-500/10 border-slate-500/20 text-slate-400";
    }
  };

  return (
    <div className="space-y-6 w-full text-xs">
      {/* HEADER CONTROLS BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-sm font-black uppercase tracking-wider text-white">
            Document Request Ledger
          </h3>
          <p className="text-slate-400 text-[11px] font-normal mt-0.5">
            Review, approve, and track certifications requests submitted by
            citizens.
          </p>
        </div>

        {/* STATUS QUICK FILTERS */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 w-max">
          {(
            [
              "All",
              "Pending",
              "Approved",
              "Ready for Pickup",
              "Claimed",
              "Rejected",
            ] as const
          ).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg font-bold tracking-wide transition-all cursor-pointer border-none outline-none ${
                filterStatus === status
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* REQUESTS DATA TABLE GRID */}
      {filteredRequests.length === 0 ? (
        <div className="bg-slate-950/20 border border-slate-800/60 rounded-2xl p-16 text-center text-slate-500 font-semibold font-mono">
          No document requests matching the active filter parameters.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 w-full">
          {filteredRequests.map((req) => (
            <div
              key={req.id}
              className="bg-slate-950/40 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-slate-700/60 transition-colors min-w-0"
            >
              {/* LEFT BLOCK: RESIDENT META */}
              <div className="space-y-2 min-w-0 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h4 className="text-sm font-black text-white truncate">
                    {req.resident_last_name}, {req.resident_first_name}
                  </h4>
                  <span
                    className={`text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded border ${getStatusBadgeStyle(req.status)}`}
                  >
                    {req.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1.5 text-[11px] font-medium text-slate-400">
                  <div>
                    Document:{" "}
                    <span className="text-slate-200 font-bold">
                      {req.barangay_services?.name || "Unknown Document"}
                    </span>
                  </div>
                  <div>
                    Mobile Contact:{" "}
                    <span className="text-slate-200 font-mono font-bold">
                      {req.contact_number}
                    </span>
                  </div>
                  <div>
                    Submitted:{" "}
                    <span className="text-slate-400 font-mono">
                      {new Date(req.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 bg-slate-900/40 border border-slate-800/40 p-2.5 rounded-xl break-words">
                  <span className="font-bold text-slate-400 uppercase text-[9px] block mb-0.5">
                    Purpose of Request:
                  </span>
                  {req.purpose}
                </div>

                {req.status === "Rejected" && req.rejection_reason && (
                  <div className="text-[11px] text-rose-400 bg-rose-950/10 border border-rose-900/20 p-2.5 rounded-xl break-words">
                    <span className="font-bold uppercase text-[9px] block mb-0.5">
                      Reason for Denial:
                    </span>
                    {req.rejection_reason}
                  </div>
                )}
              </div>

              {/* RIGHT BLOCK: ADMINISTRATIVE ACTIONS CONTROL SYSTEM */}
              <div className="flex flex-wrap items-center gap-2 md:self-center shrink-0">
                {req.requirements_url && (
                  <a
                    href={req.requirements_url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold transition-all text-center no-underline border border-slate-700"
                  >
                    📂 View Requirements
                  </a>
                )}

                {/* CONTEXT ACTIONS SWITCH MAP BASED ON ACTIVE LIFECYCLE STATE */}
                {req.status === "Pending" && rejectingId !== req.id && (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(req.id, "Approved")}
                      disabled={processingId !== null}
                      className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all border-none outline-none cursor-pointer disabled:opacity-40"
                    >
                      Approve Request
                    </button>
                    <button
                      onClick={() => setRejectingId(req.id)}
                      disabled={processingId !== null}
                      className="px-3 py-2 bg-slate-800 hover:bg-rose-950/40 hover:text-rose-400 text-slate-400 font-bold rounded-xl transition-all border border-slate-700 hover:border-rose-900/30 outline-none cursor-pointer disabled:opacity-40"
                    >
                      Deny
                    </button>
                  </>
                )}

                {req.status === "Approved" && (
                  <button
                    onClick={() =>
                      handleUpdateStatus(req.id, "Ready for Pickup")
                    }
                    disabled={processingId !== null}
                    className="px-3 py-2 bg-amber-500 text-slate-950 font-black uppercase tracking-wider rounded-xl transition-all border-none outline-none cursor-pointer disabled:opacity-40"
                  >
                    🔔 Mark Ready for Pickup
                  </button>
                )}

                {req.status === "Ready for Pickup" && (
                  <button
                    onClick={() => handleUpdateStatus(req.id, "Claimed")}
                    disabled={processingId !== null}
                    className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all border-none outline-none cursor-pointer disabled:opacity-40"
                  >
                    ✔ Mark as Claimed
                  </button>
                )}

                {/* INLINE REJECTION FORM MODAL FRAME */}
                {rejectingId === req.id && (
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-slate-900 p-2 rounded-xl border border-slate-800 w-full sm:w-auto">
                    <input
                      type="text"
                      placeholder="Enter reason for rejection..."
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      className="px-3 py-2 bg-slate-950 text-white border border-slate-800 rounded-lg outline-none text-xs w-full sm:w-48 placeholder-slate-600 focus:border-slate-600"
                    />
                    <div className="flex gap-1">
                      <button
                        onClick={() =>
                          handleUpdateStatus(
                            req.id,
                            "Rejected",
                            rejectionReason,
                          )
                        }
                        disabled={
                          !rejectionReason.trim() || processingId !== null
                        }
                        className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg cursor-pointer border-none outline-none disabled:opacity-40"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => {
                          setRejectingId(null);
                          setRejectionReason("");
                        }}
                        className="px-2.5 py-1.5 bg-slate-800 text-slate-400 font-bold rounded-lg cursor-pointer border border-slate-700 outline-none"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

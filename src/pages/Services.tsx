import React, { useState } from "react";
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
    const databasePayload = {
      name: formData.name,
      description: formData.description,
      requirements: formData.requirements,
      processing_time: formData.processingTime,
      fees: formData.fees,
    };

    if (currentId) {
      await supabase
        .from("barangay_services")
        .update(databasePayload)
        .eq("id", currentId);
    } else {
      await supabase.from("barangay_services").insert([databasePayload]);
    }
    await onRefresh();
    closeForm();
  };

  const handleDelete = async (id: string) => {
    if (
      confirm(
        "Decommission this clearance request configuration standard permanently?",
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
    <div className="space-y-6">
      {!isEditing ? (
        <>
          <PageHeader
            title="Civil Clearances & Services Catalog"
            description="Configure structural variables for community clearances, certificates of indigency, and business permits."
            action={
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-xs font-semibold text-white bg-gov-blue hover:bg-gov-navy rounded-lg shadow-sm"
              >
                Deploy Service Protocol
              </button>
            }
          />
          {items.length === 0 ? (
            <EmptyState
              title="Services Configuration Matrix Is Empty"
              description="Build dynamic documentation modules to clear path maps for local citizens."
              actionLabel="Add Service Structure"
              onAction={() => setIsEditing(true)}
            />
          ) : (
            <div className="space-y-4">
              {items.map((srv) => (
                <div
                  key={srv.id}
                  className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row justify-between gap-6"
                >
                  <div className="space-y-3 flex-1">
                    <div>
                      <h4 className="text-sm font-bold text-gov-darkText">
                        {srv.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
                        {srv.description}
                      </p>
                    </div>
                    {srv.requirements?.length > 0 && (
                      <div className="bg-slate-50 rounded-lg p-3.5 border text-[11px] text-slate-600">
                        <span className="font-bold uppercase tracking-wider text-[9px] text-slate-400 block mb-1">
                          Prerequisite Checklists:
                        </span>
                        <ul className="list-disc list-inside space-y-0.5">
                          {srv.requirements.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="flex md:flex-col justify-between md:items-end gap-3 shrink-0 text-xs text-slate-400">
                    <div className="md:text-right">
                      <div>
                        Duration:{" "}
                        <span className="font-mono text-gov-darkText font-medium">
                          {srv.processing_time}
                        </span>
                      </div>
                      <div>
                        Fees:{" "}
                        <span className="font-bold text-gov-blue">
                          {srv.fees}
                        </span>
                      </div>
                    </div>
                    <div className="space-x-3 font-medium">
                      <button
                        onClick={() => {
                          setCurrentId(srv.id);
                          setIsEditing(true);
                        }}
                        className="text-gov-blue hover:underline"
                      >
                        Configure
                      </button>
                      <button
                        onClick={() => handleDelete(srv.id)}
                        className="text-rose-600 hover:underline"
                      >
                        Decommission
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <ServiceForm
          service={
            selectedItem
              ? {
                  ...selectedItem,
                  processingTime: selectedItem.processing_time,
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

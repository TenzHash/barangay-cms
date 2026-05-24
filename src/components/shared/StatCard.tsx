import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  trend,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </p>
        <h3 className="text-3xl font-bold text-gov-darkText mt-2 tracking-tight">
          {value}
        </h3>
      </div>
      {(description || trend) && (
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>{description}</span>
          {trend && (
            <span className="font-semibold text-emerald-600">{trend}</span>
          )}
        </div>
      )}
    </div>
  );
};

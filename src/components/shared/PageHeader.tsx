import React from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 mb-6 border-b border-slate-200 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gov-navy tracking-tight">
          {title}
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">{description}</p>
      </div>
      {action && (
        <div className="flex items-center gap-3 shrink-0">{action}</div>
      )}
    </div>
  );
};

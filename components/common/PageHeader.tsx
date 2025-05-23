
import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode; // For action buttons like "Add New"
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, children }) => {
  return (
    <div className="mb-6 pb-4 border-b border-secondary-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-secondary-800">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-secondary-500">{subtitle}</p>}
        </div>
        {children && <div className="mt-4 sm:mt-0 sm:ms-4">{children}</div>}
      </div>
    </div>
  );
};

export default PageHeader;

import React from 'react';

interface CardProps {
  title?: string; // Assume title is already translated or is a key handled by parent
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
  headerActions?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children, className, footer, headerActions }) => {
  return (
    <div className={`bg-white shadow-lg rounded-xl overflow-hidden ${className}`}>
      {(title || headerActions) && (
        <div className="px-4 py-4 sm:px-6 border-b border-secondary-200 flex justify-between items-center">
          {title && <h3 className="text-lg leading-6 font-semibold text-secondary-900 text-start">{title}</h3>}
          {headerActions && <div className="ms-auto rtl:ms-0 rtl:me-auto">{headerActions}</div>}
        </div>
      )}
      <div className="p-4 sm:p-6 text-start">
        {children}
      </div>
      {footer && (
        <div className="px-4 py-3 sm:px-6 bg-secondary-50 border-t border-secondary-200 text-start">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
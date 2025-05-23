
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> { // Updated to include HTMLTextAreaElement
  label?: string;
  error?: string;
  wrapperClassName?: string;
  isTextArea?: boolean; // Add this prop
  rows?: number; // Explicitly declare rows for Textarea
}

const Input: React.FC<InputProps> = ({ label, id, error, className, wrapperClassName, isTextArea, rows, ...props }) => {
  const baseInputClasses = "block w-full px-3 py-2 text-sm text-secondary-700 bg-white border border-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 disabled:bg-secondary-50";
  const errorInputClasses = "border-red-500 focus:ring-red-500 focus:border-red-500";

  const InputElement = isTextArea ? 'textarea' : 'input';

  return (
    <div className={`mb-4 ${wrapperClassName}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-secondary-700 mb-1 text-start">
          {label}
        </label>
      )}
      <InputElement
        id={id}
        className={`${baseInputClasses} ${error ? errorInputClasses : ''} ${className}`}
        {...(props as any)} // Cast to any to satisfy differing props between input/textarea
        rows={isTextArea ? rows : undefined} // Conditionally apply rows; React ignores undefined attributes for HTML input
      />
      {error && <p className="mt-1 text-xs text-red-600 text-start">{error}</p>}
    </div>
  );
};

export default Input;

import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext'; // To translate placeholder if needed

interface SelectOption {
  value: string | number;
  label: string; // Assume label is already translated or is a key for parent to translate
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  wrapperClassName?: string;
  placeholder?: string; // Can be a translation key or direct string
}

const Select: React.FC<SelectProps> = ({ label, id, error, options, className, wrapperClassName, placeholder, ...props }) => {
  const { t } = useLanguage();
  const baseSelectClasses = "block w-full ps-3 pe-10 py-2 text-sm text-secondary-700 bg-white border border-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 disabled:bg-secondary-50";
  const errorSelectClasses = "border-red-500 focus:ring-red-500 focus:border-red-500";
  
  const placeholderText = placeholder ? (placeholder.startsWith("common.") ? t(placeholder as any) : placeholder) : t('common.select_option_placeholder');


  return (
    <div className={`mb-4 ${wrapperClassName}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-secondary-700 mb-1 text-start">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`${baseSelectClasses} ${error ? errorSelectClasses : ''} ${className}`}
        {...props}
      >
        {placeholderText && <option value="">{placeholderText}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-600 text-start">{error}</p>}
    </div>
  );
};

export default Select;
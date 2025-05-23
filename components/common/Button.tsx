
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  isLoading = false,
  className = '',
  ...props
}) => {
  const { language } = useLanguage();
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed";

  // Adjusted primary button size for 'md' and 'lg' - increased padding and font-weight
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: `px-${variant === 'primary' ? '6' : '4'} py-${variant === 'primary' ? '3' : '2'} text-sm ${variant === 'primary' ? 'font-semibold' : ''}`,
    lg: `px-${variant === 'primary' ? '8' : '6'} py-${variant === 'primary' ? '4' : '3'} text-base ${variant === 'primary' ? 'font-bold' : ''}`,
  };

  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-secondary-200 text-secondary-700 hover:bg-secondary-300 focus:ring-secondary-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    outline: 'border border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
  };

  const loadingSpinner = (
    <svg className={`animate-spin h-5 w-5 text-white ${language === 'ar' ? 'ms-[-0.25rem] me-3' : 'me-[-0.25rem] ms-3'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && loadingSpinner}
      {leftIcon && !isLoading && <span className={language === 'ar' ? 'ms-2' : 'me-2'}>{leftIcon}</span>}
      {children}
      {rightIcon && <span className={language === 'ar' ? 'me-2' : 'ms-2'}>{rightIcon}</span>}
    </button>
  );
};

export default Button;
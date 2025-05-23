
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useLanguage } from '../../contexts/LanguageContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string; // Assume title is already translated or is a key handled by parent
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'; // Added new sizes
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md', footer }) => {
  const { language } = useLanguage();

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl', // New size
    '3xl': 'sm:max-w-3xl', // New size
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-secondary-900 bg-opacity-75 transition-opacity" onClick={onClose}></div>

      <div className={`relative bg-white rounded-lg shadow-xl transform transition-all sm:my-8 sm:w-full ${sizeClasses[size]} mx-4`}>
        <div className="flex items-start justify-between p-4 border-b border-secondary-200 rounded-t">
          <h3 className="text-lg font-semibold text-secondary-900" id="modal-title">
            {title}
          </h3>
          <button
            type="button"
            className={`p-1 text-secondary-400 bg-transparent hover:bg-secondary-200 hover:text-secondary-900 rounded-lg text-sm ${language === 'ar' ? 'me-auto' : 'ms-auto'} inline-flex items-center`}
            onClick={onClose}
            aria-label={language === 'ar' ? 'إغلاق النافذة' : 'Close modal'}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-start">
          {children}
        </div>
        {footer && (
          <div className={`flex items-center p-4 space-x-2 rtl:space-x-reverse border-t border-secondary-200 rounded-b ${language === 'ar' ? 'justify-start' : 'justify-end'}`}>
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
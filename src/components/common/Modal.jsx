import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-lg',
  showClose = true,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/55 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        role="dialog"
        aria-modal="true"
        className={`relative z-10 w-full ${maxWidth} bg-[#FFFFFF] dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27] rounded-2xl shadow-2xl overflow-hidden transition-all transform animate-in zoom-in-95 duration-200`}
      >
        {/* Header */}
        {(title || showClose) && (
          <div className="flex items-start justify-between p-5 border-b border-[#E8DFD3] dark:border-[#352C24]">
            <div>
              {title && <h3 className="text-lg font-bold text-[#231B15] dark:text-[#FAF5EE]">{title}</h3>}
              {subtitle && <p className="text-xs text-[#73675F] dark:text-[#BAADA0] mt-1">{subtitle}</p>}
            </div>
            {showClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-[#73675F] dark:text-[#BAADA0] hover:bg-[#F5EFE6] dark:hover:bg-[#2A241F] hover:text-[#231B15] dark:hover:text-[#FAF5EE] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

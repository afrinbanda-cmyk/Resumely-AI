import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'gold' | 'outline' | 'ghost' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 select-none rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 shadow-xs',
    md: 'text-sm px-4 py-2.5 gap-2 shadow-xs',
    lg: 'text-base px-6 py-3.5 gap-2.5 shadow-sm',
  };

  const variantStyles = {
    primary:
      'bg-[#E39A7B] text-white hover:bg-[#D48868] focus:ring-[#E39A7B]/40 shadow-[0_2px_8px_rgba(227,154,123,0.3)] hover:shadow-[0_4px_12px_rgba(227,154,123,0.4)]',
    secondary:
      'bg-white dark:bg-[#201C18] text-[#231B15] dark:text-[#FAF5EE] border border-[#E8DFD3] dark:border-[#382F27] hover:bg-[#F5EFE6] dark:hover:bg-[#2A241F] focus:ring-[#E39A7B]/30',
    gold:
      'bg-[#DBB06B] text-[#231B15] font-semibold hover:bg-[#CC9F56] focus:ring-[#DBB06B]/40 shadow-[0_2px_10px_rgba(219,176,107,0.3)]',
    peach:
      'bg-[#FFD3AC] text-[#231B15] hover:bg-[#F4C499] focus:ring-[#FFD3AC]/40 shadow-[0_2px_8px_rgba(255,211,172,0.3)]',
    outline:
      'border-2 border-[#E39A7B] text-[#E39A7B] hover:bg-[#E39A7B]/10 dark:hover:bg-[#E39A7B]/15 focus:ring-[#E39A7B]/30',
    ghost:
      'text-[#73675F] dark:text-[#BAADA0] hover:text-[#231B15] dark:hover:text-[#FAF5EE] hover:bg-[#F5EFE6]/60 dark:hover:bg-[#2A241F]/60 focus:ring-[#E39A7B]/20',
    danger:
      'bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 border border-rose-200 dark:border-rose-900/50 focus:ring-rose-400/30',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}

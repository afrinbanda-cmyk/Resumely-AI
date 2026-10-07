import React from 'react';

export default function Badge({
  children,
  variant = 'terracotta', // 'terracotta' | 'gold' | 'peach' | 'pink' | 'success' | 'neutral'
  size = 'sm', // 'sm' | 'md'
  icon,
  className = '',
}) {
  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5 rounded-full font-medium',
    md: 'text-sm px-3.5 py-1 rounded-full font-medium',
  };

  const variantStyles = {
    terracotta: 'bg-[#E39A7B]/15 text-[#C87553] dark:text-[#F3AB8F] border border-[#E39A7B]/30',
    gold: 'bg-[#DBB06B]/20 text-[#A67E33] dark:text-[#E8C283] border border-[#DBB06B]/35',
    peach: 'bg-[#FFD3AC]/30 text-[#A0602F] dark:text-[#FFD3AC] border border-[#FFD3AC]/50',
    pink: 'bg-[#FFB5AB]/25 text-[#B6564B] dark:text-[#FFC2B9] border border-[#FFB5AB]/40',
    success: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30',
    neutral: 'bg-[#F0E8DC] dark:bg-[#2A241F] text-[#73675F] dark:text-[#BAADA0] border border-[#E8DFD3] dark:border-[#382F27]',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 ${sizeStyles[size]} ${variantStyles[variant] || variantStyles.terracotta} ${className}`}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}

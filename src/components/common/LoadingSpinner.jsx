import React from 'react';

export default function LoadingSpinner({ size = 'md', text = 'Loading...' }) {
  const sizeMap = {
    sm: 'w-4 h-4 border-2',
    md: 'w-7 h-7 border-2.5',
    lg: 'w-10 h-10 border-3',
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-3">
      <div
        className={`${sizeMap[size] || sizeMap.md} rounded-full border-[#E8DFD3] dark:border-[#352C24] border-t-[#E39A7B] animate-spin`}
      />
      {text && <span className="text-xs font-medium text-[#73675F] dark:text-[#BAADA0] animate-pulse">{text}</span>}
    </div>
  );
}

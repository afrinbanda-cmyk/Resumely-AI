import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({
  size = 'md', // 'sm' | 'md' | 'lg'
  showText = true,
  to = '/',
  className = '',
}) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const Content = (
    <div className={`inline-flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}>
      {/* Icon: Document shape with embedded modern R letter */}
      <div className={`relative ${iconSizes[size]} shrink-0 transition-transform hover:scale-105 duration-200`}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xs">
          <defs>
            <linearGradient id="docGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E39A7B" />
              <stop offset="60%" stopColor="#D48464" />
              <stop offset="100%" stopColor="#C87553" />
            </linearGradient>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD3AC" />
              <stop offset="100%" stopColor="#DBB06B" />
            </linearGradient>
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#E39A7B" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Document Base with folded top-right corner */}
          <path
            d="M8 7C8 4.79086 9.79086 3 12 3H26L34 11V33C34 35.2091 32.2091 37 30 37H12C9.79086 37 8 35.2091 8 33V7Z"
            fill="url(#docGrad)"
            filter="url(#softGlow)"
          />

          {/* Folded corner tab */}
          <path
            d="M26 3V9C26 10.1046 26.8954 11 28 11H34"
            fill="none"
            stroke="#FAF7F2"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Inner stylised 'R' and AI lines */}
          <path
            d="M15 15V29M15 15H21C22.6569 15 24 16.3431 24 18C24 19.6569 22.6569 21 21 21H15M21 21L25 29"
            stroke="#FAF7F2"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Gold AI sparkle node on top fold */}
          <circle cx="29" cy="8" r="2.2" fill="url(#goldGrad)" />
        </svg>
      </div>

      {/* Typography */}
      {showText && (
        <span className={`${textSizes[size]} font-extrabold text-[#231B15] dark:text-[#FAF5EE] tracking-tight flex items-center gap-1`}>
          <span>Resumely</span>
          <span className="text-[#DBB06B] font-black text-[0.88em] px-1 py-0.5 rounded-md bg-[#DBB06B]/15 border border-[#DBB06B]/30 leading-none">
            AI
          </span>
        </span>
      )}
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-flex items-center group">
        {Content}
      </Link>
    );
  }

  return Content;
}

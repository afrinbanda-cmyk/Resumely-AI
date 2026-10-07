import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export default function ThemeToggle({ className = '', showLabel = false }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative inline-flex items-center gap-2 p-2 rounded-xl text-[#73675F] dark:text-[#BAADA0] hover:text-[#231B15] dark:hover:text-[#FAF5EE] hover:bg-[#F5EFE6] dark:hover:bg-[#2A241F] border border-[#E8DFD3]/70 dark:border-[#382F27] transition-all duration-200 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#E39A7B]/40 active:scale-95 ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Moon className="w-4 h-4 text-[#DBB06B] transition-transform duration-300 rotate-0 scale-100" />
        ) : (
          <Sun className="w-4 h-4 text-[#E39A7B] transition-transform duration-300 rotate-0 scale-100" />
        )}
      </div>
      {showLabel && (
        <span className="text-xs font-medium">
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}
    </button>
  );
}

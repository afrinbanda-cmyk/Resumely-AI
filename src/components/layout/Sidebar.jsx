import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  PenTool,
  Palette,
  Sparkles,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
} from 'lucide-react';
import Logo from '../common/Logo';
import ThemeToggle from '../common/ThemeToggle';
import { useResume } from '../../hooks/useResume';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const { savedResumes } = useResume();
  const navigate = useNavigate();

  const navItems = [
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      to: '/my-resumes',
      label: 'My Resumes',
      icon: FileText,
      badge: savedResumes.length > 0 ? savedResumes.length : null,
    },
    {
      to: '/builder',
      label: 'Resume Builder',
      icon: PenTool,
      accent: true,
    },
    {
      to: '/templates',
      label: 'Templates',
      icon: Palette,
    },
    {
      to: '/ai-analysis',
      label: 'AI Analysis',
      icon: Sparkles,
      gold: true,
    },
    {
      to: '/settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <aside
      className={`relative hidden md:flex flex-col bg-[#FFFFFF] dark:bg-[#1E1A16] border-r border-[#E8DFD3] dark:border-[#352C25] transition-all duration-300 z-30 shrink-0 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Header / Logo */}
      <div className="h-20 flex items-center justify-between px-5 border-b border-[#E8DFD3]/80 dark:border-[#352C25]/80">
        <Logo size="md" showText={!isCollapsed} to="/" />
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg text-[#73675F] dark:text-[#BAADA0] hover:bg-[#F5EFE6] dark:hover:bg-[#2A241F] transition-colors cursor-pointer"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-[#E39A7B]/15 text-[#C87553] dark:text-[#F3AB8F] font-semibold shadow-2xs'
                    : 'text-[#73675F] dark:text-[#BAADA0] hover:text-[#231B15] dark:hover:text-[#FAF5EE] hover:bg-[#F5EFE6] dark:hover:bg-[#2A241F]'
                } ${isCollapsed ? 'justify-center px-0' : ''}`
              }
              title={isCollapsed ? item.label : undefined}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${
                      isActive
                        ? 'text-[#E39A7B]'
                        : item.gold
                        ? 'text-[#DBB06B]'
                        : 'text-[#73675F] dark:text-[#BAADA0]'
                    }`}
                  />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                  {!isCollapsed && item.badge && (
                    <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-[#E39A7B]/20 text-[#C87553] dark:text-[#F3AB8F] font-semibold">
                      {item.badge}
                    </span>
                  )}
                  {!isCollapsed && item.gold && (
                    <span className="ml-auto text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#DBB06B]/20 text-[#A67E33] dark:text-[#E8C283] uppercase">
                      PRO
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Profile & Theme toggle */}
      <div className="p-3 border-t border-[#E8DFD3]/80 dark:border-[#352C25]/80 space-y-2">
        {/* User Card */}
        <div
          className={`flex items-center gap-3 p-2 rounded-xl bg-[#FBF8F3] dark:bg-[#14110E] border border-[#E8DFD3]/60 dark:border-[#352C25]/60 ${
            isCollapsed ? 'justify-center p-2' : ''
          }`}
        >
          <div className="relative w-9 h-9 rounded-full overflow-hidden bg-[#E39A7B]/20 border border-[#E39A7B]/40 shrink-0 flex items-center justify-center">
            <span className="font-bold text-xs text-[#E39A7B]">AJ</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#231B15] dark:text-[#FAF5EE] truncate">Alex Johnson</p>
              <p className="text-[11px] text-[#73675F] dark:text-[#BAADA0] truncate">Student</p>
            </div>
          )}
        </div>

        {/* Theme toggle & Logout */}
        <div className={`flex items-center ${isCollapsed ? 'flex-col gap-2' : 'justify-between px-1'}`}>
          <ThemeToggle showLabel={!isCollapsed} />
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="p-2 rounded-xl text-[#73675F] dark:text-[#BAADA0] hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
            title="Log out"
            aria-label="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

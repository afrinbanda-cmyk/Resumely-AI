import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PenTool, FileText, Sparkles, Palette, Settings, Menu, X } from 'lucide-react';
import Logo from '../common/Logo';
import ThemeToggle from '../common/ThemeToggle';

export default function MobileNav() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const mainTabs = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/builder', label: 'Builder', icon: PenTool, highlight: true },
    { to: '/my-resumes', label: 'Resumes', icon: FileText },
    { to: '/ai-analysis', label: 'AI Score', icon: Sparkles },
  ];

  const drawerLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/builder', label: 'Resume Builder', icon: PenTool },
    { to: '/my-resumes', label: 'My Resumes', icon: FileText },
    { to: '/templates', label: 'Templates', icon: Palette },
    { to: '/ai-analysis', label: 'AI Analysis', icon: Sparkles },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Top Mobile Bar */}
      <header className="md:hidden sticky top-0 z-40 bg-[#FFFFFF]/90 dark:bg-[#1E1A16]/90 backdrop-blur-md border-b border-[#E8DFD3] dark:border-[#352C25] px-4 h-16 flex items-center justify-between">
        <Logo size="sm" to="/dashboard" />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="p-2 rounded-xl text-[#73675F] dark:text-[#BAADA0] hover:bg-[#F5EFE6] dark:hover:bg-[#2A241F]"
            aria-label="Toggle menu"
          >
            {drawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Slide-out Mobile Drawer */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="relative ml-auto w-72 max-w-[80vw] h-full bg-[#FFFFFF] dark:bg-[#1E1A16] border-l border-[#E8DFD3] dark:border-[#352C25] shadow-2xl p-5 flex flex-col justify-between z-10 animate-in slide-in-from-right">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD3] dark:border-[#352C25]">
                <Logo size="sm" />
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="p-1 rounded-lg text-[#73675F] dark:text-[#BAADA0]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 space-y-1.5">
                {drawerLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setDrawerOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                          isActive
                            ? 'bg-[#E39A7B]/15 text-[#C87553] dark:text-[#F3AB8F]'
                            : 'text-[#73675F] dark:text-[#BAADA0] hover:bg-[#F5EFE6] dark:hover:bg-[#2A241F]'
                        }`
                      }
                    >
                      <Icon className="w-5 h-5 text-[#E39A7B]" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8DFD3] dark:border-[#352C25]">
              <div className="flex items-center gap-3 p-2 rounded-xl bg-[#FBF8F3] dark:bg-[#14110E]">
                <div className="w-9 h-9 rounded-full bg-[#E39A7B]/20 text-[#E39A7B] font-bold text-xs flex items-center justify-center">
                  AJ
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#231B15] dark:text-[#FAF5EE]">Alex Johnson</p>
                  <p className="text-[11px] text-[#73675F] dark:text-[#BAADA0]">Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Floating Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FFFFFF]/95 dark:bg-[#1E1A16]/95 backdrop-blur-md border-t border-[#E8DFD3] dark:border-[#352C25] px-2 py-1.5 flex items-center justify-around shadow-lg">
        {mainTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                  isActive
                    ? 'text-[#E39A7B] font-semibold'
                    : 'text-[#73675F] dark:text-[#BAADA0] hover:text-[#231B15] dark:hover:text-[#FAF5EE]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`p-1 rounded-lg ${isActive ? 'bg-[#E39A7B]/15' : ''}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] mt-0.5">{tab.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}

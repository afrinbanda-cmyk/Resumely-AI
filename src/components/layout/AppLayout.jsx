import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import ThreeBackground from '../three/ThreeBackground';

export default function AppLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FBF8F3] dark:bg-[#14110E] text-[#231B15] dark:text-[#FAF5EE] transition-colors duration-200 relative overflow-x-hidden">
      {/* Ambient Three.js particles background */}
      <ThreeBackground subtle={true} />

      {/* Desktop Sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Mobile Header and Drawer */}
      <MobileNav />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 pb-20 md:pb-6 relative z-10">
        <Outlet />
      </main>
    </div>
  );
}

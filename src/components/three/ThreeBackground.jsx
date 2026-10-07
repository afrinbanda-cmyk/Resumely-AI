import React from 'react';
import HeroScene from './HeroScene';

export default function ThreeBackground({ subtle = true, className = '' }) {
  return (
    <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40 dark:opacity-30 ${className}`}>
      <HeroScene subtle={subtle} />
    </div>
  );
}

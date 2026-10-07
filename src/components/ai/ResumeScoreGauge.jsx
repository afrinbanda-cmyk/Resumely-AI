import React, { useEffect, useState } from 'react';

export default function ResumeScoreGauge({ score = 87, size = 160, strokeWidth = 12 }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = score / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DBB06B" />
            <stop offset="50%" stopColor="#E39A7B" />
            <stop offset="100%" stopColor="#FFB5AB" />
          </linearGradient>
        </defs>

        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-[#E8DFD3]/60 dark:text-[#382F27]"
          fill="transparent"
        />

        {/* Animated Filled Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#scoreGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-300 ease-out"
        />
      </svg>

      {/* Center Score Readout */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-3xl sm:text-4xl font-extrabold text-[#231B15] dark:text-[#FAF5EE] tracking-tight">
          {animatedScore}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#73675F] dark:text-[#BAADA0]">
          out of 100
        </span>
      </div>
    </div>
  );
}

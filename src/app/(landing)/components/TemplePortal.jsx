"use client";

import React from "react";

export default function TemplePortal() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 1024"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        {/* Golden-White Gradient */}
        <defs>
          <linearGradient id="goldenWhiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#fef3c7" />
            <stop offset="70%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          <radialGradient id="goldenGlow" cx="50%" cy="30%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#fef3c7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.3" />
          </radialGradient>
        </defs>

        {/* Golden-White Background */}
        <rect width="100%" height="100%" fill="url(#goldenWhiteGradient)" />

        {/* Divine Golden Glow */}
        <circle cx="50%" cy="30%" r="400" fill="url(#goldenGlow)" />

        {/* Flowing Golden Water Path */}
        <path
          d="M 0 800 Q 360 700, 720 850 T 1440 780"
          stroke="#fbbf24"
          strokeWidth="3"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M 0 860 Q 360 760, 720 910 T 1440 840"
          stroke="#f59e0b"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        />

        {/* Golden sparkles along the path */}
        {Array.from({ length: 40 }).map((_, i) => {
          const x = Math.random() * 1440;
          const y = 700 + Math.sin(i) * 150 + Math.random() * 80;
          const r = Math.random() * 2 + 1;
          const colors = ["#ffffff", "#fef3c7", "#fbbf24"];
          const color = colors[Math.floor(Math.random() * colors.length)];
          return <circle key={i} cx={x} cy={y} r={r} fill={color} opacity="0.8" />;
        })}
      </svg>

      {/* Krishna & Radha silhouette (full cover, no borders) */}
      <img
        src="/assets/krishna-sillouhette.svg"
        alt="Krishna and Radha"
        className="absolute inset-0 w-full h-full object-cover mx-auto opacity-85 mix-blend-multiply"
        style={{
          filter: "sepia(20%) saturate(1.2) hue-rotate(10deg) brightness(0.9)",
        }}
      />
    </div>
  );
}

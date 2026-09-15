"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const gridColumns = Array.from({ length: 10 }, (_, index) => index * 100);
const gridRows = Array.from({ length: 8 }, (_, index) => (index + 1) * 100);
const traces = [
  { d: "M100 300 H250 V120", gradient: "traceGradient1" },
  { d: "M800 200 H650 V380", gradient: "traceGradient2" },
  { d: "M400 520 V380 H250", gradient: "traceGradient3" },
  { d: "M500 50 V120 H650", gradient: "traceGradient4" },
];

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => setIsVisible(false), 2200);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`fixed inset-0 z-[60] overflow-hidden bg-[#05080e] ${
        isVisible ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-live="polite"
      aria-busy={isVisible}
    >
      <div className="loader-main-container">
        <svg
          className="loader-svg"
          viewBox="0 0 900 900"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Loading portfolio"
        >
          <defs>
            {traces.map((trace, index) => (
              <linearGradient
                key={trace.gradient}
                id={trace.gradient}
                x1={index % 2 === 0 ? "250" : "650"}
                y1="120"
                x2={index % 2 === 0 ? "100" : "800"}
                y2={index % 2 === 0 ? "200" : "300"}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#00ccff" stopOpacity="1" />
                <stop offset="100%" stopColor="#00ccff" stopOpacity="0.35" />
              </linearGradient>
            ))}
          </defs>

          <g className="loader-grid">
            {gridColumns.map((x) => (
              <line key={`column-${x}`} x1={x} y1="0" x2={x} y2="900" />
            ))}
            {gridRows.map((y) => (
              <line key={`row-${y}`} x1="0" y1={y} x2="900" y2={y} />
            ))}
          </g>

          <g className="loader-browser" transform="translate(0, 200)">
            <rect x="250" y="120" width="400" height="260" rx="8" />
            <rect className="loader-browser-top" x="250" y="120" width="400" height="30" rx="8" />
            <text x="294" y="140" textAnchor="middle">Loading...</text>
            <rect className="loader-skeleton" x="270" y="160" width="360" height="20" />
            <rect className="loader-skeleton" x="270" y="190" width="200" height="15" />
            <rect className="loader-skeleton" x="270" y="215" width="300" height="15" />
            <rect className="loader-skeleton" x="270" y="240" width="360" height="90" />
            <rect className="loader-skeleton" x="270" y="340" width="180" height="20" />
          </g>

          <g className="loader-traces" transform="translate(0, 200)">
            {traces.map((trace) => (
              <path key={trace.gradient} d={trace.d} stroke={`url(#${trace.gradient})`} />
            ))}
          </g>
        </svg>
      </div>
    </motion.div>
  );
}